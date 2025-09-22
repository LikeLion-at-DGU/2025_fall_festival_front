import React from 'react';
import GameLoadingSvg from '../../assets/images/icons/game-icons/GameLoading.svg';

function GameIntro({ onStartGame }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <img 
        src={GameLoadingSvg} 
        alt="게임 로딩" 
        className="w-full h-full object-cover cursor-pointer"
        onClick={onStartGame}
      />
    </div>
  );
}

export default GameIntro;