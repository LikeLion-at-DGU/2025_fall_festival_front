import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BoothCard from "../BoothCard/BoothCard";

const Event = () => {
  const navigate = useNavigate();

  const handleBoothClick = (booth) => {
    navigate(`/booth/${booth.id}`, { state: { booth } });
  };

  const eventData = [
    {
      id: 1,
      title: "멋쟁이사자처럼",
      location: "명진관",
      time: "수 17:00 ~ 22:00",
      isOperating: true,
      likeCount: 12,
      badges: {
        isEventActive: true,
        isDOrderPartner: true,
      },
    },
    {
      id: 2,
      title: "상록수커피클럽",
      location: "명진관",
      time: "목 14:00 ~ 18:00",
      isOperating: false,
      likeCount: 8,
      badges: {
        isEventActive: false,
        isDOrderPartner: true,
      },
    },
    {
      id: 3,
      title: "축제준비위원회",
      location: "명진관",
      time: "금 16:00 ~ 20:00",
      isOperating: true,
      likeCount: 15,
      badges: {
        isEventActive: true,
        isDOrderPartner: false,
      },
    },
  ];

  return (
    <div className="mt-[27px]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-semibold font-suite text-black">
          이벤트 진행 부스
        </p>
        <Link
          to="/event"
          className="text-[15px] font-normal font-suite text-black"
        >
          더보기 &gt;
        </Link>
      </div>
      <div className="space-y-4">
        {eventData.length > 0 ? (
          eventData.map((event, index) => (
            <div
              key={index}
              onClick={() => handleBoothClick(event)}
              className="cursor-pointer"
            >
              <BoothCard
                title={event.title}
                location={event.location}
                time={event.time}
                isOperating={event.isOperating}
                likeCount={event.likeCount}
                badges={event.badges}
              />
            </div>
          ))
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
