'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { dictionaries, Language } from '@/lib/dictionaries';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: typeof dictionaries['ko'];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  const value = {
    language,
    setLanguage,
    dict: dictionaries[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
