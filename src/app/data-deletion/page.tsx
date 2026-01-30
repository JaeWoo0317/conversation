import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function DataDeletionPage() {
  return (
    <main className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>Data Deletion</h1>
      </header>
      
      <section className={styles.form}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>How to Delete Your Data</h2>
        <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
          You have the right to request the deletion of your personal data stored on our servers.
        </p>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1e293b' }}>1. Manual Deletion</h3>
        <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
          You can delete individual analysis history items directly from your "My History" page.
          Once deleted, these are permanently removed from our database.
        </p>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1e293b' }}>2. Account Deletion</h3>
        <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
          To delete your entire account and all associated data, please contact us via email.
          This process is irreversible.
        </p>

        <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fee2e2' }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#991b1b' }}>Deletion Request Contact:</strong>
          <p style={{ color: '#b91c1c' }}>support@conversation-reflection.com</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#ef4444' }}>
            Please send the request from the email address associated with your account.
          </p>
        </div>
      </section>
    </main>
  );
}
