import React from "react";

const LocationPin = ({
  label,
  x,
  y,
  onClick,
  isSelected = false,
  className = "",
}) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button
      onClick={handleClick}
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2
        group cursor-pointer
        ${className}
      `.trim()}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      {/* 말풍선 모양의 라벨 */}
      <div className="relative">
        <div
          className={`
            inline-flex
            px-0.5 py-0.5 
            rounded-[12px]
            shadow-tag
            text-xs font-semibold
            font-suite
            whitespace-nowrap
            transition-all duration-200
            group-hover:scale-105
            group-hover:shadow-lg
            ${
              isSelected
                ? "text-white"
                : "bg-white text-primary-400 opacity-90 group-hover:opacity-100"
            }
          `.trim()}
          style={
            isSelected
              ? {
                  background:
                    "linear-gradient(180deg, #E65B4D 61.11%, #D33E2F 111.11%)",
                  boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.15)",
                }
              : {}
          }
        >
          {label}
        </div>

        <div
          className="
          absolute top-full left-1/2 transform -translate-x-1/2
          w-0 h-0
          border-l-4 border-r-4 border-t-8
          border-l-transparent border-r-transparent
        "
          style={{
            borderTopColor: isSelected ? "#E65B4D" : "#FFFFFF",
          }}
        ></div>
      </div>
    </button>
  );
};

export default LocationPin;
