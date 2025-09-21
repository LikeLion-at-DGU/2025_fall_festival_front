import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import i18n from "i18next";

import MenuSection from "./MenuSection";
import NearbyBoothSection from "./NearbyBoothSection";

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

// 스케줄 그룹핑 (같은 시간대면 요일 묶기)
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

export default function DrinkDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { getTranslation, requestSingleTranslation } = useTranslations();
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/booths/detail/${id}/`)
      .then((res) => setDrink(res.data))
      .catch((err) => {
        console.error("DrinkDetail API 실패", err);
        setDrink(null);
      });
  }, [id]);

  // 주류 부스 데이터 번역 요청
  useEffect(() => {
    if (!drink) return;

    // 주류 부스 이름 번역 요청
    if (drink.name) {
      requestSingleTranslation({
        entity_type: "booth",
        entity_id: drink.id?.toString() || id,
        field: "BoothName",
        source_lang: "ko",
        source_text: drink.name,
      });
    }

    // 주류 부스 위치 번역 요청
    if (drink.location_description) {
      requestSingleTranslation({
        entity_type: "booth",
        entity_id: drink.id?.toString() || id,
        field: "BoothLocation",
        source_lang: "ko",
        source_text: drink.location_description,
      });
    }
  }, [drink, id, requestSingleTranslation]);

  if (!drink) return <div className="p-6">{t("booth.loading")}</div>;

  return (
    <div className="pt-6 pb-8">
      {/* 상단 이미지 */}
      <div className="w-[343px] h-[232px] mx-auto bg-gray-200 flex items-center justify-center text-gray-500 rounded-[16px] overflow-hidden">
        {drink.image_url ? (
          <img
            src={drink.image_url}
            alt={drink.name}
            className="w-[343px] h-[232px] object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          t("booth.drinkImagePlaceholder")
        )}
      </div>

      {/* 카드 */}
      <div className="bg-white shadow-md rounded-[16px] px-4 py-3 mx-4 mt-3 relative z-10">
        {/* triangle tail */}
        <img
          src={TailIcon}
          className="absolute -top-6 left-10 -translate-x-1/2"
          alt={t("booth.tailAlt")}
        />

        <h1 className="text-lg font-bold">
          {getTranslation(
            "booth",
            drink.id?.toString() || id,
            "BoothName",
            drink.name
          )}
        </h1>

        {/* 운영 시간 (요일 묶음) */}
        {groupSchedules(drink.schedules).map((g, i) => (
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
              drink.id?.toString() || id,
              "BoothLocation",
              drink.location_description
            )}
          </span>
        </div>
      </div>

      {/* 메뉴 */}
      <MenuSection menus={drink.menus} boothId={drink.id || id} />

      {/* 근처 부스 */}
      <NearbyBoothSection boothId={drink.id} />
    </div>
  );
}
