// src/pages/Timetable/Timetable.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

import dot from "../../assets/images/icons/Timetable-icons/dot.png"; // 선택된 동그라미
import dot2 from "../../assets/images/icons/Timetable-icons/empty-dot.png"; // 미선택 동그라미
import arrow from "../../assets/images/icons/Timetable-icons/arrow.png"; // 삼각형
import dirvana from "../../assets/images/icons/Timetable-icons/DIRVANA.svg";
import base from "../../assets/images/icons/Timetable-icons/base.svg";

import { useTranslations } from "../../context/TranslationContext";
import { useTranslation } from "react-i18next";
import { createStageTranslationItems } from "../../utils/translationApi";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const reorderCelebrityEvents = (events, day) => {
  if (day === "2025-09-25") {
    const order = ["SOLE", "FTISLAND", "ILLIT"];
    return order
      .map(name =>
        events.find(e => e.name?.toUpperCase().includes(name.toUpperCase()))
      )
      .filter(Boolean);
  }

  if (day === "2025-09-26") {
    const order = ["하하", "창모", "fromis_9"];
    return order
      .map(name =>
        events.find(e => e.name?.toUpperCase().includes(name.toUpperCase()))
      )
      .filter(Boolean);
  }

  return events;
};

export default function Timetable() {
  const { t } = useTranslation();
  const { getTranslation, requestBatchTranslations } = useTranslations();

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

  // 15:00 ~ 19:00 한시간 단위 배열
  const hours = ["15:00", "16:00", "17:00", "18:00", "19:00"];

  // 초기 자동 선택 로직
  useEffect(() => {
    const now = new Date();
    const todayStr = now.toLocaleDateString("en-CA");
    const hour = now.getHours();

    const availableDays = days.map((d) => d.value);

    if (availableDays.includes(todayStr) && hour >= 15 && hour <= 19) {
      const currentHourStr = `${hour.toString().padStart(2, "0")}:00`;
      setSelectedDay(todayStr);
      setSelectedHour(currentHourStr);
    } else {
      if (availableDays.includes(todayStr)) {
        setSelectedDay(todayStr);
        setSelectedHour("15:00");
      } else {
        setSelectedDay(days[0].value);
        setSelectedHour("15:00");
      }
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
        setCelebrityEvents(
          reorderCelebrityEvents(data.celebrity ?? [], selectedDay)
        );
      })
      .catch((err) => {
        console.error("시간별 스케줄 불러오기 실패", err);
        setCurrentClubEvents([]);
        setRemainingClubEvents([]);
        setCelebrityEvents([]);
      })
      .finally(() => setLoading(false));
  }, [selectedDay, selectedHour, isCelebrityMode]);

  // 연예인 공연 모드 → 15:00 고정으로 조회 후 celebrity만 뽑기
  const fetchCelebrityEvents = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/stage/days/${selectedDay}/schedules/15:00`)
      .then((res) => {
        const data = res?.data ?? {};
        setCelebrityEvents(
          reorderCelebrityEvents(data.celebrity ?? [], selectedDay)
        );
      })
      .catch((err) => {
        console.error("연예인 공연 불러오기 실패", err);
        setCelebrityEvents([]);
      })
      .finally(() => setLoading(false));
  };

  // ✅ 공연 데이터 번역 요청 → 배치로 통합
  useEffect(() => {
    const allEvents = [
      ...currentClubEvents,
      ...remainingClubEvents,
      ...celebrityEvents,
    ];
    if (allEvents.length > 0) {
      const translationItems = createStageTranslationItems(allEvents);
      requestBatchTranslations(translationItems);
    }
  }, [
    currentClubEvents,
    remainingClubEvents,
    celebrityEvents,
    requestBatchTranslations,
  ]);

  return (
    <div className="font-sans flex flex-col gap-4 p-6 pt-6">
      {/* 날짜 탭 */}
      <div className="flex justify-around">
        {days.map((d) => (
          <button
            key={d.value}
            onClick={() => {
              setSelectedDay(d.value);
              setIsCelebrityMode(false);
              setSelectedHour(null);
            }}
            className={`px-[16px] pt-[4px] pb-[8px] text-xl font-medium ${
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
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
                <img src={dot2} alt="unselected" className="w-[27px] h-[26px]" />
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
            {t("timetable.celebrity")}
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
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#A1A1AA]"></div>
          </div>
        ) : selectedDay === "2025-09-24" ? (
          <div className="flex flex-col items-center gap-6 pt-20">
            <img
              src={dirvana}
              alt="no timetable"
              className="mt-4 w-[185px] h-[35px]"
            />
            <p className="text-center text-[#A1A1AA] text-[16px] font-[400]">
              {t("timetable.noEventToday")}
            </p>
          </div>
        ) : isCelebrityMode ? (
          celebrityEvents.length > 0 ? (
            celebrityEvents.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-[13px] p-[16px] rounded-[16px] 
                  border bg-white shadow-[0_3px_5px_rgba(0,0,0,0.10)] 
                  ${s.is_active ? "border-[#EF7063]" : "border-[#E4E4E7]"}`}
              >
                <img
                  src={s.image_url || base}
                  alt={s.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex flex-col">
                  {/* ✅ 연예인 공연도 시간 표시 */}
                  <p className="text-sm text-gray-500">
                    {(s.start_time || "").slice(11, 16)} -{" "}
                    {(s.end_time || "").slice(11, 16)}
                  </p>
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
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">
              {t("timetable.noCelebrity")}
            </p>
          )
        ) : currentClubEvents.length > 0 ? (
          <>
            {/* 현재 공연 */}
            {currentClubEvents.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-[13px] p-[16px] pr-[75px] rounded-[16px] 
                  border bg-white shadow-[0_3px_5px_rgba(0,0,0,0.10)] 
                  ${s.is_active ? "border-[#EF7063]" : "border-[#E4E4E7]"}`}
              >
                <img
                  src={s.image_url || base}
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
                <p className="text-sm text-[#71717A] mb-3 ml-1">
                  {t("timetable.nextStage")}
                </p>
                <div className="flex flex-col gap-4">
                  {[...remainingClubEvents, ...celebrityEvents].map((s) => (
                    <div
                      key={s.id}
                      className={`flex items-center gap-[13px] p-[16px] pr-[75px] rounded-[16px] 
                        border bg-white shadow-[0_3px_5px_rgba(0,0,0,0.10)] 
                        ${s.is_active ? "border-[#EF7063]" : "border-[#E4E4E7]"}`}
                    >
                      <img
                        src={s.image_url || base}
                        alt={s.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex flex-col">
                        {/* ✅ 남은 공연(동아리/연예인)도 시간 표시 */}
                        <p className="text-sm text-[#A1A1AA]">
                          {(s.start_time || "").slice(11, 16)} -{" "}
                          {(s.end_time || "").slice(11, 16)}
                        </p>
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
              className="mt-4 w-[185px] h-[35px]"
            />
            <p className="text-center text-[#A1A1AA] text-[16px] font-[400]">
              {t("timetable.noStage")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
