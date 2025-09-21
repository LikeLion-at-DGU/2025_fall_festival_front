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
        return 'w-40 h-56';
      case 'L':
        return 'w-24 h-36';
      case 'M':
        return 'w-20 h-28';
      case 'S':
        return 'w-14 h-20';
      default:
        return 'w-24 h-36';
    }
  };

  const getTextSizeClasses = () => {
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

  const getAnswerBackground = () => {
    switch (size) {
      case 'XL':
        return AnswerXL;
      case 'L':
        return AnswerXL;
      case 'M':
        return AnswerL;
      case 'S':
        return AnswerM;
      default:
        return AnswerL;
    }
  };

  const getTextClasses = () => {
    if (status === 'Answer' || isCorrectAnswer) {
      return 'text-primary-50';
    }
    return 'text-neutral-600';
  };

  const sizeClasses = getSizeClasses();

  return (
    <div
      data-size={size}
      data-status={status}
      className={`${sizeClasses} relative cursor-pointer hover:scale-105 transition-transform`}
      onClick={onClick}
    >
      {/* 정답일 때 SVG 배경 */}
      {(status === 'Answer' || isCorrectAnswer) && (
        <img
          src={getAnswerBackground()}
          alt="정답 배경"
          className={`${sizeClasses} absolute inset-0 w-full h-full rounded-2xl object-contain`}
        />
      )}

      {/* 일반 카드 배경 */}
      {!(status === 'Answer' || isCorrectAnswer) && (
        <div
          className={`${sizeClasses} absolute inset-0 rounded-2xl bg-white shadow-md`}
        />
      )}

      {/* 텍스트 중앙 정렬 */}
      <div className={`absolute inset-0 flex justify-center items-center font-semibold font-['SUITE'] ${getTextClasses()} ${getTextSizeClasses()} z-10 select-none`}>
        {text || '텍스트 없음'}
      </div>
    </div>
  );
};

export default WordCard;
