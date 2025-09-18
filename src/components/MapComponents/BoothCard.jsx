import React, { useState } from "react";
import HeartIcon from "../../assets/images/icons/map-icons/Heart.svg";
import UnheartIcon from "../../assets/images/icons/map-icons/Unheart.svg";
import Badge from "./Badge";

const BoothCard = ({
  title,
  image,
  isNight,
  startTime,
  endTime,
  businessDays,
  location,
  isOperating,

  likesCount = 0,
  isLiked,
  isEvent,
  isDorder,
}) => {
  return (
    <div
      className={`bg-white w-full
        rounded-2xl border p-4 ${
          isOperating ? "border-primary-400" : "border-neutral-200"
        } `}
      style={{
        boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex gap-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={image}
              alt="부스 이미지"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute top-0 right-0 flex flex-col items-center">
            <button className="w-6 h-6 flex items-center justify-center mb-1">
              <img
                src={isLiked ? HeartIcon : UnheartIcon}
                alt="좋아요"
                className="w-5 h-5 transition-all duration-200"
              />
            </button>
            <span className="text-xs text-neutral-300 font-suite">
              {likesCount}
            </span>
          </div>

          <p className="text-xs text-neutral-400 mb-0.5 font-suite leading-[150%] font-normal">
            {businessDays} {startTime}~{endTime}
          </p>

          <h3 className="text-xl font-semibold text-black mb-0.5 font-suite leading-[130%]">
            {title}
          </h3>

          <div className="flex items-center gap-2">
            <p className="text-sm text-black font-suite leading-[150%] font-normal">
              {location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoothCard;
