import React from "react";
import MapToiletIcon from "../../assets/images/icons/map-icons/Toilet.svg";
import MapBeerIcon from "../../assets/images/icons/map-icons/Beer.png";
import MapConvenienceIcon from "../../assets/images/icons/map-icons/Convenience.png";
import Badge from "./BoothCardComponents/Badge";
import defaultImg from "../../assets/images/banners/default-img.png";

import { useTranslation } from "react-i18next";

const NotBoothCard = ({
  title,
  distance_m,
  category,
  location,
  isSelected,
  onClick,
}) => {
  const { t } = useTranslation();

  // 카테고리별 이미지 선택
  const getImageByCategory = (category) => {
    switch (category) {
      case "Toilet":
        return MapToiletIcon;
      case "Drink":
        return MapBeerIcon;
      case "Store":
        return MapConvenienceIcon;
      default:
        return defaultImg; // 기본값
    }
  };
console.log({isSelected})

  return (
    <div
      className={`cursor-pointer w-full h-[92px] rounded-2xl border p-3 transition shadow-sm
  ${
    isSelected
      ? "bg-red-50 border-red-500 shadow-md " // 선택됨
      : "bg-white border-neutral-200" // 기본
  }
`}
      style={{
        borderRadius: "16px",
      }}
      onClick={onClick}
    >
      <div className="flex gap-4 items-center h-full">
        {/* 이미지 */}
        <div className="relative w-[68px] h-[68px] flex-shrink-0">
          <img
            src={getImageByCategory(category)}
            alt={title}
            className="object-contain"
          />
        </div>

        {/* 글자 */}
        <div
          className={`flex-1 min-w-0 ${
            category === "Toilet" ? "flex items-center" : ""
          }`}
        >
          {/* 제목 */}
          <h3
            className={`text-xl font-semibold text-black font-suite leading-[130%] truncate pr-16 ${
              category === "Toilet" || category === "Store" ? "" : "mb-2"
            }`}
          >
            {title}
          </h3>
          {/* 위치 */}
          {category !== "Toilet" && (
            <p className="text-sm text-[#2A2A2E] font-suite leading-[150%] font-normal">
              {location}
            </p>
          )}
          {/* 거리 뱃지 (화장실 제외) */}
          {category !== "Toilet" && (
            <div>
              <Badge
                text={
                  distance_m ? `${distance_m}m` : t("notBooth.unknownLocation")
                }
                backgroundColor="#EF7063"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotBoothCard;
