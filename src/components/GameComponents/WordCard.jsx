import React from "react";
import middleLogo from "../../assets/images/icons/game-icons/middle_logo.png";

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

const WordCard = ({
  text,
  size,
  status = "Normal",
  onClick,
  isCorrectAnswer = false,
}) => {
  // 피그마 CSS 스펙 그대로 적용
  const renderCard = () => {
    const isAnswer = status === "Answer" || isCorrectAnswer;

    switch (size) {
      case "XL":
        return isAnswer ? (
          <div className="w-40 h-56 relative cursor-pointer" onClick={onClick}>
            <div className="w-40 h-56 bg-gradient-to-b from-primary-400 to-primary-300 rounded-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.10)] border-2 border-white"></div>
            <div
              data-크기="Normal"
              className="w-44 h-48 left-[-9.50px] top-[26px] absolute"
            >
              <img
                className="w-44 h-48 left-0 top-0 absolute"
                src={middleLogo}
                alt="Logo"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-[32px] font-semibold font-suite z-10">
              {text}
            </div>
          </div>
        ) : (
          <div className="w-40 h-56 relative cursor-pointer" onClick={onClick}>
            <div className="w-40 h-56 left-0 top-0 absolute bg-white rounded-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-[32px] font-semibold font-suite leading-[130%] text-center">
              {text}
            </div>
          </div>
        );

      case "L":
        return isAnswer ? (
          <div className="w-24 h-36 relative cursor-pointer" onClick={onClick}>
            <div className="w-24 h-36 bg-gradient-to-b from-primary-400 to-primary-300 rounded-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.10)] border-2 border-white"></div>
            <div
              data-크기="Normal"
              className="w-28 h-28 left-[-4.50px] top-[21px] absolute"
            >
              <img
                className="w-28 h-28 left-0 top-0 absolute"
                src={middleLogo}
                alt="Logo"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-[24px] font-semibold font-suite z-10">
              {text}
            </div>
          </div>
        ) : (
          <div className="w-24 h-36 relative cursor-pointer" onClick={onClick}>
            <div className="w-24 h-36 left-0 top-0 absolute bg-white rounded-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-[24px] font-semibold font-suite leading-[130%] text-center">
              {text}
            </div>
          </div>
        );

      case "M":
        return isAnswer ? (
          <div className="w-20 h-28 relative cursor-pointer" onClick={onClick}>
            <div className="w-20 h-28 bg-gradient-to-b from-primary-400 to-primary-300 rounded-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.10)] border-2 border-white"></div>
            <div
              data-크기="Normal"
              className="w-20 h-20 left-[-0.50px] top-[22px] absolute"
            >
              <img
                className="w-20 h-20 left-0 top-0 absolute"
                src={middleLogo}
                alt="Logo"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-[16px] font-semibold font-suite z-10">
              {text}
            </div>
          </div>
        ) : (
          <div className="w-20 h-28 relative cursor-pointer" onClick={onClick}>
            <div className="w-20 h-28 left-0 top-0 absolute bg-white rounded-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-[16px] font-semibold font-suite leading-[130%] text-center">
              {text}
            </div>
          </div>
        );

      case "S":
        return isAnswer ? (
          <div className="w-14 h-20 relative cursor-pointer" onClick={onClick}>
            <div className="w-14 h-20 bg-gradient-to-b from-primary-400 to-primary-300 rounded-2xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.10)] border-2 border-white"></div>
            <div
              data-크기="Normal"
              className="w-14 h-14 left-[1.50px] top-[18px] absolute"
            >
              <img
                className="w-14 h-14 left-0 top-0 absolute"
                src={middleLogo}
                alt="Logo"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-[14px] font-semibold font-suite z-10">
              {text}
            </div>
          </div>
        ) : (
          <div className="w-14 h-20 relative cursor-pointer" onClick={onClick}>
            <div className="w-14 h-20 left-0 top-0 absolute bg-white rounded-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-[14px] font-semibold font-suite leading-[130%] text-center">
              {text}
            </div>
          </div>
        );

      default:
        return renderCard();
    }
  };

  return renderCard();
};

export default WordCard;
