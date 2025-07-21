import * as RNLocalize from 'react-native-localize';
import i18n from '../../i18n';

// Lấy ngôn ngữ hệ thống
export const getSystemLanguage = () => {
  const locales = RNLocalize.getLocales();
  return locales?.[0]?.languageCode || 'en'; // 'vi', 'en'
};

// Đổi ngôn ngữ app (và i18n)
export const setAppLanguage = languageCode => {
  i18n.changeLanguage(languageCode);
};
