import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  // For now, we'll use 'en' as default since this runs on server
  // The client-side will handle locale switching
  let locale = await requestLocale;
  
  // Fallback to 'en' if no locale is provided
  if (!locale || (locale !== 'en' && locale !== 'bn')) {
    locale = 'en';
  }
 
  return {
    locale,
    messages: (await import(`../../public/messages/${locale}.json`)).default
  };
});