import React from "react";
import { useNavigate } from "react-router-dom";
import BoothCard from "../MapComponents/BoothCard";

const BoothRank = () => {
  const navigate = useNavigate();

  const handleBoothClick = (booth) => {
    navigate(`/booth/${booth.id}`, { state: { booth } });
  };

  const rankData = [
    {
      id: 4,
      rank: 1,
      title: "치킨 부스",
      location: "만해광장",
      time: "화~금 15:00 ~ 21:00",
      isOperating: true,
      likeCount: 35,
      badges: {
        isEventActive: true,
        isDOrderPartner: true,
      },
    },
    {
      id: 5,
      rank: 2,
      title: "갈비 부스",
      location: "다향관",
      time: "목,금 12:00 ~ 19:00",
      isOperating: true,
      likeCount: 32,
      badges: {
        isEventActive: true,
        isDOrderPartner: false,
      },
    },
    {
      id: 6,
      rank: 3,
      title: "아이스크림 부스",
      location: "학술문화관",
      time: "월~금 10:00 ~ 19:00",
      isOperating: true,
      likeCount: 31,
      badges: {
        isEventActive: false,
        isDOrderPartner: true,
      },
    },
    {
      id: 7,
      rank: 4,
      title: "닭갈비 부스",
      location: "학림관",
      time: "화,수,목 11:30 ~ 18:30",
      isOperating: true,
      likeCount: 28,
      badges: {
        isEventActive: true,
        isDOrderPartner: true,
      },
    },
    {
      id: 8,
      rank: 5,
      title: "비빔밥 부스",
      location: "사회과학관",
      time: "수,금 11:00 ~ 16:00",
      isOperating: true,
      likeCount: 26,
      badges: {
        isEventActive: false,
        isDOrderPartner: false,
      },
    },
  ];

  return (
    <div className="mt-[27px] mb-[32px]">
      <div className="mb-4">
        <p className="text-xl font-semibold font-suite text-black">부스 랭킹</p>
      </div>
      <div className="space-y-4">
        {rankData.length > 0 ? (
          rankData.slice(0, 3).map((booth, index) => (
            <div
              key={index}
              onClick={() => handleBoothClick(booth)}
              className="cursor-pointer"
            >
              <BoothCard
                title={booth.title}
                location={booth.location}
                time={booth.time}
                isOperating={booth.isOperating}
                likeCount={booth.likeCount}
                badges={booth.badges}
              />
            </div>
          ))
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
