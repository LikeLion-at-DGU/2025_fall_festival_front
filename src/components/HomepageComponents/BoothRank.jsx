import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoothCard from "../MapComponents/BoothCard";
import Skeleton from "../Skeleton/Skeleton";
import { getBoothRanking } from "../../apis/mainpage";
import { useBoothTranslation } from "../../hooks/useTranslation";
import { useTranslation } from "react-i18next";

const BoothRank = ({ onDataChange }) => {
  const navigate = useNavigate();
  const [rankData, setRankData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 번역 훅 사용
  const { getTranslatedBooths } = useBoothTranslation(rankData);
  const { t } = useTranslation();

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
    <div className="mt-[27px] mb-[32px]">
      <div className="mb-4">
        <p className="text-[20px] font-semibold font-suite text-[#52525B]">
          {t("booth.popular")}
        </p>
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
            <p className="text-[12px] font-normal leading-[150%] font-suite text-[#52525B]">
              {t("booth.rankError")}
            </p>
          </div>
        ) : rankData.length > 2 ? (
          rankData.map((booth, index) => {
            const formattedBooth = formatBoothData(booth);
            // 번역된 부스 데이터 가져오기
            const translatedBooths = getTranslatedBooths();
            const translatedBooth =
              translatedBooths.find((tb) => tb.booth_id === booth.booth_id) ||
              booth;

            return (
              <div
                key={formattedBooth.id}
                onClick={() => handleBoothClick(formattedBooth)}
                className="cursor-pointer"
              >
                <BoothCard
                  boothId={formattedBooth.id}
                  title={translatedBooth.translatedName || formattedBooth.title}
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
          })
        ) : (
          <div className="flex items-center justify-center min-h-[70px] mb-[40px]">
            <p className="text-[14px]  text-center font-normal leading-[150%] font-suite text-[#52525B]">
              {t("booth.rankPending")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoothRank;
