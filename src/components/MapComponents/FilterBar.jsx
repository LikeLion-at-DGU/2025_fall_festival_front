import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import SearchIcon from "../../assets/images/icons/map-icons/Search.svg";
import FilterButton from "../../components/MapComponents/FilterButton";

function FilterBar({ selectedFilter, setSelectedFilter, onFilterClick }) {
  const { t } = useTranslation();

  // 1) 한글 ↔ 영문 매핑
  const filterMap = {
    booth: "Booth",
    toilet: "Toilet",
    drink: "Drink",
    store: "Store",
    foodTruck: "FoodTruck",
  };
  const filters = Object.keys(filterMap); 
  // ["booth", "toilet", "drink", "store", "foodTruck"]

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
  <div className="flex mx-auto w-full flex-wrap gap-[12px]">
    {filters.map((filter) => (
      <FilterButton
        key={filter}
        isActive={filterMap[filter] === selectedFilter}
        onClick={() => handleFilterClick(filter)}
        className="py-[4px] px-[8px] rounded-[12px] "
      >
        {t(`map.filters.${filter}`)}
      </FilterButton>
    ))}
  </div>
);

}

export default FilterBar;
