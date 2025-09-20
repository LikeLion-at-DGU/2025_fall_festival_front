import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import festivalBanner from "../../assets/images/banners/festival-banner.png";
import festivalBanner2 from "../../assets/images/banners/festival-banner2.png";
import festivalBanner3 from "../../assets/images/banners/festival-banner3.png";
import festivalBanner4 from "../../assets/images/banners/festival-banner4.png";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const navigate = useNavigate();

  const banners = [
    {
      id: 1,
      image: festivalBanner,
      alt: "축제 배너 1",
      hasButton: false,
    },
    {
      id: 2,
      image: festivalBanner2,
      alt: "축제 배너 2",
      hasButton: true,
      buttonText: "이벤트 참여",
      buttonPosition: { top: "40%", left: "4%" },
    },
    {
      id: 3,
      image: festivalBanner3,
      alt: "축제 배너 3",
      hasButton: true,
      buttonText: "게임하기",
      buttonPosition: { top: "65%", left: "5%" },
    },
    {
      id: 4,
      image: festivalBanner4,
      alt: "축제 배너 4",
      hasButton: true,
      buttonText: "분실물 확인",
      buttonPosition: {
        bottom: "32%",
        left: "7%",
      },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [banners.length]);

  /* 점 클릭으로 슬라이드 이동 가능하게 구현함 */
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  /* 터치 이벤트 핸들러 */
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }

    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className="w-full flex-shrink-0 relative cursor-pointer"
            onClick={() => {
              switch (banner.id) {
                case 2:
                  navigate("/board", { state: { category: "Event" } });
                  break;
                case 3:
                  navigate("/event");
                  break;
                case 4:
                  navigate("/board", { state: { category: "LostItem" } });
                  break;
                default:
                  break;
              }
            }}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
            {banner.hasButton && (
              <button
                className="absolute bg-primary-500 text-white w-[140px] h-[35px] rounded-[12px] font-semibold text-sm hover:bg-primary-600 transition-colors duration-200 "
                style={{
                  ...banner.buttonPosition,
                  boxShadow: "2px 4px 10px 0 rgba(66, 8, 8, 0.30)",
                }}
                onClick={(e) => {
                  e.stopPropagation(); // 이미지 클릭 이벤트 전파 방지
                  switch (banner.id) {
                    case 2:
                      navigate("/board", { state: { category: "Event" } });
                      break;
                    case 3:
                      navigate("/event");
                      break;
                    case 4:
                      navigate("/board", { state: { category: "LostItem" } });
                      break;
                    default:
                      console.log(`${banner.buttonText} 버튼 클릭됨`);
                  }
                }}
              >
                {banner.buttonText}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-400 scale-125"
                : "bg-[#2C2C2CCC] hover:bg-primary-400/75"
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
