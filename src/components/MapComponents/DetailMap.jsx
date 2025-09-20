import React from "react";
import { mapConfigs } from "../../config/mapConfigs";
import backbtn from "../../assets/images/icons/header-icons/left.png";

const DetailMap = ({ buildingName, onClose, onSelectBooth }) => {
  const config = mapConfigs[buildingName];

  if (!config) {
    return null;
  }

  return (
    <div className="relative w-full h-full rounded-[16px] border border-[#E4E4E7]">
      {/* 상세지도 이미지 */}
      <img
        src={config.img}
        alt={`${buildingName} 상세지도`}
        className="w-full h-full object-contain"
      />

      {config.buttons
        .filter((btn) => {
          if (!btn.showIf) return true;

          const { startDate, endDate, startTime, endTime } = btn.showIf;
          const now = new Date();

          // 오늘 날짜 (YYYY-MM-DD)
          const today = now.toISOString().split("T")[0];

          if (startDate && today < startDate) return false;
          if (endDate && today > endDate) return false;

          if (startTime && endTime) {
            const nowMinutes = now.getHours() * 60 + now.getMinutes();
            const [startH, startM] = startTime.split(":").map(Number);
            const [endH, endM] = endTime.split(":").map(Number);
            const startMinutes = startH * 60 + startM;
            const endMinutes = endH * 60 + endM;

            if (nowMinutes < startMinutes || nowMinutes > endMinutes) {
              return false;
            }
          }

          return true;
        })
        .map((btn, idx) => (
          <button
            key={idx}
            className="text-[var(--Neutral-500,#52525B)] font-[SUITE] text-[10px] font-normal leading-[150%]
            px-[6px] py-[13px]
            absolute whitespace-nowrap bg-[linear-gradient(270deg,#EBC4C4_0%,#CCBCBC_58.17%)] shadow-[0_1px_4px_0_rgba(0,0,0,0.15)]"
            style={{
              left: `${btn.x}%`,
              top: `${btn.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectBooth?.(btn.label); // ✅ 클릭 이벤트 모두 발생
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
          <img src={backbtn} alt="뒤로가기" width={24} height={24}/>
        </button>
        <div className="rounded-[10px] h-[18px] text-[#fff] bg-[rgba(42,42,46,0.60)] text-[12px] font-semibold leading-[18px] flex px-[6px] items-center">
          {buildingName}
        </div>
      </div>
    </div>
  );
};

export default DetailMap;
