import React from 'react';
import { usePrefixedNavigate } from '../../hooks/usePrefixedNavigate';

/**
 * 게임 헤더 컴포넌트 - X 버튼으로 메인페이지 이동
 */
const GameHeader = () => {
  const navigate = usePrefixedNavigate();

  const handleCloseClick = () => {
    navigate('/'); // 메인페이지로 이동
  };

  return (
    <div className="z-50 py-[15px] flex justify-end">
      <div 
        className="cursor-pointer flex items-center justify-center transition-all duration-20"
        onClick={handleCloseClick}
        title="게임 종료하고 메인으로 이동"
      >
        {/* X 아이콘 */}
        <div className="text-black hover:text-primary-500 text-3xl font-extralight">×</div>
      </div>
    </div>
  );
};

export default GameHeader;