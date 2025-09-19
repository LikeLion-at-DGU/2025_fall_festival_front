import React, { useEffect, useState } from 'react';

function GameCountdown({ onCountdownEnd }) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      // 카운트다운이 0이 되면 게임 시작
      onCountdownEnd();
      return;
    }

    // 1초마다 카운트다운 감소
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onCountdownEnd]);

  return (
    <div className="w-96 h-[812px] relative bg-gradient-to-l from-primary-400 to-primary-300 overflow-hidden flex items-center justify-center">
      <div className="text-[200px] font-black text-white animate-pulse">
        {countdown}
      </div>
    </div>
  );
}

export default GameCountdown;