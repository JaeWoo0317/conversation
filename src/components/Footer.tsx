'use client';

import { useLanguage } from '@/contexts/LanguageContext';

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
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <span style={{ cursor: 'not-allowed' }}>Terms of Service</span>
          <span>•</span>
          <span style={{ cursor: 'not-allowed' }}>Privacy Policy</span>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} Connection Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
