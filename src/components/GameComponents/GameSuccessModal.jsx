import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostSuccessGame from "../../hooks/GameHooks/usePostSuccessGame";

function GameSuccessModal({ isOpen, onClose, couponResult, isLoading }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: 축하, 2: 상자열기, 3: 부스선택, 4: 쿠폰발급
  const [showBoothList, setShowBoothList] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState("광고홍보학과");
  const [gameResult, setGameResult] = useState(null);

  const navigate = useNavigate();
  const { postGameSuccess, isLoading: isSubmitting } = usePostSuccessGame();

  // 쿠폰 당첨 여부 확인
  const isWinner = gameResult?.isWon || couponResult?.isWon || false;
  const availableBooths = gameResult?.couponBooths ||
    couponResult?.couponBooths || ["광고홍보학과", "경영학과", "컴퓨터공학과"];

  // 부스/학과 리스트 - API 응답에서 받은 데이터 사용
  const boothList =
    availableBooths.length > 0
      ? availableBooths
      : [
          "광고홍보학과",
          "경영학과",
          "컴퓨터공학과",
          "국어국문학과",
          "영어영문학과",
          "법학과",
          "경제학과",
          "심리학과",
        ];

  const percentage = 12; // 상위 퍼센트 (예: 12%) 백엔드 로직 제작 중...!

  if (!isOpen) return null;

  const handleNextStep = async () => {
    if (currentStep === 1) {
      // 상자 열어보기 - API 호출
      try {
        const data = await postGameSuccess();
        console.log("게임 성공 API 응답:", data);
        setGameResult(data);

        if (data.isWon) {
          setCurrentStep(2); // 당첨된 경우 기존 플로우
        } else {
          setCurrentStep(5); // 당첨되지 않은 경우 새로운 케이스
        }
      } catch (error) {
        console.error("게임 성공 API 호출 실패:", error);
        // 에러 발생 시 당첨되지 않은 케이스로 이동
        setCurrentStep(5);
      }
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGoHome = () => {
    navigate("/");
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1); // 리셋
    onClose();
  };

  const renderModalContent = () => {
    switch (currentStep) {
      case 1:
        // 축하드립니다 모달 - 피그마 디자인 정확히 적용
        return (
          <div className="w-72 h-56 relative bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center">
            {/* X 버튼 (우상단 고정) */}
            <div className="absolute right-[9px] top-[9px] text-neutral-600 text-base font-semibold font-['SUITE'] leading-normal cursor-pointer">
              X
            </div>

            {/* 중앙 정렬된 컨텐츠 */}
            <div className="w-64 flex flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-60 flex flex-col items-center">
                  <div className="text-center text-neutral-600 text-xl font-normal font-['SUITE'] leading-relaxed">
                    축하드립니다!
                  </div>
                  <div className="text-center text-neutral-300 text-xs font-normal font-['SUITE'] leading-none">
                    기록 : 상위 12%
                  </div>
                </div>
                <div className="w-60 text-center text-neutral-600 text-xs font-normal font-['SUITE'] leading-none mt-[6px]">
                  모든 단계를 시간 안에 클리어하셨습니다.
                  <br />
                  그럼 두근두근... 상자를 열어볼까요?
                </div>
              </div>

              {/* 버튼 */}
              <div
                data-status="Header"
                className="w-[254px] h-9 bg-primary-400 rounded-xl flex items-center justify-center cursor-pointer hover:bg-primary-500 transition-colors"
                onClick={handleNextStep}
              >
                <div className="text-neutral-100 text-sm font-semibold font-['SUITE'] leading-tight">
                  상자 열어보기
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        // 쿠폰 당첨 결과에 따른 모달
        if (isWinner) {
          return (
            <div className="w-[300px] h-[227px] relative bg-white rounded-2xl overflow-hidden">
              <div
                className="right-[15px] top-[9px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-['SUITE'] leading-normal cursor-pointer"
                onClick={handleClose}
              >
                X
              </div>
              <div className="w-64 left-[23px] top-[46px] absolute inline-flex flex-col justify-start items-center gap-6">
                <div className="flex flex-col justify-start items-center gap-1.5">
                  <div className="flex flex-col justify-start items-start gap-4">
                    <div className="w-60 flex flex-col justify-start items-center">
                      <div className="self-stretch text-center justify-start text-neutral-600 text-xl font-normal font-['SUITE'] leading-relaxed">
                        🎉 대박... 당첨!
                      </div>
                    </div>
                    <div className="w-60 text-center justify-start text-neutral-600 text-xs font-normal font-['SUITE'] leading-none">
                      쿠폰에 당첨되었어요! 사용할 주점을 골라주세요
                    </div>
                  </div>
                  <div
                    className="w-64 bg-neutral-100 rounded-xl flex flex-col justify-start items-start overflow-hidden cursor-pointer"
                    onClick={() => setShowBoothList(true)}
                  >
                    <div className="self-stretch h-7 p-4 flex flex-col justify-between items-center">
                      <div className="self-stretch inline-flex justify-start items-center gap-2">
                        <div className="flex-1 justify-start text-neutral-500 text-[10px] font-semibold font-['SUITE'] leading-none">
                          {selectedBooth}
                        </div>
                        <div className="w-2 h-1 origin-top-left -rotate-90 rounded-sm outline outline-2 outline-offset-[-0.90px] outline-neutral-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  data-status="Header"
                  className="self-stretch h-9 px-6 py-4 bg-black rounded-xl flex flex-col justify-between items-center cursor-pointer hover:bg-gray-800"
                  onClick={handleNextStep}
                >
                  <div className="text-center justify-start text-white text-sm font-semibold font-['SUITE'] leading-tight">
                    쿠폰 발급받기
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          // 쿠폰 미당첨
          return (
            <div className="w-[300px] h-[227px] relative bg-white rounded-2xl overflow-hidden">
              <div
                className="right-[15px] top-[9px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-['SUITE'] leading-normal cursor-pointer"
                onClick={handleClose}
              >
                X
              </div>
              <div className="w-64 left-[23px] top-[46px] absolute inline-flex flex-col justify-start items-center gap-6">
                <div className="flex flex-col justify-start items-center gap-1.5">
                  <div className="flex flex-col justify-start items-start gap-4">
                    <div className="w-60 flex flex-col justify-start items-center">
                      <div className="self-stretch text-center justify-start text-neutral-600 text-xl font-normal font-['SUITE'] leading-relaxed">
                        😅 아쉽게도...
                      </div>
                    </div>
                    <div className="w-60 text-center justify-start text-neutral-600 text-xs font-normal font-['SUITE'] leading-none">
                      이번엔 쿠폰에 당첨되지 않았어요. 다음 기회에!
                    </div>
                  </div>
                </div>
                <div
                  data-status="Header"
                  className="self-stretch h-9 px-6 py-4 bg-black rounded-xl flex flex-col justify-between items-center cursor-pointer hover:bg-gray-800"
                  onClick={handleClose}
                >
                  <div className="text-center justify-start text-white text-sm font-semibold font-['SUITE'] leading-tight">
                    확인
                  </div>
                </div>
              </div>
            </div>
          );
        }

      case 3:
        // 쿠폰 발급받기 (동일한 내용) 모달
        return (
          <div className="w-[300px] h-[227px] relative bg-white rounded-2xl overflow-hidden">
            <div
              className="right-[15px] top-[9px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-['SUITE'] leading-normal cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
            <div className="w-64 left-[23px] top-[46px] absolute inline-flex flex-col justify-start items-center gap-6">
              <div className="flex flex-col justify-start items-center gap-1.5">
                <div className="flex flex-col justify-start items-start gap-4">
                  <div className="w-60 flex flex-col justify-start items-center">
                    <div className="self-stretch text-center justify-start text-neutral-600 text-xl font-normal font-['SUITE'] leading-relaxed">
                      대박... 당첨!
                    </div>
                  </div>
                  <div className="w-60 text-center justify-start text-neutral-600 text-xs font-normal font-['SUITE'] leading-none">
                    쿠폰에 당첨되었어요! 사용할 주점을 골라주세요
                  </div>
                </div>
                <div
                  className="w-64 bg-neutral-100 rounded-xl flex flex-col justify-start items-start overflow-hidden cursor-pointer hover:bg-neutral-200 transition-colors"
                  onClick={() => setShowBoothList(true)}
                >
                  <div className="self-stretch h-7 p-4 flex flex-col justify-between items-center">
                    <div className="self-stretch inline-flex justify-start items-center gap-2">
                      <div className="flex-1 justify-start text-neutral-500 text-[10px] font-semibold font-['SUITE'] leading-none">
                        {selectedBooth}
                      </div>
                      <div className="w-2 h-1 origin-top-left -rotate-90 rounded-sm outline outline-2 outline-offset-[-0.90px] outline-neutral-600"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-status="Header"
                className="self-stretch h-9 px-6 py-4 bg-black rounded-xl flex flex-col justify-between items-center cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={handleNextStep}
              >
                <div className="text-center justify-start text-white text-sm font-semibold font-['SUITE'] leading-tight">
                  쿠폰 발급받기
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        // 쿠폰 코드 표시 모달
        return (
          <div className="w-[300px] h-[227px] relative bg-white rounded-2xl overflow-hidden">
            <div
              className="right-[15px] top-[9px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-['SUITE'] leading-normal cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
            <div className="w-64 left-[23px] top-[46px] absolute inline-flex flex-col justify-start items-center gap-8">
              <div className="flex flex-col justify-start items-start gap-1.5">
                <div className="w-60 flex flex-col justify-start items-center">
                  <div className="self-stretch text-center justify-start text-primary-500 text-xl font-semibold font-['SUITE'] leading-relaxed">
                    "AT81UC"
                  </div>
                  <div className="self-stretch text-center justify-start text-neutral-300 text-xs font-normal font-['SUITE'] leading-none">
                    5% 할인 쿠폰
                  </div>
                </div>
                <div className="w-60 text-center justify-start text-black text-xs font-normal font-['SUITE'] leading-none">
                  선택한 주점에서 사용 가능한 할인 쿠폰입니다.
                  <br />
                  캡쳐 후 방문하여 사용해주시길 바랍니다.
                </div>
              </div>
              <div
                data-status="Header"
                className="self-stretch h-9 px-6 py-4 bg-primary-400 rounded-xl flex flex-col justify-between items-center cursor-pointer hover:bg-primary-500 transition-colors"
                onClick={handleClose}
              >
                <div className="text-center justify-start text-neutral-100 text-sm font-semibold font-['SUITE'] leading-tight">
                  캡쳐 확인
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        // 쿠폰 미당첨 - 피그마 디자인 정확히 적용
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-72 h-56 relative bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center">
              <div
                className="absolute right-[15px] top-[9px] text-center text-neutral-600 text-base font-semibold font-['SUITE'] leading-normal cursor-pointer"
                onClick={handleClose}
              >
                X
              </div>
              <div className="flex flex-col items-center justify-center gap-8 px-8 pr-6">
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-center text-neutral-600 text-xl font-normal font-['SUITE'] leading-relaxed">
                      다음 기회에 다시!
                    </div>
                  </div>
                  <div className="text-center text-black text-xs font-normal font-['SUITE'] leading-relaxed">
                    참여해주셔서 감사합니다. <br />
                    즐거운 축제 되시길 바랍니다 !
                  </div>
                </div>
                <div
                  data-status="Header"
                  className="w-full h-9 px-6 py-4 bg-primary-400 rounded-xl flex items-center justify-center cursor-pointer hover:bg-primary-500 transition-colors"
                  onClick={handleGoHome}
                >
                  <div className="text-center text-neutral-100 text-sm font-semibold font-['SUITE'] leading-tight">
                    홈으로
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // 부스 선택 핸들러
  const handleBoothSelect = (booth) => {
    setSelectedBooth(booth);
    setShowBoothList(false);
  };

  // 부스 드롭다운 모달
  const renderBoothListModal = () => {
    if (!showBoothList) return null;

    return (
      <div
        className="fixed inset-0 bg-transparent z-[60]"
        onClick={() => setShowBoothList(false)}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-8">
          <div className="w-64 max-h-[250px] bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="max-h-[250px] overflow-y-auto">
              {boothList.map((booth, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBoothSelect(booth);
                  }}
                  className="px-4 py-3 hover:bg-neutral-50 cursor-pointer flex justify-between items-center border-b border-neutral-100 last:border-b-0"
                >
                  <span className="text-neutral-700 text-sm font-medium">
                    {booth}
                  </span>
                  {selectedBooth === booth && (
                    <span className="text-primary-500 font-semibold">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 메인 모달 */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        {renderModalContent()}
      </div>

      {/* 부스 선택 모달 */}
      {renderBoothListModal()}
    </>
  );
}

export default GameSuccessModal;
