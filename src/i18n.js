import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 번역 파일 불러오기
import ko from "./locales/ko.json";
import en from "./locales/en.json";
import ja from "./locales/ja.json";
import zhCN from "./locales/zh-CN.json";

// i18n 초기화
i18n
  .use(initReactI18next) // react-i18next 연결
  .init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
      ja: { translation: ja },
      "zh-CN": { translation: zhCN }
    },
    lng: "ko",          // 기본 언어
    fallbackLng: "ko",  // 번역 없을 때 기본으로 보여줄 언어
    interpolation: {
      escapeValue: false // React는 XSS 자동 방어 → false 권장
    }
  });

export default i18n;
