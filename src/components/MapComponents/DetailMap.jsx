import React from "react";
import { mapConfigs } from "../../config/mapConfigs";
import backbtn from "../../assets/images/icons/header-icons/left.svg";

const DetailMap = ({ buildingName, onClose, onSelectBooth }) => {
  const config = mapConfigs[buildingName];

  if (!config) {
    return (
      <div className="relative flex items-center justify-center w-full h-[232px] rounded-[16px] border border-[#E4E4E7]">
        <p className="text-gray-600">상세지도가 준비되지 않은 건물입니다.</p>

        {/* 뒤로가기 버튼 */}
        <button
          className="absolute top-2 left-2 flex items-center gap-1 bg-white/80 text-gray-800 px-2 py-1 rounded shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <img src={backbtn} alt="뒤로가기" className="w-4 h-4" />
          <span className="text-sm font-medium">뒤로</span>
        </button>
      </div>
    );
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
              onSelectBooth(btn.label); // ✅ 부모로 전달
            }
          }}
        >
          {btn.label}
        </button>
      ))}

      {/* 뒤로가기 버튼 */}
      <button
        className="absolute top-2 left-2 flex items-center gap-1 bg-white/80 text-gray-800 px-2 py-1 rounded shadow-md"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <img src={backbtn} alt="뒤로가기" className="w-4 h-4" />
        <span className="text-sm font-medium">뒤로</span>
      </button>
    </div>
  );
};

export default DetailMap;
