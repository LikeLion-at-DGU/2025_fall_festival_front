import React from "react";

function GameCompleteModal({ isOpen, onClose, onRestart }) {
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
            축하합니다!
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            모든 단계를 성공적으로 완료했어요!<br />
            정말 훌륭한 집중력이었습니다 :)
          </p>
        </div>
        <button
          onClick={onRestart}
          className="w-full bg-primary-500 text-white py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          다시 도전하기
        </button>
      </div>
    </div>
  );
}

export default GameCompleteModal;