// MapContainer.jsx
import React from "react";
import MapWithPins from "./MapWithPins";
import DetailMap from "./DetailMap";
import { mapConfigs } from "../../config/mapConfigs";
import defaultMap from "../../assets/images/banners/default-img.png"
const MapContainer = ({
  apiData,
  selectedFilter,
  onSelectBooth,
  selectedPin,
  handlePinClick,
  selectedDate,        // ✅ 추가
  isNightToggle        // ✅ 추가
}) => {  return (
    <div className="w-full mx-auto relative">
      {selectedFilter === "Booth" && selectedPin ? (
        <DetailMap
           buildingId={selectedPin} 
          onClose={() => handlePinClick(null)}   // 뒤로가기 → 핀 해제
          onSelectBooth={onSelectBooth}
            selectedDate={selectedDate}      
          isNightToggle={isNightToggle}
        />
      ) : (
        <MapWithPins
          apiData={apiData}
          selectedFilter={selectedFilter}
          selectedPin={selectedPin}
          handlePinClick={handlePinClick}       // 부모에서 내려준 함수 그대로 사용
        />
      )}
    </div>
  );
};

export default MapContainer;
