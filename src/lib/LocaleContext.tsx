'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

type Locale = 'en' | 'bn';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Load locale from localStorage on mount
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale === 'en' || savedLocale === 'bn') {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
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
