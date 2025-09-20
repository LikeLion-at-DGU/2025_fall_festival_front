// MapContainer.jsx
import React from "react";
import MapWithPins from "./MapWithPins";
import DetailMap from "./DetailMap";
import { mapConfigs } from "../../config/mapConfigs";

const MapContainer = ({ apiData, selectedFilter, onSelectBooth, selectedPin, handlePinClick }) => {
  return (
    <div className="w-full mx-auto relative">
      {selectedPin ? (
        <DetailMap
          buildingName={selectedPin}
          onClose={() => handlePinClick(null)}   // 뒤로가기 → 핀 해제
          onSelectBooth={onSelectBooth}
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
