import React, { useState, useEffect } from "react";
import EllipseIcon from "../../assets/images/icons/Timetable-icons/Ellipse.svg";


// ✅ 임시 데이터 (나중에 분리 예정)
const mockSchedules = {
  "2025-09-25": [
    {
      stage_id: 1,
      stage_name: "아이유",
      start_time: "2025-09-25T10:00:00+09:00",
      end_time: "2025-09-25T11:00:00+09:00",
      image_url: "/images/iu.jpg",
      location: { name: "대운동장" },
    },
    {
      stage_id: 2,
      stage_name: "NewJeans",
      start_time: "2025-09-25T12:00:00+09:00",
      end_time: "2025-09-25T13:00:00+09:00",
      image_url: "/images/nj.jpg",
      location: { name: "대운동장" },
    },
    {
      stage_id: 3,
      stage_name: "ILLIT",
      start_time: "2025-09-25T13:00:00+09:00",
      end_time: "2025-09-25T14:00:00+09:00",
      image_url: "/images/illit.jpg",
      location: { name: "대운동장" },
    },
    {
      stage_id: 4,
      stage_name: "창모",
      start_time: "2025-09-25T19:00:00+09:00",
      end_time: "2025-09-25T19:50:00+09:00",
      image_url: "/images/changmo.jpg",
      location: { name: "대운동장" },
    },
    {
      stage_id: 5,
      stage_name: "하하",
      start_time: "2025-09-25T20:00:00+09:00",
      end_time: "2025-09-25T21:00:00+09:00",
      image_url: "/images/haha.jpg",
      location: { name: "대운동장" },
    },
  ],
  "2025-09-26": [
    {
      stage_id: 6,
      stage_name: "세븐틴",
      start_time: "2025-09-26T11:00:00+09:00",
      end_time: "2025-09-26T12:00:00+09:00",
      image_url: "/images/seventeen.jpg",
      location: { name: "잔디광장" },
    },
    {
      stage_id: 7,
      stage_name: "르세라핌",
      start_time: "2025-09-26T15:00:00+09:00",
      end_time: "2025-09-26T16:00:00+09:00",
      image_url: "/images/lesserafim.jpg",
      location: { name: "잔디광장" },
    },
  ],
  "2025-09-27": [
    {
      stage_id: 8,
      stage_name: "BTS 지민",
      start_time: "2025-09-27T18:00:00+09:00",
      end_time: "2025-09-27T19:00:00+09:00",
      image_url: "/images/jimin.jpg",
      location: { name: "대강당" },
    },
  ],
};

// 지금은 mockData 반환 → 나중에 axios로 교체
async function fetchSchedulesByDay(day) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSchedules[day] || []);
    }, 300); // 로딩 시뮬레이션
  });
}

