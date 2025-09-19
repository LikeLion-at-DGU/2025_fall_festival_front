import React, { useState } from "react";
import HeartIcon from "../../assets/images/icons/map-icons/Heart.svg";
import UnheartIcon from "../../assets/images/icons/map-icons/Unheart.svg";
import PictureIcon from "../../assets/images/icons/map-icons/Picture.png";

const BoothCard = ({
  title,
  location,
  time,
  image,
  isOperating = false,
  className = "",
  likeCount = 12,
  badges = { isEventActive: false, isDOrderPartner: false },
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      className={`bg-white rounded-2xl border p-4 ${
        isOperating ? "border-primary-400" : "border-neutral-200"
      } ${className}`}
      style={{
        boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex gap-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={PictureIcon}
              alt="부스 이미지"
              className="w-full h-full object-cover"
            />
          </div>

          {badges.isEventActive && (
            <div className="absolute -top-3 -left-1">
              <span
                className="inline-flex px-2 py-0.5 justify-center items-center rounded-xl text-white text-[10px] font-normal leading-[150%] font-suite shadow-tag"
                style={{ background: "rgba(239, 112, 99, 0.90)" }}
              >
                Event
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 relative min-w-0">
          <div className="absolute top-0 right-0 flex flex-col items-center">
            <button
              onClick={handleHeartClick}
              className="w-6 h-6 flex items-center justify-center mb-1"
            >
              <img
                src={isLiked ? HeartIcon : UnheartIcon}
                alt="좋아요"
                className="w-5 h-5 transition-all duration-200"
              />
            </button>
            <span className="text-xs text-neutral-300 font-suite">
              {likeCount}
            </span>
          </div>

          <p className="text-xs text-neutral-400 mb-0.5 font-suite leading-[150%] font-normal">
            {time}
          </p>

          <h3 className="text-xl font-semibold text-black mb-0.5 font-suite leading-[130%] truncate pr-[24px]">
            {title}
          </h3>

          <div className="flex items-center gap-2">
            <p className="text-sm text-black font-suite leading-[150%] font-normal">
              {location}
            </p>

            {badges.isDOrderPartner && (
              <span
                className="inline-flex px-2 py-0.5 justify-center items-center rounded-xl text-white text-[10px] font-normal leading-[150%] font-suite shadow-tag"
                style={{ background: "rgba(248, 176, 169, 0.90)" }}
              >
                D-order
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoothCard;
