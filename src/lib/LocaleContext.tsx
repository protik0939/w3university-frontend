'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

type Locale = 'en' | 'bn';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  // Always start with 'en' to match server-side rendering
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // After hydration, load locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale === 'en' || savedLocale === 'bn') {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    console.log('Setting locale to:', newLocale);
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    // No need to reload - the useEffect in IntlProvider will handle the update
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
