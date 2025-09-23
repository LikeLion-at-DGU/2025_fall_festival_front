// MapContainer.jsx
import React from "react";
import MapWithPins from "./MapWithPins";
import DetailMap from "./DetailMap";
import Skeleton from "../Skeleton/Skeleton"

const MapContainer = ({
  apiData,
  selectedFilter,
  onSelectBooth,
  selectedPin,
  handlePinClick,
  selectedDate,
  isNightToggle,
  loading, // ✅ 부모(Map.jsx)에서 내려줄 수 있으면 제일 좋음
}) => {
  // 1) 로딩 중일 때 스켈레톤
  if (loading || !apiData || apiData.length === 0) {
    return (
      <div className="w-full mx-auto relative">
        <Skeleton width="100%" height="232px" rounded="rounded-[16px]" />
      </div>
    );
  }

  // 2) DetailMap or MapWithPins 분기
  return (
    <div className="w-full mx-auto relative">
      {selectedFilter === "Booth" && selectedPin ? (
        <DetailMap
          buildingId={selectedPin}
          onClose={() => handlePinClick(null)} // 뒤로가기 → 핀 해제
          onSelectBooth={onSelectBooth}
          selectedDate={selectedDate}
          isNightToggle={isNightToggle}
        />
      ) : (
        <MapWithPins
          apiData={apiData}
          selectedFilter={selectedFilter}
          selectedPin={selectedPin}
          handlePinClick={handlePinClick}
        />
      )}
    </div>
  );
};

export default MapContainer;
