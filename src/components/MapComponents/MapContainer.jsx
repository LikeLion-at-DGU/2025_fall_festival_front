import React from "react";
import MapWithPins from "./MapWithPins";
import DetailMap from "./DetailMap";

const MapContainer = ({
  apiData,
  selectedFilter,
  onSelectBooth,
  selectedPin,
  handlePinClick,
  selectedDate,
  isNightToggle,
}) => {
  return (
    <div className="w-full mx-auto relative">
      {selectedFilter === "Booth" && selectedPin ? (
        <DetailMap
          buildingId={selectedPin}
          onClose={() => handlePinClick(null)} // 뒤로가기 → selectedPin 해제
          onSelectBooth={onSelectBooth}
          selectedDate={selectedDate}
          isNightToggle={isNightToggle}
        />
      ) : (
        <MapWithPins
          apiData={apiData}
          selectedFilter={selectedFilter}
          selectedPin={selectedPin}
          handlePinClick={handlePinClick} // 클릭 시 selectedPin 갱신
        />
      )}
    </div>
  );
};

export default MapContainer;
