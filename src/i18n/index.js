import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // ✅ 추가

import ko from './ko.json';
import ja from './ja.json';

i18n
  .use(LanguageDetector) // ✅ 브라우저 언어 감지 기능 추가
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      ja: { translation: ja },
    },
    fallbackLng: 'ko',
    detection: {
      // ✅ 언어 감지 우선순위 및 저장 방식 설정
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // localStorage에 저장 → 유지됨
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
