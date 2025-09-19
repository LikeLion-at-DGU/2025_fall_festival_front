import React from 'react';

function GameIntroPage({ onStartGame }) {
  return (
    <div className="w-96 h-[812px] relative bg-gradient-to-l from-primary-400 to-primary-300 overflow-hidden">
      <img className="w-[461px] h-[476px] left-[-189px] top-[-124px] absolute" src="https://placehold.co/461x476" />
      
      {/* 상단 헤더 */}
      <div data-status="Home" className="w-96 h-14 p-4 left-0 top-0 absolute bg-neutral-000 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] inline-flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch h-5 inline-flex justify-between items-center">
          <div className="w-16 h-3 bg-neutral-600 outline outline-[0.10px] outline-neutral-600"></div>
          <div className="w-3.5 h-3 bg-neutral-600"></div>
          <div className="w-4 h-3 bg-primary-400"></div>
          <div className="w-1.5 h-0.5 bg-primary-400"></div>
          <div className="w-2.5 h-1.5 bg-primary-400"></div>
          <div className="w-1.5 h-0.5 bg-primary-400"></div>
          <div className="w-2.5 h-[2.50px] bg-primary-400"></div>
          <div className="w-3 h-0.5 bg-primary-400"></div>
          <div className="w-3.5 h-3 bg-neutral-600"></div>
        </div>
      </div>
      
      {/* 메인 텍스트 */}
      <div className="w-64 left-[52px] top-[317px] absolute text-center justify-start text-neutral-000 text-3xl font-black font-['SUITE'] leading-10">
        다르게 적힌 글자를 찾아주세요
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
      
      {/* 도전하기 버튼 */}
      <div 
        data-status="Black" 
        className="w-80 h-14 px-6 py-4 left-[16px] top-[657px] absolute bg-neutral-600 rounded-xl inline-flex flex-col justify-between items-center cursor-pointer hover:bg-neutral-700 transition-colors"
        onClick={() => {
          console.log("도전하기 버튼 클릭됨!");
          onStartGame();
        }}
      >
        <div className="w-72 flex-1 text-center justify-start text-neutral-200 text-base font-semibold font-['SUITE'] leading-normal">
          도전하기
        </div>
      </div>
      
      {/* 성공자 수 표시 */}
      <div className="px-2 py-1 left-[116px] top-[76px] absolute bg-red-50/80 rounded-[999px] inline-flex justify-center items-center gap-2.5">
        <div className="justify-start">
          <span className="text-primary-400 text-[10px] font-normal font-['SUITE'] leading-none">지금까지 단 </span>
          <span className="text-primary-400 text-[10px] font-semibold font-['SUITE'] leading-none">26명</span>
          <span className="text-primary-400 text-[10px] font-normal font-['SUITE'] leading-none">만이 성공했습니다</span>
        </div>
      </div>
    </div>
  );
}

export default GameIntroPage;