import React, { useEffect, useState } from "react";
import bg from "../../assets/images/icons/comingsoon-icons/Open.png";
import dot from "../../assets/images/icons/comingsoon-icons/dot.svg";

export default function ComingSoon() {
  // 목표 시각: 2025년 9월 24일 9시 (KST)
  const targetDate = new Date("2025-09-24T09:00:00+09:00");

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    // 1) D-Day 계산용: 현재 시각을 KST로 보정(+9h)해 '오늘 00:00 KST'를 만든다
    const nowLocal = new Date();
    const nowForDdayKST = new Date(nowLocal.getTime() + 9 * 60 * 60 * 1000);
    const todayKST = new Date(
      nowForDdayKST.toISOString().split("T")[0] + "T00:00:00+09:00"
    );

    // 2) 타이머(총 남은 시간) 계산용: 브라우저 로컬 시간을 그대로 사용
    const nowForTimer = new Date();

    // D-Day (자정 기준 일수)
    const days = Math.floor((targetDate - todayKST) / (1000 * 60 * 60 * 24));

    // 총 남은 시간(HH:MM:SS)
    const diff = targetDate - nowForTimer;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600); // ← 총 시간 (일수 포함)
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    console.log("[Timer] left =>", `${hours}h ${minutes}m ${seconds}s`);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 숫자 박스
  const DigitBox = ({ value }) => (
    <div
      className="w-[35px] h-[45px] flex items-center justify-center rounded-[7px]"
      style={{
        backgroundColor: "#FBD1CD",
        color: "#2A2A2E",
        fontFamily: "SevenSegment, monospace",
        boxShadow: "0 0 15px rgba(227, 6, 6, 0.55)",
      }}
    >
      <span className="text-[40px] leading-none">{value}</span>
    </div>
  );

  // 콜론
  const Colon = () => (
    <div className="w-[15px] h-[45px] flex items-center justify-center">
      <span
        className="text-[40px] leading-none relative top-[2px]"
        style={{
          fontFamily: "SevenSegment, monospace",
          color: "#2A2A2E",
        }}
      >
        :
      </span>
    </div>
  );

  return (
    <div
      className="w-full h-screen relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute top-[233px] left-1/2 -translate-x-1/2 flex flex-col items-center">
        {/* 타이틀 */}
        <div className="flex items-end mb-[30px]">
          {/* '서버오픈' 네 글자 + 점 */}
          <div className="flex">
            {["서", "버", "오", "픈"].map((char, i) => (
              <div key={i} className="flex flex-col items-center mx-[1px]">
                <img src={dot} alt="dot" className="w-[3px] h-[3px] mb-0" />
                <span
                  className="text-white font-sans text-[20px] font-semibold"
                  style={{ textShadow: "0 0 5px rgba(0,0,0,0.6)" }}
                >
                  {char}
                </span>
              </div>
            ))}
          </div>

          {/* '까지 남은 시간' */}
          <span
            className="text-white font-sans text-[20px] font-semibold ml-0"
            style={{ textShadow: "0 0 5px rgba(0,0,0,0.6)" }}
          >
            까지 남은 시간
          </span>
        </div>

        {/* D-day */}
        <div
          className="w-[196px] h-[55px] flex-shrink-0 rounded-[7px] font-bold mb-[20px] flex items-center justify-center"
          style={{
            background: "rgba(255, 255, 255, 0.80)",
            boxShadow:
              "0 5px 10px rgba(239, 112, 99, 0.40) inset, 0 0 15px rgba(227, 6, 6, 0.53)",
          }}
        >
          <div className="text-[#2A2A2E] text-center font-sans text-[32px] font-semibold leading-[130%]">
            {timeLeft.days > 0 ? `D-${timeLeft.days}` : "D-DAY"}
          </div>
        </div>

        {/* 남은 시간 (총 시간: HH:MM:SS) */}
        <div className="flex items-center space-x-[4px]">
          {String(timeLeft.hours)
            .padStart(2, "0")
            .split("")
            .map((d, i) => (
              <DigitBox key={`h-${i}`} value={d} />
            ))}
          <Colon />
          {String(timeLeft.minutes)
            .padStart(2, "0")
            .split("")
            .map((d, i) => (
              <DigitBox key={`m-${i}`} value={d} />
            ))}
          <Colon />
          {String(timeLeft.seconds)
            .padStart(2, "0")
            .split("")
            .map((d, i) => (
              <DigitBox key={`s-${i}`} value={d} />
            ))}
        </div>

        {/* 하단 문구 */}
        <p
          className="text-sm opacity-80 text-center mt-[30px] font-sans"
          style={{ textShadow: "0 0 5px rgba(117, 0, 0, 0.95)" }}
        >
          가을 축제를 즐길 준비 되셨나요?
        </p>
      </div>
    </div>
  );
}
