import React, { useState } from "react";

import SearchIcon from "../../assets/images/icons/map-icons/Search.svg";
import FilterButton from "../../components/MapComponents/FilterButton";

function FilterBar({ selectedFilter, setSelectedFilter, onFilterClick }) {

  // 1) 한글 ↔ 영문 매핑
  const filterMap = {
    부스: "Booth",
    화장실: "Toilet",
    "주류 판매": "Drink",
    편의점: "Store",
    푸드트럭: "FoodTruck",
  };
  const filters = Object.keys(filterMap); // ["부스", "화장실", "주류 판매", "편의점", "푸드트럭"]

  // 2) 버튼 클릭 시
 
  const handleFilterClick = (filter) => {
    const englishFilter = filterMap[filter];
    console.log("선택된 필터(한글):", filter);
    console.log("선택된 필터(영문):", englishFilter);

    // 부모 Map.jsx 상태 업데이트
    setSelectedFilter(englishFilter);

    // 추가 콜백 실행 (핀 초기화용)
    if (onFilterClick) {
      onFilterClick(englishFilter);
    }
  };

  return (
    <div className="flex mx-auto w-full flex-wrap gap-[10px]">
      {filters.map((filter) => (
        <FilterButton
          key={filter}
       isActive={filterMap[filter] === selectedFilter}
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
        </FilterButton>
      ))}
    </div>
  );
}

export default FilterBar;
