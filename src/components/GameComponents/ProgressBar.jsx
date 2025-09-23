import React from 'react';

/**
 * 게임 진행률 바 컴포넌트 (시간 진행률)
 * @param {number} timeProgress - 시간 진행률 (0-100)
 * @param {boolean} isTimeOut - 시간 초과 여부
 */
const ProgressBar = ({ timeProgress, isTimeOut = false }) => {
  return (
    <div className="w-[315px] h-3 top-[71px] absolute left-1/2 transform -translate-x-1/2 bg-[#F8B0A9] rounded-2xl overflow-hidden">
      <div 
        className="h-full left-0 top-0 absolute transition-all duration-100 ease-linear rounded-2xl"
        style={{ 
          width: `${timeProgress}%`,
          backgroundColor: isTimeOut ? '#D33E2F' : '#D33E2F'
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;