import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import i18n from "i18next";

import MenuSection from "./MenuSection";
import NearbyBoothSection from "./NearbyBoothSection";
import defaultImg from "../../../assets/images/banners/default-img.png";

import TimeCircleIcon from "../../../assets/images/icons/map-icons/TimeCircle.svg";
import LocationIcon from "../../../assets/images/icons/map-icons/Location.svg";
import TailIcon from "../../../assets/images/icons/map-icons/triangle.svg";
import { useTranslations } from "../../../context/TranslationContext";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fmtTime = (t) => (typeof t === "string" ? t.slice(0, 5) : t);

// 요일 매핑
const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

// 요일 번역 함수
const getLocalizedWeekday = (dayIndex) => {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + dayIndex);

  const languageMap = {
    ko: "ko-KR",
    en: "en-US",
    ja: "ja-JP",
    "zh-CN": "zh-CN",
  };

  const locale = languageMap[i18n.language] || "ko-KR";
  return date.toLocaleDateString(locale, { weekday: "short" });
};

// 스케줄 그룹핑 함수 (같은 시간대면 요일 묶기)
function groupSchedules(schedules) {
  if (!schedules) return [];
  const groups = {};

  schedules.forEach((s) => {
    const date = new Date(s.day);
    const dayIndex = date.getDay();
    const dayName = getLocalizedWeekday(dayIndex);
    const timeRange = `${fmtTime(s.start_time)} ~ ${fmtTime(s.end_time)}`;

    if (!groups[timeRange]) {
      groups[timeRange] = [];
    }
    groups[timeRange].push(dayName);
  });

  return Object.entries(groups).map(([time, days]) => ({
    days,
    time,
  }));
}

export default function FoodTruckDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { getTranslation, requestSingleTranslation } = useTranslations();
  const [truck, setTruck] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/booths/detail/${id}/`)
      .then((res) => setTruck(res.data))
      .catch((err) => {
        console.error("FoodTruckDetail API 실패", err);
        setTruck(null);
      });
  }, [id]);

  // 푸드트럭 데이터 번역 요청
  useEffect(() => {
    if (!truck) return;

    // 푸드트럭 이름 번역 요청
    if (truck.name) {
      requestSingleTranslation({
        entity_type: "booth",
        entity_id: truck.id?.toString() || id,
        field: "BoothName",
        source_lang: "ko",
        source_text: truck.name,
      });
    }

    // 푸드트럭 위치 번역 요청
    if (truck.location_name) {
      requestSingleTranslation({
        entity_type: "booth",
        entity_id: truck.id?.toString() || id,
        field: "BoothLocation",
        source_lang: "ko",
        source_text: truck.location_name,
      });
    }
  }, [truck, id, requestSingleTranslation]);

  if (!truck) return <div className="p-6">{t("booth.loading")}</div>;

  return (
    <div className="pt-6 pb-8">
      {/* 상단 이미지 */}
      <div className="w-[343px] h-[232px] mx-auto bg-gray-200 flex items-center justify-center text-gray-500 rounded-[16px] overflow-hidden">
        <img
          src={truck.image_url || defaultImg} // ✅ image_url 없으면 defaultImg
          alt={truck.name}
          className="w-[343px] h-[232px] object-cover"
          onError={(e) => {
            e.currentTarget.src = defaultImg; // ✅ 에러나면 defaultImg로 대체
          }}
        />
      </div>


      <div className="relative mx-4 mt-3">
        {/* triangle tail */}
        <img
          src={TailIcon}
          className="absolute -top-6 left-10 -translate-x-1/2 drop-shadow-[0_3px_5px_rgba(0,0,0,0.10)]"
          alt="tail"
        />

        {/* 카드 */}
        <div className=" bg-white shadow-md rounded-[16px] px-4 py-3 mb-10 relative z-10">
          <h1 className="text-lg font-bold">
            {getTranslation(
              "booth",
              truck.id?.toString() || id,
              "BoothName",
              truck.name
            )}
          </h1>

          {/* 운영 시간 */}
          {groupSchedules(truck.schedules).map((g, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mt-1 text-sm text-gray-600"
            >
              <img src={TimeCircleIcon} alt="time" className="w-4 h-4" />
              <span>
                {g.days.join(", ")} {g.time}
              </span>
            </div>
          ))}

          {/* 위치 */}
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <img src={LocationIcon} alt="location" className="w-4 h-4" />
            <span>
              {getTranslation(
                "booth",
                truck.id?.toString() || id,
                "BoothLocation",
                truck.location_name
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 메뉴 */}
      <div className="px-4">
        <MenuSection menus={truck.menus} boothId={truck.id || id} />
      </div>


      {/* 근처 부스 */}
      <NearbyBoothSection boothId={truck.id} />
    </div>
  );
}
