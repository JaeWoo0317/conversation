'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/Result.module.css';
import { AnalysisResult } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import AdUnit from '@/components/AdUnit';

export default function ResultClient() {
  const params = useParams();
  const router = useRouter();
  const { dict } = useLanguage();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const id = params.id as string;
      
      // 1. Try Session Storage (for immediate results after analysis)
      const storedData = sessionStorage.getItem(`reflection_${id}`);
      if (storedData) {
        setResult(JSON.parse(storedData));
        setLoading(false);
        return;
      }

      // 2. If not in storage, try Supabase (for history/permalink)
      const supabase = createClient();
      const { data, error } = await supabase
        .from('reflections')
        .select('result')
        .eq('id', id)
        .single();
      
      if (data && data.result) {
        setResult(data.result as AnalysisResult);
      } else {
        // Not found anywhere
        console.error("Result not found:", error);
        alert("Result not found or you don't have permission to view it.");
        router.push('/');
      }
      setLoading(false);
    }

    loadData();
  }, [params.id, router]);

  if (loading) return <div className={styles.container}>Loading results...</div>;

  if (!result) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(dict.result.copied);
  };

  const handleSave = async (sentence: string, category: string) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('Please log in to save sentences.');
      return;
    }

    const { error } = await supabase.from('saved_sentences').insert({
        user_id: user.id,
        sentence: sentence,
        category: category
    });

    if (error) {
        console.error('Error saving:', error);
        alert('Failed to save.');
    } else {
        alert('Saved to favorites! ❤️');
    }
  };

  const shareResult = () => {
     const url = window.location.href;
     copyToClipboard(url);
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>{dict.result.backLink}</Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={shareResult} className={styles.copyBtn} style={{ fontSize: '0.9rem' }}>
            🔗 Share
          </button>
          <h1 className={styles.cardTitle}>{dict.result.title}</h1>
        </div>
      </div>

      {/* Neutral Summary */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{dict.result.summaryTitle}</h2>
        <div className={styles.summaryGrid}>
          <div>
            <strong>{dict.result.userA}</strong>
            <p>{result.neutral_summary.userA_claim}</p>
          </div>
          <div>
            <strong>{dict.result.userB}</strong>
            <p>{result.neutral_summary.userB_claim}</p>
          </div>
        </div>
        <div>
          <strong>{dict.result.issues}</strong>
          <ul>
            {result.neutral_summary.issues.map((issue, idx) => (
              <li key={idx}>- {issue}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Misunderstanding Points */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{dict.result.misunderstandingTitle}</h2>
        {result.misunderstanding_points.map((point, idx) => (
          <div key={idx} className={styles.point}>
            <div className={styles.quote}>"{point.quote}"</div>
            <div className={styles.risky}>{dict.result.whyRisky} {point.why_risky}</div>
            <div className={styles.reframe}>{dict.result.reframe} "{point.neutral_reframe}"</div>
          </div>
        ))}
      </section>

      {/* Agreement Options (Level 2 Wow Factor) */}
      {result.agreement_options && (
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>{(dict.result as any).agreementTitle}</h2>
          <div className={styles.agreementGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {result.agreement_options.map((option, idx) => (
              <div key={idx} className={styles.option} style={{ cursor: 'default' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>{option.title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#334155', marginBottom: '1rem' }}>{option.description}</p>
                
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#059669', fontSize: '0.9rem' }}>{(dict.result as any).pros}:</strong>
                  <ul style={{ paddingLeft: '1.2rem', margin: '0.3rem 0', fontSize: '0.9rem', color: '#475569' }}>
                    {option.pros.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>

                <div>
                  <strong style={{ color: '#dc2626', fontSize: '0.9rem' }}>{(dict.result as any).cons}:</strong>
                  <ul style={{ paddingLeft: '1.2rem', margin: '0.3rem 0', fontSize: '0.9rem', color: '#475569' }}>
                    {option.cons.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <AdUnit format="auto" />

      {/* Next Sentences */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{dict.result.nextSentencesTitle}</h2>
        <div className={styles.responseOptions}>
          {['soft', 'firm', 'short'].map((type) => (
            <div key={type} className={styles.option}>
               <div className={styles.optionHeader}>
                  <span className={styles.optionLabel}>{(dict.result as any)[type]}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className={styles.copyBtn} 
                      onClick={() => handleSave(result.next_sentences[type as keyof typeof result.next_sentences], type)}
                      title="Save to favorites"
                    >
                      ❤️
                    </button>
                    <button 
                      className={styles.copyBtn} 
                      onClick={() => copyToClipboard(result.next_sentences[type as keyof typeof result.next_sentences])}
                    >
                      {dict.result.copy}
                    </button>
                  </div>
               </div>
               <p>{result.next_sentences[type as keyof typeof result.next_sentences]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rehearsal */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{dict.result.rehearsalTitle}</h2>
        <div className={styles.scenario}>
          <div className={styles.scenarioTitle}>{dict.result.scenarioA}</div>
          <div className={styles.partnerReply}>{dict.result.partnerReply} "{result.rehearsal.scenarioA.partner_reply}"</div>
          <div className={styles.recommendation}>{dict.result.recommendation} "{result.rehearsal.scenarioA.recommended_answer}"</div>
        </div>
        <div className={styles.scenario}>
          <div className={styles.scenarioTitle}>{dict.result.scenarioB}</div>
          <div className={styles.partnerReply}>{dict.result.partnerReply} "{result.rehearsal.scenarioB.partner_reply}"</div>
          <div className={styles.recommendation}>{dict.result.recommendation} "{result.rehearsal.scenarioB.recommended_answer}"</div>
        </div>
      </section>

    </main>
  );
}
