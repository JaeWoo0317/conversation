import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function TermsPage() {
  return (
    <main className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>Terms of Service</h1>
      </header>
      
      <section className={styles.form}>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '2rem' }}>Last updated: January 2025</p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          By accessing or using our service, you agree to be bound by these Terms of Service.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>2. Use of Service</h2>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          You agree to use this service only for lawful purposes. You must not submit content that is illegal, abusive, or harmful.
          We reserve the right to ban users who violate these rules.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>3. Disclaimer</h2>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          This service is provided "as is" using AI technology. The analysis is for informational purposes only 
          and should not be considered professional psychological or legal advice.
        </p>

        <h2 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>4. Limitation of Liability</h2>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          We are not liable for any damages arising from the use or inability to use this service.
          Use the advice provided at your own discretion.
        </p>
      </section>
    </main>
  );
}
