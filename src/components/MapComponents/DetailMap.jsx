import React from "react";
import { mapConfigs } from "../../config/mapConfigs";
import backbtn from "../../assets/images/icons/header-icons/left.png";

const DetailMap = ({ buildingName, onClose, onSelectBooth }) => {
  const config = mapConfigs[buildingName];
  if (!config) return null;

  // 테스트용 날짜 → 실제는 그냥 new Date() 쓰면 됨

  const now = new Date("2024-09-25T19:30:00");
  const today = now.toISOString().split("T")[0];
  const currentTime = now.getHours() < 17 ? "day" : "night"; // ✅ 오후 5시 기준
  const scheduleKey = `${today}:${currentTime}`;

  // 🔹 schedules에서 해당 시간대 버튼 가져오기
  const buttons = config.schedules?.[scheduleKey] || [];

  return (
    <div className="relative w-full h-full rounded-[16px] border border-[#E4E4E7]">
      {/* 상세지도 이미지 */}
      <img
        src={config.img}
        alt={`${buildingName} 상세지도`}
        className="w-full h-full object-contain"
      />
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          className="text-[var(--Neutral-500,#52525B)] font-[SUITE] text-[10px] font-normal leading-[150%]
                     px-[6px] py-[13px]
                     absolute whitespace-nowrap bg-[linear-gradient(270deg,#EBC4C4_0%,#CCBCBC_58.17%)]
                     shadow-[0_1px_4px_0_rgba(0,0,0,0.15)]"
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
        <div
          className="rounded-[10px] h-[18px] text-[#fff] bg-[rgba(42,42,46,0.60)]
                        text-[12px] font-semibold leading-[18px] flex px-[6px] items-center"
        >
          {buildingName}
        </div>
      </div>
    </div>
  );
};

export default DetailMap;
