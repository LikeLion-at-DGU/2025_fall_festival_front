import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoothCard from "../MapComponents/BoothCard";
import Skeleton from "../Skeleton/Skeleton";
import { getEventBooths } from "../../apis/mainpage";
import { formatTimeWithDay } from "../../utils/dateUtils";

const Event = ({ onDataChange }) => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleBoothClick = (booth) => {
    navigate(`/board/${booth.id}`);
  };

  useEffect(() => {
    const fetchEventBooths = async () => {
      try {
        setLoading(true);
        const response = await getEventBooths();
        const data = response.results || [];
        setEventData(data);
        setError(null);

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

  /* 자동 슬라이드 */
  useEffect(() => {
    if (eventData.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eventData.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [eventData.length]);

  /* 터치 이벤트 핸들러 */
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
      setCurrentSlide((prev) => (prev + 1) % eventData.length);
    }

    if (isRightSwipe) {
      setCurrentSlide(
        (prev) => (prev - 1 + eventData.length) % eventData.length
      );
    }
  };

  const formatBoothData = (booth) => {
    return {
      id: booth.booth_id,
      title: booth.name,
      image: booth.image_url,
      location: booth.location.name,
      time: formatTimeWithDay(
        booth.business_days,
        booth.start_time,
        booth.end_time
      ),
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
        <p className="text-xl font-semibold font-suite text-black">
          이벤트 진행 부스
        </p>
        <button
          onClick={() => navigate("/board", { state: { category: "Event" } })}
          className="text-[15px] font-normal font-suite text-black hover:underline"
        >
          더보기 &gt;
        </button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white w-[330px] h-[92px] rounded-2xl border border-gray-200 p-4"
                style={{
                  boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.10)",
                }}
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
            <p className="text-[12px] font-normal leading-[150%] font-suite text-black">
              이벤트 진행 부스를 불러올 수 없습니다.
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
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {eventData.map((booth, index) => {
                const formattedBooth = formatBoothData(booth);
                return (
                  <div
                    key={booth.booth_id || `event-${index}`}
                    onClick={() => handleBoothClick(formattedBooth)}
                    className="cursor-pointer flex-shrink-0 w-full"
                  >
                    <BoothCard
                      boothId={formattedBooth.id}
                      title={formattedBooth.title}
                      image={formattedBooth.image}
                      location={formattedBooth.location}
                      time={formattedBooth.time}
                      isOperating={formattedBooth.isOperating}
                      likesCount={formattedBooth.likeCount}
                      badges={formattedBooth.badges}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mb-[74px]">
            <p className="text-[12px] font-normal leading-[150%] font-suite text-black">
              현재 이벤트 진행 중인 부스가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