export default function Timetable() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDay, setSelectedDay] = useState("2025-09-25");
  const [selectedHour, setSelectedHour] = useState("12:00");
  const [loading, setLoading] = useState(true);

  const days = [
    { label: "Day1", value: "2025-09-25" },
    { label: "Day2", value: "2025-09-26" },
    { label: "Day3", value: "2025-09-27" },
  ];

  // 10:00 ~ 24:00 한시간 단위 배열
  const hours = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 10;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  useEffect(() => {
    setLoading(true);
    fetchSchedulesByDay(selectedDay).then((data) => {
      setSchedules(data);
      setLoading(false);
    });
  }, [selectedDay]);

  // 선택된 시간대 공연
  const selectedEvents = schedules.filter((s) => {
    const startHour = s.start_time.slice(11, 13);
    return startHour === selectedHour.slice(0, 2);
  });

  // "바로 다음 공연" = 선택된 시간대 공연 제외 + 이후 시간 공연
  const upcomingEvents = schedules.filter(
    (s) =>
      s.start_time.slice(11, 16) > selectedHour &&
      !selectedEvents.some((se) => se.stage_id === s.stage_id)
  );

  return (
    <div className="font-sans flex flex-col gap-4 p-6 pt-20">
      {/* 날짜 탭 */}
      <div className="flex justify-between">
        {days.map((d) => (
          <button
            key={d.value}
            onClick={() => setSelectedDay(d.value)}
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
      <div className="flex overflow-x-auto gap-6 mt-3"
        style={{
          scrollbarWidth: "none",   // Firefox
          msOverflowStyle: "none",  // IE/Edge
        }}>
        {hours.map((time) => (
          <div key={time} className="flex flex-col items-center">
            {/* 시간 텍스트 */}
            <span
              className={`px-2 pb-0.5 pt-1 rounded-full text-sm font-medium ${selectedHour === time
                ? "bg-[#EF7063] text-white shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
                : "text-[#71717A]"
                }`}
            >
              {time}
            </span>

            {/* 동그라미 체크박스 */}
            <button onClick={() => setSelectedHour(time)} className="mt-2">
              {selectedHour === time ? (
                // ✅ 선택된 동그라미 → Ellipse.svg 사용
                <img src={EllipseIcon} alt="selected" className="w-[30px] h-[30px]" />
              ) : (
                // ⭕ 선택 안된 동그라미 → 기존 svg 그대로
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none">
                  <g filter="url(#filter0_d_597_1823)">
                    <circle cx="13.5" cy="12" r="9" fill="white" />
                    <circle cx="13.5" cy="12" r="8.5" stroke="#A1A1AA" />
                  </g>
                  <defs>
                    <filter id="filter0_d_597_1823" x="0.5" y="0" width="26" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_597_1823" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_597_1823" result="shape" />
                    </filter>
                  </defs>
                </svg>
              )}
            </button>

            {/* ▼ 삼각형 */}
            {selectedHour === time && (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <g filter="url(#filter0_d_597_1807)">
                  <path d="M14 9L4 3L14 23L24 3L14 9Z" fill="url(#paint0_linear_597_1807)" />
                </g>
                <defs>
                  <filter id="filter0_d_597_1807" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_597_1807" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_597_1807" result="shape" />
                  </filter>
                  <linearGradient id="paint0_linear_597_1807" x1="14" y1="3" x2="14" y2="23" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EF7063" />
                    <stop offset="1" stopColor="#F8B0A9" />
                  </linearGradient>
                </defs>
              </svg>
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
            {/* 선택된 시간대 공연 */}
            {selectedEvents.map((s) => (
              <div
                key={s.stage_id}
                className="
    flex items-center gap-[13px] self-stretch
    px-[14px] pr-[75px] py-[18px]
    rounded-[16px] border border-[#E4E4E7]
    bg-white
    shadow-[0_3px_5px_rgba(0,0,0,0.10)]
  "
              >
                <img
                  src={s.image_url || "/images/placeholder.jpg"}
                  alt={s.stage_name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">
                    {s.start_time.slice(11, 16)} - {s.end_time.slice(11, 16)}
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <p className="text-lg font-semibold">{s.stage_name}</p>
                    <p className="text-sm text-gray-600">{s.location.name}</p>
                  </div>
                </div>
              </div>

            ))}

            {/* 바로 다음 공연 */}
            {upcomingEvents.length > 0 && (
              <div className="mt-4">
                <p className="font-sans text-sm text-[#71717A] mb-5">
                  바로 다음 공연도 확인해보세요
                </p>
                <div className="flex flex-col gap-6">
                  {upcomingEvents.map((s) => (
                    <div
                      key={s.stage_id}
                      className="
    flex items-center gap-[13px] self-stretch
    px-[14px] pr-[75px] py-[18px]
    rounded-[16px] border border-[#E4E4E7]
    bg-white
    shadow-[0_3px_5px_rgba(0,0,0,0.10)]
  "
                    >
                      <img
                        src={s.image_url || "/images/placeholder.jpg"}
                        alt={s.stage_name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-500">
                          {s.start_time.slice(11, 16)} - {s.end_time.slice(11, 16)}
                        </p>
                        <div className="flex items-center gap-[10px]">
                          <p className="text-lg font-semibold">{s.stage_name}</p>
                          <p className="text-sm text-gray-600">{s.location.name}</p>
                        </div>
                      </div>
                    </div>

                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="font-sans text-center text-[#000] text-xl font-medium mt-14">진행 중인 공연이 없습니다</p>
        )}
      </div>
    </div>
  );
}
