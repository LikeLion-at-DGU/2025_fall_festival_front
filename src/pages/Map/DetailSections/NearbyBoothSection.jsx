import React, { useEffect, useState } from "react";
import axios from "axios";
import { useBoothTranslation } from "../../../hooks/useTranslation";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../../assets/images/banners/default-img.png";
import { BASE_PATH } from "../../../config/routes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NearbyBoothSection({ boothId }) {
  const [booths, setBooths] = useState([]);
  const { getTranslatedBooths } = useBoothTranslation(booths);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        // 📌 한국 시간/날짜 계산
        const now = new Date();
        const today = now.toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
        const hour = now.getHours();
        const isNight = hour >= 17; // 오후 5시 이후는 야간

        // 📌 /booths/list/ 호출 (좌표 X)
        const res = await axios.post(`${BASE_URL}/booths/list/`, {
          date: today,
          is_night: isNight,
          types: ["Booth"],
        });

        const results = res.data.results || [];

        console.log("📦 API 결과 원본:", res.data);
        console.log("📦 부스 리스트:", results);

        // 📌 랜덤 3개 선택
        const shuffled = results.sort(() => 0.5 - Math.random());
        const limited = shuffled.slice(0, 3);

        setBooths(limited);
      } catch (err) {
        console.error("Booth list API 실패", err);
        setBooths([]);
      }
    };

    fetchBooths();
  }, [boothId]);

  if (!booths.length) {
    return null;
  }

  const translatedBooths = getTranslatedBooths();

  return (
    <div className="mx-4 mt-8">
      <h2 className="font-semibold mb-1 text-[#EF7063] text-xl">
        {t("booth.nearbyRecommendation")}
      </h2>

      {/* 가로 스크롤 영역 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hidden pt-3">
        {translatedBooths.map((b) => (
          <div
            key={b.booth_id || b.id}
            onClick={() => navigate(`${BASE_PATH}/booth/${b.booth_id || b.id}`)}
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
