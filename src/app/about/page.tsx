import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function AboutPage() {
  return (
    <main className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>About Us</h1>
      </header>
      
      <section className={styles.form}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>Our Mission</h2>
        <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
          Communication is the bridge between people, but sometimes that bridge can get shaky. 
          Our mission is to help you strengthen your relationships through better communication.
        </p>
        <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
          Using advanced AI technology, we analyze your conversations to uncover hidden nuances, 
          emotional undertones, and opportunities for connection that you might have missed. 
          Whether it's with your partner, family, or colleagues, we provide objective reflections 
          to help you understand each other better.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>How It Works</h2>
        <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
          Simply imput a conversation or upload a screenshot. Our AI acts as a neutral third party—like a 
          wise counselor or mediator—to analyze the dialogue. We provide a neutral summary, 
          identify misunderstanding points, and suggest more constructive ways to express yourself.
        </p>
        
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '2rem' }}>
          This tool is for educational and self-reflection purposes only and is not a substitute for professional therapy.
        </p>
      </section>
    </main>
  );
}
