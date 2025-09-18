import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";

import FilterButton from "../../components/MapComponents/FilterButton";
import CampusmapIcon from "../../assets/images/icons/map-icons/Campusmap.svg";
import MapToiletIcon from "../../assets/images/icons/map-icons/MapToilet.svg";
import MapBeerIcon from "../../assets/images/icons/map-icons/MapBeer.svg";
import MapConvenienceIcon from "../../assets/images/icons/map-icons/MapConvenience.svg";
import FoodtruckIcon from "../../assets/images/icons/map-icons/Foodtruck.svg";

import LocationPin from "../../components/MapComponents/LocationPin";
import BoothCard from "../../components/MapComponents/BoothCard";
import ToiletCard from "../../components/MapComponents/ToiletCard";
import BeerCard from "../../components/MapComponents/BeerCard";
import ConvenienceCard from "../../components/MapComponents/ConvenienceCard";
import SearchBar from "../../components/MapComponents/SearchBar";
import FilterBar from "../../components/MapComponents/FilterBar";
import PullList from "../../components/MapComponents/PullList";
import MapWithPins from "../../components/MapComponents/MapWithPins";

import useBooths from "../../hooks/MapHooks/useBooths";
import useFilteredBooths from "../../hooks/MapHooks/useFilteredBooths"

function Map() {
  const [selectedFilter, setSelectedFilter] = useState("Booth");
  const [searchText, setSearchText] = useState("");
  const { booths, loading, error } = useBooths(selectedFilter);
  const filteredBooths = useFilteredBooths(booths, selectedFilter);
  
 // 선택 필터 콘솔 확인
  console.log("현재 선택된 필터:", selectedFilter);
  useEffect(() => {
  console.log("Map.jsx에서 selectedFilter 변경 확인:", selectedFilter);
}, [selectedFilter]);

// 콘솔 확인
console.log("booths 데이터:", booths);
console.log("filteredbooths 데이터:", filteredBooths);


  return (
    <div className="flex flex-col h-full ">
      <div className="h-[364px] px-[19px] py-[28px]">
        <div className="flex flex-col gap-[26px]">
          <div className="flex flex-col gap-[20px]">
           <SearchBar searchTerm={searchText} setSearchTerm={setSearchText} />
            <FilterBar selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
          </div>

          <MapWithPins apiData={filteredBooths} selectedFilter={selectedFilter} />
        </div>
      </div>
      <PullList booths={filteredBooths} selectedFilter={selectedFilter} />
    </div>
  );
}

export default Map;
