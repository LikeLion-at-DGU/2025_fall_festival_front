import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stage from "../../assets/images/icons/main-icons/stage.svg";
import ftisland from "../../assets/images/banners/ftisland.png";
import illit from "../../assets/images/banners/illit.png";
import sole from "../../assets/images/banners/sole.png";
import fromis9 from "../../assets/images/banners/fromis9.png";
import haha from "../../assets/images/banners/haha.png";
import changmo from "../../assets/images/banners/changmo.png";

const Stage = () => {
  const navigate = useNavigate();
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [isShowTime, setIsShowTime] = useState(false);

  /* 9월 25일 연예인 */
  const artists25th = [
    { name: "FTISLAND", image: ftisland },
    { name: "ILLIT", image: illit },
    { name: "SOLE", image: sole },
  ];

  /* 9월 26일 연예인 */
  const artists26th = [
    { name: "Fromis_9", image: fromis9 },
    { name: "하하", image: haha },
    { name: "창모", image: changmo },
  ];

  /* 현재 날짜에 맞는 연예인들 선택 */
  const getCurrentArtists = () => {
    const today = new Date();
    const month = today.getMonth() + 1; 
    const date = today.getDate();

    if (month === 9 && date === 25) {
      return artists25th;
    } else if (month === 9 && date === 26) {
      return artists26th;
    }

    return artists25th; 
  };

  const currentArtists = getCurrentArtists();

  /* 시간 체크 (오후 8시 이후인지 확인) */
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsShowTime(hour >= 20); 
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isShowTime || currentArtists.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentArtistIndex((prev) => (prev + 1) % currentArtists.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [isShowTime, currentArtists.length]);

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
        <p className="text-xl font-semibold font-suite text-black">STAGE NOW</p>
      </div>
      <div className="relative cursor-pointer" onClick={handleStageClick}>
        {isShowTime ? (
          /* 오후 8시 이후: 연예인 이미지 슬라이드 */
          <>
            <img
              src={currentArtists[currentArtistIndex].image}
              alt={currentArtists[currentArtistIndex].name}
              className="w-full h-[156px] rounded-[12px] object-cover"
            />
            <div
              className="absolute inset-0 rounded-[12px]"
              style={{
                background:
                  "linear-gradient(179.37deg, rgba(0, 0, 0, 0) 36.37%, rgba(0, 0, 0, 0.77) 99.45%)",
              }}
            />
            <p className="absolute bottom-4 right-4 text-2xl font-semibold font-suite text-white">
              {currentArtists[currentArtistIndex].name}
            </p>
          </>
        ) : (
          /* 오후 8시 이전: 공연 준비중 메시지 */
          <div
            className="w-full h-[156px] flex items-center justify-center"
            style={{
              borderRadius: "16px",
              background:
                "linear-gradient(102deg, #F8B0A9 -12.13%, #FDF4F3 111.05%)",
            }}
          >
            <div className="text-center">
              <p className="text-xl font-semibold text-[#2A2A2E] mb-[19px]">
                공연 준비중이에요!
              </p>
              <p className="text-xl font-medium text-[#2A2A2E]">
              coming Soon...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stage;
