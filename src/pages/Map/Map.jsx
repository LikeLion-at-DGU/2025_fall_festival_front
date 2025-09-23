import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../../components/MapComponents/SearchBar";
import FilterBar from "../../components/MapComponents/FilterBar";
import PullList from "../../components/MapComponents/PullList";
import sun from "../../assets/images/icons/toggle-icons/morningIcon.svg";
import moon from "../../assets/images/icons/toggle-icons/nightIcon.svg";
import useBooths from "../../hooks/MapHooks/useBooths";
import DateDropdown from "../../components/MapComponents/DateDropdown";
import useUserLocation from "../../hooks/MapHooks/useUserLocation";
import useSearch from "../../hooks/MapHooks/useSearch";
import MapContainer from "../../components/MapComponents/MapContainer";

function Map() {
  const [selectedFilter, setSelectedFilter] = useState("Booth");

  // ✅ selectedPin을 직접 관리
  const [selectedPin, setSelectedPin] = useState(() => localStorage.getItem("selectedPin"));

  // ✅ selectedPin 저장
  useEffect(() => {
    if (selectedPin) {
      localStorage.setItem("selectedPin", selectedPin);
    } else {
      localStorage.removeItem("selectedPin");
    }
  }, [selectedPin]);

  const { location: userLocation, getCurrentLocation } = useUserLocation();

  // 축제 시작일
  const festivalStart = new Date("2025-09-24T00:00:00");
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0]; // YYYY-MM-DD

  // 디폴트 날짜
  const defaultDate = now < festivalStart ? "2025-09-24" : todayStr;

  // 디폴트 낮/밤
  const defaultIsNight =
    now < festivalStart
      ? false // 축제 전이면 낮 고정
      : now.getHours() >= 17 || now.getHours() < 5;

  // ✅ 날짜/밤낮 localStorage 유지
  const [selectedDate, setSelectedDate] = useState(
    () => localStorage.getItem("selectedDate") || defaultDate
  );
  const [isNightToggle, setIsNightToggle] = useState(() => {
    const saved = localStorage.getItem("isNightToggle");
    return saved !== null ? saved === "true" : defaultIsNight;
  });

  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem("isNightToggle", isNightToggle);
  }, [isNightToggle]);

  const { booths } = useBooths(
    selectedFilter,
    userLocation,
    isNightToggle,
    selectedDate
  );

  const { searchText, setSearchText } = useSearch();
  const [selectedBooth, setSelectedBooth] = useState(null);

  // 위치 요청
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // 날짜 목록 추출
  const availableDates = useMemo(() => {
    const dates = booths.flatMap((b) => b.business_days?.map((d) => d.day) || []);
    return [...new Set(dates)];
  }, [booths]);

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
              onFilterClick={() => setSelectedPin(null)} // 필터 바꾸면 DetailMap 닫기
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
              handlePinClick={setSelectedPin} // ✅ 이제 여기서 직접 관리
              selectedDate={selectedDate}
              isNightToggle={isNightToggle}
            />

            {/* 맵 위 스위치 */}
            {selectedFilter === "Booth" && !selectedPin && (
              <div className="absolute top-[11px] right-[11px] z-10">
                <div className="flex flex-row gap-2">
                  <DateDropdown
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isNightToggle}
                      onChange={(e) => setIsNightToggle(e.target.checked)}
                    />
                    <div className="w-[44px] p-[2px] h-6 bg-[#FBD1CD] rounded-full transition-colors peer-checked:bg-[#F58F84] flex items-center justify-around px-[4px]">
                      <img src={sun} alt="sun" className="w-[13px] h-[13px]" />
                      <img src={moon} alt="moon" className="w-[9px] h-[9px]" />
                      <span
                        className={
                          "absolute top-[2.5px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow " +
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
        selectedBooth={selectedBooth}
      />
    </div>
  );
}

export default Map;
