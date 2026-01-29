import { NextResponse } from 'next/server';
import { analyzeConversation } from '@/lib/api';
import { AnalysisRequest } from '@/lib/types';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body: AnalysisRequest = await request.json();
    
    // Basic validation
    // Basic validation
    if ((!body.conversation && !body.image) || !body.mode || !body.goal) {
      return NextResponse.json(
        { error: 'Missing required fields (text or image required)' }, 
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
