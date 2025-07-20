// src/resources/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './src/locales/en.json';
import vi from './src/locales/vi.json';

// Lấy ngôn ngữ hệ thống
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    const locales = RNLocalize.getLocales();
    callback(locales[0]?.languageTag || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
