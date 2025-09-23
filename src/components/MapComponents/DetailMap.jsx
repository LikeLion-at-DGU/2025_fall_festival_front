import React, { useState, useEffect } from "react";
import { mapConfigs } from "../../config/mapConfigs";
import backbtn from "../../assets/images/icons/header-icons/left.png";
import { useTranslation } from "react-i18next";
import Skeleton from "../Skeleton/Skeleton";

const DetailMap = ({ buildingId, onClose, onSelectBooth, selectedDate, isNightToggle }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const config = mapConfigs[buildingId]; // buildingId 기반 조회
  if (!config) return null;

  const key = `${selectedDate}:${isNightToggle ? "night" : "day"}`;
  const buttons = config.schedules?.[key] || [];

  // 이미지 로드 완료 감지
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true); // buildingId, date, night 바뀔 때 로딩 다시
  }, [buildingId, selectedDate, isNightToggle]);

  return (
<div className="relative w-full min-h-[265px] rounded-[16px] border border-[#E4E4E7] overflow-hidden">
  {/* 로딩 스켈레톤 */}
  {isLoading && (
    <Skeleton className="absolute inset-0"/>
  )}

  {/* 상세지도 이미지 */}
  <img
    src={config.img}
    alt={`${t(`map.locations.${buildingId}`)} 상세지도`}
    className="w-full h-full object-contain relative z-0"
    onLoad={handleImageLoad}
  />

  {/* 버튼 렌더링 */}
  {!isLoading &&
    buttons.map((btn, idx) => (
      <button
        key={idx}
        className="text-[var(--Neutral-500,#52525B)] font-[SUITE] text-[7px] font-normal leading-[150%]
          w-[60px] h-[30px]
          absolute whitespace-pre-line whitespace-nowrap 
          bg-[linear-gradient(270deg,#EBC4C4_0%,#CCBCBC_58.17%)]
          shadow-[0_1px_4px_0_rgba(0,0,0,0.15)] z-10"
        style={{
          left: `${btn.x}%`,
          top: `${btn.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelectBooth?.(btn.label);
        }}
      >
        {btn.label}
      </button>
    ))}

  {/* 뒤로가기 버튼 */}
  <div className="flex flex-row items-center absolute top-[10px] left-[11px] z-20">
    <button
      className="w-[29px] h-[29px]"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <img src={backbtn} alt="뒤로가기" width={24} height={24} />
    </button>
    <div className="rounded-[10px] h-[18px] text-[#fff] bg-[rgba(42,42,46,0.60)] text-[12px] font-semibold leading-[18px] flex px-[6px] items-center">
      {t(`map.locations.${buildingId}`)}
    </div>
  </div>
</div>

  );
};

export default DetailMap;
