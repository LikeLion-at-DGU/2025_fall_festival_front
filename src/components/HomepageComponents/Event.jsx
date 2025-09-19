import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoothCard from "../MapComponents/BoothCard";
import { getEventBooths } from "../../apis/mainpage";
import { formatTimeWithDay } from "../../utils/dateUtils";

const Event = ({ onDataChange }) => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBoothClick = (booth) => {
    navigate(`/booth/${booth.id}`, { state: { booth } });
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

  const formatBoothData = (booth) => {
    return {
      id: booth.booth_id,
      title: booth.name,
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
          onClick={() => navigate("/board?category=event")}
          className="text-[15px] font-normal font-suite text-black hover:underline"
        >
          더보기 &gt;
        </button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="mb-[74px]">
            <p className="text-[12px] font-normal leading-[150%] font-suite text-black">
              이벤트 진행 부스를 불러오는 중...
            </p>
          </div>
        ) : error ? (
          <div className="mb-[74px]">
            <p className="text-[12px] font-normal leading-[150%] font-suite text-black">
              이벤트 진행 부스를 불러올 수 없습니다.
            </p>
          </div>
        ) : eventData.length > 0 ? (
          <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
            {eventData.map((booth, index) => {
              const formattedBooth = formatBoothData(booth);
              return (
                <div
                  key={booth.booth_id || `event-${index}`}
                  onClick={() => handleBoothClick(formattedBooth)}
                  className="cursor-pointer flex-shrink-0"
                  style={{ width: "330px" }}
                >
                  <BoothCard
                    boothId={formattedBooth.id}
                    title={formattedBooth.title}
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
