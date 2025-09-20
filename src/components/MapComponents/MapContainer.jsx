// MapContainer.jsx
import React, { useState, useEffect } from "react";
import MapWithPins from "./MapWithPins";
import DetailMap from "./DetailMap";
import { mapConfigs } from "../../config/mapConfigs";

const MapContainer = ({ apiData, selectedFilter, onSelectBooth }) => {
  const [selectedPin, setSelectedPin] = useState(null);

  // ✅ 필터가 바뀔 때 상세지도 닫기
  useEffect(() => {
    setSelectedPin(null);
  }, [selectedFilter]);

  return (
    <div className="w-[343px] mx-auto relative">
      {selectedPin ? (
        <DetailMap
          buildingName={selectedPin}
          onClose={() => setSelectedPin(null)}
          onSelectBooth={(boothName) => {
            if (onSelectBooth) {
              onSelectBooth(boothName);
            }
          }}
        />
      ) : (
        <MapWithPins
          apiData={apiData}
          selectedFilter={selectedFilter}
          selectedPin={selectedPin}
          handlePinClick={(item) => {
            const buildingName = item?.location?.name || null;
            if (buildingName && mapConfigs[buildingName]) {
              setSelectedPin(buildingName);
            }
          }}
        />
      )}
    </div>
  );
};

export default MapContainer;
