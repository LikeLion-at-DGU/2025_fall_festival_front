import React from "react";
import LocationPin from "./LocationPin";
import emptyMap from "../../assets/images/icons/map-icons/emptyMap.svg";
import MapToiletBadge from "../../assets/images/icons/map-icons/MapToilet.svg";
import MapBeerBadge from "../../assets/images/icons/map-icons/MapBeer.png";
import MapConvenienceBadge from "../../assets/images/icons/map-icons/MapConvenience.png";
import FoodtruckBadge from "../../assets/images/icons/map-icons/MapFoodTruck.png";
import { mapConfigs } from "../../config/mapConfigs";
import { useTranslation } from "react-i18next";

// 로컬 좌표 정보 (API location.id = 숫자와 매핑됨)
export const buildingLocations = [
  { id: 3, ko: "다향관", x: 55, y: 41 },
  { id: 4, ko: "만해/법학관", x: 42, y: 41 },
  { id: 5, ko: "명진관", x: 45, y: 28 },
  { id: 6, ko: "혜화별관",x: 32, y: 43 },
  { id: 7, ko: "팔정도", x: 48, y: 33},
  { id: 8, ko: "경영/사과관", x: 23, y: 51 },
  { id: 11, ko: "만해광장", x: 66, y: 31 },
  { id: 12, ko: "원흥관",  x: 60, y: 24 },
  { id: 13, ko: "문화관 편의점", x: 21, y: 61 },
  { id: 14, ko: "학림관 편의점", x: 73, y: 52 },
  { id: 15, ko: "교수회관", x: 41, y: 36 },
  { id: 16, ko: "본관", x: 54, y: 30 },
  { id: 17, ko: "혜화관", x: 35, y: 48 },
  { id: 18, ko: "경영관", x: 23, y: 36 },
  { id: 19, ko: "학술문화관", x: 25, y: 63 },
  { id: 20, ko: "학림관", x: 70, y: 60 },
  { id: 21, ko: "학생회관", x: 76, y: 28 },
  { id: 22, ko: "정보문화관", x: 70, y: 22  },
  { id: 24, ko: "신공학관", x: 54, y: 17 },
];

// 지도 위 아이콘 맵핑
const iconMap = {
  Toilet: MapToiletBadge,
  Drink: MapBeerBadge,
  Store: MapConvenienceBadge,
  FoodTruck: FoodtruckBadge,
};

const MapWithPins = ({
  apiData = [], // 서버에서 받아온 데이터
  selectedPin, // 숫자 id
  handlePinClick,
  selectedFilter,
}) => {
  const { t } = useTranslation();

  // API 데이터 + 로컬 좌표 매핑
  const mappedLocations = apiData
    .map((item) => {
      const local = buildingLocations.find(
        (b) => Number(b.id) === Number(item.location?.id)
      );
      if (!local) {
        console.log(t("map.noDetailMap"), item.location?.name);
        return null;
      }
      return {
        ...item,
        id: local.id, // 숫자 id
        x: local.x,
        y: local.y,
      };
    })
    .filter(Boolean);

  // 좌표 중복 제거 (id 기준으로 unique)
  const uniqueMappedLocations = mappedLocations.filter(
    (loc, index, self) =>
      index === self.findIndex((l) => Number(l.id) === Number(loc.id))
  );

  console.log("현재 selectedPin:", selectedPin);

  // 핀 렌더링
  const renderPins = () =>
    uniqueMappedLocations.map((item) => (
      <div key={item.booth_id} className="pointer-events-auto">
        <LocationPin
          label={t(`map.locations.${item.id}`)}
          x={item.x}
          y={item.y}
          isSelected={Number(selectedPin) === Number(item.id)}
          onClick={(e) => {
            e.stopPropagation();
            console.log(
              "selectedPin:", selectedPin,
              "item.id:", item.id,
              "isSelected:", Number(selectedPin) === Number(item.id)
            );

            if (!mapConfigs[item.id]) {
              handlePinClick(item.id);
              console.log(t("map.noDetailMap"), item.id);
              return;
            }
            handlePinClick(item.id);
          }}
        />
      </div>
    ));

  return (
    <div
      className="w-full h-[232px]
        relative flex justify-center items-center
        flex-shrink-0 rounded-[16px]
        border border-[#E4E4E7] bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#FBD1CD]"
      onClick={() => handlePinClick && handlePinClick(null)}
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
