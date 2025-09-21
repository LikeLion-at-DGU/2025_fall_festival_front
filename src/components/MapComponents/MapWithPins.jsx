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

// 로컬 좌표 정보 (API 데이터에 맞게 수정)
// id 추가해서 번역 키와 연결, ko는 매핑 기준
const buildingLocations = [
  { id: "manhaeLaw", ko: "만해/법학관", x: 44, y: 39 },
  { id: "newEngineering", ko: "신공학관", x: 61.5, y: 27 },
  { id: "library", ko: "중앙도서관", x: 55, y: 28 },
  { id: "stadium", ko: "대운동장", x: 32, y: 29 },
  { id: "myeongjin", ko: "명진관", x: 45, y: 29 },
  { id: "paljeongdo", ko: "팔정도", x: 48, y: 31 },
  { id: "manhaeSquare", ko: "만해광장", x: 66, y: 31 },
  { id: "dahyang", ko: "다향관", x: 55, y: 32 },
  { id: "hakrim", ko: "학림관", x: 70, y: 60 },
  { id: "infoCulture", ko: "정보문화관", x: 80, y: 50 },
  { id: "business", ko: "경영관", x: 23, y: 36 },
  { id: "hyehwa", ko: "혜화관", x: 35.7, y: 35 },
  { id: "socialScience", ko: "사회과학관", x: 27, y: 39 },
  { id: "academicCulture", ko: "학술문화관", x: 50, y: 70 },
  { id: "mainBuilding", ko: "본관", x: 60, y: 20 },
  { id: "science", ko: "과학관", x: 42, y: 26 },
  { id: "wonheung", ko: "원흥관", x: 41, y: 26 },
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
