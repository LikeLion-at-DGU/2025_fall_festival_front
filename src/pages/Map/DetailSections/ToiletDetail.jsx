import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import NearbyBoothSection from "./NearbyBoothSection";
import LocationIcon from "../../../assets/images/icons/map-icons/Location.svg";
import TailIcon from "../../../assets/images/icons/map-icons/triangle.svg";
import { useTranslations } from "../../../context/TranslationContext";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fmtTime = (t) => (typeof t === "string" ? t.slice(0, 5) : t);

export default function ToiletDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { getTranslation, requestSingleTranslation } = useTranslations();
  const [toilet, setToilet] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/booths/detail/${id}/`)
      .then((res) => setToilet(res.data))
      .catch((err) => {
        console.error("ToiletDetail API 실패", err);
        setToilet(null);
      });
  }, [id]);

  // 화장실 데이터 번역 요청
  useEffect(() => {
    if (!toilet) return;

    // 화장실 이름 번역 요청
    if (toilet.name) {
      requestSingleTranslation({
        entity_type: "booth",
        entity_id: toilet.id?.toString() || id,
        field: "BoothName",
        source_lang: "ko",
        source_text: toilet.name,
      });
    }

    // 화장실 위치 번역 요청
    if (toilet.location_description) {
      requestSingleTranslation({
        entity_type: "booth",
        entity_id: toilet.id?.toString() || id,
        field: "BoothLocation",
        source_lang: "ko",
        source_text: toilet.location_description,
      });
    }
  }, [toilet, id, requestSingleTranslation]);

  if (!toilet) return <div className="p-6">{t("booth.loading")}</div>;

  return (
    <div className="pt-6 pb-8">
      {/* 상단 이미지 */}
      <div className="w-[343px] h-[232px] mx-auto bg-gray-200 flex items-center justify-center text-gray-500 rounded-[16px] overflow-hidden">
        {toilet.image_url ? (
          <img
            src={toilet.image_url}
            alt={toilet.name}
            className="w-[343px] h-[232px] object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none"; // 로딩 실패 시 숨김
            }}
          />
        ) : (
          "화장실 사진"
        )}
      </div>


      <div className="relative mx-4 mt-3">
        <img
          src={TailIcon}
          className="absolute -top-6 left-10 -translate-x-1/2 drop-shadow-[0_3px_5px_rgba(0,0,0,0.10)]"
          alt="tail"
        />
        {/* 카드 */}
        <div className="bg-white shadow-md rounded-[16px] px-4 py-3  relative z-10">
          {/* triangle tail */}


          <h1 className="text-lg font-bold">
            {getTranslation(
              "booth",
              toilet.id?.toString() || id,
              "BoothName",
              toilet.name
            )}
          </h1>

          {/* 운영 시간 */}
          {toilet.schedules?.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mt-1 text-sm text-gray-600"
            >
              <span>
                {s.day.slice(5)} {fmtTime(s.start_time)} ~ {fmtTime(s.end_time)}
              </span>
            </div>
          ))}

          {/* 위치 */}
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <img src={LocationIcon} alt="location" className="w-4 h-4" />
            <span>
              {getTranslation(
                "booth",
                toilet.id?.toString() || id,
                "BoothLocation",
                toilet.location_description
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 근처 부스 */}
      <NearbyBoothSection boothId={toilet.id} />
    </div>
  );
}
