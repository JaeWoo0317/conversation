import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function PrivacyPage() {
  return (
    <main className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>Privacy Policy</h1>
      </header>
      
      <section className={styles.form}>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '2rem' }}>Last updated: January 2025</p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>1. Introduction</h2>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          We respect your privacy. This Privacy Policy explains how we handle your information when you use our service.
          We are committed to protecting your personal data and your right to privacy.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>2. Data We Collect</h2>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          - <strong>Conversation Data</strong>: Text or images you input for analysis.
          - <strong>Account Info</strong>: Email address if you sign up via Supabase Auth.
          - <strong>Usage Data</strong>: Basic analytics to improve our service.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>3. How We Use Data</h2>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          - To provide the AI analysis service.
          - To maintain your history (if logged in).
          - To display relevant advertisements (via Google AdSense).
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>4. Data Retention</h2>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          We do not permanently store your conversation data on our servers unless you explicitly save it to your history.
          Temporary processing is done by AI providers (Gemini/OpenAI) and is subject to their data policies.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>5. Third-Party Services</h2>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          We use third-party services like Google AdSense, Supabase, and Cloudflare. 
          These services may use cookies and collecting usage data according to their own privacy policies.
        </p>
        
        <p style={{ marginTop: '2rem', color: '#64748b' }}>
          For questions, contact us at our support email.
        </p>
      </section>
    </main>
  );
}
