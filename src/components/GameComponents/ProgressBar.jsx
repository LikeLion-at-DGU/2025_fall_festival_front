import React from 'react';

/**
 * 게임 진행률 바 컴포넌트 (시간 진행률)
 * @param {number} timeProgress - 시간 진행률 (0-100)
 * @param {boolean} isTimeOut - 시간 초과 여부
 */
const ProgressBar = ({ timeProgress, isTimeOut = false }) => {
  return (
    <div className="w-80 h-3 left-[30px] top-[95px] absolute bg-primary-300 rounded-2xl overflow-hidden">
      <div 
        className={`h-4 left-0 top-0 absolute transition-all duration-100 ease-linear ${
          isTimeOut ? 'bg-primary-500' : 'bg-primary-600'
        }`}
        style={{ width: `${timeProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;