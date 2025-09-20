import React, { useState } from "react";

function GameSuccessModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: 축하, 2: 상자열기, 3: 부스선택, 4: 쿠폰발급
  const [showBoothList, setShowBoothList] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState("광고홍보학과");

  // 부스/학과 리스트
  const boothList = [
    "광고홍보학과",
    "경영학과", 
    "컴퓨터공학과",
    "국어국문학과",
    "영어영문학과",
    "법학과",
    "경제학과",
    "심리학과"
  ];

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1); // 리셋
    onClose();
  };

  const renderModalContent = () => {
    switch (currentStep) {
      case 1:
        // 축하드립니다 모달
        return (
          <div className="w-72 h-56 relative bg-white rounded-2xl overflow-hidden shadow-xl">
            <div 
              className="left-[273px] top-[9px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-['SUITE'] leading-normal cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
            <div className="w-64 left-[23px] top-[46px] absolute inline-flex flex-col justify-start items-center gap-8">
              <div className="flex flex-col justify-start items-start gap-1.5">
                <div className="w-60 flex flex-col justify-start items-center">
                  <div className="self-stretch text-center justify-start text-neutral-600 text-xl font-normal font-['SUITE'] leading-relaxed">축하드립니다!</div>
                  <div className="self-stretch text-center justify-start text-neutral-300 text-xs font-normal font-['SUITE'] leading-none">기록 : 상위 12%</div>
                </div>
                <div className="w-60 text-center justify-start text-neutral-600 text-xs font-normal font-['SUITE'] leading-none">
                  모든 단계를 시간 안에 클리어하셨습니다.<br/>그럼 두근두근... 상자를 열어볼까요?
                </div>
              </div>
              <div 
                data-status="Header" 
                className="self-stretch h-9 px-6 py-4 bg-primary-400 rounded-xl flex flex-col justify-between items-center cursor-pointer hover:bg-primary-500 transition-colors"
                onClick={handleNextStep}
              >
                <div className="text-center justify-start text-neutral-100 text-sm font-semibold font-['SUITE'] leading-tight">상자 열어보기</div>
              </div>
            </div>
          </div>
        );

      case 2:
        // 대박... 당첨! (부스 선택) 모달
        return (
          <div className="w-72 h-56 relative bg-white rounded-2xl overflow-hidden shadow-xl">
            <div 
              className="left-[273px] top-[9px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-['SUITE'] leading-normal cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
            <div className="w-64 left-[23px] top-[46px] absolute inline-flex flex-col justify-start items-center gap-6">
              <div className="flex flex-col justify-start items-center gap-1.5">
                <div className="flex flex-col justify-start items-start gap-4">
                  <div className="w-60 flex flex-col justify-start items-center">
                    <div className="self-stretch text-center justify-start text-neutral-600 text-xl font-normal font-['SUITE'] leading-relaxed">대박... 당첨!</div>
                  </div>
                  <div className="w-60 text-center justify-start text-neutral-600 text-xs font-normal font-['SUITE'] leading-none">쿠폰에 당첨되었어요! 사용할 주점을 골라주세요</div>
                </div>
                <div 
                  className="w-64 bg-neutral-100 rounded-xl flex flex-col justify-start items-start overflow-hidden cursor-pointer hover:bg-neutral-200 transition-colors"
                  onClick={() => setShowBoothList(true)}
                >
                  <div className="self-stretch h-7 p-4 flex flex-col justify-between items-center">
                    <div className="self-stretch inline-flex justify-start items-center gap-2">
                      <div className="flex-1 justify-start text-neutral-500 text-[10px] font-semibold font-['SUITE'] leading-none">{selectedBooth}</div>
                      <div className="w-2 h-1 origin-top-left -rotate-90 rounded-sm outline outline-2 outline-offset-[-0.90px] outline-neutral-600"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                data-status="Header" 
                className="self-stretch h-9 px-6 py-4 bg-primary-400 rounded-xl flex flex-col justify-between items-center cursor-pointer hover:bg-primary-500 transition-colors"
                onClick={handleNextStep}
              >
                <div className="text-center justify-start text-neutral-100 text-sm font-semibold font-['SUITE'] leading-tight">쿠폰 발급받기</div>
              </div>
            </div>
          </div>
        );

      case 3:
        // 쿠폰 발급받기 (동일한 내용) 모달
        return (
          <div className="w-72 h-56 relative bg-white rounded-2xl overflow-hidden shadow-xl">
            <div 
              className="left-[273px] top-[9px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-['SUITE'] leading-normal cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
            <div className="w-64 left-[23px] top-[46px] absolute inline-flex flex-col justify-start items-center gap-6">
              <div className="flex flex-col justify-start items-center gap-1.5">
                <div className="flex flex-col justify-start items-start gap-4">
                  <div className="w-60 flex flex-col justify-start items-center">
                    <div className="self-stretch text-center justify-start text-neutral-600 text-xl font-normal font-['SUITE'] leading-relaxed">대박... 당첨!</div>
                  </div>
                  <div className="w-60 text-center justify-start text-neutral-600 text-xs font-normal font-['SUITE'] leading-none">쿠폰에 당첨되었어요! 사용할 주점을 골라주세요</div>
                </div>
                <div 
                  className="w-64 bg-neutral-100 rounded-xl flex flex-col justify-start items-start overflow-hidden cursor-pointer hover:bg-neutral-200 transition-colors"
                  onClick={() => setShowBoothList(true)}
                >
                  <div className="self-stretch h-7 p-4 flex flex-col justify-between items-center">
                    <div className="self-stretch inline-flex justify-start items-center gap-2">
                      <div className="flex-1 justify-start text-neutral-500 text-[10px] font-semibold font-['SUITE'] leading-none">{selectedBooth}</div>
                      <div className="w-2 h-1 origin-top-left -rotate-90 rounded-sm outline outline-2 outline-offset-[-0.90px] outline-neutral-600"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                data-status="Header" 
                className="self-stretch h-9 px-6 py-4 bg-primary-400 rounded-xl flex flex-col justify-between items-center cursor-pointer hover:bg-primary-500 transition-colors"
                onClick={handleNextStep}
              >
                <div className="text-center justify-start text-neutral-100 text-sm font-semibold font-['SUITE'] leading-tight">쿠폰 발급받기</div>
              </div>
            </div>
          </div>
        );

      case 4:
        // 쿠폰 코드 표시 모달
        return (
          <div className="w-72 h-56 relative bg-white rounded-2xl overflow-hidden shadow-xl">
            <div 
              className="left-[273px] top-[9px] absolute text-center justify-center text-neutral-600 text-base font-semibold font-['SUITE'] leading-normal cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
            <div className="w-64 left-[23px] top-[46px] absolute inline-flex flex-col justify-start items-center gap-8">
              <div className="flex flex-col justify-start items-start gap-1.5">
                <div className="w-60 flex flex-col justify-start items-center">
                  <div className="self-stretch text-center justify-start text-primary-500 text-xl font-semibold font-['SUITE'] leading-relaxed">"AT81UC"</div>
                  <div className="self-stretch text-center justify-start text-neutral-300 text-xs font-normal font-['SUITE'] leading-none">5% 할인 쿠폰</div>
                </div>
                <div className="w-60 text-center justify-start text-black text-xs font-normal font-['SUITE'] leading-none">
                  선택한 주점에서 사용 가능한 할인 쿠폰입니다.<br/>캡쳐 후 방문하여 사용해주시길 바랍니다.
                </div>
              </div>
              <div 
                data-status="Header" 
                className="self-stretch h-9 px-6 py-4 bg-primary-400 rounded-xl flex flex-col justify-between items-center cursor-pointer hover:bg-primary-500 transition-colors"
                onClick={handleClose}
              >
                <div className="text-center justify-start text-neutral-100 text-sm font-semibold font-['SUITE'] leading-tight">캡쳐 확인</div>
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
      <div className="fixed inset-0 bg-transparent z-[60]" onClick={() => setShowBoothList(false)}>
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
                  <span className="text-neutral-700 text-sm font-medium">{booth}</span>
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