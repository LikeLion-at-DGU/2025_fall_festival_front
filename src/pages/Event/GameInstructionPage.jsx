import React, { useState } from "react";
import { usePostStartGame } from "../../hooks/GameHooks/usePostStartGame";

function GameInstructionPage({ onStartChallenge }) {
  const [showModal, setShowModal] = useState(false);
  const startGameMutation = usePostStartGame();

  // 더미데이터
  const data = { successcnt: 26 };

  return (
    <div className="w-full max-w-[430px] mx-auto h-screen relative bg-gradient-to-b from-[#FF8A80] to-[#F48FB1] overflow-hidden">
      {/* 상단 헤더 */}
      <div className="w-full bg-white px-4 py-3 flex justify-between items-center">
        <div className="text-black text-lg font-bold font-['SUITE']">
          DIRKWAMA
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-normal">KR</span>
          <div className="w-6 h-6 flex flex-col justify-center items-center gap-1">
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-0.5 bg-black"></div>
          </div>
        </div>
      </div>

      {/* 상단 성공자 수 표시 */}
      <div className="w-full h-[102px] flex justify-center items-center">
        <div className="px-2 py-1 bg-red-50/80 rounded-[999px] inline-flex justify-center items-center gap-2.5">
          <div className="justify-start">
            <span className="text-primary-400 text-[10px] font-normal font-['SUITE'] leading-none">
              지금까지 단{" "}
            </span>
            <span className="text-primary-400 text-[10px] font-semibold font-['SUITE'] leading-none">
              {data.successcnt}
            </span>
            <span className="text-primary-400 text-[10px] font-normal font-['SUITE'] leading-none">
              만이 성공했습니다
            </span>
          </div>
        </div>
      </div>

      {/* 메인 타이틀 텍스트 */}
      <div className="w-full h-[256px] flex flex-col justify-center items-center text-center">
        <div className="text-white text-[36px] font-bold font-['SUITE'] leading-[43px] mb-6">
          다르게 적힌 글자를
          <br />
          찾아주세요
        </div>
        <div className="flex items-center gap-1">
          <div className="text-white text-[12px] font-semibold font-['SUITE'] opacity-80">
            제한 시간 내 모든 단계 클리어 시 선물상자를 드립니다.
          </div>
          <div
            className="w-4 h-4 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <div className="text-[#FF8A80] text-xs font-bold">i</div>
          </div>
        </div>
      </div>

      {/* 도전하기 버튼 */}
      <div className="w-full h-[155px] flex justify-center items-center">
        <div
          className={`w-[311px] h-[52px] bg-white rounded-[999px] flex justify-center items-center cursor-pointer transition-colors ${
            startGameMutation.isPending 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100'
          }`}
          onClick={() => {
            if (startGameMutation.isPending) return;
            
            console.log("도전하기 버튼 클릭됨!");
            
            // // 게임 시작 API 호출
            startGameMutation.mutate(undefined, {
              onSuccess: (response) => {
                console.log("게임 시작 API 성공:", response);
                // API 호출 성공 후 기존 onStartChallenge 함수 실행
                onStartChallenge();
              },
              onError: (error) => {
                console.error("게임 시작 API 실패:", error);
                alert("게임 시작 중 오류가 발생했습니다. 다시 시도해 주세요.");
              }
            });
            // onStartChallenge();
          }}
        >
          <span className="text-black text-[16px] font-semibold font-['SUITE']">
            {startGameMutation.isPending ? "게임 시작 중..." : "도전하기"}
          </span>
        </div>
      </div>

      {/* 하단 탭바 - 피그마 디자인에서는 사용하지 않으므로 주석 처리 
        <div className="absolute bottom-0 left-0 right-0 bg-white px-4 py-2 flex justify-between items-center shadow-lg">
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <span className="text-xs text-gray-500 font-['SUITE']">지도</span>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <span className="text-xs text-gray-500 font-['SUITE']">일정</span>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
          </div>
          <span className="text-xs text-gray-500 font-['SUITE']">홈</span>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
          <span className="text-xs text-gray-500 font-['SUITE']">게시판</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 border-t-2 border-[#FF8A80] pt-1">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF8A80]">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/>
              <line x1="12" y1="22" x2="12" y2="15.5"/>
              <polyline points="22,8.5 12,15.5 2,8.5"/>
            </svg>
          </div>
          <span className="text-xs text-[#FF8A80] font-semibold font-['SUITE']">게임</span>
        </div>
      </div>
        */}

      {/* 게임 관련 유의사항 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-[350px] sm:max-w-md md:max-w-lg p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowModal(false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 font-['SUITE']">
                게임 관련 유의사항
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-600 font-['SUITE'] leading-relaxed">
              <div className="text-left">
                '멋쟁이사자처럼'에서 2025 가을 축제를 위해 제작된 게임입니다.
              </div>

              <div className="text-left">
                본 게임은 6초 이내 다른 글자를 찾아 클릭하면 되는{" "}
                <span className="font-semibold">'다른 글자 찾기'</span>{" "}
                게임입니다.
              </div>

              <div className="text-left">
                게임 성공 시 지급되는 선물 상자에는 주점에서 사용 가능한 쿠폰이
                보상으로 지급되며, 이는 무작위로 지급될 예정입니다.
              </div>

              <div className="text-left">
                하루 <span className="font-semibold">최대 3회</span> 참여
                가능하며, 게임을 클리어할 때마다 선물 상자를 받을 수 있습니다.
              </div>

              <div className="text-left">
                보상으로 지급되는 쿠폰은{" "}
                <span className="font-semibold">
                  '디오더 협업 부스' 중 일부
                </span>
                에 한하여 사용이 가능하며, 사용 부스는 사용자가 선택할 수
                있습니다.
              </div>

              <div className="text-left">
                쿠폰 코드는 보상 제공 시{" "}
                <span className="font-semibold">최초 1회만 제공</span>되며, 캡쳐
                후 해당 주점에 보여주어야 사용이 가능합니다. 캡쳐 미실시로 인한
                불이익은 저희 측에서 책임질 수 없습니다.
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <button
                className="w-full bg-gray-800 text-white py-3 sm:py-4 rounded-lg font-medium sm:font-semibold font-['SUITE'] hover:bg-gray-700 transition-colors text-sm sm:text-base"
                onClick={() => setShowModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameInstructionPage;
