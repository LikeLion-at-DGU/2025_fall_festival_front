// src/context/TranslationContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "i18next";
import { translateBatch, translateSingle } from "../utils/translationApi";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState({}); // 번역된 텍스트 캐시
  const [pendingTranslations, setPendingTranslations] = useState(new Set()); // 번역 중인 항목들

  // 언어 변경 감지
  useEffect(() => {
    const handleLanguageChange = (newLanguage) => {
      if (newLanguage !== "ko") {
        setTranslations({});
        setPendingTranslations(new Set());
      }
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  // 배치 번역 요청 함수 (리스트 페이지용)
  const requestBatchTranslations = async (items) => {
    if (!items || items.length === 0) return;

    // 한국어일 때는 번역하지 않음
    if (i18n.language === "ko") {
      return;
    }

    try {
      const results = await translateBatch(items, i18n.language);

      const newTranslations = {};

      results.forEach((result) => {
        const key = `${result.entity_type}-${result.entity_id}-${result.field}`;

        // 번역 실패 시 원문 사용
        const sourceText =
          items
            .find(
              (item) =>
                `${item.entity_type}-${item.entity_id}` ===
                `${result.entity_type}-${result.entity_id}`
            )
            ?.fields.find((field) => field.field === result.field)
            ?.source_text || "";

        newTranslations[key] = {
          text:
            result.translated?.translated_text ||
            result.translated?.text ||
            sourceText,
          status: result.translated?.status || "error",
          provider: result.translated?.provider || null,
        };
      });

      setTranslations((prev) => ({ ...prev, ...newTranslations }));
      console.log("번역 완료:", newTranslations);
      console.log("전체 번역 캐시:", translations);
    } catch (error) {
      console.error("배치 번역 실패:", error);
    }
  };

  const requestSingleTranslation = async (item) => {
    const key = `${item.entity_type}-${item.entity_id}-${item.field}`;

    if (pendingTranslations.has(key) || translations[key]) {
      return translations[key]?.text || item.source_text;
    }

    if (i18n.language === "ko") {
      return item.source_text;
    }

    setPendingTranslations((prev) => new Set(prev).add(key));

    try {
      const result = await translateSingle(item, i18n.language);

      const translation = {
        text: result.translated_text,
        status: result.status,
        provider: result.provider,
      };

      setTranslations((prev) => ({ ...prev, [key]: translation }));
      setPendingTranslations((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });

      return result.translated_text;
    } catch (error) {
      console.error("단일 번역 실패:", error);
      setPendingTranslations((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
      return item.source_text; // 에러 시 원문 반환
    }
  };

  // 번역된 텍스트 가져오기 함수
  const getTranslation = (entityType, entityId, field, sourceText) => {
    if (i18n.language === "ko") {
      return sourceText;
    }

    const key = `${entityType}-${entityId}-${field}`;
    const translation = translations[key];

    if (translation && translation.status === "ok") {
      return translation.text;
    }

    // 번역이 없거나 실패한 경우 원문 반환
    return sourceText;
  };

  // 번역 상태 확인 함수
  const getTranslationStatus = (entityType, entityId, field) => {
    const key = `${entityType}-${entityId}-${field}`;
    const translation = translations[key];

    if (pendingTranslations.has(key)) {
      return "pending";
    }

    return translation?.status || "none";
  };

  // 캐시 초기화 함수
  const clearTranslations = () => {
    setTranslations({});
    setPendingTranslations(new Set());
  };

  return (
    <TranslationContext.Provider
      value={{
        translations,
        requestBatchTranslations,
        requestSingleTranslation,
        getTranslation,
        getTranslationStatus,
        clearTranslations,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

// Custom Hook
export const useTranslations = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslations must be used within a TranslationProvider"
    );
  }
  return context;
};
