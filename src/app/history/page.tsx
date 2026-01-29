'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Reflection } from '@/lib/types';
import styles from '@/styles/History.module.css';

export default function HistoryPage() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchHistory() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('reflections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching history:', error);
      } else {
        setReflections(data || []);
      }
      setLoading(false);
    }

    fetchHistory();
  }, [router, supabase]);

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>My History</h1>
      </header>
      
      {reflections.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No saved reflections yet.</p>
          <Link href="/" className={styles.button}>Start New Analysis</Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {reflections.map((ref) => (
            <div key={ref.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.modeBadge}>{ref.mode}</span>
                <span className={styles.date}>
                  {new Date(ref.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className={styles.goal}>Goal: {ref.goal}</p>
              <p className={styles.preview}>
                {ref.conversation.slice(0, 100)}...
              </p>
              <Link 
                href={`/result/${ref.id}?source=db`}
                className={styles.viewButton}
              >
                View Report
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
