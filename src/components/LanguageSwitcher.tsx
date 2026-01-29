'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        background: 'white',
        cursor: 'pointer',
        fontWeight: 600,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        fontSize: '0.9rem'
      }}
    >
      {language === 'ko' ? '🇺🇸 English' : '🇰🇷 한국어'}
    </button>
  );
}
