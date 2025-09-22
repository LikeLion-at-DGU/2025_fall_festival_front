import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 게임 헤더 컴포넌트 - X 버튼으로 메인페이지 이동
 */
const GameHeader = () => {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate('/'); // 메인페이지로 이동
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-4">
      <div 
        className="w-10 h-10 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-200 bg-black bg-opacity-10 backdrop-blur-sm"
        onClick={handleCloseClick}
        title="게임 종료하고 메인으로 이동"
      >
        {/* X 아이콘 */}
        <div className="text-black text-xl font-bold">×</div>
      </div>
    </div>
  );
};

export default GameHeader;