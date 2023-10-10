import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enJSON from './translations/en';
import esJSON from './translations/es';

const resources = {
  en: { translation: enJSON },
  es: { translation: esJSON },
};

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    keySeparator: false,
    // lng: 'es',  // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    react: {
      useSuspense: true
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
