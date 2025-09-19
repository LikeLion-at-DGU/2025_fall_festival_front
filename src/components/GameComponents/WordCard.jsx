import React from 'react';

/**
 * Author: @곽도윤
 * 
 * 개별 글자 카드 컴포넌트
 * @param {string} text - 카드에 표시될 텍스트
 * @param {string} size - 카드 크기 ('XL', 'L', 'M', 'S')
 * @param {string} status - 카드 상태 ('Normal', 'Answer')
 * @param {Function} onClick - 클릭 핸들러
 * @param {boolean} isCorrectAnswer - 정답 여부
 */

const WordCard = ({ text, size, status = 'Normal', onClick, isCorrectAnswer = false }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'XL':
        return 'w-40 h-56 text-3xl leading-10';
      case 'L':
        return 'w-24 h-36 text-2xl leading-loose';
      case 'M':
        return 'w-20 h-28 text-base leading-normal';
      case 'S':
        return 'w-14 h-20 text-sm leading-tight';
      default:
        return 'w-24 h-36 text-2xl leading-loose';
    }
  };

  const getCardClasses = () => {
    if (status === 'Answer' || isCorrectAnswer) {
      return 'bg-gradient-to-l from-primary-400 to-primary-300 rounded-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.10)] border-2 border-primary-50';
    }
    return 'bg-white rounded-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.10)]';
  };

  const getTextClasses = () => {
    if (status === 'Answer' || isCorrectAnswer) {
      return 'text-primary-50';
    }
    return 'text-neutral-600';
  };

  const getTextSize = () => {
    switch (size) {
      case 'XL':
        return 'text-3xl leading-10';
      case 'L':
        return 'text-2xl leading-loose';
      case 'M':
        return 'text-base leading-normal';
      case 'S':
        return 'text-sm leading-tight';
      default:
        return 'text-2xl leading-loose';
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div 
      data-size={size} 
      data-status={status}
      className={`${sizeClasses} py-10 relative cursor-pointer hover:scale-105 transition-transform flex justify-center items-center gap-2.5`}
      onClick={onClick}
    >
      {/* 카드 배경 */}
      <div className={`${sizeClasses} absolute ${getCardClasses()}`}></div>
      
      {/* 정답일 때 이미지 표시 */}
      {(status === 'Answer' || isCorrectAnswer) && (
        <div className="w-28 h-28 absolute left-[-4.5px] top-[21px]">
        </div>
      )}
      
      {/* 텍스트 - 피그마 디자인에 맞게 */}
      <div className={`text-center justify-center font-semibold font-['SUITE'] ${getTextClasses()} ${getTextSize()} relative z-10`}>
        {text || '텍스트 없음'}
      </div>
    </div>
  );
};

export default WordCard;