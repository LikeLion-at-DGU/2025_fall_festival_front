import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import NearbyBoothSection from "./NearbyBoothSection";
import LocationIcon from "../../../assets/images/icons/map-icons/Location.svg";
import TailIcon from "../../../assets/images/icons/map-icons/triangle.svg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fmtTime = (t) => (typeof t === "string" ? t.slice(0, 5) : t);

export default function ToiletDetail() {
    const { id } = useParams();
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

    if (!toilet) return <div className="p-6">로딩 중...</div>;

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

            {/* 카드 */}
            <div className="bg-white shadow-md rounded-[16px] px-4 py-3 mx-4 mt-3 relative z-10">
                {/* triangle tail */}
                <img
                    src={TailIcon}
                    className="absolute -top-6 left-10 -translate-x-1/2"
                    alt="tail"
                />

                <h1 className="text-lg font-bold">{toilet.name}</h1>

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
                    <span>{toilet.location_description}</span>
                </div>
            </div>

            {/* 근처 부스 */}
            <NearbyBoothSection boothId={toilet.id} />
        </div>
    );
}
