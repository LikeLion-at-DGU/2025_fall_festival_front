import React, { useState, useEffect } from "react";
import axios from "axios";

import EllipseIcon from "../../assets/images/icons/Timetable-icons/Ellipse.svg";     // 선택된 동그라미
import EllipseIcon2 from "../../assets/images/icons/Timetable-icons/Ellipse2.svg";   // 미선택 동그라미 (img로 사용)
import VectorIcon from "../../assets/images/icons/Timetable-icons/Vector.svg";       // 삼각형 (img로 사용)

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Timetable() {
  const [schedules, setSchedules] = useState([]);         // 하루 전체 일정
  const [selectedEvents, setSelectedEvents] = useState([]); // 선택된 시간 일정 (백엔드에서 조회)
  const [selectedDay, setSelectedDay] = useState("2025-09-24");
  const [selectedHour, setSelectedHour] = useState(null);   // 기본 미선택
  const [loading, setLoading] = useState(true);

  const days = [
    { label: "Day1", value: "2025-09-24" },
    { label: "Day2", value: "2025-09-25" },
    { label: "Day3", value: "2025-09-26" },
  ];

  // 10:00 ~ 24:00 한시간 단위 배열
  const hours = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 10;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  // 날짜 바뀔 때 → 하루 전체 공연 불러오기
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/stage/days/${selectedDay}/schedules/`)
      .then((res) => {
        const list = res?.data?.schedules ?? [];
        console.log("📌 날짜별 전체 스케줄:", selectedDay, list); 
        setSchedules(list);
      })
      .catch((err) => {
        console.error("날짜별 스케줄 불러오기 실패", err);
        setSchedules([]);
      })
      .finally(() => setLoading(false));
  }, [selectedDay]);

  // 시간 바뀔 때 → 해당 시간대 공연 불러오기 (미선택이면 비움)
  useEffect(() => {
    if (!selectedHour) {
      setSelectedEvents([]);
      console.log("⚪ 시간 선택 안됨 → selectedEvents 초기화");
      return;
    }
    setLoading(true);
    axios
      .get(`${BASE_URL}/stage/days/${selectedDay}/schedules/${selectedHour}/`)
      .then((res) => {
        const list = res?.data?.schedules ?? [];
        console.log(
        "📌 시간대별 스케줄:",
        selectedDay,
        selectedHour,
        list
      );  
        setSelectedEvents(list);
      })
      .catch((err) => {
        console.error("시간대별 스케줄 불러오기 실패", err);
        setSelectedEvents([]);
      })
      .finally(() => setLoading(false));
  }, [selectedDay, selectedHour]);

  // “바로 다음 공연” = 하루 전체에서 선택된 시간 이후 + 선택된 공연 제외
  const upcomingEvents = selectedHour
    ? schedules.filter(
      (s) =>
        (s.start_time || "").slice(11, 16) > selectedHour &&
        !selectedEvents.some(
          (se) => (se.stage_id ?? se.id) === (s.stage_id ?? s.id)
        )
    )
    : [];

  return (
    <div className="font-sans flex flex-col gap-4 p-6 pt-3">
      {/* 날짜 탭 */}
      <div className="flex justify-between">
        {days.map((d) => (
          <button
            key={d.value}
            onClick={() => {
              setSelectedDay(d.value);
              // 날짜 바꾸면 시간 선택 유지(요청사항X) — 기본 로직 유지
            }}
            className={`pb-2 text-xl font-medium ${selectedDay === d.value
                ? "text-red-500 border-b-2 border-red-500"
                : "text-black"
              }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* 시간 선택 바 */}
      <div
        className="flex overflow-x-auto gap-3 mt-3"
        style={{
          scrollbarWidth: "none",   // Firefox
          msOverflowStyle: "none",  // IE/Edge
        }}
      >
        {hours.map((time) => (
          <div key={time} className="flex flex-col items-center">
            <span
              className={`font-sans px-2 pb-0.5 pt-1 rounded-full text-[16px] font-medium ${selectedHour === time
                  ? "bg-[#EF7063] text-white shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
                  : "text-[#71717A]"
                }`}
            >
              {time}
            </span>

            <button onClick={() => setSelectedHour(time)} className="mt-2">
              {selectedHour === time ? (
                <img
                  src={EllipseIcon}
                  alt="selected"
                  className="w-[30px] h-[30px]"
                />
              ) : (
                <img
                  src={EllipseIcon2}
                  alt="unselected"
                  className="w-[27px] h-[26px]"
                />
              )}
            </button>

            {/* ▼ 삼각형 포인터 (선택된 시간만 표시) */}
            {selectedHour === time && (
              <img
                src={VectorIcon}
                alt="pointer"
                className="w-[28px] h-[28px]"
              />
            )}
          </div>
        ))}
      </div>

      {/* 공연 리스트 */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <p className="font-sans text-center text-gray-400">불러오는 중...</p>
        ) : selectedEvents.length > 0 ? (
          <>
            {selectedEvents.map((s) => (
              <div
                key={s.stage_id ?? s.id}
                className="flex items-center gap-[13px] px-[14px] pr-[75px] py-[18px] rounded-[16px] border border-[#E4E4E7] bg-white shadow-[0_3px_5px_rgba(0,0,0,0.10)]"
              >
                <img
                  src={s.image_url || "/images/placeholder.jpg"}
                  alt={s.stage_name || s.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">
                    {(s.start_time || "").slice(11, 16)} -{" "}
                    {(s.end_time || "").slice(11, 16)}
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <p className="text-lg font-semibold">
                      {s.stage_name || s.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {s.location?.name || s.location_name}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {upcomingEvents.length > 0 && (
              <div className="mt-4">
                <p className="font-sans text-sm text-[#71717A] mb-5">
                  바로 다음 공연도 확인해보세요
                </p>
                <div className="flex flex-col gap-6">
                  {upcomingEvents.map((s) => (
                    <div
                      key={s.stage_id ?? s.id}
                      className="flex items-center gap-[13px] px-[14px] pr-[75px] py-[18px] rounded-[16px] border border-[#E4E4E7] bg-white shadow-[0_3px_5px_rgba(0,0,0,0.10)]"
                    >
                      <img
                        src={s.image_url || "/images/placeholder.jpg"}
                        alt={s.stage_name || s.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-500">
                          {(s.start_time || "").slice(11, 16)} -{" "}
                          {(s.end_time || "").slice(11, 16)}
                        </p>
                        <div className="flex items-center gap-[10px]">
                          <p className="text-lg font-semibold">
                            {s.stage_name || s.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {s.location?.name || s.location_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="font-sans text-center text-[#000] text-xl font-medium mt-14">
            진행 중인 공연이 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
