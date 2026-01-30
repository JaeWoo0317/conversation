import { NextResponse } from 'next/server';
import { analyzeConversation } from '@/lib/api';
import { AnalysisRequest } from '@/lib/types';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body: AnalysisRequest = await request.json();
    
    // 1. Origin Validation (Security)
    const origin = request.headers.get('origin');
    const allowedOrigins = ['conversation-tool.pages.dev', 'localhost'];
    const isAllowed = origin && allowedOrigins.some(allowed => origin.includes(allowed));

    if (process.env.NODE_ENV === 'production' && !isAllowed) {
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      );
    }

    // 2. Input Validation (Security & Cost)
    if ((!body.conversation && !body.image) || !body.mode || !body.goal) {
      return NextResponse.json(
        { error: 'Missing required fields (text or image required)' }, 
        { status: 400 }
      );
    }

    // Limit text length to 5000 characters to prevent abuse
    if (body.conversation && body.conversation.length > 5000) {
      return NextResponse.json(
        { error: 'Conversation too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    const start = Date.now();
    const result = await analyzeConversation(body);
    console.log(`Analysis took ${Date.now() - start}ms`);

    // Save to Supabase if user is logged in
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from('reflections').insert({
        user_id: user.id,
        mode: body.mode,
        goal: body.goal,
        conversation: body.conversation,
        result: result
      });

      if (error) {
        console.error("Failed to save to Supabase:", error);
      } else {
        console.log("Saved to Supabase");
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
