'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Home.module.css';
import { Mode, Goal } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import LimitModal from '@/components/LimitModal';
import AdUnit from '@/components/AdUnit';

export default function Home() {
  const router = useRouter();
  const { dict, language } = useLanguage();
  const supabase = createClient();
  
  const [mode, setMode] = useState<Mode>('couple');
  const [goal, setGoal] = useState<Goal>('repair');
  const [conversation, setConversation] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

  // Check usage limit logic
  const checkUsageLimit = async (): Promise<boolean> => {
    // 1. Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return true; // Logged in users have no limit

    // 2. Check local storage for anonymous users
    const today = new Date().toISOString().split('T')[0];
    const lastDate = localStorage.getItem('last_usage_date');
    let count = parseInt(localStorage.getItem('daily_usage_count') || '0', 10);

    // Reset if new day
    if (lastDate !== today) {
      count = 0;
      localStorage.setItem('last_usage_date', today);
      localStorage.setItem('daily_usage_count', '0');
    }

    // 3. Check limit (1 per day)
    if (count >= 1) {
      setShowLimitModal(true);
      return false;
    }

    // 4. Increment usage
    localStorage.setItem('daily_usage_count', (count + 1).toString());
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!conversation && !image) {
      alert('Please enter text or upload an image.');
      return;
    }

    // Run limit check before proceeding
    const allowed = await checkUsageLimit();
    if (!allowed) return;

    setLoading(true);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, goal, conversation, image, language }),
      });

      if (!res.ok) throw new Error('Analysis failed');

      const data = await res.json();
      
      // For MVP without DB, store result in sessionStorage
      const id = Date.now().toString(); // simple temp ID
      sessionStorage.setItem(`reflection_${id}`, JSON.stringify(data));
      
      router.push(`/result/${id}`);
    } catch (error) {
      console.error(error);
      alert('Failed to analyze conversation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      {showLimitModal && <LimitModal onClose={() => setShowLimitModal(false)} />}
      
      <header className={styles.header}>
        <h1 className={styles.title}>{dict.title}</h1>
        <p className={styles.subtitle}>{dict.subtitle}</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>{dict.modeLabel}</label>
          <select 
            value={mode} 
            onChange={(e) => setMode(e.target.value as Mode)}
            className={styles.select}
          >
            <option value="couple">{dict.modes.couple}</option>
            <option value="work">{dict.modes.work}</option>
            <option value="family">{dict.modes.family}</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>{dict.goalLabel}</label>
          <select 
            value={goal} 
            onChange={(e) => setGoal(e.target.value as Goal)}
            className={styles.select}
          >
            <option value="repair">{dict.goals.repair}</option>
            <option value="persuate">{dict.goals.persuate}</option>
            <option value="agree">{dict.goals.agree}</option>
            <option value="feedback">{dict.goals.feedback}</option>
            <option value="boundaries">{dict.goals.boundaries}</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>{dict.conversationLabel}</label>
          <textarea
            value={conversation}
            onChange={(e) => setConversation(e.target.value)}
            placeholder={dict.conversationPlaceholder}
            className={styles.textarea}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>{dict.imageLabel}</label>
          
          {!image ? (
            <div className={styles.fileInputWrapper}>
              <button type="button" className={styles.secondaryButton} onClick={() => document.getElementById('fileInput')?.click()}>
                {dict.imageButton}
              </button>
              <input 
                id="fileInput"
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <div className={styles.imagePreview}>
              <img src={image} alt="Preview" className={styles.previewImg} />
              <button type="button" onClick={removeImage} className={styles.removeButton}>
                {dict.removeImage}
              </button>
            </div>
          )}
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? dict.analyzingButton : dict.analyzeButton}
        </button>

        <p className={styles.privacyNote}>
          {dict.privacyNote}
        </p>
      </form>
      
      <AdUnit format="auto" style={{ marginTop: '2rem' }} />
    </main>
  );
}
