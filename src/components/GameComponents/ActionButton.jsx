import React from "react";

/**
 * Author @곽도윤
 *  *
 * 게임페이지 액션 버튼 컴포넌트
 * @param {string} gameStatus - 게임 상태 ('ready', 'playing', 'correct', 'timeout', 'wrong')
 * @param {Function} onNextStep - 다음 단계로 이동
 * @param {Function} onRetry - 다시 도전하기
 * @param {Function} onStartGame - 게임 시작
 * @param {Function} onGoHome - 홈으로 가기
 * @param {number} currentStage - 현재 단계 (1-4)
 * @param {number} playCount - 플레이 횟수
 */
const ActionButton = ({
  gameStatus,
  onNextStep,
  onRetry,
  onStartGame,
  onGoHome,
  currentStage,
  playCount,
}) => {
  const getButtonText = () => {
    switch (gameStatus) {
      case "ready":
        return "게임 시작";
      case "playing":
        return "다른 글자를 찾아보세요";
      case "correct":
        return currentStage >= 4 ? "게임 완료" : "다음 단계로";
      case "timeout":
      case "wrong":
        return playCount >= 3 ? "홈으로 가기" : "다시 도전하기";
      default:
        return "다른 글자를 찾아보세요";
    }
  };

  const getButtonClasses = () => {
    switch (gameStatus) {
      case "ready":
        return "w-[343px] h-[56px] px-6 py-4 rounded-[12px] bg-[#2A2A2E] text-white cursor-pointer opacity-100 hover:bg-neutral-700";
      case "playing":
        return "w-[343px] h-[56px] px-6 py-4 rounded-[12px] bg-[#E4E4E7] !text-[#A1A1AA] cursor-not-allowed opacity-50";
      case "correct":
      case "timeout":
      case "wrong":
        return "w-[343px] h-[56px] px-6 py-4 rounded-[12px] bg-[#2A2A2E] text-white cursor-pointer opacity-100 hover:bg-neutral-700";
      default:
        return "w-[343px] h-[56px] px-6 py-4 rounded-[12px] bg-[#2A2A2E] text-white cursor-not-allowed opacity-50";
    }
  };

  const handleClick = () => {
    if (gameStatus === "ready") {
      onStartGame && onStartGame();
    } else if (gameStatus === "correct") {
      onNextStep && onNextStep();
    } else if (gameStatus === "timeout" || gameStatus === "wrong") {
      if (playCount >= 3) {
        onGoHome && onGoHome();
      } else {
        onRetry && onRetry();
      }
    }
  };

  return (
    <div
      data-status={gameStatus === "playing" ? "Disabled" : "Black"}
      className={`flex items-center justify-center shrink-0 transition-colors duration-200 ${getButtonClasses()}`}
      onClick={gameStatus !== "playing" ? handleClick : undefined}
    >
      <div className="text-[16px] font-semibold font-suite">
        {getButtonText()}
      </div>
    </div>
  );
};

export default ActionButton;
