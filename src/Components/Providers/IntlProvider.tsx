'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from '@/lib/LocaleContext';
import { useEffect, useState, ReactNode } from 'react';
import enMessages from '../../../public/messages/en.json';
import bnMessages from '../../../public/messages/bn.json';

interface IntlProviderProps {
  children: ReactNode;
}

const messagesMap = {
  en: enMessages,
  bn: bnMessages,
};

export default function IntlProvider({ children }: Readonly<IntlProviderProps>) {
  const { locale } = useLocale();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Always use 'en' messages for initial server render to avoid hydration mismatch
  const currentMessages = mounted ? messagesMap[locale] : messagesMap.en;
  const currentLocale = mounted ? locale : 'en';

  return (
    <NextIntlClientProvider key={currentLocale} locale={currentLocale} messages={currentMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
