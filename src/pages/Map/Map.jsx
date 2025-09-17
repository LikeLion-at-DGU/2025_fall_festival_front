import React, { useState, useRef, useCallback, useEffect } from "react";
import FilterButton from "../../components/MapComponents/FilterButton";
import SearchIcon from "../../assets/images/icons/map-icons/Search.svg";
import CampusmapIcon from "../../assets/images/icons/map-icons/Campusmap.svg";
import MapToiletIcon from "../../assets/images/icons/map-icons/MapToilet.svg";
import MapBeerIcon from "../../assets/images/icons/map-icons/MapBeer.svg";
import MapConvenienceIcon from "../../assets/images/icons/map-icons/MapConvenience.svg";
import FoodtruckIcon from "../../assets/images/icons/map-icons/Foodtruck.svg";
import LocationPin from "../../components/MapComponents/LocationPin";
import BoothCard from "../../components/MapComponents/BoothCard";
import ToiletCard from "../../components/MapComponents/ToiletCard";
import BeerCard from "../../components/MapComponents/BeerCard";
import ConvenienceCard from "../../components/MapComponents/ConvenienceCard";
import BottomNav from "../../components/BottomNav/BottomNav";

function Map() {
  const [selectedFilter, setSelectedFilter] = useState("부스");
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [sheetHeight, setSheetHeight] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const sheetRef = useRef(null);

  const DEFAULT_HEIGHT = 400;
  const MAX_HEIGHT = 800;

  const filters = ["부스", "화장실", "주류 판매", "편의점", "푸드트럭"];

  const buildingLocations = [
    { name: "대운동장", x: 23, y: 30 },
    { name: "과학관", x: 34, y: 18 },
    { name: "명진관", x: 41, y: 23 },
    { name: "팔정도", x: 55, y: 30 },
    { name: "만해/법학관", x: 40, y: 37 },
    { name: "만해광장", x: 67, y: 35 },
    { name: "다향관", x: 53, y: 40 },
    { name: "학림관", x: 70, y: 58 },
    { name: "정보문화관", x: 77, y: 48 },
    { name: "경영관", x: 15, y: 45 },
    { name: "혜화관", x: 32, y: 45 },
    { name: "사회과학관", x: 25, y: 60 },
    { name: "학술문화관", x: 22, y: 70 },
  ];

  const toiletLocations = [
    { name: "과학관 화장실", x: 34, y: 26 },
    { name: "명진관 화장실", x: 41, y: 31 },
    { name: "학림관 화장실", x: 70, y: 68 },
    { name: "정보문화관 화장실", x: 77, y: 58 },
    { name: "경영관 화장실", x: 15, y: 54 },
    { name: "혜화관 화장실", x: 32, y: 54 },
    { name: "사회과학관 화장실", x: 25, y: 66 },
    { name: "학술문화관 화장실", x: 22, y: 79 },
    { name: "만해/법학관 화장실", x: 40, y: 46 },
    { name: "다향관 화장실", x: 53, y: 50 },
  ];

  const foodtruckLocations = [{ name: "불초밥", x: 67, y: 46 }];

  const toiletData = {
    "과학관 화장실": [
      {
        name: "과학관 1층 남자 화장실",
        location: "과학관 1층",
        status: "이용 가능",
      },
      {
        name: "과학관 1층 여자 화장실",
        location: "과학관 1층",
        status: "이용 가능",
      },
    ],
    "명진관 화장실": [
      {
        name: "명진관 2층 남자 화장실",
        location: "명진관 2층",
        status: "이용 가능",
      },
      {
        name: "명진관 2층 여자 화장실",
        location: "명진관 2층",
        status: "이용 가능",
      },
    ],
  };

  const beerLocations = [
    { name: "주류 판매점 1", x: 25, y: 20 },
    { name: "주류 판매점 2", x: 60, y: 52 },
    { name: "주류 판매점 3", x: 35, y: 60 },
  ];

  const beerData = {
    "주류 판매점 1": [
      {
        name: "맥주 판매점",
        location: "대운동장 근처",
        distance: 150,
        distanceText: "약 150m",
      },
    ],
    "주류 판매점 2": [
      {
        name: "주류 판매소",
        location: "팔정도 근처",
        distance: 200,
        distanceText: "약 200m",
      },
    ],
    "주류 판매점 3": [
      {
        name: "와인 바",
        location: "만해광장 근처",
        distance: 120,
        distanceText: "약 120m",
      },
    ],
  };

  const convenienceLocations = [
    { name: "편의점 1", x: 15, y: 54 },
    { name: "편의점 2", x: 25, y: 70 },
    { name: "편의점 3", x: 53, y: 50 },
    { name: "편의점 4", x: 77, y: 58 },
    { name: "편의점 5", x: 70, y: 69 },
  ];

  const convenienceData = {
    "편의점 1": [
      {
        name: "7-ELEVEN",
        location: "학생회관 후문 거리 쪽",
        distance: 10,
        distanceText: "10m 이내",
      },
    ],
    "편의점 2": [
      {
        name: "CU",
        location: "명진관 근처",
        distance: 50,
        distanceText: "50m 이내",
      },
    ],
    "편의점 3": [
      {
        name: "GS25",
        location: "사회과학관 근처",
        distance: 30,
        distanceText: "30m 이내",
      },
    ],
    "편의점 4": [
      {
        name: "CU",
        location: "명진관 근처",
        distance: 50,
        distanceText: "50m 이내",
      },
    ],
    "편의점 5": [
      {
        name: "CU",
        location: "명진관 근처",
        distance: 50,
        distanceText: "50m 이내",
      },
    ],
  };

  const foodtruckData = {
    불초밥: [
      {
        title: "불초밥",
        location: "만해광장",
        time: "화,수 11:00 ~ 17:00",
        description: "맛있는 불초밥을 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: ["불초밥 8,000원", "생선초밥 12,000원", "연어초밥 15,000원"],
        likeCount: 24,
      },
    ],
    타코야키: [
      {
        title: "타코야키",
        location: "대운동장",
        time: "화,목 12:00 ~ 18:00",
        description: "일본 전통 타코야키를 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: ["타코야키 6개 8,000원", "타코야키 10개 12,000원"],
        likeCount: 18,
      },
    ],
    김치찌개: [
      {
        title: "김치찌개",
        location: "팔정도",
        time: "수,금 11:30 ~ 16:30",
        description: "든든한 김치찌개로 허기를 달래세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: ["김치찌개 7,000원", "된장찌개 6,500원", "순두부찌개 8,000원"],
        likeCount: 21,
      },
    ],
    떡볶이: [
      {
        title: "떡볶이",
        location: "명진관",
        time: "화,목,금 10:00 ~ 19:00",
        description: "매콤달콤한 떡볶이를 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: ["떡볶이 5,000원", "순대 4,000원", "튀김 3,000원"],
        likeCount: 16,
      },
    ],
    갈비: [
      {
        title: "갈비",
        location: "다향관",
        time: "목,금 12:00 ~ 19:00",
        description: "부드러운 갈비구이를 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: ["갈비구이 15,000원", "갈비찜 12,000원", "갈비탕 10,000원"],
        likeCount: 32,
      },
    ],
    닭갈비: [
      {
        title: "닭갈비",
        location: "학림관",
        time: "화,수,목 11:30 ~ 18:30",
        description: "매콤달콤한 닭갈비를 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: ["닭갈비 9,000원", "치즈닭갈비 11,000원"],
        likeCount: 28,
      },
    ],
    라면: [
      {
        title: "라면",
        location: "정보문화관",
        time: "월~금 10:00 ~ 20:00",
        description: "다양한 라면을 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: ["라면 4,000원", "치즈라면 5,000원", "불닭라면 6,000원"],
        likeCount: 19,
      },
    ],
    만두: [
      {
        title: "만두",
        location: "경영관",
        time: "화,목 12:00 ~ 17:00",
        description: "쫄깃한 만두를 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: ["군만두 6,000원", "물만두 7,000원", "김치만두 8,000원"],
        likeCount: 23,
      },
    ],
    비빔밥: [
      {
        title: "비빔밥",
        location: "사회과학관",
        time: "수,금 11:00 ~ 16:00",
        description: "건강한 비빔밥을 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: [
          "김치비빔밥 7,000원",
          "고기비빔밥 9,000원",
          "해물비빔밥 11,000원",
        ],
        likeCount: 26,
      },
    ],
    순대: [
      {
        title: "순대",
        location: "혜화관",
        time: "화,수,목 11:30 ~ 18:00",
        description: "쫄깃한 순대를 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: ["순대 5,000원", "순대국 6,000원", "순대볶음 7,000원"],
        likeCount: 17,
      },
    ],
    아이스크림: [
      {
        title: "아이스크림",
        location: "학술문화관",
        time: "월~금 10:00 ~ 19:00",
        description: "시원한 아이스크림을 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: ["아이스크림 3,000원", "빙수 8,000원", "프라페 5,000원"],
        likeCount: 31,
      },
    ],
    치킨: [
      {
        title: "치킨",
        location: "만해광장",
        time: "화~금 15:00 ~ 21:00",
        description: "바삭한 치킨을 맛보세요!",
        isOperating: true,
        category: "푸드트럭",
        menu: [
          "후라이드치킨 12,000원",
          "양념치킨 13,000원",
          "허니치킨 14,000원",
        ],
        likeCount: 35,
      },
    ],
  };

  const boothData = {
    명진관: [
      {
        title: "멋쟁이사자처럼",
        location: "명진관",
        time: "수 17:00 ~ 22:00",
        description: "멋쟁이사자처럼 부스에서 다양한 IT 활동을 체험해보세요!",
        isOperating: true,
        likeCount: 12,
        badges: {
          isEventActive: true,
          isDOrderPartner: true,
        },
      },
      {
        title: "상록수커피클럽",
        location: "명진관",
        time: "목 14:00 ~ 18:00",
        description: "상록수커피클럽에서 직접 볶은 커피와 디저트를 맛보세요!",
        isOperating: false,
        likeCount: 8,
        badges: {
          isEventActive: false,
          isDOrderPartner: true,
        },
      },
      {
        title: "축제준비위원회",
        location: "명진관",
        time: "금 16:00 ~ 20:00",
        description: "축제준비위원회에서 축제 관련 정보와 기념품을 받아가세요!",
        isOperating: true,
        likeCount: 15,
        badges: {
          isEventActive: true,
          isDOrderPartner: false,
        },
      },
    ],
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setSelectedBooth(null);
    setSelectedPin(null);
    setSearchTerm("");

    setSheetHeight(400);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedBooth(null);
    setSelectedPin(null);

    if (term.trim()) {
      setSheetHeight(400);
    }
  };

  const getSearchResults = () => {
    if (!searchTerm.trim()) return [];

    const results = [];
    const searchLower = searchTerm.toLowerCase();

    Object.entries(boothData).forEach(([locationName, booths]) => {
      booths.forEach((booth) => {
        if (booth.title.toLowerCase().includes(searchLower)) {
          results.push({
            type: "부스",
            location: locationName,
            data: booth,
            originalLocation: locationName,
          });
        }
      });
    });

    Object.entries(foodtruckData).forEach(([locationName, foodtrucks]) => {
      foodtrucks.forEach((foodtruck) => {
        if (foodtruck.title.toLowerCase().includes(searchLower)) {
          results.push({
            type: "푸드트럭",
            location: locationName,
            data: foodtruck,
            originalLocation: locationName,
          });
        }
      });
    });

    Object.entries(beerData).forEach(([locationName, beers]) => {
      beers.forEach((beer) => {
        if (beer.name.toLowerCase().includes(searchLower)) {
          results.push({
            type: "주류 판매",
            location: locationName,
            data: beer,
            originalLocation: locationName,
          });
        }
      });
    });

    Object.entries(convenienceData).forEach(([locationName, conveniences]) => {
      conveniences.forEach((convenience) => {
        if (convenience.name.toLowerCase().includes(searchLower)) {
          results.push({
            type: "편의점",
            location: locationName,
            data: convenience,
            originalLocation: locationName,
          });
        }
      });
    });

    return results;
  };

  const handleBoothClick = (booth) => {
    setSelectedBooth(booth);
    setSelectedPin(booth.name);

    setSheetHeight(400);
  };

  const handleToiletClick = (toilet) => {
    setSelectedBooth(toilet);
    setSelectedPin(toilet.name);

    setSheetHeight(400);
  };

  const handleBeerClick = (beer) => {
    if (selectedFilter === "주류 판매") {
      setSelectedBooth(beer);
      setSelectedPin(beer.name);
    } else {
      setSelectedBooth(beer);
      setSelectedPin(beer.name);
      setSheetHeight(400);
    }
  };

  const handleConvenienceClick = (convenience) => {
    if (selectedFilter === "편의점") {
      setSelectedBooth(convenience);
      setSelectedPin(convenience.name);
    } else {
      setSelectedBooth(convenience);
      setSelectedPin(convenience.name);
      setSheetHeight(400);
    }
  };

  const handleFoodtruckClick = (foodtruck) => {
    setSelectedBooth(foodtruck);
    setSelectedPin(foodtruck.name);

    setSheetHeight(400);
  };

  const handleDragStart = useCallback(
    (e) => {
      setIsDragging(true);
      setStartY(e.touches ? e.touches[0].clientY : e.clientY);
      setStartHeight(sheetHeight);
      document.body.style.userSelect = "none";

      if (e.cancelable) {
        e.preventDefault();
      }
    },
    [sheetHeight]
  );

  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const currentY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = startY - currentY;
      let newHeight = startHeight + deltaY;

      newHeight = Math.max(DEFAULT_HEIGHT, Math.min(MAX_HEIGHT, newHeight));
      setSheetHeight(newHeight);
    },
    [isDragging, startY, startHeight, DEFAULT_HEIGHT, MAX_HEIGHT]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDragMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDragMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleDragEnd);
    } else {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return (
    <div className="h-screen pt-[1px] pb-[62px] overflow-y-auto bg-neutral-100 flex flex-col">
      <div className="px-6 pt-5 pb-0.5">
        <div className="relative mb-4 z-40">
          <input
            type="text"
            placeholder="학과/동아리/부스명을 입력하세요"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-md shadow-tag text-xs font-normal font-suite focus:outline-none focus:border-none focus:ring-0"
          />
          <div className="absolute right-3 top-2.5">
            <img src={SearchIcon} alt="검색" className="w-4 h-4 opacity-60" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              isActive={selectedFilter === filter}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className="flex-1  px-6 pt-4 pb-2">
        <div
          className="relative  rounded-lg overflow-hidden"
          style={{ aspectRatio: "16/11" }}
        >
          <div className="w-full h-full">
            <img
              src={CampusmapIcon}
              alt="캠퍼스 지도"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="absolute inset-0 pointer-events-none">
            {selectedFilter === "부스"
              ? // 부스 필터일 때만 모든 건물 핀을 클릭 가능하게
                buildingLocations.map((building, index) => (
                  <div key={index} className="pointer-events-auto">
                    <LocationPin
                      label={building.name}
                      x={building.x}
                      y={building.y}
                      isSelected={selectedPin === building.name}
                      onClick={() =>
                        handleBoothClick({
                          name: building.name,
                        })
                      }
                    />
                  </div>
                ))
              : selectedFilter === "푸드트럭"
              ? buildingLocations
                  .filter(
                    (building) =>
                      building.name === "만해광장" ||
                      building.name === "다향관" ||
                      building.name === "학림관"
                  )
                  .map((building, index) => (
                    <div key={index} className="pointer-events-none">
                      <LocationPin
                        label={building.name}
                        x={building.x}
                        y={building.y}
                        isSelected={false}
                        onClick={() => {}}
                      />
                    </div>
                  ))
              : selectedFilter === "화장실"
              ? buildingLocations
                  .filter(
                    (building) =>
                      building.name !== "대운동장" &&
                      building.name !== "만해광장" &&
                      building.name !== "팔정도"
                  )
                  .map((building, index) => (
                    <div key={index} className="pointer-events-none">
                      <LocationPin
                        label={building.name}
                        x={building.x}
                        y={building.y}
                        isSelected={false}
                        onClick={() => {}}
                      />
                    </div>
                  ))
              : selectedFilter === "편의점"
              ? // 편의점 필터일 때는 특정 건물만 표시
                buildingLocations
                  .filter((building) =>
                    [
                      "경영관",
                      "사회과학관",
                      "다향관",
                      "학림관",
                      "정보문화관",
                    ].includes(building.name)
                  )
                  .map((building, index) => (
                    <div key={index} className="pointer-events-none">
                      <LocationPin
                        label={building.name}
                        x={building.x}
                        y={building.y}
                        isSelected={false}
                        onClick={() => {}}
                      />
                    </div>
                  ))
              : // 주류 판매 필터일 때는 모든 건물 표시하지만 클릭 불가능
                buildingLocations.map((building, index) => (
                  <div key={index} className="pointer-events-none">
                    <LocationPin
                      label={building.name}
                      x={building.x}
                      y={building.y}
                      isSelected={false}
                      onClick={() => {}}
                    />
                  </div>
                ))}

            {selectedFilter === "화장실" &&
              toiletLocations.map((toilet, index) => (
                <div key={`toilet-${index}`} className="pointer-events-auto">
                  <button
                    onClick={() => handleToiletClick(toilet)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${toilet.x}%`,
                      top: `${toilet.y}%`,
                    }}
                  >
                    <img
                      src={MapToiletIcon}
                      alt={toilet.name}
                      className="w-8 h-8 transition-all duration-200 hover:scale-110"
                    />
                  </button>
                </div>
              ))}

            {selectedFilter === "주류 판매" &&
              beerLocations.map((beer, index) => (
                <div key={`beer-${index}`} className="pointer-events-auto">
                  <button
                    onClick={() => handleBeerClick(beer)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${beer.x}%`,
                      top: `${beer.y}%`,
                    }}
                  >
                    <img
                      src={MapBeerIcon}
                      alt={beer.name}
                      className="w-6 h-6 transition-all duration-200 hover:scale-110"
                    />
                  </button>
                </div>
              ))}

            {selectedFilter === "편의점" &&
              convenienceLocations.map((convenience, index) => (
                <div
                  key={`convenience-${index}`}
                  className="pointer-events-auto"
                >
                  <button
                    onClick={() => handleConvenienceClick(convenience)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${convenience.x}%`,
                      top: `${convenience.y}%`,
                    }}
                  >
                    <img
                      src={MapConvenienceIcon}
                      alt={convenience.name}
                      className="w-6 h-6 transition-all duration-200 hover:scale-110"
                    />
                  </button>
                </div>
              ))}

            {selectedFilter === "푸드트럭" &&
              foodtruckLocations.map((foodtruck, index) => (
                <div key={`foodtruck-${index}`} className="pointer-events-auto">
                  <button
                    onClick={() => handleFoodtruckClick(foodtruck)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${foodtruck.x}%`,
                      top: `${foodtruck.y}%`,
                    }}
                  >
                    <img
                      src={FoodtruckIcon}
                      alt={foodtruck.name}
                      className="w-6 h-6 transition-all duration-200 hover:scale-110"
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50"
        style={{
          height: `${sheetHeight}px`,
          transition: isDragging ? "none" : "height 0.3s ease-out",
        }}
      >
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <div className="px-6 pb-6 h-full overflow-y-auto">
          <div className="flex justify-center mb-4 pt-3">
            <div className="w-[163px] h-[3px] bg-neutral-300 rounded-full flex-shrink-0"></div>
          </div>

          <h3 className="text-sm font-normal mb-4 font-suite leading-[150%] text-[#2A2A2A]">
            {searchTerm.trim() ? "검색 결과" : "미리보기"}
          </h3>

          {searchTerm.trim() ? (
            // 검색 결과 표시
            <div className="space-y-4">
              {getSearchResults().length > 0 ? (
                getSearchResults().map((result, index) => (
                  <div key={index}>
                    {result.type === "부스" ? (
                      <BoothCard
                        title={result.data.title}
                        location={result.data.location}
                        time={result.data.time}
                        image=""
                        isOperating={result.data.isOperating}
                        likeCount={result.data.likeCount}
                        badges={
                          result.data.badges || {
                            isEventActive: false,
                            isDOrderPartner: false,
                          }
                        }
                      />
                    ) : result.type === "푸드트럭" ? (
                      <BoothCard
                        title={result.data.title}
                        location={result.data.location}
                        time={result.data.time}
                        image=""
                        isOperating={result.data.isOperating}
                        likeCount={result.data.likeCount}
                        badges={
                          result.data.badges || {
                            isEventActive: false,
                            isDOrderPartner: false,
                          }
                        }
                      />
                    ) : result.type === "주류 판매" ? (
                      <BeerCard
                        name={result.data.name}
                        location={result.data.location}
                        distance={result.data.distanceText}
                        isSelected={false}
                      />
                    ) : result.type === "편의점" ? (
                      <ConvenienceCard
                        name={result.data.name}
                        location={result.data.location}
                        distance={result.data.distanceText}
                        isSelected={false}
                      />
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p
                    className="text-sm font-normal text-center leading-[150%] font-suite"
                    style={{ color: "#8A8A8A" }}
                  >
                    "{searchTerm}"에 대한 검색 결과가 없습니다
                  </p>
                </div>
              )}
            </div>
          ) : selectedBooth &&
            selectedFilter === "부스" &&
            boothData[selectedBooth.name] ? (
            <div className="space-y-4">
              {boothData[selectedBooth.name]
                .sort((a, b) => a.title.localeCompare(b.title, "ko"))
                .map((booth, index) => (
                  <BoothCard
                    key={index}
                    title={booth.title}
                    location={booth.location}
                    time={booth.time}
                    image=""
                    isOperating={booth.isOperating}
                    likeCount={booth.likeCount}
                    badges={
                      booth.badges || {
                        isEventActive: false,
                        isDOrderPartner: false,
                      }
                    }
                  />
                ))}
            </div>
          ) : selectedBooth &&
            selectedFilter === "화장실" &&
            toiletData[selectedBooth.name] ? (
            <div className="space-y-4">
              {toiletData[selectedBooth.name].map((toilet, index) => (
                <ToiletCard
                  key={index}
                  name={toilet.name}
                  location={toilet.location}
                  status={toilet.status}
                />
              ))}
            </div>
          ) : selectedFilter === "주류 판매" ? (
            <div className="space-y-4">
              {Object.entries(beerData)
                .flatMap(([locationName, beers]) =>
                  beers.map((beer) => ({ ...beer, locationName }))
                )
                .sort((a, b) => {
                  if (selectedBooth) {
                    if (a.locationName === selectedBooth.name) return -1;
                    if (b.locationName === selectedBooth.name) return 1;
                  }
                  return a.distance - b.distance;
                })
                .map((beer, index) => (
                  <BeerCard
                    key={`${beer.locationName}-${index}`}
                    name={beer.name}
                    location={beer.location}
                    distance={beer.distanceText}
                    isSelected={
                      selectedBooth && selectedBooth.name === beer.locationName
                    }
                  />
                ))}
            </div>
          ) : selectedBooth &&
            selectedFilter === "주류 판매" &&
            beerData[selectedBooth.name] ? (
            <div className="space-y-4">
              {beerData[selectedBooth.name].map((beer, index) => (
                <BeerCard
                  key={index}
                  name={beer.name}
                  location={beer.location}
                  distance={beer.distanceText}
                  isSelected={true}
                />
              ))}
            </div>
          ) : selectedFilter === "편의점" ? (
            <div className="space-y-4">
              {Object.entries(convenienceData)
                .flatMap(([locationName, conveniences]) =>
                  conveniences.map((convenience) => ({
                    ...convenience,
                    locationName,
                  }))
                )
                .sort((a, b) => {
                  if (selectedBooth) {
                    if (a.locationName === selectedBooth.name) return -1;
                    if (b.locationName === selectedBooth.name) return 1;
                  }
                  return a.distance - b.distance;
                })
                .map((convenience, index) => (
                  <ConvenienceCard
                    key={`${convenience.locationName}-${index}`}
                    name={convenience.name}
                    location={convenience.location}
                    distance={convenience.distanceText}
                    isSelected={
                      selectedBooth &&
                      selectedBooth.name === convenience.locationName
                    }
                  />
                ))}
            </div>
          ) : selectedBooth &&
            selectedFilter === "편의점" &&
            convenienceData[selectedBooth.name] ? (
            <div className="space-y-4">
              {convenienceData[selectedBooth.name].map((convenience, index) => (
                <ConvenienceCard
                  key={index}
                  name={convenience.name}
                  location={convenience.location}
                  distance={convenience.distanceText}
                  isSelected={true}
                />
              ))}
            </div>
          ) : selectedBooth &&
            selectedFilter === "푸드트럭" &&
            foodtruckData[selectedBooth.name] ? (
            <div className="space-y-4">
              {foodtruckData[selectedBooth.name]
                .sort((a, b) => a.title.localeCompare(b.title, "ko"))
                .map((foodtruck, index) => (
                  <BoothCard
                    key={index}
                    title={foodtruck.title}
                    location={foodtruck.location}
                    time={foodtruck.time}
                    image=""
                    isOperating={foodtruck.isOperating}
                    likeCount={foodtruck.likeCount}
                    badges={
                      foodtruck.badges || {
                        isEventActive: false,
                        isDOrderPartner: false,
                      }
                    }
                  />
                ))}
            </div>
          ) : selectedFilter === "푸드트럭" && !selectedBooth ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  지도에서 푸드트럭 핀을 클릭해보세요!
                </p>
              </div>
            </div>
          ) : selectedBooth ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">아직 선택된 정보가 없어요</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p
                className="text-sm font-normal text-center leading-[150%] font-suite"
                style={{ color: "#8A8A8A" }}
              >
                아직 선택한 부스가 없어요
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Map;
