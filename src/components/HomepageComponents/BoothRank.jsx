import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoothCard from "../MapComponents/BoothCard";
import Skeleton from "../Skeleton/Skeleton";
import { getBoothRanking } from "../../apis/mainpage";
import { formatTimeWithDay } from "../../utils/dateUtils";

const BoothRank = ({ onDataChange }) => {
  const navigate = useNavigate();
  const [rankData, setRankData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBoothClick = (booth) => {
    navigate(`/booth/${booth.id}`, { state: { booth } });
  };

  useEffect(() => {
    const fetchBoothRanking = async () => {
      try {
        setLoading(true);
        const response = await getBoothRanking();
        const data = response.results || [];
        setRankData(data);
        setError(null);

        if (onDataChange) {
          onDataChange({
            hasData: data.length > 0,
            isLoading: false,
            hasError: false,
          });
        }
      } catch (err) {
        console.error("부스 랭킹 조회 실패:", err);
        setError(err);
        setRankData([]);

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

    fetchBoothRanking();
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
    <div className="mt-[27px] mb-[32px]">
      <div className="mb-4">
        <p className="text-xl font-semibold font-suite text-black">부스 랭킹</p>
      </div>
      <div className="space-y-4">
        {loading ? (
          <>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-white w-full h-[92px] rounded-2xl border border-gray-200 p-4"
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
          </>
        ) : error ? (
          <div className="mb-[74px]">
            <p className="text-[12px] font-normal leading-[150%] font-suite text-black">
              부스 랭킹을 불러올 수 없습니다.
            </p>
          </div>
        ) : rankData.length > 2 ? (
          rankData.map((booth, index) => {
            const formattedBooth = formatBoothData(booth);
            return (
              <div
                key={formattedBooth.id}
                onClick={() => handleBoothClick(formattedBooth)}
                className="cursor-pointer"
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
          })
        ) : (
          <div className="mb-[74px]">
            <p className="text-[12px] font-normal leading-[150%] font-suite text-black">
              부스 랭킹 집계 중입니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoothRank;
