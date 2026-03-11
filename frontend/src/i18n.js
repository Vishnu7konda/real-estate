import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationEN from './locales/en/translation.json';
import translationTE from './locales/te/translation.json';
import translationHI from './locales/hi/translation.json';

// Configure translation resources
const resources = {
  en: {
    translation: translationEN
  },
  te: {
    translation: translationTE
  },
  hi: {
    translation: translationHI
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback if key is missing
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
