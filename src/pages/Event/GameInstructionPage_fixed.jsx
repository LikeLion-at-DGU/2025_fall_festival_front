import React, { useState, useEffect } from "react";
import { usePostStartGame } from "../../hooks/GameHooks/usePostStartGame";

// 다음 날 00:00:00까지 남은 시간을 동적으로 보여주는 컴포넌트
function DynamicRemainTime() {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow - now;
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeRemaining("00:00:00");
      }
    };

    updateTime(); // 초기 실행
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white text-[12px] font-semibold font-suite opacity-80">
      다음 참여까지 {timeRemaining} 남았습니다.
    </div>
  );
}

function GameInstructionPage({ onStartChallenge }) {
  const [showModal, setShowModal] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0); // 게임 시도 횟수
  const startGameMutation = usePostStartGame();

  // 더미데이터
  const data = { successcnt: 0 };

  // 컴포넌트 마운트 시 백엔드에서 받은 시도 횟수 확인
  useEffect(() => {
    const storedTryTimes = localStorage.getItem("game_try_times");
    if (storedTryTimes) {
      setAttemptCount(parseInt(storedTryTimes, 10));
    }
  }, []);

  // 시도 횟수가 3회를 초과했는지 확인
  const isLimitExceeded = attemptCount >= 3;

  return (
    <div className="flex flex-col justify-between w-full max-w-[430px] mx-auto h-screen pt-[80px] pb-[99px] bg-[linear-gradient(352deg,var(--Primary-400,#EF7063)_26.61%,var(--Primary-300,#F8B0A9)_83.71%)] overflow-hidden">
      {/* 상단 성공자 수 표시 - 시도 횟수 3회 미만일 때만 내용 표시 */}
      <div className="w-full h-[102px] flex justify-center items-center">
        {!isLimitExceeded && (
          <div className="px-2 py-1 bg-red-50/80 rounded-[999px] inline-flex justify-center items-center gap-2.5">
            <div className="justify-center items-center text-primary-400 text-[10px] font-normal font-suite leading-none">
              <span>지금까지 단 </span>
              <span className="font-semibold ">{data.successcnt}</span>
              <span>명 만이 성공했습니다</span>
            </div>
          </div>
        )}
      </div>

      {/* 메인 타이틀 텍스트 */}
      <div className="w-full h-[256px] flex flex-col justify-center items-center text-center">
        {isLimitExceeded ? (
          <div className="text-white text-center font-suite text-[32px] font-black leading-[160%] mb-6">
            참여해주셔서 감사합니다
            <br />
            즐거운 축제 되세요 !
          </div>
        ) : (
          <div className="text-white text-center font-suite text-[32px] font-black leading-[160%] mb-6">
            다르게 적힌 글자를
            <br />
            찾아주세요
          </div>
        )}
        <div className="flex items-center gap-1">
          {isLimitExceeded ? (
            <DynamicRemainTime />
          ) : (
            <>
              <div className="text-white text-[12px] font-semibold font-suite opacity-80">
                제한 시간 내 모든 단계 클리어 시 선물상자를 드립니다.
              </div>
              <button
                type="button"
                className="w-4 h-4 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setShowModal(true)}
              >
                <div className="text-[#FF8A80] text-xs font-bold">i</div>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-[155px] flex justify-center items-center">
        <button
          type="button"
          className={`w-[343px] h-[56px] px-6 py-4 rounded-[12px] bg-neutral-600 flex flex-col justify-between items-center shrink-0 transition-colors ${
            isLimitExceeded || startGameMutation.isPending
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
          onClick={() => {
            if (isLimitExceeded || startGameMutation.isPending) return;

            console.log("도전하기 버튼 클릭됨!");

            // 게임 시작 API 호출
            startGameMutation.mutate(undefined, {
              onSuccess: (response) => {
                console.log("게임 시작 API 성공:", response);

                // API 응답에서 업데이트된 시도 횟수를 받아서 localStorage 업데이트
                if (response?.game_try_times !== undefined) {
                  setAttemptCount(response.game_try_times);
                  localStorage.setItem(
                    "game_try_times",
                    response.game_try_times.toString()
                  );
                }

                // API 호출 성공 후 기존 onStartChallenge 함수 실행
                onStartChallenge();
              },
              onError: (error) => {
                console.error("게임 시작 API 실패:", error);
                alert("게임 시작 중 오류가 발생했습니다. 다시 시도해 주세요.");
              },
            });
          }}
        >
          <span className="text-[16px] font-semibold font-suite text-white">
            {isLimitExceeded
              ? "오늘 참여횟수가 모두 소진되었습니다."
              : startGameMutation.isPending
              ? "게임 시작 중..."
              : "도전하기"}
          </span>
        </button>
      </div>

      {/* 게임 관련 유의사항 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl w-full max-w-[350px] sm:max-w-md md:max-w-lg p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              type="button"
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowModal(false)}
              aria-label="모달 닫기"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="text-center mb-4 sm:mb-6">
              <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-gray-800 font-suite">
                게임 관련 유의사항
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-600 font-suite leading-relaxed">
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
                type="button"
                className="w-full bg-gray-800 text-white py-3 sm:py-4 rounded-lg font-medium sm:font-semibold font-suite hover:bg-gray-700 transition-colors text-sm sm:text-base"
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