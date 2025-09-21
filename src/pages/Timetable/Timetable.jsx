import React, { useState, useEffect } from "react";
import axios from "axios";

import dot from "../../assets/images/icons/Timetable-icons/dot.png"; // 선택된 동그라미
import dot2 from "../../assets/images/icons/Timetable-icons/empty-dot.png"; // 미선택 동그라미
import arrow from "../../assets/images/icons/Timetable-icons/arrow.png"; // 삼각형
import dirvana from "../../assets/images/icons/Timetable-icons/DIRVANA.svg";
import { useTranslations } from "../../context/TranslationContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Timetable() {
  const { getTranslation, requestSingleTranslation } = useTranslations();
  const [currentClubEvents, setCurrentClubEvents] = useState([]);
  const [remainingClubEvents, setRemainingClubEvents] = useState([]);
  const [celebrityEvents, setCelebrityEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState("2025-09-24");
  const [selectedHour, setSelectedHour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCelebrityMode, setIsCelebrityMode] = useState(false);

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

  // ✅ 초기 자동 선택 로직
  useEffect(() => {
    const now = new Date();

    // yyyy-mm-dd
    const todayStr = now.toISOString().slice(0, 10);
    // 현재 시
    const hour = now.getHours();

    // days 배열에서 오늘이 있는지 확인
    const availableDays = days.map((d) => d.value);

    if (availableDays.includes(todayStr) && hour >= 10 && hour <= 24) {
      // 현재 시간을 hh:00 형태로 맞춤
      const currentHourStr = `${hour.toString().padStart(2, "0")}:00`;
      setSelectedDay(todayStr);
      setSelectedHour(currentHourStr);
    } else {
      // 기본값: Day1 10:00
      setSelectedDay("2025-09-24");
      setSelectedHour("10:00");
    }
  }, []);

  // 시간 선택 시 → 현재/남은 동아리 + 연예인 공연 불러오기
  useEffect(() => {
    if (isCelebrityMode) return;
    if (!selectedHour) {
      setCurrentClubEvents([]);
      setRemainingClubEvents([]);
      setCelebrityEvents([]);
      return;
    }
    setLoading(true);
    axios
      .get(`${BASE_URL}/stage/days/${selectedDay}/schedules/${selectedHour}`)
      .then((res) => {
        const data = res?.data ?? {};
        setCurrentClubEvents(data.club?.current_slot ?? []);
        setRemainingClubEvents(data.club?.remaining ?? []);
        setCelebrityEvents(data.celebrity ?? []);
      })
      .catch((err) => {
        console.error("시간별 스케줄 불러오기 실패", err);
        setCurrentClubEvents([]);
        setRemainingClubEvents([]);
        setCelebrityEvents([]);
      })
      .finally(() => setLoading(false));
  }, [selectedDay, selectedHour, isCelebrityMode]);

  // 연예인 공연 모드 → 10:00 고정으로 조회 후 celebrity만 뽑기
  const fetchCelebrityEvents = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/stage/days/${selectedDay}/schedules/10:00`)
      .then((res) => {
        const data = res?.data ?? {};
        setCelebrityEvents(data.celebrity ?? []);
      })
      .catch((err) => {
        console.error("연예인 공연 불러오기 실패", err);
        setCelebrityEvents([]);
      })
      .finally(() => setLoading(false));
  };

  // 공연 데이터 번역 요청 트리거
  useEffect(() => {
    // 현재 공연 번역 요청
    currentClubEvents.forEach((event) => {
      if (event.name) {
        requestSingleTranslation({
          entity_type: "stage",
          entity_id: event.id?.toString() || event.name.toLowerCase(),
          field: "StageName",
          source_lang: "ko",
          source_text: event.name,
        });
      }
      if (event.location_name) {
        requestSingleTranslation({
          entity_type: "stage",
          entity_id: event.id?.toString() || event.name.toLowerCase(),
          field: "StageLocation",
          source_lang: "ko",
          source_text: event.location_name,
        });
      }
    });

    // 남은 공연 번역 요청
    remainingClubEvents.forEach((event) => {
      if (event.name) {
        requestSingleTranslation({
          entity_type: "stage",
          entity_id: event.id?.toString() || event.name.toLowerCase(),
          field: "StageName",
          source_lang: "ko",
          source_text: event.name,
        });
      }
      if (event.location_name) {
        requestSingleTranslation({
          entity_type: "stage",
          entity_id: event.id?.toString() || event.name.toLowerCase(),
          field: "StageLocation",
          source_lang: "ko",
          source_text: event.location_name,
        });
      }
    });

    // 연예인 공연 번역 요청
    celebrityEvents.forEach((event) => {
      if (event.name) {
        requestSingleTranslation({
          entity_type: "stage",
          entity_id: event.id?.toString() || event.name.toLowerCase(),
          field: "StageName",
          source_lang: "ko",
          source_text: event.name,
        });
      }
      if (event.location_name) {
        requestSingleTranslation({
          entity_type: "stage",
          entity_id: event.id?.toString() || event.name.toLowerCase(),
          field: "StageLocation",
          source_lang: "ko",
          source_text: event.location_name,
        });
      }
    });
  }, [
    currentClubEvents,
    remainingClubEvents,
    celebrityEvents,
    requestSingleTranslation,
  ]);

  return (
    <div className="font-sans flex flex-col gap-4 p-6 pt-3">
      {/* 날짜 탭 */}
      <div className="flex justify-between">
        {days.map((d) => (
          <button
            key={d.value}
            onClick={() => {
              setSelectedDay(d.value);
              setIsCelebrityMode(false);
              setSelectedHour(null);
            }}
            className={`pb-2 text-xl font-medium ${
              selectedDay === d.value
                ? "text-red-500 border-b-2 border-red-500"
                : "text-black"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* 시간 선택 바 + 연예인 버튼 */}
      <div
        className="flex overflow-x-auto gap-3 mt-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {hours.map((time) => (
          <div key={time} className="flex flex-col items-center">
            <span
              className={`px-2 pb-[1.5px] pt-[1.5px] rounded-full text-[16px] font-medium ${
                selectedHour === time && !isCelebrityMode
                  ? "bg-[#EF7063] text-white shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
                  : "text-[#71717A]"
              }`}
            >
              {time}
            </span>

            <button
              onClick={() => {
                setIsCelebrityMode(false);
                setSelectedHour(time);
              }}
              className="mt-2"
            >
              {selectedHour === time && !isCelebrityMode ? (
                <img src={dot} alt="selected" className="w-[30px] h-[30px]" />
              ) : (
                <img
                  src={dot2}
                  alt="unselected"
                  className="w-[27px] h-[26px]"
                />
              )}
            </button>

            {selectedHour === time && !isCelebrityMode && (
              <img src={arrow} alt="pointer" className="w-[28px] h-[28px]" />
            )}
          </div>
        ))}

        {/* 연예인 버튼 */}
        <div className="flex flex-col items-center">
          <span
            className={`whitespace-nowrap px-2 pb-[1.5px] pt-[1.5px] rounded-full text-[16px] font-[400] ${
              isCelebrityMode
                ? "bg-[#EF7063] text-white shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
                : "text-[#71717A]"
            }`}
          >
            연예인
          </span>

          <button
            onClick={() => {
              setIsCelebrityMode(true);
              setSelectedHour(null);
              fetchCelebrityEvents();
            }}
            className="mt-2"
          >
            {isCelebrityMode ? (
              <img src={dot} alt="selected" className="w-[30px] h-[30px]" />
            ) : (
              <img src={dot2} alt="unselected" className="w-[27px] h-[26px]" />
            )}
          </button>

          {isCelebrityMode && (
            <img src={arrow} alt="pointer" className="w-[28px] h-[28px]" />
          )}
        </div>
      </div>

      {/* 공연 리스트 */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <p className="text-center text-gray-400">불러오는 중...</p>
        ) : isCelebrityMode ? (
          celebrityEvents.length > 0 ? (
            celebrityEvents.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-[13px] px-[14px] py-[18px] rounded-[16px] 
                  border bg-white shadow-[0_3px_5px_rgba(0,0,0,0.10)] 
                  ${s.is_active ? "border-[#EF7063]" : "border-[#E4E4E7]"}`}
              >
                <img
                  src={s.image_url}
                  alt={s.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex flex-row items-center gap-[10px]">
                  <p className="text-5 font-semibold">
                    {getTranslation(
                      "stage",
                      s.id?.toString() || s.name.toLowerCase(),
                      "StageName",
                      s.name
                    )}
                  </p>
                  <p className="text-sm text-gray-600">
                    {getTranslation(
                      "stage",
                      s.id?.toString() || s.name.toLowerCase(),
                      "StageLocation",
                      s.location_name
                    )}
                  </p>
                  {/* ⛔ 연예인 모드에서는 시간 표시 안함 */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">연예인 공연이 없습니다</p>
          )
        ) : currentClubEvents.length > 0 ? (
          <>
            {/* 현재 공연 */}
            {currentClubEvents.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-[13px] px-[14px] pr-[75px] py-[18px] rounded-[16px] 
                  border bg-white shadow-[0_3px_5px_rgba(0,0,0,0.10)] 
                  ${s.is_active ? "border-[#EF7063]" : "border-[#E4E4E7]"}`}
              >
                <img
                  src={s.image_url || "/images/placeholder.jpg"}
                  alt={s.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">
                    {(s.start_time || "").slice(11, 16)} -{" "}
                    {(s.end_time || "").slice(11, 16)}
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <p className="text-5 font-semibold">
                      {getTranslation(
                        "stage",
                        s.id?.toString() || s.name.toLowerCase(),
                        "StageName",
                        s.name
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      {getTranslation(
                        "stage",
                        s.id?.toString() || s.name.toLowerCase(),
                        "StageLocation",
                        s.location_name
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* 바로 다음 공연 (동아리 remaining + 연예인) */}
            {(remainingClubEvents.length > 0 || celebrityEvents.length > 0) && (
              <div className="mt-4">
                <p className="text-sm text-[#71717A] mb-5">
                  바로 다음 공연도 확인해보세요
                </p>
                <div className="flex flex-col gap-6">
                  {[...remainingClubEvents, ...celebrityEvents].map((s) => (
                    <div
                      key={s.id}
                      className={`flex items-center gap-[13px] px-[14px] pr-[75px] py-[18px] rounded-[16px] 
                        border bg-white shadow-[0_3px_5px_rgba(0,0,0,0.10)] 
                        ${
                          s.is_active ? "border-[#EF7063]" : "border-[#E4E4E7]"
                        }`}
                    >
                      <img
                        src={s.image_url || "/images/placeholder.jpg"}
                        alt={s.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex flex-col">
                        {/* ⛔ 연예인 공연은 시간 표시하지 않음 */}
                        {remainingClubEvents.some((c) => c.id === s.id) && (
                          <p className="text-sm text-[#A1A1AA]">
                            {(s.start_time || "").slice(11, 16)} -{" "}
                            {(s.end_time || "").slice(11, 16)}
                          </p>
                        )}
                        <div className="flex items-center gap-[10px]">
                          <p className="text-5 font-semibold text-[#A1A1AA]">
                            {getTranslation(
                              "stage",
                              s.id?.toString() || s.name.toLowerCase(),
                              "StageName",
                              s.name
                            )}
                          </p>
                          <p className="text-sm text-[#A1A1AA]">
                            {getTranslation(
                              "stage",
                              s.id?.toString() || s.name.toLowerCase(),
                              "StageLocation",
                              s.location_name
                            )}
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
          <div className="flex flex-col items-center gap-6 pt-20">
            <img
              src={dirvana}
              alt="no timetable"
              className="mt-4 w-[224.556px] h-[43px]"
            />
            <p className="text-center text-[#71717A] text-xl font-medium">
              진행 중인 공연이 없어요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
