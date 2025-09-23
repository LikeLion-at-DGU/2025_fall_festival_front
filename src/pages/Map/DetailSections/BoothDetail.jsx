import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import i18n from "i18next";

import MenuSection from "./MenuSection";
import NearbyBoothSection from "./NearbyBoothSection";
import useBoothLikes from "../../../hooks/useBoothLikes";
import { useTranslations } from "../../../context/TranslationContext";

import CheckIcon from "../../../assets/images/icons/map-icons/Check.svg";
import HeartIcon from "../../../assets/images/icons/map-icons/Heart.png";
import UnheartIcon from "../../../assets/images/icons/map-icons/emptyHeart.png";
import TimeCircleIcon from "../../../assets/images/icons/map-icons/TimeCircle.svg";
import LocationIcon from "../../../assets/images/icons/map-icons/Location.svg";
import tail from "../../../assets/images/icons/map-icons/triangle.svg";
import defaultImg from "../../../assets/images/banners/default-img.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fmtTime = (t) => (typeof t === "string" ? t.slice(0, 5) : t);

// 요일 매핑
const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

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

export default function BoothDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { getTranslation, requestSingleTranslation } = useTranslations();
  const [booth, setBooth] = useState(null);
  const [initialLikesCount, setInitialLikesCount] = useState(0);
  const [initialIsLiked, setInitialIsLiked] = useState(false);

  // 좋아요 훅
  const { isLiked, likesCount, toggleLike, loading } = useBoothLikes(
    id,
    initialLikesCount || 0,
    initialIsLiked
  );

  useEffect(() => {
    const fetchBoothDetail = async () => {
      try {
        // 1. 부스 상세 정보 조회
        const detailRes = await axios.get(`${BASE_URL}/booths/detail/${id}/`);
        setBooth(detailRes.data);

        // 2. 좋아요 정보를 위해 부스 목록에서 해당 부스 조회
        try {
          const listRes = await axios.post(`${BASE_URL}/booths/list/`, {
            types: ["Booth"],
          });

          const targetBooth = listRes.data.results.find(
            (booth) => booth.booth_id.toString() === id.toString()
          );

          if (targetBooth) {
            setInitialLikesCount(targetBooth.like_cnt || 0);
            setInitialIsLiked(targetBooth.is_liked || false);
          } else {
            setInitialLikesCount(0);
            setInitialIsLiked(false);
          }
        } catch (listError) {
          console.error("부스 목록 조회 실패:", listError);
          setInitialLikesCount(0);
          setInitialIsLiked(false);
        }
      } catch (err) {
        console.error("BoothDetail API 실패", err);
        setBooth(null);
      }
    };

    fetchBoothDetail();
  }, [id]);

  // 부스 데이터 번역 요청
  useEffect(() => {
    if (!booth) return;

    // 부스 이름 번역 요청
    if (booth.name) {
      requestSingleTranslation({
        entity_type: "booth",
        entity_id: booth.booth_id?.toString() || id,
        field: "BoothName",
        source_lang: "ko",
        source_text: booth.name,
      });
    }

    // 부스 위치 번역 요청
    if (booth.location_description) {
      requestSingleTranslation({
        entity_type: "booth",
        entity_id: booth.booth_id?.toString() || id,
        field: "BoothLocation",
        source_lang: "ko",
        source_text: booth.location_description,
      });
    }

    // 부스 설명 번역 요청
    if (booth.booth_description) {
      requestSingleTranslation({
        entity_type: "booth",
        entity_id: booth.booth_id?.toString() || id,
        field: "BoothDescription",
        source_lang: "ko",
        source_text: booth.booth_description,
      });
    }

    // 코너 이름들 번역 요청
    if (booth.corners && booth.corners.length > 0) {
      booth.corners.forEach((corner, index) => {
        if (corner.name) {
          requestSingleTranslation({
            entity_type: "booth",
            entity_id: booth.booth_id?.toString() || id,
            field: `CornerName_${index}`,
            source_lang: "ko",
            source_text: corner.name,
          });
        }
      });
    }
  }, [booth, id, requestSingleTranslation]);

  if (!booth) return <div className="p-6">{t("booth.loading")}</div>;

  return (
    <div className="flex flex-col w-[343px] mx-auto items-center pt-6 pb-8 space-y-3">
      {/* 상단 이미지 */}
      <div className="w-full h-[232px] rounded-[16px] bg-[#A1A1AA] flex items-center justify-center">
        <img
          src={booth.image_url || defaultImg}
          alt={booth.name}
          className="w-[343px] h-[232px] object-cover rounded-[16px]"
          onError={(e) => {
            e.currentTarget.src = defaultImg;
          }}
        />
      </div>

      {/* 카드 + Tail 전체 래퍼 */}
      <div className="relative w-full">
        {/* tail 이미지 */}
        <img
          src={tail}
          className="absolute -top-6 left-10 -translate-x-1/2 drop-shadow-[0_3px_5px_rgba(0,0,0,0.10)] filter z-0"
          alt={t("booth.tailAlt")}
        />

        {/* 카드 */}
        <div className="relative w-full bg-white shadow-md rounded-[16px] px-4 py-3 z-1000">
          <div className="flex justify-between items-start relative">
            {/* 왼쪽 영역 */}
            <div className="flex-1">
              {/* 부스 타입 + 이름 */}
              <div className="flex items-center gap-2 !mb-4">
                <span className="bg-[#EF7063] text-white px-2 py-1 rounded-full text-xs whitespace-nowrap">
                  {booth.is_night ? t("booth.nightBooth") : t("booth.dayBooth")}
                </span>
                <h1
                  className={`font-bold ${booth.name.length > 16
                    ? "text-[14.5px]"
                    : "text-lg"    // 기본 크기
                    }`}
                >
                  {getTranslation(
                    "booth",
                    booth.booth_id?.toString() || id,
                    "BoothName",
                    booth.name
                  )}
                </h1>

              </div>

              {/* 야간 부스 & 디오더 가능 표시 */}
              {booth.is_night && booth.is_dorder && (
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={CheckIcon}
                    alt="check"
                    className="w-[21.5px] h-[21.5px]"
                  />
                  <span className="text-red-500 text-sm font-medium">
                    {t("booth.dorderAvailable")}
                  </span>
                </div>
              )}

              {/* 운영 시간 */}
              {groupSchedules(booth.schedules).map((g, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 mt-1 text-[14px] text-gray-600"
                >
                  <img
                    src={TimeCircleIcon}
                    alt="time"
                    className="w-[21.5px] h-[21.5px]"
                  />
                  <span>
                    {g.days.join(", ")} {g.time}
                  </span>
                </div>
              ))}

              {/* 위치 */}
              <div className="flex items-center gap-2 mt-1 text-[14px] text-gray-600">
                <img
                  src={LocationIcon}
                  alt={t("booth.locationAlt")}
                  className="w-[21.5px] h-[24px]"
                />
                <span>
                  {getTranslation(
                    "booth",
                    booth.booth_id?.toString() || id,
                    "BoothLocation",
                    booth.location_name
                  )}
                </span>
              </div>
            </div>

            {/* 오른쪽 좋아요 */}
            <div className="flex flex-col items-center ml-4">
              <button
                onClick={toggleLike}
                disabled={loading}
                className="w-[25px] h-[24px] flex items-center justify-center hover:scale-110 transition-transform duration-200 disabled:opacity-50"
                aria-pressed={isLiked}
                aria-label={isLiked ? t("booth.unlike") : t("booth.like")}
              >
                <img
                  src={isLiked ? HeartIcon : UnheartIcon}
                  alt="좋아요"
                  className="w-5 h-5 transition-all duration-200"
                />
              </button>
              <span className="text-[#A1A1AA] text-sm font-semibold">
                {likesCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 소개 */}
      <div
        className={`w-full bg-white shadow rounded-[16px] px-[15px] py-[10px] ${booth.is_night ? "!mt-4" : "!mt-4"
          }`}
      >
        <h2 className="font-semibold mb-2 text-[#EF7063] text-sm">{t("booth.introduction")}</h2>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {booth.booth_description
            ? getTranslation(
              "booth",
              booth.booth_id?.toString() || id,
              "BoothDescription",
              booth.booth_description
            )
            : t("booth.noDescription")}
        </p>
      </div>

      {/* 디오더 상태 */}
      {booth.is_dorder &&
        (booth.booth_can_usage === true || booth.booth_can_usage === false) && (
          <div className="w-full bg-white shadow rounded-[13px] p-3 text-sm text-gray-700 !mt-4 !mb-2">
            {booth.booth_can_usage === "True" ? (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#E65B4D" />
                </svg>
                <span>{t("booth.dorderAvailableNow")}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#A1A1AA" />
                </svg>
                <span>{t("booth.dorderFull")}</span>
              </div>
            )}
          </div>
        )}


      {/* 운영 코너 */}
      {!booth.is_night && (
        <div className="w-full bg-white shadow rounded-[16px] px-[15px] py-[10px] !mt-4">
          <h2 className="font-semibold mb-2 text-[#EF7063] text-sm">
            {t("booth.corners")}
          </h2>
          {booth.corners?.length > 0 ? (
            <ul className="list-disc ml-5 text-sm">
              {booth.corners.map((c, i) => (
                <li key={i}>
                  {getTranslation(
                    "booth",
                    booth.booth_id?.toString() || id,
                    `CornerName_${i}`,
                    c.name
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-700">{t("booth.noCorners")}</p>
          )}
        </div>
      )}

      {/* 메뉴 */}
      <MenuSection menus={booth.menus} boothId={booth.booth_id || id} />

      {/* 디오더 안내문구 */}
      {booth.is_dorder && (
        <p className="mt-[16px] text-[15px] text-[#71717A] text-left w-full">
          {t("booth.dorderNotice")}
        </p>
      )}
    </div>
  );
}
