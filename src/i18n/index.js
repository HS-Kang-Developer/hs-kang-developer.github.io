import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from './ko.json';
import ja from './ja.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      ja: { translation: ja },
    },
    lng: 'ko', // 초기 언어
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
