import React from "react";
import MapToiletIcon from "../../assets/images/icons/map-icons/Toilet.png";
import MapBeerIcon from "../../assets/images/icons/map-icons/Beer.png";
import MapConvenienceIcon from "../../assets/images/icons/map-icons/Convenience.png";
import Badge from "./BoothCardComponents/Badge";

const NotBoothCard = ({
  title,
  distance_m,
  category,
}) => {
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
        return MapToiletIcon; // 기본값
    }
  };

  return (
    <div
      className="bg-white w-full h-[92px] rounded-2xl border border-neutral-200 p-4"
      style={{
        boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex gap-4 items-center h-full">
        {/* 이미지 */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={getImageByCategory(category)}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 글자 */}
        <div className={`flex-1 ${category === "Toilet" ? "flex items-center" : ""}`}>
          {/* 제목 */}
          <h3 className={`text-xl font-semibold text-black font-suite leading-[130%] ${category === "Toilet" ? "" : "mb-2"}`}>
            {title}
          </h3>

          {/* 거리 뱃지 (화장실 제외) */}
          {category !== "Toilet" && (
            <div>
              <Badge
                text={distance_m ? `${distance_m}m` : "현재 위치 알 수 없음"}
                backgroundColor="rgba(161, 161, 170, 0.90)"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotBoothCard;
