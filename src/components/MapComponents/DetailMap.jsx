import React from "react";
import { mapConfigs } from "../../config/mapConfigs";
import backbtn from "../../assets/images/icons/header-icons/left.png";
import { useTranslation } from "react-i18next";

const DetailMap = ({ buildingId, onClose, onSelectBooth, selectedDate, isNightToggle }) => {
  const { t } = useTranslation();

  const config = mapConfigs[buildingId]; // buildingId 기반 조회
  if (!config) {
    return null;
  }

const key = `${selectedDate}:${isNightToggle ? "night" : "day"}`;
const buttons = config.schedules?.[key] || [];
console.log("buildingId:", buildingId);
console.log("selectedDate:", selectedDate);
console.log("isNightToggle:", isNightToggle);
console.log("찾는 key:", `${selectedDate}:${isNightToggle ? "night" : "day"}`);
console.log("해당 스케줄:", config.schedules?.[`${selectedDate}:${isNightToggle ? "night" : "day"}`]);

  return (
    <div className="relative w-full h-full rounded-[16px] border border-[#E4E4E7]">
      {/* 상세지도 이미지 */}
      <img
        src={config.img}
        alt={`${t(`map.locations.${buildingId}`)} 상세지도`}
        className="w-full h-full object-contain"
      />

      {/* 시간대별 버튼 렌더링 */}
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          className="text-[var(--Neutral-500,#52525B)] font-suite text-[10px] font-normal leading-[150%]
            px-[6px] py-[13px]
            absolute whitespace-nowrap bg-[linear-gradient(270deg,#EBC4C4_0%,#CCBCBC_58.17%)] shadow-[0_1px_4px_0_rgba(0,0,0,0.15)]"
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
      <div className="flex flex-row items-center absolute top-[10px] left-[11px]">
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
