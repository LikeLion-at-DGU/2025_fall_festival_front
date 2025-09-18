import React from "react";
import LocationPin from "./LocationPin";
import emptyMap from "../../assets/images/icons/map-icons/emptyMap.svg";
import Campusmap from "../../assets/images/icons/map-icons/Campusmap.svg";
import MapToiletIcon from "../../assets/images/icons/map-icons/toilet.png";
import MapBeerIcon from "../../assets/images/icons/map-icons/beer.png";
import MapConvenienceIcon from "../../assets/images/icons/map-icons/convenience.png";
import FoodtruckIcon from "../../assets/images/icons/map-icons/Foodtruck.svg";

// 로컬 좌표 정보
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

const MapWithPins = ({
  apiData = [], // 서버에서 받아온 부스/화장실/주류/푸드트럭 데이터
  selectedPin,
  handlePinClick,
}) => {
  // API 데이터 + 로컬 좌표 매핑
  const mappedLocations = apiData
    .map((item) => {
      const local = buildingLocations.find(
        (b) => b.name === item.location.name
      );
      if (!local) return null; // 좌표 없는 건 제외
      return {
        ...item,
        x: local.x,
        y: local.y,
      };
    })
    .filter(Boolean);

  // 핀 렌더링
  const renderPins = () =>
    mappedLocations.map((item) => (
      <div key={item.booth_id} className="pointer-events-auto">
        <LocationPin
          label={item.location.name}
          x={item.x}
          y={item.y}
          isSelected={selectedPin === item.id}
          onClick={() => handlePinClick(item)}
        />
      </div>
    ));

  return (
      <div className="w-full h-[232px]
      flex justify-center items-center
       flex-shrink-0 rounded-[16px] 
       border border-[#E4E4E7] bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#FBD1CD]">
        <img
          src={emptyMap}
          alt="캠퍼스 지도"
        />
        <div className="absolute inset-0">
          {renderPins()}
        </div>
      </div>
  );
};

export default MapWithPins;
