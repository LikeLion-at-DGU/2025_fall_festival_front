import React from "react";

const ConvenienceCard = ({
  name,
  location,
  distance,
  isSelected = false,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border p-4 ${className} ${
        isSelected ? "border-primary-400" : "border-neutral-200"
      }`}
      style={{
        boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
          <img
            src="/src/assets/images/icons/map-icons/Picture.png"
            alt="편의점"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 텍스트 정보 영역 */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-black mb-0.1 font-suite leading-tight">
            {name}
          </h3>

          <p className="text-xs text-black font-suite leading-normal mb-0.5">
            {location}
          </p>

          {/* 거리 태그 */}
          <div className="inline-flex">
            <span
              className="px-2 py-1 rounded-full text-white text-xs font-medium"
              style={{ backgroundColor: "#FF6B6B" }}
            >
              {distance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvenienceCard;
