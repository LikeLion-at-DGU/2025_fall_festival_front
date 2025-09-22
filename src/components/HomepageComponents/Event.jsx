import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoothCard from "../MapComponents/BoothCard";
import Skeleton from "../Skeleton/Skeleton";
import { getEventBooths } from "../../apis/mainpage";
import { useBoothTranslation } from "../../hooks/useTranslation";
import { useTranslation } from "react-i18next";

const Event = ({ onDataChange }) => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // 번역 훅 사용
  const { getTranslatedBooths } = useBoothTranslation(eventData);
  const { t } = useTranslation();

  const handleBoothClick = (booth) => {
    if (booth.event_id) {
      navigate(`/board/${booth.event_id}`);
    } else {
      navigate(`/booth/${booth.id}`);
    }
  };

  useEffect(() => {
    const fetchEventBooths = async () => {
      try {
        setLoading(true);
        const response = await getEventBooths();
        const data = response.results || [];
        setEventData(data);
        setError(null);

        if (data.length > 1) {
          setCurrentSlide(1);
          setIsTransitioning(true);
        } else {
          setCurrentSlide(0);
        }

        if (onDataChange) {
          onDataChange({
            hasData: data.length > 0,
            isLoading: false,
            hasError: false,
          });
        }
      } catch (err) {
        console.error("이벤트 진행 부스 조회 실패:", err);
        setError(err);
        setEventData([]);

        if (onDataChange) {
          onDataChange({
            hasData: false,
            isLoading: false,
            hasError: true,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEventBooths();
  }, [onDataChange]);

  const extendedEventData =
    eventData.length > 1
      ? [eventData[eventData.length - 1], ...eventData, eventData[0]]
      : eventData;

  useEffect(() => {
    if (eventData.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [eventData.length]);

  useEffect(() => {
    if (eventData.length <= 1) return;

    if (currentSlide === extendedEventData.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(1);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
      return () => clearTimeout(timer);
    } else if (currentSlide === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(eventData.length);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, eventData.length, extendedEventData.length]);
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || eventData.length <= 1) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
    }

    if (isRightSwipe) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const formatBoothData = (booth) => {
    return {
      id: booth.booth_id,
      event_id: booth.event_id,
      title: booth.name,
      image: booth.image_url,
      location: booth.location.name,
      startTime: booth.start_time,
      endTime: booth.end_time,
      businessDays: booth.business_days[0]?.weekday,
      isOperating: true,
      likeCount: booth.like_cnt || 0,
      badges: {
        isEventActive: booth.is_event,
        isDOrderPartner: booth.is_dorder,
      },
    };
  };

  return (
    <div className="mt-[27px]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[20px] font-semibold font-suite text-[#52525B]">
          {t("booth.event")}
        </p>
        <button
          onClick={() => navigate("/board", { state: { category: "Event" } })}
          className="text-[14px] font-semibold font-suite text-[#52525B] hover:underline"
        >
          {t("common.more")} &gt;
        </button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white w-[330px] h-[92px] rounded-2xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <Skeleton width={64} height={64} className="rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width={96} height={12} />
                    <Skeleton width={160} height={20} />
                    <Skeleton width={80} height={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mb-[74px]">
            <p className="text-[12px] font-normal leading-[150%] font-suite text-[#52525B]">
              {t("booth.eventError")}
            </p>
          </div>
        ) : eventData.length > 0 ? (
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`flex ${
                isTransitioning
                  ? "transition-transform duration-500 ease-in-out"
                  : ""
              }`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {(eventData.length > 1 ? extendedEventData : eventData).map(
                (booth, index) => {
                  const formattedBooth = formatBoothData(booth);
                  // 번역된 부스 데이터 가져오기
                  const translatedBooths = getTranslatedBooths();
                  const translatedBooth =
                    translatedBooths.find(
                      (tb) => tb.booth_id === booth.booth_id
                    ) || booth;

                  return (
                    <div
                      key={`${booth.booth_id || `event-${index}`}-${index}`}
                      onClick={() => handleBoothClick(formattedBooth)}
                      className="cursor-pointer flex-shrink-0 w-full"
                    >
                      <BoothCard
                        boothId={formattedBooth.id}
                        title={
                          translatedBooth.translatedName || formattedBooth.title
                        }
                        image={formattedBooth.image}
                        location={
                          translatedBooth.translatedLocation ||
                          formattedBooth.location
                        }
                        startTime={formattedBooth.startTime}
                        endTime={formattedBooth.endTime}
                        businessDays={formattedBooth.businessDays}
                        isOperating={formattedBooth.isOperating}
                        likesCount={formattedBooth.likeCount}
                        badges={formattedBooth.badges}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[70px] mb-[10px]">
            <p className="text-[14px] text-center font-normal leading-[150%] font-suite text-[#52525B]">
              {t("booth.noEvent")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
