import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NearbyBoothSection({ boothId }) {
    const [nearby, setNearby] = useState(null);

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

    if (!nearby) return null;

    return (
        <div className="mx-4 mt-4">
            <h2 className="font-semibold mb-2 text-[#EF7063] text-xl">근처 운영 중인 부스 추천</h2>

            {/* 가로 스크롤 영역 */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hidden pt-3">
                {nearby.booths.map((b) => (
                    <div
                        key={b.id}
                        className="relative bg-white shadow-md rounded-2xl p-3 flex-shrink-0 w-32 flex flex-col items-start mb-2"
                    >
                        {/* 이미지 */}
                        <div className="relative w-[107px] h-[107px] flex items-center justify-center bg-gray-200 rounded-[16px]">
                            {b.image_url ? (
                                <img
                                    src={b.image_url}
                                    alt={b.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-xs text-gray-500">이미지 없음</span>
                            )}
                        </div>

                        {/* 텍스트 */}
                        <p className="mt-2 text-sm font-semibold text-left truncate w-full">
                            {b.name}
                        </p>
                        <p className="text-xs text-gray-500 text-left">{b.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
