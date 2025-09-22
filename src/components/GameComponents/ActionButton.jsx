import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Author @곽도윤
 *  * 
 * 게임페이지 액션 버튼 컴포넌트
 * @param {string} gameStatus - 게임 상태 ('ready', 'playing', 'correct', 'timeout', 'wrong')
 * @param {Function} onNextStep - 다음 단계로 이동
 * @param {Function} onRetry - 다시 도전하기
 * @param {Function} onStartGame - 게임 시작
 * @param {number} currentStage - 현재 단계 (1-4)
 */
const ActionButton = ({ gameStatus, onNextStep, onRetry, onStartGame, currentStage }) => {
  const { t } = useTranslation();

  const getButtonText = () => {
    switch (gameStatus) {
      case 'ready':
        return t('game.start');
      case 'playing':
        return '다른 글자를 찾아보세요';
      case 'correct':
        return currentStage >= 4 ? t('game.complete') : t('game.nextStep');
      case 'timeout':
      case 'wrong':
        return t('game.retry');
      default:
        return t('game.default');
    }
  };

  const getButtonClasses = () => {
    switch (gameStatus) {
      case 'ready':
        return 'bg-black text-white cursor-pointer hover:bg-gray-800';
      case 'playing':
        return 'bg-neutral-200 text-neutral-300 cursor-not-allowed';
      case 'correct':
      case 'timeout':
      case 'wrong':
        return 'bg-black text-white cursor-pointer hover:bg-gray-800';
      default:
        return 'bg-black text-gray-400 cursor-not-allowed';
    }
  };

  const handleClick = () => {
    if (gameStatus === 'ready') {
      onStartGame && onStartGame();
    } else if (gameStatus === 'correct') {
      onNextStep && onNextStep();
    } else if (gameStatus === 'timeout' || gameStatus === 'wrong') {
      onRetry && onRetry();
    }
  };

  return (
    <div 
      data-status={gameStatus === 'playing' ? 'Disabled' : 'Black'}
      className={`w-full py-4 rounded-xl font-bold text-lg transition-colors duration-200 shadow-lg ${getButtonClasses()}`}
      onClick={gameStatus !== 'playing' ? handleClick : undefined}
    >
      <div className="w-full flex-1 text-center justify-start text-base font-semibold font-['SUITE'] leading-normal">
        {getButtonText()}
      </div>
    </div>
  );
};

export default ActionButton;