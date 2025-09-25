import React, { useState, useEffect } from "react";
import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";
import stage from "../../assets/images/icons/main-icons/stage.svg";
import illit from "../../assets/images/banners/illit.png";
import sole from "../../assets/images/banners/sole.png";
import fromis9 from "../../assets/images/banners/fromis9.png";
import haha from "../../assets/images/banners/haha.png";
import changmo from "../../assets/images/banners/changmo.png";
import {
  getCurrentClubPerformance,
  formatPerformanceTime,
} from "../../data/clubPerformances";
import { useTranslations } from "../../context/TranslationContext";

const Stage = () => {
  const navigate = usePrefixedNavigate();
  const { getTranslation } = useTranslations();
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [isShowTime, setIsShowTime] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentClubPerformance, setCurrentClubPerformance] = useState(null);

  /* 9월 25일 연예인 */
  const artists25th = [
    { name: "ILLIT", image: illit },
    { name: "SOLE", image: sole },
  ];

  /* 9월 26일 연예인 */
  const artists26th = [
    { name: "Fromis_9", image: fromis9 },
    { name: "하하", image: haha },
    { name: "창모", image: changmo },
  ];

  const allArtists = [...artists25th, ...artists26th];

  /* 현재 날짜에 맞는 연예인들 선택 */
  const getCurrentArtists = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    if (month === 9 && date === 24) {
      return allArtists;
    } else if (month === 9 && date === 25) {
      return artists25th;
    } else if (month === 9 && date === 26) {
      return artists26th;
    }

    return allArtists;
  };

  const currentArtists = getCurrentArtists();

  /* 시간 체크 및 동아리 공연 확인 */
  useEffect(() => {
    const checkTimeAndPerformance = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsShowTime(hour >= 20);

      const clubPerformance = getCurrentClubPerformance();
      setCurrentClubPerformance(clubPerformance);
    };

    checkTimeAndPerformance();
    const interval = setInterval(checkTimeAndPerformance, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!currentArtists || currentArtists.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentArtistIndex((prev) => (prev + 1) % currentArtists.length);
        setIsTransitioning(false);
      }, 250);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentArtists]);

  const handleStageClick = () => {
    navigate("/timetable");
  };

  return (
    <div className="mt-[27px] flex flex-col gap-[8px]">
      <div
        className="flex items-center gap-[5px] cursor-pointer"
        onClick={handleStageClick}
      >
        <img src={stage} alt="stage" className="w-6 h-6" />
        <p className="text-xl font-semibold font-suite text-[#52525B]">
          LINE-UP
        </p>
      </div>
      <div className="relative cursor-pointer" onClick={handleStageClick}>
        {currentClubPerformance ? (
          /* 동아리 공연 시간일 때: 동아리 정보 표시 */
          <>
            <img
              src={currentClubPerformance.image}
              alt={currentClubPerformance.name}
              className="w-full h-[156px] rounded-[12px] object-cover"
            />
            <div
              className="absolute inset-0 rounded-[12px]"
              style={{
                background:
                  "linear-gradient(179.37deg, rgba(0, 0, 0, 0) 36.37%, rgba(0, 0, 0, 0.77) 99.45%)",
              }}
            />
            <div className="absolute bottom-4 right-4 text-right">
              <p className="text-sm font-medium font-suite text-white opacity-90">
                {formatPerformanceTime(
                  currentClubPerformance.startTime,
                  currentClubPerformance.endTime
                )}
              </p>
              <p className="text-2xl font-semibold font-suite text-white">
                {getTranslation(
                  "stage",
                  "club",
                  "StageName",
                  currentClubPerformance.name
                )}
              </p>
            </div>
          </>
        ) : (
          /* 연예인 이미지 슬라이드 (항상 표시) */
          <>
            <img
              src={currentArtists[currentArtistIndex].image}
              alt={currentArtists[currentArtistIndex].name}
              className={`w-full h-[156px] rounded-[12px] object-cover transition-opacity duration-300 ease-in-out ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            />
            <div
              className="absolute inset-0 rounded-[12px]"
              style={{
                background:
                  "linear-gradient(179.37deg, rgba(0, 0, 0, 0) 36.37%, rgba(0, 0, 0, 0.77) 99.45%)",
              }}
            />
            <p
              className={`absolute bottom-4 right-4 text-2xl font-semibold font-suite text-white transition-opacity duration-300 ease-in-out ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {getTranslation(
                "stage",
                currentArtists[currentArtistIndex].name.toLowerCase(),
                "StageName",
                currentArtists[currentArtistIndex].name
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Stage;
