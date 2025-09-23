import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchBar from "../../components/MapComponents/SearchBar";
import FilterBar from "../../components/MapComponents/FilterBar";
import PullList from "../../components/MapComponents/PullList";
import MapWithPins from "../../components/MapComponents/MapWithPins";
import sun from "../../assets/images/icons/toggle-icons/morningIcon.svg";
import moon from "../../assets/images/icons/toggle-icons/nightIcon.svg";
import { useMemo } from "react";
import useBooths from "../../hooks/MapHooks/useBooths";
// import useFilteredBooths from "../../hooks/MapHooks/useFilteredBooths";
import DateDropdown from "../../components/MapComponents/DateDropdown";
import useUserLocation from "../../hooks/MapHooks/useUserLocation";
import usePinSelection from "../../hooks/MapHooks/usePinSelection";
import useSearch from "../../hooks/MapHooks/useSearch";
import MapContainer from "../../components/MapComponents/MapContainer";
function Map() {
  const routerLocation = useLocation(); // ✅ 이름을 routerLocation으로 변경
  const [selectedFilter, setSelectedFilter] = useState("Booth");

 useEffect(() => {
  if (routerLocation.state?.filter) {
    setSelectedFilter(routerLocation.state.filter);
    sessionStorage.setItem("lastFilter", routerLocation.state.filter);
  } else {
    const savedFilter = sessionStorage.getItem("lastFilter");
    if (savedFilter) setSelectedFilter(savedFilter);
  }

  if (routerLocation.state?.pin) {
    // ✅ setSelectedPin 대신 handlePinClick 사용
    handlePinClick(routerLocation.state.pin);
    sessionStorage.setItem("lastPin", routerLocation.state.pin);
  } else {
    const savedPin = sessionStorage.getItem("lastPin");
    if (savedPin) {
      handlePinClick(savedPin);
    }
  }
}, [routerLocation.state?.filter, routerLocation.state?.pin]);


  const { location: userLocation, getCurrentLocation } = useUserLocation();
  // 축제 시작일
  const festivalStart = new Date("2025-09-24T00:00:00");

  // 오늘 날짜
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0]; // YYYY-MM-DD

  // 디폴트 날짜
  const defaultDate = now < festivalStart ? "2025-09-24" : todayStr;

  // 디폴트 낮/밤
  const defaultIsNight =
    now < festivalStart
      ? false // 축제 전이면 낮 고정
      : now.getHours() >= 17 || now.getHours() < 5;
  // ✅ localStorage에서 불러오기
  const [selectedDate, setSelectedDate] = useState(
    () => localStorage.getItem("selectedDate") || defaultDate
  );
  const [isNightToggle, setIsNightToggle] = useState(() => {
    const saved = localStorage.getItem("isNightToggle");
    return saved !== null ? saved === "true" : defaultIsNight;
  });
  // ✅ 값이 바뀔 때 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem("isNightToggle", isNightToggle);
  }, [isNightToggle]);
  const { booths, loading, error } = useBooths(
    selectedFilter,
    userLocation,
    isNightToggle,
    selectedDate
  );

  // const filteredBooths = useFilteredBooths(booths, selectedFilter);
  const { selectedPin, handlePinClick, handleFilterClick } =
    usePinSelection(selectedFilter);
  const { searchText, setSearchText } = useSearch();
  const [selectedBooth, setSelectedBooth] = useState(null);

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
  // console.log("filteredbooths 데이터:", filteredBooths);

  // 컴포넌트 마운트 시 body 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  //  booths 안의 business_days에서 날짜 목록 추출
  const availableDates = useMemo(() => {
    const dates = booths.flatMap(
      (b) => b.business_days?.map((d) => d.day) || []
    );
    return [...new Set(dates)]; // 중복 제거
  }, [booths]);
  // console.log("가능한 날짜아아아", availableDates);

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-[19px] py-[24px] overflow-hidden">
        <div className="flex flex-col gap-[26px] h-full">
          <div className="flex flex-col gap-[20px]">
            <SearchBar searchTerm={searchText} setSearchTerm={setSearchText} />
            <FilterBar
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              onFilterClick={handlePinClick} // 여기서 selectedPin을 null로 만듦
            />
          </div>

          <div className="relative flex-1">
            {/* 맵 */}
            <MapContainer
              className="absolute inset-0"
              apiData={booths}
              selectedFilter={selectedFilter}
              onSelectBooth={setSelectedBooth}
              selectedPin={selectedPin}
              handlePinClick={handlePinClick}
              selectedDate={selectedDate}
              isNightToggle={isNightToggle}
            />

            {/* 맵 위 스위치 */}
            {selectedFilter === "Booth" && !selectedPin && (
              <div className="absolute top-[11px] right-[11px] z-10 ">
                {/* ✅ 날짜 드롭다운 추가 */}
                <div className="flex flex-row gap-2">
                  <DateDropdown
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isNightToggle === true}
                      onChange={(e) => setIsNightToggle(e.target.checked)}
                    />
                    {/* 스위치 바탕 */}
                    <div className=" w-[44px] p-[2px] h-6 bg-[#FBD1CD] rounded-full transition-colors peer-checked:bg-[#F58F84] flex items-center justify-around px-[4px]">
                      {/* 🌙 아이콘 (왼쪽) */}
                      <img src={sun} alt="moon" className="w-[13px] h-[13px]" />
                      {/* 🌞 아이콘 (오른쪽) */}
                      <img src={moon} alt="sun" className="w-[9px] h-[9px]" />

                      {/* 동그라미 */}
                      <span
                        className={
                          "absolute top-[2.5px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-[0_3px_7.1px_0_rgba(0,0,0,0.25)] " +
                          (!isNightToggle
                            ? "translate-x-[20px]"
                            : "translate-x-0")
                        }
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 바텀시트 */}
      <PullList
        booths={booths}
        selectedFilter={selectedFilter}
        searchTerm={searchText}
        selectedPin={selectedPin}
        selectedBooth={selectedBooth} // ✅ 추가
      />
    </div>
  );
}

export default Map;
