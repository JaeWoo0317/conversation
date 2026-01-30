'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import styles from '@/styles/Login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        if (data.session) {
          router.push('/');
          router.refresh();
        } else {
          alert('Check your email for the confirmation link!');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>{isSignUp ? 'Sign Up' : 'Log In'}</h1>
        <p className={styles.subtitle}>
          {isSignUp ? 'Create an account to save your reflections' : 'Welcome back'}
        </p>
        
        <form onSubmit={handleAuth} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.input}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.input}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
          </button>
        </form>
        
        <button 
          onClick={() => setIsSignUp(!isSignUp)} 
          className={styles.switchButton}
        >
          {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
