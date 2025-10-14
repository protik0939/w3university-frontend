'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from '@/lib/LocaleContext';
import { useEffect, useState, ReactNode } from 'react';

interface IntlProviderProps {
  children: ReactNode;
}

export default function IntlProvider({ children }: Readonly<IntlProviderProps>) {
  const { locale } = useLocale();
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    // Load messages dynamically based on locale
    const loadMessages = async () => {
      try {
        const messagesModule = await import(`../../../public/messages/${locale}.json`);
        setMessages(messagesModule.default);
      } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
      }
    };

    loadMessages();
  }, [locale]);

  if (!messages) {
    return <div>{children}</div>; // Return children without intl while loading
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
