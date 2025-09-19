import React from 'react';

/**
 * 게임 상태 메시지 컴포넌트
 * @param {string} targetWord - 찾아야 할 단어
 * @param {string} gameStatus - 게임 상태 ('playing', 'correct', 'timeout', 'wrong')
 */
const StatusMessage = ({ targetWord, gameStatus }) => {
  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'correct':
        return '정답입니다!';
      case 'timeout':
        return '시간 초과...';
      case 'wrong':
        return '틀렸습니다!';
      default:
        return targetWord;
    }
  };

  const getStatusColor = () => {
    switch (gameStatus) {
      case 'correct':
        return 'text-green-600';
      case 'timeout':
      case 'wrong':
        return 'text-red-600';
      default:
        return 'text-neutral-500';
    }
  };

  return (
    <div className={`left-[151px] top-[118px] absolute text-center justify-start text-base font-semibold font-['SUITE'] leading-normal ${getStatusColor()}`}>
      {getStatusMessage()}
    </div>
  );
};

export default StatusMessage;