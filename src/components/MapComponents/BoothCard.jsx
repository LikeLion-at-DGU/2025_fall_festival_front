import React, { useState } from "react";
import HeartIcon from "../../assets/images/icons/map-icons/Heart.svg";
import UnheartIcon from "../../assets/images/icons/map-icons/Unheart.svg";
import Badge from "./BoothCardComponents/Badge";
import useLikes from "../../hooks/MapHooks/useLikes";

function BoothCard({
  boothId,
  title,
  image,
  isNight,
  startTime,
  endTime,
  businessDays,
  location,
  isOperating,
  likesCount: initialLikesCount,
  isLiked: initialIsLiked,
  isEvent,
  isDorder,
  onClick,
}) {
  const { isLiked, likesCount, toggleLike, loading } = useLikes(
    boothId,
    initialIsLiked,
    initialLikesCount
  );
  return (
    <div
      className={`cursor-pointer bg-white w-full h-[92px] rounded-2xl border p-4 ${
        isOperating ? "border-primary-400" : "border-neutral-200"
      } `}
      style={{
        boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.10)",
      }}
      onClick={onClick}
    >
      <div className="flex gap-4 items-center h-full">
        {/* 이미지 */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={image}
              alt="로딩..."
              className="w-full h-full bg-[#C2C2C2] object-cover"
            />
          </div>
          {/* Badge 겹치기 */}
          {isEvent ? (
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2">
              <Badge backgroundColor=" rgba(239, 112, 99, 0.90)" text="Event" />
            </div>
          ) : null}
        </div>
        <div className="flex-1 relative min-w-0">
          <div className="absolute top-0 right-0 flex flex-col items-center">
            <button
              onClick={(e) => {
                e.stopPropagation(); // 카드 onClick으로 전파 차단
                e.preventDefault(); // (카드가 <Link>로 감싸졌다면 이동 차단)
                if (!loading) toggleLike();
              }}
              disabled={loading}
              className="w-6 h-6 flex items-center justify-center mb-1 hover:scale-110 transition-transform duration-200 disabled:opacity-50"
              aria-pressed={isLiked}
              aria-label={isLiked ? "좋아요 취소" : "좋아요"}
            >
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

          {/* 영업시간 */}
          <p className="text-xs text-neutral-400 mb-0.5 font-suite leading-[150%] font-normal">
            {businessDays && startTime && endTime
              ? `${businessDays.weekday} ${startTime}~${endTime}`
              : "영업시간 준비중입니다"}
          </p>
          <h3 className="text-xl font-semibold text-black mb-0.5 font-suite leading-[130%] truncate pr-[24px]">
            {title}
          </h3>

          {/* 위치 */}
          <div className="flex items-center gap-[13px]">
            <p className="text-sm text-black font-suite leading-[150%] font-normal">
              {location}
            </p>
            {/* 디오더 뱃지 */}
            {isDorder ? <Badge text="D-Order" /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoothCard;
