import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuSection from "./MenuSection";
import NearbyBoothSection from "./NearbyBoothSection";
import TimeCircleIcon from "../../../assets/images/icons/map-icons/TimeCircle.svg";
import LocationIcon from "../../../assets/images/icons/map-icons/Location.svg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fmtTime = (t) => (typeof t === "string" ? t.slice(0, 5) : t);

// 요일 매핑
const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

// 스케줄 그룹핑 (같은 시간대면 요일 묶기)
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

export default function DrinkDetail() {
    const { id } = useParams();
    const [drink, setDrink] = useState(null);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/booths/detail/${id}/`)
            .then((res) => setDrink(res.data));
    }, [id]);

    if (!drink) return <div className="p-6">로딩 중...</div>;

    return (
        <div className="pt-6 pb-8">
            {/* 상단 이미지 */}
            <div className="w-[343px] h-[232px] mx-auto bg-gray-200 flex items-center justify-center text-gray-500">
                {drink.image_url ? (
                    <img
                        src={drink.image_url}
                        alt={drink.name}
                        className="w-[343px] h-[232px] object-cover"
                    />
                ) : (
                    "주류 부스 사진"
                )}
            </div>

            {/* 카드 */}
            <div className="bg-white shadow-md rounded-[16px] px-4 py-3 mx-4 mt-3 relative z-10">
                <h1 className="text-lg font-bold">{drink.name}</h1>

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
                    <span>{drink.location_description}</span>
                </div>
            </div>

            {/* 메뉴 */}
            <MenuSection menus={drink.menus} />

            {/* 근처 부스 */}
            <NearbyBoothSection boothId={drink.id} />
        </div>
    );
}
