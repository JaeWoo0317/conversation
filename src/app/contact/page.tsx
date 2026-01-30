import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function ContactPage() {
  return (
    <main className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>Contact Us</h1>
      </header>
      
      <section className={styles.form}>
        <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
          We value your feedback and are here to help. If you have any questions, suggestions, or issues, please reach out to us.
        </p>

        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1e293b' }}>Email Support</h3>
          <p style={{ color: '#475569' }}>
            For general inquiries and support:<br />
            <strong>support@conversation-reflection.com</strong> (Placeholder)
          </p>
        </div>

        <p style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.9rem' }}>
          We aim to respond to all inquiries within 24-48 hours.
        </p>
      </section>
    </main>
  );
}
