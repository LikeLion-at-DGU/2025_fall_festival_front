// MapContainer.jsx
import React, { useState } from "react";
import MapWithPins from "./MapWithPins";
import DetailMap from "./DetailMap";

const MapContainer = ({ apiData, selectedFilter, onSelectBooth }) => {
  const [selectedPin, setSelectedPin] = useState(null);

  return (
    <div className="w-[343px] mx-auto">
      {selectedPin ? (
        <DetailMap
          buildingName={selectedPin}
          onClose={() => setSelectedPin(null)}
          onSelectBooth={(boothName) => {
            if (onSelectBooth) {
              onSelectBooth(boothName); // ✅ 상위(Map.jsx)로 전달
            }
          }}
        />
      ) : (
        <MapWithPins
          apiData={apiData}
          selectedFilter={selectedFilter}
          selectedPin={selectedPin}
          handlePinClick={(item) =>
            setSelectedPin(item?.location?.name || null)
          }
        />
      )}
    </div>
  );
};

export default MapContainer;
