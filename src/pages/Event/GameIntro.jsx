import React, { useEffect, useState } from 'react';

function GameIntro({ onStartGame }) {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    // 1.5초 후 카운트다운 시작
    const introTimer = setTimeout(() => {
      setCountdown(3);
    }, 1500);

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      // 카운트다운이 0이 되면 게임 시작
      onStartGame();
      return;
    }

    // 1초마다 카운트다운 감소
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onStartGame]);
  // 카운트다운 화면 렌더링
  if (countdown !== null) {
    return (
      <div className="w-96 h-[812px] relative bg-gradient-to-l from-primary-400 to-primary-300 overflow-hidden flex items-center justify-center">
        <div className="text-[200px] font-black text-white">
          {countdown}
        </div>
      </div>
    );
  }

  // 인트로 화면 렌더링
  return (
    <div className="w-96 h-[812px] relative bg-gradient-to-l from-primary-400 to-primary-300 overflow-hidden">
      {/* 배경 이미지들 */}
      <img className="w-[461px] h-[476px] left-[-189px] top-[-124px] absolute" src="https://placehold.co/461x476" />
      <div className="w-64 h-64 left-[61px] top-[316px] absolute bg-gradient-to-b from-primary-500/50 to-red-500/0 rounded-full"></div>
      <img className="w-64 h-64 left-[63px] top-[320px] absolute" src="https://placehold.co/257x266" />
      
      {/* 상단 헤더 */}
      <div data-status="Home" className="w-96 h-14 p-4 left-0 top-0 absolute bg-neutral-000 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] inline-flex flex-col justify-start items-start gap-2.5">
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
      
      {/* 하단 네비게이션 */}
      <div className="w-96 px-4 pb-[3px] left-0 top-[750px] absolute bg-neutral-000 shadow-[0px_-1px_5px_0px_rgba(0,0,0,0.05)] inline-flex justify-between items-center">
        <div data-icon="Map" data-status="Unselected" className="w-14 px-3 pt-2 pb-1 inline-flex flex-col justify-start items-center gap-[5px]">
          <div className="w-6 h-6 relative overflow-hidden">
            <div className="w-4 h-4 left-[3px] top-[3px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
          </div>
          <div className="justify-start text-neutral-600 text-xs font-normal font-['SUITE'] leading-none">지도</div>
        </div>
        <div data-icon="Calender" data-status="Unselected" className="w-14 px-3 pt-2 pb-1 inline-flex flex-col justify-start items-center gap-[5px]">
          <div className="w-6 h-6 relative">
            <div className="w-4 h-4 left-[3px] top-[3.50px] absolute rounded-[5px] outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-4 h-px left-[3px] top-[8px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-[3px] h-px left-[17px] top-[2px] absolute origin-top-left rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-[3px] h-px left-[8px] top-[2px] absolute origin-top-left rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-px h-px left-[6.50px] top-[12px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-px h-px left-[11.50px] top-[12px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-px h-px left-[16.50px] top-[12px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-px h-px left-[6.50px] top-[16px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-px h-px left-[11.50px] top-[16px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-px h-px left-[16.50px] top-[16px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
          </div>
          <div className="justify-start text-neutral-600 text-xs font-normal font-['SUITE'] leading-none">일정</div>
        </div>
        <div data-icon="Home" data-status="Unselected" className="w-14 px-3 pt-2 pb-1 inline-flex flex-col justify-start items-center gap-[5px]">
          <div className="w-6 h-6 relative">
            <div className="w-5 h-5 left-[2.50px] top-[1.50px] absolute rounded-[5px] outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
          </div>
          <div className="justify-start text-neutral-600 text-xs font-normal font-['SUITE'] leading-none">홈</div>
        </div>
        <div data-icon="Board" data-status="Unselected" className="w-14 px-3 pt-2 pb-1 inline-flex flex-col justify-start items-center gap-[5px]">
          <div className="w-6 h-6 relative">
            <div className="w-4 h-5 left-[4px] top-[2px] absolute rounded outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-2 h-0 left-[8px] top-[7px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-2 h-0 left-[8px] top-[12px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
            <div className="w-1 h-0 left-[8px] top-[17px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-600"></div>
          </div>
          <div className="justify-start text-neutral-600 text-xs font-normal font-['SUITE'] leading-none">게시판</div>
        </div>
        <div data-icon="D-Order" data-status="Selected" className="w-14 px-3 pt-2 pb-1 border-t-[1.50px] border-primary-500 inline-flex flex-col justify-start items-center gap-[5px]">
          <div className="w-6 h-6 relative"></div>
          <div className="justify-start text-primary-500 text-xs font-semibold font-['SUITE'] leading-none">게임</div>
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
        onClick={onStartGame}
      >
        <div className="w-6 h-6 left-[3.54px] top-[3px] absolute outline outline-[5px] outline-offset-[-2.50px] outline-red-300"></div>
        <div className="w-6 h-6 left-[3px] top-[3px] absolute outline outline-[5px] outline-offset-[-2.50px] outline-red-300"></div>
      </div>
    </div>
  );
}

export default GameIntro;