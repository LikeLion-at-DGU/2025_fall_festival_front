import React from 'react';

/**
 * 게임 헤더 컴포넌트
 * @param {number} round - 현재 라운드 (1-4)
 * @param {number} currentStep - 현재 단계 (1-4)
 */
const GameHeader = ({ round, currentStep }) => {
  return (
    <div 
      data-status={`Round ${round}`}
      className="w-full w-max-[430px] h-14 p-4 left-0 top-0 absolute bg-white shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] inline-flex flex-col justify-start items-start"
    >
      <div className="self-stretch w-full h-5 inline-flex justify-start items-center gap-3">
        <div className="w-6 h-6 relative"></div>
        <div className="justify-start text-neutral-600 text-sm font-semibold font-['SUITE'] leading-tight">
          {round}단계 [{currentStep}/4]
        </div>
      </div>
    </div>
  );
};

export default GameHeader;