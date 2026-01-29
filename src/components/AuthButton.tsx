'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <Link 
        href="/login"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '8rem', // Left of Language Switcher
          padding: '0.5rem 1rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#4f46e5',
          textDecoration: 'none'
        }}
      >
        Log In
      </Link>
    );
  }

  return (
    <div style={{
      position: 'absolute',
      top: '1rem',
      right: '8rem', // Left of Language Switcher
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    }}>
      <Link href="/history" style={{ fontSize: '0.9rem', color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>
        My History
      </Link>
      <button 
        onClick={handleSignOut}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '0.9rem',
          color: '#64748b',
          cursor: 'pointer'
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
