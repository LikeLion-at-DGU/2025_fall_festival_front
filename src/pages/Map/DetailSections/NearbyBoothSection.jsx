import React, { useEffect, useState } from "react";
import axios from "axios";
import i18n from "i18next";

import { useBoothTranslation } from "../../../hooks/useTranslation";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../../assets/images/banners/default-img.png";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NearbyBoothSection({ boothId }) {
  const [nearby, setNearby] = useState(null);
  const { getTranslatedBooths } = useBoothTranslation(nearby?.booths);
  const { t } = useTranslation();
  const navigate = useNavigate();


  useEffect(() => {
    // 사용자 위치 요청
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        axios
          .post(`${BASE_URL}/booths/nearby/`, {
            user_location: { x: longitude, y: latitude }, // ✅ 실제 사용자 좌표
            is_night: null,
          })
          .then((res) => setNearby(res.data))
          .catch((err) => {
            console.error("Nearby API 실패", err);
            setNearby(null);
          });
      },
      (err) => {
        console.error("위치 권한 거부됨", err);
        setNearby(null);
      }
    );
  }, [boothId]);

  if (!nearby) {
    console.log("⛔ nearby 없음");
    return null;
  }

  console.log("✅ nearby 원본:", nearby);

  const translatedBooths = getTranslatedBooths();
  console.log("✅ 번역된 부스:", translatedBooths);

  // 현재 시간대 계산
  const now = new Date();
  const hour = now.getHours();
  const isNight = hour >= 17; // 17~23시는 야간

  const today = new Date().toISOString().split("T")[0];
  console.log("오늘 날짜:", today);
  console.log("현재 시간대:", isNight ? "야간" : "주간");
  

  const filteredBooths = translatedBooths.filter(
    (b) =>
      b.is_night === isNight &&
      b.business_days?.some((d) => d.day === today)
  );


  console.log("🎯 필터링된 부스:", filteredBooths);
  const limitedBooths = filteredBooths.slice(0, 3);

  return (
    <div className="mx-4 mt-8">
      <h2 className="font-semibold mb-1 text-[#EF7063] text-xl">
        {t("booth.nearbyRecommendation")}
      </h2>

      {/* 가로 스크롤 영역 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hidden pt-3">
        {limitedBooths.map((b) => (
          <div
            key={b.booth_id}
            onClick={() => navigate(`/comingsoon/booth/${b.booth_id}`)}
            className="relative bg-white shadow-md rounded-2xl p-3 flex-shrink-0 w-32 flex flex-col items-start mb-2"
          >
            {/* 이미지 */}
            <div className="relative w-[107px] h-[107px] flex items-center justify-center bg-gray-200 rounded-[8px] overflow-hidden">
              {b.image_url ? (
                <img
                  src={b.image_url}
                  alt={b.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = defaultImg;
                  }}
                />
              ) : (
                <img
                  src={defaultImg}
                  alt={b.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* 텍스트 */}
            <p className="mt-2 text-sm font-semibold text-left truncate w-full">
              {b.translatedName || b.name}
            </p>
            <p className="text-xs text-gray-500 text-left">
              {b.translatedCategory || b.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
