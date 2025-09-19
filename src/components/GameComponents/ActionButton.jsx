import React from 'react';

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
  const getButtonText = () => {
    switch (gameStatus) {
      case 'ready':
        return '게임 시작';
      case 'correct':
        return currentStage >= 4 ? '게임 완료' : '다음 단계로';
      case 'timeout':
      case 'wrong':
        return '다시 도전하기';
      default:
        return '다른 글자를 찾아보세요';
    }
  };

  const getButtonClasses = () => {
    switch (gameStatus) {
      case 'ready':
      case 'correct':
      case 'timeout':
      case 'wrong':
        return 'bg-neutral-600 text-neutral-200 cursor-pointer hover:bg-neutral-700';
      default:
        return 'bg-neutral-200 text-neutral-300 cursor-not-allowed';
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
      className={`w-full py-4 rounded-full font-bold text-lg transition-colors duration-200 shadow-lg ${getButtonClasses()}`}
      onClick={gameStatus !== 'playing' ? handleClick : undefined}
      style={{ minHeight: '56px' }}
    >
      <div className="w-full flex-1 text-center justify-start text-base font-semibold font-['SUITE'] leading-normal">
        {getButtonText()}
      </div>
    </div>
  );
};

export default ActionButton;