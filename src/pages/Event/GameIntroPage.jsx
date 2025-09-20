import React, { useEffect } from 'react';
import topLeftLogo from '../../assets/images/icons/game-icons/top-left-logo.png';
import centerLogo from '../../assets/images/icons/game-icons/middle_logo.png';

function GameIntroPage({ onStartGame }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onStartGame();
    }, 1500); // 1.5초 후 자동으로 다음 페이지로

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [onStartGame]);
  return (
    <div className="w-full max-w-[430px] mx-auto h-screen relative bg-gradient-to-l from-primary-400 to-primary-300 overflow-hidden">
      {/* 배경 이미지 */}
      <img className="w-[461px] h-[476px] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 top-0" src={topLeftLogo} />
      
      {/* 원형 그라데이션 배경 */}
      <div className="w-64 h-64 absolute left-1/2 transform -translate-x-1/2 top-[316px] bg-gradient-to-b from-primary-500/50 to-red-500/0 rounded-full"></div>
      <img className="w-64 h-64 absolute left-1/2 transform -translate-x-1/2 top-[320px]" src={centerLogo} />

      {/* 상단 모바일 상태바 */}
      <div data-status="Home" className="w-full h-14 p-4 absolute top-0 left-0 bg-neutral-000 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] inline-flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch h-5 inline-flex justify-between items-center">
          <div className="w-16 h-3 bg-black outline outline-[0.10px] outline-black"></div>
          <div className="w-3.5 h-3 bg-black"></div>
          <div className="w-4 h-3 bg-primary-400"></div>
          <div className="w-1.5 h-0.5 bg-primary-400"></div>
          <div className="w-2.5 h-1.5 bg-primary-400"></div>
          <div className="w-1.5 h-0.5 bg-primary-400"></div>
          <div className="w-2.5 h-[2.50px] bg-primary-400"></div>
          <div className="w-3 h-0.5 bg-primary-400"></div>
          <div className="w-3.5 h-3 bg-black"></div>
        </div>
      </div>
      
      {/* 로고 요소들 */}
      <div className="w-14 h-11 left-[116.50px] top-[261px] absolute bg-primary-050"></div>
      <div className="w-14 h-11 left-[149.32px] top-[261px] absolute bg-primary-300"></div>
      <div className="w-5 h-2 left-[136.61px] top-[296.89px] absolute bg-primary-300"></div>
      <div className="w-9 h-6 left-[211.53px] top-[280.50px] absolute bg-primary-300"></div>
      <div className="w-5 h-2 left-[168.39px] top-[261px] absolute bg-primary-300"></div>
      <div className="w-10 h-2.5 left-[210.10px] top-[280.50px] absolute bg-primary-300"></div>
      <div className="w-11 h-2 left-[224.40px] top-[261px] absolute bg-primary-300"></div>
      <div className="w-14 h-11 left-[176.33px] top-[261px] absolute bg-primary-050"></div>
      <div className="left-[135.38px] top-[318.56px] absolute text-center justify-start text-primary-050 text-[8.25px] font-black font-['SUITE_Variable']">LIKELION DONGGUK UNIV.</div>
      
      {/* D'order 로고 이미지 */}
      <img className="w-48 h-12 left-[99px] top-[512px] absolute" src="https://placehold.co/185x51" />
      
      {/* 게임 시작 버튼 (클릭 가능한 영역) */}
      <div 
        className="w-8 h-8 left-[172.50px] top-[409px] absolute overflow-hidden cursor-pointer"
        onClick={() => {
          console.log("도전하기 버튼 클릭됨!");
          onStartGame();
        }}
      >
        <div className="w-6 h-6 left-[3.54px] top-[3px] absolute outline outline-[5px] outline-offset-[-2.50px] outline-red-300"></div>
        <div className="w-6 h-6 left-[3px] top-[3px] absolute outline outline-[5px] outline-offset-[-2.50px] outline-red-300"></div>
      </div>
    </div>
  );
}

export default GameIntroPage;