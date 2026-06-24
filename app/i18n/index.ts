import en from './locales/en';
import pt from './locales/pt';

type SupportedLanguage = 'pt' | 'en';
type Translations = typeof en;

const translations: Record<SupportedLanguage, Translations> = { en, pt };

const getDeviceLanguage = (): SupportedLanguage => {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const lang = locale.split('-')[0].toLowerCase();
    if (lang === 'pt') return 'pt';
  } catch {}
  return 'en';
};

const currentLang = getDeviceLanguage();

export const t = (key: string): string => {
  const parts = key.split('.');
  let result: any = translations[currentLang];
  for (const part of parts) {
    result = result?.[part];
  }
  return typeof result === 'string' ? result : key;
};

export const useTranslation = () => ({ t });
