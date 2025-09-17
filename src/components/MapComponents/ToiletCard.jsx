import React from "react";
import ToiletIcon from "../../assets/images/icons/map-icons/Toilet.png";

const ToiletCard = ({
  name,
  location,
  status,
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
      <div className="flex gap-3">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
          <img
            src={ToiletIcon}
            alt="화장실"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <h3
            className="text-xl font-semibold mb-0.5 font-suite justify-center leading-[130%]"
            style={{ color: "#000" }}
          >
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ToiletCard;
