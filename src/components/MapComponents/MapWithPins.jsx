import React from "react";
import LocationPin from "./LocationPin";
import emptyMap from "../../assets/images/icons/map-icons/emptyMap.svg";
import Campusmap from "../../assets/images/icons/map-icons/Campusmap.svg";
import MapToiletBadge from "../../assets/images/icons/map-icons/MapToilet.png";
import MapBeerBadge from "../../assets/images/icons/map-icons/MapBeer.png";
import MapConvenienceBadge from "../../assets/images/icons/map-icons/MapConvenience.png";
import FoodtruckBadge from "../../assets/images/icons/map-icons/MapFoodTruck.png";
import { mapConfigs } from "../../config/mapConfigs";
// 로컬 좌표 정보 (API 데이터에 맞게 수정)
const buildingLocations = [
  { name: "만해/법학관", x: 44, y: 39 },
  { name: "신공학관", x: 61.5, y: 27 },
  { name: "중앙도서관", x: 55, y: 28 },
  { name: "대운동장", x: 32, y: 29 },
  { name: "명진관", x: 45, y: 29 },
  { name: "팔정도", x: 48, y: 31 },
  { name: "만해광장", x: 66, y: 31 },
  { name: "다향관", x: 55, y: 32 },
  { name: "학림관", x: 70, y: 60 },
  { name: "정보문화관", x: 80, y: 50 },
  { name: "경영관", x: 23, y: 36 },
  { name: "혜화관", x: 35.7, y: 35 },
  { name: "사회과학관", x: 27, y: 39 },
  { name: "학술문화관", x: 50, y: 70 },
  { name: "본관", x: 60, y: 20 },
  { name: "과학관", x: 42, y: 26 },
  { name: "원흥관", x: 41, y: 26 },
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
  // API 데이터 + 로컬 좌표 매핑
  const mappedLocations = apiData
    .map((item) => {
      // console.log("매핑 시도:", item.location?.name); // 디버깅
      const local = buildingLocations.find(
        (b) => b.name === item.location?.name
      );
      if (!local) {
        console.log("매핑 실패 - 찾을 수 없는 위치:", item.location?.name); // 디버깅
        return null;
      }
      // console.log("매핑 성공:", local); // 디버깅
      return {
        ...item,
        x: local.x,
        y: local.y,
      };
    })
    .filter(Boolean);
  // console.log(selectedFilter);
  // console.log("최종 mappedLocations:", mappedLocations); // 디버깅
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
          label={item.location.name}
          x={item.x}
          y={item.y}
          isSelected={selectedPin === item.location.name}
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            if (!mapConfigs[item.location.name]) {
              console.log("상세지도 없음:", item.location.name);
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
      <img src={emptyMap} alt="캠퍼스 지도" />
      {/* 왼쪽 위 로고 (selectedFilter 아이콘) */}
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
