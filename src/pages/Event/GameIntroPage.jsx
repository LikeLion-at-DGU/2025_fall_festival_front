import React, { useEffect } from "react";
import GameLoadingSvg from "../../assets/images/icons/game-icons/GameLoading.png";

function GameIntroPage({ onStartGame }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onStartGame();
    }, 1500); // 1.5초 후 자동으로 다음 페이지로

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [onStartGame]);
  return (
    <div className="w-full h-full flex items-center justify-center relative bg-gradient-to-l from-primary-400 to-primary-300 overflow-hidden">
      {/* GameLoading.svg로 교체 */}
      <img
        className="w-[257px] h-[325px] object-cover"
        src={GameLoadingSvg}
        alt="게임 로딩"
      />

      {/* 상단 모바일 상태바
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
      </div> */}

      {/* 게임 시작 버튼 (클릭 가능한 영역) */}
      <div
        className="w-8 h-8 left-[172.50px] top-[409px] absolute overflow-hidden cursor-pointer"
        onClick={() => {
          console.log("도전하기 버튼 클릭됨!");
          onStartGame();
        }}
      >
        {/* <div className="w-6 h-6 left-[3.54px] top-[3px] absolute outline outline-[5px] outline-offset-[-2.50px] outline-red-300"></div>
        <div className="w-6 h-6 left-[3px] top-[3px] absolute outline outline-[5px] outline-offset-[-2.50px] outline-red-300"></div> */}
      </div>
    </div>
  );
}

export default GameIntroPage;
