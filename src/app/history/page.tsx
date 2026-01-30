'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Reflection, SavedSentence } from '@/lib/types';
import styles from '@/styles/History.module.css';

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<'history' | 'saved'>('history');
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [savedSentences, setSavedSentences] = useState<SavedSentence[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch History
      const { data: historyData } = await supabase
        .from('reflections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (historyData) setReflections(historyData);

      // Fetch Saved Sentences
      const { data: savedData } = await supabase
        .from('saved_sentences')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (savedData) setSavedSentences(savedData);

      setLoading(false);
    }

    fetchData();
  }, [router, supabase]);

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>My Dashboard</h1>
      </header>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'history' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Analysis History
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'saved' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Sentences ❤️
        </button>
      </div>
      
      {activeTab === 'history' && (
        reflections.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No saved reflections yet.</p>
            <Link href="/" className={styles.button}>Start New Analysis</Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {reflections.map((ref) => (
              <div key={ref.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className={styles.modeBadge}>{ref.mode}</span>
                    <span className={styles.goalBadge}>{ref.goal}</span>
                    {ref.intensity && <span className={styles.intensityBadge}>{ref.intensity}</span>}
                  </div>
                  <span className={styles.date}>
                    {new Date(ref.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className={styles.preview}>
                  {ref.conversation.slice(0, 100)}...
                </p>
                <div style={{ marginTop: '0.5rem' }}>
                    <strong>Issue:</strong> {ref.result.neutral_summary.issues[0]}
                </div>
                <Link 
                  href={`/result/${ref.id}?source=db`}
                  className={styles.viewButton}
                  style={{ marginTop: '1rem', display: 'block', textAlign: 'center' }}
                >
                  View Full Report
                </Link>
              </div>
            ))}
          </div>
        )
      )}

      {activeTab === 'saved' && (
        savedSentences.length === 0 ? (
           <div className={styles.emptyState}>
            <p>No saved sentences yet. Click the ❤️ icon on your results to save them!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {savedSentences.map((item) => (
              <div key={item.id} className={styles.card} style={{ borderLeft: '4px solid #f43f5e' }}>
                <div className={styles.cardHeader}>
                  <span className={styles.categoryBadge} style={{ textTransform: 'capitalize' }}>
                    {item.category}
                  </span>
                  <span className={styles.date}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className={styles.sentence} style={{ fontSize: '1.1rem', fontWeight: 500, margin: '1rem 0' }}>
                  "{item.sentence}"
                </p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
