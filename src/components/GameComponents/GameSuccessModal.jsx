import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostSuccessGame from "../../hooks/GameHooks/usePostSuccessGame";
import { usePostGameCoupon } from "../../hooks/GameHooks/usePostGameCoupon";
import downIcon from "../../assets/images/icons/game-icons/Down.png";

function GameSuccessModal({ isOpen, onClose, couponResult, isLoading }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: 축하, 2: 상자열기, 3: 부스선택, 4: 쿠폰발급
  const [showBoothList, setShowBoothList] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState("프론티어");
  const [gameResult, setGameResult] = useState(null);
  const [couponData, setCouponData] = useState(null);

  const navigate = useNavigate();
  const { postGameSuccess, isLoading: isSubmitting } = usePostSuccessGame();
  const couponMutation = usePostGameCoupon();

  // 쿠폰 당첨 여부 확인
  // const isWinner = gameResult?.isWon || couponResult?.isWon || false;
  const isWinner = true;
  const availableBooths = gameResult?.couponBooths ||
    couponResult?.couponBooths || [
      "프론티어",
      "공과대학",
      "문과대학",
      "푸름누리",
    ];

  // 부스/학과 리스트
  const boothList =
    availableBooths.length > 0
      ? availableBooths
      : [
          "---------------24일(수)---------------",
          "문과대학",
          "---------------25일(목)---------------",
          "프론티어",
          "공과대학",
          "푸름누리",
          "---------------26일(금)---------------",
        ];

  const percentage = 12; // 상위 퍼센트 단계별로 하드코딩 하는 게 나아보임... stage 관리가 불가능

  if (!isOpen) return null;

  const handleNextStep = async () => {
    if (currentStep === 1) {
      // 상자 열어보기 - API 호출
      try {
        const data = await postGameSuccess();
        console.log("게임 성공 API 응답:", data);
        setGameResult(data);

        const iswon = true;

        if (iswon) {
          setCurrentStep(3); // 당첨된 경우 기존 플로우
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
    setCouponData(null); // 쿠폰 데이터 리셋
    onClose();
  };

  const handleGetCoupon = async () => {
    try {
      const result = await couponMutation.mutateAsync({
        booth_name: selectedBooth,
      });

      console.log("쿠폰 발급 성공:", result);
      setCouponData(result.data);
      setCurrentStep(4); // 쿠폰 발급 완료 단계로 이동
    } catch (error) {
      console.error("쿠폰 발급 실패:", error);
      // 에러 처리 - 쿠폰이 없는 경우 등
      alert(
        "쿠폰 발급에 실패했습니다. 해당 부스의 쿠폰이 소진되었을 수 있습니다."
      );
    }
  };

  const renderModalContent = () => {
    switch (currentStep) {
      case 1:
        // 축하드립니다 모달 - 피그마 디자인 정확히 적용
        return (
          <div className="w-72 pt-[40px] pb-[25px] relative bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center">
            {/* X 버튼 (우상단 고정) */}
            <div className="absolute right-[18px] top-[10px] text-neutral-600 text-base font-semibold font-suite leading-normal cursor-pointer">
              X
            </div>

            {/* 중앙 정렬된 컨텐츠 */}
            <div className="w-64 flex flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-60 flex flex-col items-center">
                  <div className="text-center text-neutral-600 text-[20px] font-normal font-suite leading-[130%]">
                    축하드립니다!
                  </div>
                  <div className="text-center text-neutral-300 text-[12px] font-normal font-suite leading-[150%]">
                    기록 : 상위 12%
                  </div>
                </div>
                <div className="w-60 text-center text-neutral-600 text-[12px] font-normal font-suite leading-[150%] mt-[6px]">
                  모든 단계를 시간 안에 클리어하셨습니다.
                  <br />
                  그럼 두근두근... 상자를 열어볼까요?
                </div>
              </div>

              {/* 버튼 */}
              <div
                data-status="Header"
                className="flex h-[38px] flex-col justify-center items-center w-[250px] rounded-[12px] bg-primary-400 cursor-pointer hover:bg-primary-500 transition-colors"
                onClick={handleNextStep}
              >
                <div className="text-neutral-100 text-center font-suite text-[14px] font-semibold leading-[150%]">
                  상자 열어보기
                </div>
              </div>
            </div>
          </div>
        );

      // case 2:
      //   // 쿠폰 당첨 결과에 따른 모달
      //   if (isWinner) {
      //     return (
      //       <div className="w-72 pt-[40px] pb-[25px] relative bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center">
      //         <div
      //           className="right-[18px] top-[10px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-suite leading-normal cursor-pointer"
      //           onClick={handleClose}
      //         >
      //           X
      //         </div>
      //         <div className="w-64 left-[23px] top-[46px] absolute inline-flex flex-col justify-start items-center gap-6">
      //           <div className="flex flex-col justify-start items-center gap-1.5">
      //             <div className="flex flex-col justify-start items-start gap-4">
      //               <div className="w-60 flex flex-col justify-start items-center">
      //                 <div className="self-stretch text-center justify-start text-neutral-600 text-xl font-normal font-suite leading-relaxed">
      //                   대박... 당첨!
      //                 </div>
      //               </div>
      //               <div className="w-60 text-center justify-start text-neutral-600 text-xs font-normal font-suite leading-none">
      //                 쿠폰에 당첨되었어요! 사용할 주점을 골라주세요
      //               </div>
      //             </div>
      //             <div
      //               className="w-64 bg-neutral-100 rounded-xl flex flex-col justify-start items-start overflow-hidden cursor-pointer"
      //               onClick={() => setShowBoothList(true)}
      //             >
      //               <div className="self-stretch h-7 p-4 flex flex-col justify-center items-center">
      //                 <div className="self-stretch inline-flex justify-start items-center gap-2">
      //                   <div className="flex-1 justify-start text-neutral-500 text-[10px] font-semibold font-suite leading-none">
      //                     {selectedBooth}
      //                   </div>
      //                   <img
      //                     src={downIcon}
      //                     alt="dropdown"
      //                     className="w-4 h-4 cursor-pointer"
      //                     onClick={(e) => {
      //                       e.stopPropagation();
      //                       setShowBoothList(true);
      //                     }}
      //                   />
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //           <div
      //             data-status="Header"
      //             className="flex h-[38px] px-6 py-4 flex-col justify-center items-center w-[250px] rounded-[12px] bg-primary-400 cursor-pointer hover:bg-primary-500 transition-colors"
      //             onClick={handleNextStep}
      //           >
      //             <div className="text-neutral-100 text-center font-suite text-[14px] font-semibold leading-[150%]">
      //               쿠폰 발급받기
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     );
      //   } else {
      //     // 쿠폰 미당첨
      //     return (
      //       <div className="w-[300px] pt-[40px] pb-[25px] relative bg-white rounded-2xl overflow-hidden">
      //         <div
      //           className="right-[18px] top-[10px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-suite leading-normal cursor-pointer"
      //           onClick={handleClose}
      //         >
      //           X
      //         </div>
      //         <div className="w-64 left-[23px] top-[46px] absolute inline-flex flex-col justify-start items-center gap-6">
      //           <div className="flex flex-col justify-start items-center gap-1.5">
      //             <div className="flex flex-col justify-start items-start gap-4">
      //               <div className="w-60 flex flex-col justify-start items-center">
      //                 <div className="self-stretch text-center justify-start text-neutral-600 text-xl font-normal font-suite leading-relaxed">
      //                   😅 아쉽게도...
      //                 </div>
      //               </div>
      //               <div className="w-60 text-center justify-start text-neutral-600 text-xs font-normal font-suite leading-none">
      //                 이번엔 쿠폰에 당첨되지 않았어요. 다음 기회에!
      //               </div>
      //             </div>
      //           </div>
      //           <div
      //             data-status="Header"
      //             className="flex h-[38px] px-6 py-4 flex-col justify-center items-center w-[250px] rounded-[12px] bg-primary-400 cursor-pointer hover:bg-primary-500 transition-colors"
      //             onClick={handleClose}
      //           >
      //             <div className="text-neutral-100 text-center font-suite text-[14px] font-semibold leading-[150%]">
      //               확인
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     );
      //   }

      case 3:
        // 쿠폰 발급받기 (동일한 내용) 모달
        return (
          <div className="w-72 pt-[40px] pb-[25px] relative bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center">
            <div
              className="right-[18px] top-[10px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-suite leading-normal cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
            <div className="w-72  relativeoverflow-hidden flex flex-col items-center justify-center">
              <div className="flex flex-col justify-start items-center gap-1.5">
                <div className="flex flex-col justify-start items-start gap-3">
                  <div className="w-60 flex flex-col justify-start items-center">
                    <div className="self-stretch text-center justify-start text-neutral-600 text-xl font-normal font-suite leading-relaxed">
                      대박... 당첨!
                    </div>
                  </div>
                  <div className="w-60 text-center justify-start text-neutral-600 text-xs font-normal font-suite leading-none">
                    쿠폰에 당첨되었어요! 사용할 주점을 골라주세요
                    <br />
                  </div>
                </div>
                <div
                  className="mt-3 w-64 bg-neutral-100 rounded-xl flex flex-col justify-start items-start overflow-hidden cursor-pointer hover:bg-neutral-200 transition-colors"
                  onClick={() => setShowBoothList(true)}
                >
                  <div className="self-stretch py-[8px] px-4 flex flex-col justify-between items-center">
                    <div className="self-stretch inline-flex justify-start items-center gap-2">
                      <div className="flex-1 justify-start text-neutral-500 text-[10px] font-semibold font-suite leading-none">
                        {selectedBooth}
                      </div>
                      <img
                        src={downIcon}
                        alt="dropdown"
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-status="Header"
                className="flex h-[38px] flex-col justify-center items-center mt-4 w-[250px] rounded-[12px] bg-primary-400 cursor-pointer hover:bg-primary-500 transition-colors"
                onClick={handleNextStep}
              >
                <div className="text-neutral-100 text-center font-suite text-[14px] font-semibold leading-[150%]">
                  {couponMutation.isPending ? "발급 중..." : "쿠폰 발급받기"}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        // 쿠폰 코드 표시 모달
        return (
          <div className="w-72 pt-[40px] pb-[25px] relative bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center">
            <div
              className="right-[18px] top-[10px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-suite leading-normal cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
            <div className="w-72 gap-5 relative overflow-hidden flex flex-col items-center justify-center">
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="w-60 gap-1 flex flex-col justify-start items-center">
                  <div className="self-stretch text-center justify-start text-primary-500 text-xl font-semibold font-suite leading-relaxed">
                    "{couponData?.coupon_code || "AT81UC"}"
                  </div>
                  <div className="self-stretch text-center justify-start text-neutral-300 text-xs font-normal font-suite leading-none">
                    5% 할인 쿠폰
                  </div>
                </div>
                <div className="w-60 text-center justify-start text-black text-xs font-normal font-suite leading-none mt-1">
                  선택한 주점에서 사용 가능한 할인 쿠폰입니다.
                  <br />
                  캡쳐 후 방문하여 사용해주시길 바랍니다.
                </div>
              </div>
              <div
                data-status="Header"
                className="flex h-[38px] px-6 py-4 flex-col justify-center items-center w-[250px] rounded-[12px] bg-primary-400 cursor-pointer hover:bg-primary-500 transition-colors"
                onClick={handleClose}
              >
                <div className="text-neutral-100 text-center font-suite text-[14px] font-semibold leading-[150%]">
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
            <div className="w-72 pt-[40px] pb-[25px] relative bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center">
              <div
                className="absolute right-[18px] top-[10px] text-center text-neutral-600 text-base font-semibold font-suite leading-normal cursor-pointer"
                onClick={handleClose}
              >
                X
              </div>
              <div className="flex flex-col items-center justify-center gap-8 px-8 pr-6">
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-center text-neutral-600 text-xl font-normal font-suite leading-relaxed">
                      다음 기회에 다시 ㅠ.ㅠ
                    </div>
                  </div>
                  <div className="text-center text-black text-xs font-normal font-suite leading-relaxed">
                    참여해주셔서 감사합니다. <br />
                    즐거운 축제 되시길 바랍니다 !
                  </div>
                </div>
                <div
                  data-status="Header"
                  className="flex h-[38px] px-6 py-4 flex-col justify-center items-center w-[250px] rounded-[12px] bg-primary-400 cursor-pointer hover:bg-primary-500 transition-colors"
                  onClick={handleGoHome}
                >
                  <div className="text-neutral-100 text-center font-suite text-[14px] font-semibold leading-[150%]">
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
