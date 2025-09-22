import React from "react";
import LocationPin from "./LocationPin";
import emptyMap from "../../assets/images/icons/map-icons/emptyMap.svg";
import Campusmap from "../../assets/images/icons/map-icons/Campusmap.svg";
import MapToiletBadge from "../../assets/images/icons/map-icons/MapToilet.svg";
import MapBeerBadge from "../../assets/images/icons/map-icons/MapBeer.png";
import MapConvenienceBadge from "../../assets/images/icons/map-icons/MapConvenience.png";
import FoodtruckBadge from "../../assets/images/icons/map-icons/MapFoodTruck.png";
import { mapConfigs } from "../../config/mapConfigs";
import { useTranslation } from "react-i18next";

// 로컬 좌표 정보 (API location.id = 숫자와 매핑됨)
// id는 API와 동일하게 숫자로, ko는 번역/표시용 라벨
export const buildingLocations = [
  { id: 3,  ko: "다향관", x: 55,   y: 32 },
  { id: 4,  ko: "만해/법학관", x: 44,   y: 39 },
  { id: 5,  ko: "명진관", x: 45,   y: 29 },
  { id: 6,  ko: "혜화별관", x: 35,   y: 27 },
  { id: 7,  ko: "팔정도", x: 48,   y: 31 },
  { id: 8,  ko: "사회과학관", x: 27,   y: 39 },
  { id: 11, ko: "만해광장", x: 66,   y: 31 },
  { id: 12, ko: "원흥관", x: 41,   y: 26 },
  { id: 13, ko: "문화관 편의점", x: 21,   y: 61 },
  { id: 14, ko: "학림관 편의점", x: 73,   y: 52 },
  { id: 15, ko: "교수회관", x: 41,   y: 36 },
  { id: 16, ko: "본관", x: 60,   y: 20 },
  { id: 17, ko: "혜화관", x: 35.7, y: 35 },
  { id: 18, ko: "경영관", x: 23,   y: 36 },
  { id: 19, ko: "학술문화관", x: 50,   y: 70 },
  { id: 20, ko: "학림관", x: 70,   y: 60 },
  { id: 21, ko: "학생회관", x: 30,   y: 40 },   // 좌표 추정 필요
  { id: 22, ko: "정보문화관Q", x: 80,   y: 50 }, // 좌표 보정 필요
  { id: 23, ko: "정보문화관P", x: 82,   y: 52 }, // 좌표 보정 필요
  { id: 24, ko: "신공학관", x: 61.5, y: 27 },
];

// 지도 위 아이콘 맵핑
const iconMap = {
  Toilet: MapToiletBadge,
  Drink: MapBeerBadge,
  Store: MapConvenienceBadge,
  FoodTruck: FoodtruckBadge,
};

const MapWithPins = ({
  apiData = [], // 서버에서 받아온 부스/화장실/주류/푸드트럭 데이터
  selectedPin,
  handlePinClick,
  selectedFilter,
}) => {
  const { t } = useTranslation();

  // API 데이터 + 로컬 좌표 매핑
  const mappedLocations = apiData
    .map((item) => {
      // console.log("매핑 시도:", item.location?.name); // 디버깅
      const local = buildingLocations.find((b) => b.ko === item.location?.name);
      if (!local) {
        console.log(t("map.noDetailMap"), item.location?.name);
        return null; // 안전 처리
      }
      // console.log("매핑 성공:", local); // 디버깅
      return {
        ...item,
        id: local.id, // id 추가 (번역 키 연결용)
        x: local.x,
        y: local.y,
      };
    })
    .filter(Boolean);

  // 좌표 중복 제거 (name 기준으로 unique)
  const uniqueMappedLocations = mappedLocations.filter(
    (loc, index, self) =>
      index === self.findIndex((l) => l.location.name === loc.location.name)
  );

  // 핀 렌더링
  const renderPins = () =>
    uniqueMappedLocations.map((item) => (
      <div key={item.booth_id} className="pointer-events-auto">
        <LocationPin
          label={t(`map.locations.${item.id}`)}
          x={item.x}
          y={item.y}
          isSelected={selectedPin === item.location.name}
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            if (!mapConfigs[item.location.name]) {
              handlePinClick(item);
              console.log(t("map.noDetailMap"), item.location.name);
              return;
            }
            handlePinClick(item);
          }}
        />
      </div>
    ));

  return (
    <div
      className="w-full h-[232px]
        relative
        flex justify-center items-center
         flex-shrink-0 rounded-[16px]
         border border-[#E4E4E7] bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#FBD1CD]"
      onClick={() => handlePinClick && handlePinClick(null)} // 지도 클릭 시 핀 초기화
    >
      <img src={emptyMap} alt={t("map.campusMap")} />

      {/* 왼쪽 위 로고 (selectedFilter 아이콘) */}
      {selectedFilter && iconMap[selectedFilter] && (
        <img
          src={iconMap[selectedFilter]}
          alt={selectedFilter}
          className="absolute top-2 left-2 w-8 h-8"
        />
      )}

      <div className="absolute inset-0">{renderPins()}</div>
    </div>
  );
};

export default MapWithPins;
