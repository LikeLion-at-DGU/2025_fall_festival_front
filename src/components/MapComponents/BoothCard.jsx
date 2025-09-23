import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import HeartIcon from "../../assets/images/icons/map-icons/Heart.png";
import UnheartIcon from "../../assets/images/icons/map-icons/emptyHeart.png";
import Badge from "./BoothCardComponents/Badge";
import useBoothLikes from "../../hooks/useBoothLikes";
import defaultImg from "../../assets/images/banners/default-img.png";
import drinkDefaultImg from "../../assets/images/icons/default-icons/drinkDefaultImg.svg";
import foodtruckDefaultImg from "../../assets/images/icons/default-icons/foodtruckDefaultImg.svg";

function BoothCard({
  boothId,
  title,
  image,
  isNight,
  startTime,
  endTime,
  businessDays,
  time,
  location,
  isOperating,
  likesCount: initialLikesCount,
  isLiked: initialIsLiked,
  isEvent,
  isDorder,
  badges,
  onClick,
  isSelected,
  distance_m,
  category,
}) {
  const { t } = useTranslation();
  const { isLiked, likesCount, toggleLike, loading } = useBoothLikes(
    boothId,
    initialLikesCount || 0,
    initialIsLiked || false
  );
  // console.log("위치",{location})
  // 날짜 맵핑
  const getWeekdayFromDate = (dateString) => {
    const date = new Date(dateString);
    const languageMap = {
      ko: "ko-KR",
      en: "en-US",
      ja: "ja-JP",
      "zh-CN": "zh-CN",
    };
    const locale = languageMap[i18n.language] || "ko-KR";
    return date.toLocaleDateString(locale, { weekday: "short" });
  };
  // const getLocalizedWeekday = () => {
  //   const today = new Date();

  //   const languageMap = {
  //     ko: "ko-KR",
  //     en: "en-US",
  //     ja: "ja-JP",
  //     "zh-CN": "zh-CN",
  //   };

  //   const locale = languageMap[i18n.language] || "ko-KR";
  //   return today.toLocaleDateString(locale, { weekday: "short" });
  // };
  // console.log({ isSelected });
  // const translatedTodayLabel = getLocalizedWeekday();
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
          <div className="w-[68px] h-[68px] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={
                image ||
                (category === "FoodTruck"
                  ? foodtruckDefaultImg
                  : category === "Drink"
                  ? drinkDefaultImg
                  : defaultImg)
              }
              alt={title}
              className="w-full h-full bg-[#C2C2C2] object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  category === "FoodTruck"
                    ? foodtruckDefaultImg
                    : category === "Drink"
                    ? drinkDefaultImg
                    : defaultImg;
              }}
            />
          </div>
          {/* Badge 겹치기 */}
          {badges?.isEventActive || isEvent ? (
            <div className="absolute top-[5px] left-[5px] -translate-x-1/4 -translate-y-1/2">
              <Badge backgroundColor=" rgba(239, 112, 99, 0.90)" text="Event" />
            </div>
          ) : null}
        </div>
        <div className="flex-1 relative min-w-0">
          {category !== "Drink" && category !== "FoodTruck" && (
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
              <span className="text-xs text-[#A1A1AA] font-suite">
                {likesCount}
              </span>
            </div>
          )}

          {category != "Drink" && (
            <p className="text-[10px] text-[#52525B] mb-0.5 font-suite leading-[150%] font-normal">
              {businessDays && businessDays.length > 0
                ? // ✅ 요일/시간 묶어서 출력
                  (() => {
                    const grouped = {};

                    businessDays.forEach((day) => {
                      const weekday = getWeekdayFromDate(day.day); // 요일 변환
                      // ✅ 초 제거: HH:MM만 추출
                      const start = day.start_time.slice(0, 5);
                      const end = day.end_time.slice(0, 5);
                      const timeRange = `${start}~${end}`;
                      if (!grouped[timeRange]) grouped[timeRange] = [];
                      grouped[timeRange].push(weekday);
                    });

                    return Object.entries(grouped).map(
                      ([timeRange, weekdays], idx) => (
                        <span key={idx} className="block">
                          {weekdays.join(", ")} {timeRange}
                        </span>
                      )
                    );
                  })()
                : startTime && endTime
                ? `${startTime}~${endTime}`
                : t("booth.preparingHours")}
            </p>
          )}

          <h3 className="text-xl font-semibold text-black mb-0.5 font-suite leading-[130%] truncate pr-[24px]">
            {title}
          </h3>

          {/* 거리 뱃지 (주류만) */}
          {category == "Drink" && (
            <div>
              <Badge
                text={
                  distance_m ? `${distance_m}m` : t("notBooth.unknownLocation")
                }
                backgroundColor="#EF7063"
              />
            </div>
          )}
          {/* 위치 */}
          {category != "Drink" && (
            <div className="flex items-center gap-[13px]">
              <p className="text-sm text-[#2A2A2E] font-suite leading-[150%] font-normal">
                {location}
              </p>
              {/* 디오더 뱃지 */}
              {badges?.isDOrderPartner || isDorder ? (
                <Badge text="D-Order" />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoothCard;
