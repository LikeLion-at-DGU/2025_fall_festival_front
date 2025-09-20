import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../components/MapComponents/SearchBar";
import FilterBar from "../../components/MapComponents/FilterBar";
import PullList from "../../components/MapComponents/PullList";
import MapWithPins from "../../components/MapComponents/MapWithPins";

import useBooths from "../../hooks/MapHooks/useBooths";
import useFilteredBooths from "../../hooks/MapHooks/useFilteredBooths";
import useUserLocation from "../../hooks/MapHooks/useUserLocation";
import usePinSelection from "../../hooks/MapHooks/usePinSelection";
import useSearch from "../../hooks/MapHooks/useSearch";
import MapContainer from "../../components/MapComponents/MapContainer";
function Map() {
  const [selectedFilter, setSelectedFilter] = useState("Booth");
  const { location: userLocation, getCurrentLocation } = useUserLocation();
  const { booths, loading, error } = useBooths(selectedFilter, userLocation);
  const filteredBooths = useFilteredBooths(booths, selectedFilter);
  const { selectedPin, handlePinClick, handleFilterClick } =
    usePinSelection(selectedFilter);
  const { searchText, setSearchText } = useSearch();

  // 컴포넌트 마운트 시 위치 정보 요청
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // 선택 필터 콘솔 확인
  console.log("현재 선택된 필터:", selectedFilter);
  useEffect(() => {
    console.log("Map.jsx에서 selectedFilter 변경 확인:", selectedFilter);
  }, [selectedFilter]);

  // 콘솔 확인
  console.log("booths 데이터:", booths);
  console.log("filteredbooths 데이터:", filteredBooths);

  // 컴포넌트 마운트 시 body 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-[19px] py-[28px] overflow-hidden">
        <div className="flex flex-col gap-[26px] h-full">
          <div className="flex flex-col gap-[20px]">
            <SearchBar searchTerm={searchText} setSearchTerm={setSearchText} />
            <FilterBar
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              onFilterClick={handleFilterClick}
            />
          </div>
          <MapContainer
  apiData={filteredBooths}
  selectedFilter={selectedFilter}
  onSelectBooth={(boothName) => setSearchText(boothName)}
  selectedPin={selectedPin}         
  handlePinClick={handlePinClick}  
/>
        </div>
      </div>

      {/* 바텀시트 */}
      <PullList
        booths={filteredBooths}
        selectedFilter={selectedFilter}
        searchTerm={searchText}
        selectedPin={selectedPin}
      />
    </div>
  );
}

export default Map;
