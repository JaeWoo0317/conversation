'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function Footer() {
  const { dict } = useLanguage();
  
  return (
    <footer style={{
      textAlign: 'center',
      padding: '2rem 1rem',
      marginTop: 'auto',
      borderTop: '1px solid #e2e8f0',
      color: '#94a3b8',
      fontSize: '0.8rem',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ marginBottom: '0.5rem' }}>
          {dict.footer.disclaimer}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>
          <span>•</span>
          <Link href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
          <span>•</span>
          <Link href="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>Terms</Link>
          <span>•</span>
          <Link href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</Link>
          <span>•</span>
          <Link href="/data-deletion" style={{ textDecoration: 'none', color: 'inherit' }}>Data Deletion</Link>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} Connection Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
