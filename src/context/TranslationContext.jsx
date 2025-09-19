// src/context/TranslationContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "i18next";
import { translateBatch } from "../utils/translationApi";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState({}); // entityId별 저장

  // 번역 요청 함수
  const requestTranslations = async (items) => {
    try {
      const data = await translateBatch(items, i18n.language);
      const newMap = {};
      data.items.forEach((item) => {
        newMap[item.entity_id + "-" + item.field] =
          item.translated_text ?? item.source_text;
      });
      setTranslations((prev) => ({ ...prev, ...newMap }));
    } catch (e) {
      console.error("번역 실패:", e);
    }
  };

  return (
    <TranslationContext.Provider value={{ translations, requestTranslations }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom Hook
export const useTranslations = () => useContext(TranslationContext);
