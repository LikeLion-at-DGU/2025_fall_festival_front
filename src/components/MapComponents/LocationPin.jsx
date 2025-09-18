import React from "react";

const LocationPin = ({ label, x, y, onClick, isSelected = false, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2
        group cursor-pointer
        ${className}
      `}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      {/* 말풍선 라벨 */}
      <div className="relative flex flex-col items-center">
        <div
          className={`
            inline-flex px-2 py-1 text-xs font-semibold font-suite
            whitespace-nowrap transition-all duration-200
            group-hover:scale-105 group-hover:shadow-lg
            ${isSelected ? "text-white" : "text-[#EF7063]"}
          `}
          style={
            isSelected
              ? {
                  borderRadius: "12px",
                  background: "linear-gradient(180deg, #E65B4D 61.11%, #D33E2F 111.11%)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }
              : {
                  borderRadius: "16px",
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.80) 58.33%, #FFF 97.22%)",
                  boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.15)",
                }
          }
        >
          {label}
        </div>

        {/* 삼각형 핀 */}
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent"
          style={{
            borderTopColor: isSelected ? "#E65B4D" : "#FFFFFF",
          }}
        ></div>
      </div>
    </button>
  );
};

export default LocationPin;
