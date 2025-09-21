import React from 'react';
import AnswerS from '../../assets/images/icons/game-icons/Answer_S.svg';
import AnswerM from '../../assets/images/icons/game-icons/Answer_M.svg';
import AnswerL from '../../assets/images/icons/game-icons/Answer_L.svg';
import AnswerXL from '../../assets/images/icons/game-icons/Answer_XL.svg';

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

  const getAnswerBackground = () => {
    switch (size) {
      case 'XL':
        return AnswerXL;
      case 'L':
        return AnswerL;
      case 'M':
        return AnswerM;
      case 'S':
        return AnswerS;
      default:
        return AnswerL;
    }
  };

  const getCardClasses = () => {
    if (status === 'Answer' || isCorrectAnswer) {
      return 'rounded-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.10)]';
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
      <div 
        className={`${sizeClasses} absolute ${getCardClasses()}`}
        style={
          status === 'Answer' || isCorrectAnswer
            ? {
                backgroundImage: `url(${getAnswerBackground()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }
            : {}
        }
      ></div>

      
      {/* 텍스트 - 피그마 디자인에 맞게 */}
      <div className={`text-center justify-center font-semibold font-['SUITE'] ${getTextClasses()} ${getTextSize()} relative z-10`}>
        {text || '텍스트 없음'}
      </div>
    </div>
  );
};

export default WordCard;