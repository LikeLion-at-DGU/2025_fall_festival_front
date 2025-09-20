import React from "react";
import WhitePolygon from "../../assets/images/icons/detailmap-icons/WhitePolygon.svg";
import OrangePolygon from "../../assets/images/icons/detailmap-icons/OrangePolygon.svg";

const LocationPin = ({
  label,
  x,
  y,
  onClick,
  isSelected = false,
  className = "",
}) => {
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
                  background:
                    "linear-gradient(180deg, #E65B4D 61.11%, #D33E2F 111.11%)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }
              : {
                  borderRadius: "16px",
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.80) 58.33%, #FFF 97.22%)",
                  boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.15)",
                }
          }
        >
          {label}
        </div>

        {/* 삼각형 핀 */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[4.5px]">
          <img
            src={isSelected ? OrangePolygon : WhitePolygon}
            alt="핀"
            className="w-4 h-4"
          />
        </div>
      </div>
    </button>
  );
};

export default LocationPin;
