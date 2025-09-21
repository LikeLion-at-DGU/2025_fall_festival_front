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

  setSelectedFilter((prev) => {
    // 같은 필터를 다시 누른 경우
    if (prev === englishFilter) {
      if (onFilterClick) {
        onFilterClick(null); // DetailMap 닫기 (selectedPin 해제)
      }
      return prev; // 필터는 그대로 유지
    }

    // 다른 필터를 누른 경우
    if (onFilterClick) {
      onFilterClick(null); // DetailMap 닫기 (새 필터로 바꿀 때도 해제해줄지 선택 가능)
    }
    return englishFilter;
  });
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
