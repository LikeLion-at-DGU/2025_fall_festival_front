import React, { useState, useEffect } from "react";
import festivalBanner from "../../assets/images/banners/festival-banner.png";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // TODO: 임시 배너 이미지들, 추후 수정 예정
  const banners = [
    {
      id: 1,
      image: festivalBanner,
      alt: "축제 배너 1",
    },
    {
      id: 2,
      image: festivalBanner,
      alt: "축제 배너 2",
    },
    {
      id: 3,
      image: festivalBanner,
      alt: "축제 배너 3",
    },
    {
      id: 4,
      image: festivalBanner,
      alt: "축제 배너 4",
    },
    {
      id: 5,
      image: festivalBanner,
      alt: "축제 배너 5",
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

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={banner.id} className="w-full flex-shrink-0">
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
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
