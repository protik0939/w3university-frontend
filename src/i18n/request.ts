import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // For now, we'll use 'en' as default since this runs on server
  // The client-side will handle locale switching
  const locale = 'en';
 
  return {
    locale,
    messages: (await import(`../../public/messages/${locale}.json`)).default
  };
});