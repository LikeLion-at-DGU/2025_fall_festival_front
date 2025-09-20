import React from "react";
import { mapConfigs } from "../../config/mapConfigs";
import backbtn from "../../assets/images/icons/header-icons/left.svg";

const DetailMap = ({ buildingName, selectedPin, onClose, onSelectBooth }) => {
  const config = mapConfigs[buildingName];

  if (!config) {
    return null;
  }

  return (
    <div className="relative w-full h-[232px] rounded-[16px] border border-[#E4E4E7]">
      {/* 상세지도 이미지 */}
      <img
        src={config.img}
        alt={`${buildingName} 상세지도`}
        className="w-full h-full object-contain"
      />

      {/* 버튼 오버레이 */}
      {config.buttons.map((btn, idx) => (
        <button
          key={idx}
          className="absolute bg-blue-500 text-white px-2 py-1 rounded shadow-md text-sm"
          style={{
            left: `${btn.x}%`,
            top: `${btn.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectBooth) {
              onSelectBooth(btn.label); //  부모로 전달
            }
          }}
        >
          {btn.label}
        </button>
      ))}

      {/* 뒤로가기 버튼 */}
      <div className="flex flex-row items-center absolute top-[10px] left-[11px]">
        <button
          className="  w-[29px] h-[29px]"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <img src={backbtn} alt="뒤로가기" />
        </button>
        <div className="rounded-[10px] h-[18px] text-[#fff] bg-[rgba(42,42,46,0.60)] text-[12px] font-semibold leading-[18px] flex px-[6px] items-center">
          {buildingName}
        </div>
      </div>
    </div>
  );
};

export default DetailMap;
