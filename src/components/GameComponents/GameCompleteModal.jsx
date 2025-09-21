import React from "react";
import { useTranslation } from "react-i18next";

function GameCompleteModal({ isOpen, onClose, onRestart }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[320px] text-center shadow-xl relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-neutral-600 text-xl leading-none"
        >
          ×
        </button>

        {/* 성공 모달만 표시 */}
        <div className="mb-4">
          <div className="text-2xl mb-2">🎉</div>
          <h2 className="text-lg font-bold text-neutral-800 mb-2">
            {t("gameCompleteModal.congratsTitle")}
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
            {t("gameCompleteModal.congratsMessage")}
          </p>
        </div>
        <button
          onClick={onRestart}
          className="w-full bg-primary-500 text-white py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          {t("gameCompleteModal.retry")}
        </button>
      </div>
    </div>
  );
}

export default GameCompleteModal;