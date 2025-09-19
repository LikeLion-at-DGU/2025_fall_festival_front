import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import MenuSection from "./MenuSection";
import NearbyBoothSection from "./NearbyBoothSection";
import useBoothLikes from "../../../hooks/useBoothLikes";

import CheckIcon from "../../../assets/images/icons/map-icons/Check.svg";
import HeartIcon from "../../../assets/images/icons/map-icons/Heart.svg";
import UnheartIcon from "../../../assets/images/icons/map-icons/Unheart.svg";
import TimeCircleIcon from "../../../assets/images/icons/map-icons/TimeCircle.svg";
import LocationIcon from "../../../assets/images/icons/map-icons/Location.svg";
import tail from "../../../assets/images/icons/map-icons/triangle.svg"

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fmtTime = (t) => (typeof t === "string" ? t.slice(0, 5) : t);

// 요일 매핑
const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

// 스케줄 그룹핑 함수 (같은 시간대면 요일 묶기)
function groupSchedules(schedules) {
  if (!schedules) return [];

  const groups = {};
  schedules.forEach((s) => {
    const date = new Date(s.day);
    const dayName = weekdays[date.getDay()];
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
    const [booth, setBooth] = useState(null);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/booths/detail/${id}/`)
            .then((res) => setBooth(res.data))
            .catch((err) => {
                console.error("BoothDetail API 실패", err);
                setBooth(null);
            });
    }, [id]);

    if (!booth) return <div className="p-6">로딩 중...</div>;

    return (
        <div className="flex flex-col w-[343px] mx-auto items-center pt-6 pb-8 space-y-4">
            {/* 상단 이미지 */}
            <div className="w-full h-[232px] rounded-[16px] mx-auto bg-[#676767] flex items-center justify-center">
                {booth.image_url && (
                    <img
                        src={booth.image_url}
                        alt={booth.name}
                        className="w-[343px] h-[232px] object-cover"
                        onError={(e) => {
                            e.currentTarget.style.display = "none"; // 로딩 실패 → 안보이게
                        }}
                    />
                )}

            </div>

            {/* 야간 부스 & 디오더 가능 표시 */}
            {booth.is_night && booth.is_dorder && (
              <div className="flex items-center gap-1 mt-2">
                <img src={CheckIcon} alt="check" className="w-4 h-4" />
                <span className="text-red-500 text-sm font-medium">
                  디오더 사용 가능 주점
                </span>
              </div>
            )}


            {/* 카드 */}
            <div className="relative w-full bg-white shadow-md rounded-[16px] px-4 py-3 mx-4 mt-3 relative z-10">
                <img src={tail}  className="absolute -top-6 left-10 -translate-x-1/2"/>
                <div className="flex justify-between items-start">
                    {/* 왼쪽 영역 */}
                    <div className="flex-1">
                        {/* 부스 타입 + 이름 */}
                        <div className="flex items-center gap-2">
                            <span className="bg-[#EF7063] text-white px-2 py-1 rounded-full text-xs">
                                {booth.is_night ? "야간부스" : "주간부스"}
                            </span>
                            <h1 className="text-lg font-bold">{booth.name}</h1>
                        </div>

                        {/* 야간 부스 & 디오더 가능 표시 */}
                        {booth.is_night && booth.is_dorder && (
                            <div className="flex items-center gap-1 mt-2">
                                <img src={CheckIcon} alt="check" className="w-4 h-4" />
                                <span className="text-red-500 text-sm font-medium">
                                    디오더 사용 가능 주점
                                </span>
                            </div>
                        )}

                        {/* 운영 시간 (요일 그룹핑) */}
                        {groupSchedules(booth.schedules).map((g, i) => (
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
                            <span>{booth.location_description}</span>
                        </div>
                    </div>

                    {/* 오른쪽 좋아요 */}
                    <div className="flex flex-col items-center ml-4">
                        <img src={HeartIcon} alt="heart" className="w-5 h-5" />
                        <span className="text-gray-700 text-sm font-semibold">
                            {booth.likes_count || 0}
                        </span>
                    </div>
                </div>
            </div>

            {/* 소개 */}
            <div className="w-full bg-white shadow rounded-[16px] px-[15px] py-[10px] mx-4 mt-4">
                <h2 className="font-semibold mb-2 text-[#EF7063] text-sm">부스 소개</h2>
                <p className="text-sm text-gray-700">
                    {booth.booth_description || "소개글이 없습니다."}
                </p>
            </div>

            {/* 디오더 상태 */}
            {booth.is_dorder && (
                <div className="w-full bg-white shadow rounded-[13px] p-3 mx-4 mt-3 text-sm text-gray-700">
                    {booth.booth_can_usage === "True" ? (
                        <div className="flex items-center gap-2">
                            {/* 빨간 원 */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                            >
                                <circle cx="5" cy="5" r="5" fill="#E65B4D" />
                            </svg>
                            <span>현재 바로 입장 가능합니다.</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            {/* 회색 원 */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                            >
                                <circle cx="5" cy="5" r="5" fill="#A1A1AA" />
                            </svg>
                            <span>현재 만석입니다.</span>
                        </div>
                    )}
                </div>
            )}

            {/* 운영 코너 */}
            {!booth.is_night && (
                <div className="w-full bg-white shadow rounded-[16px] px-[15px] py-[10px] mx-4 mt-4">
                    <h2 className="font-semibold mb-2 text-[#EF7063] text-sm">운영 코너</h2>
                    {booth.corners?.length > 0 ? (
                        <ul className="list-disc ml-5 text-sm">
                            {booth.corners.map((c, i) => (
                                <li key={i}>{c.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-700">운영 코너가 없습니다.</p>
                    )}
                </div>
            )}


            {/* 메뉴 */}
            <MenuSection menus={booth.menus} />

          
        </div>
      )}

      {/* 메뉴 */}
      <MenuSection menus={booth.menus} />
    </div>
  );
}
