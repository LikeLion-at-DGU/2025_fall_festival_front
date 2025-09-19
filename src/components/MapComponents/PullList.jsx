import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import BoothCard from "./BoothCard";
import NotBoothCard from "./NotBoothCard";
import { useTranslations } from "../../context/TranslationContext";

function PullList({ booths, selectedFilter, searchTerm, selectedPin }) {
  const minHeight = 80;
  const maxHeight = Math.min(450, window.innerHeight - 100 - 62);
  const defaultHeight = 150;

  const [sheetHeight, setSheetHeight] = useState(defaultHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(defaultHeight);
  const sheetRef = useRef(null);
  const textClass = "text-[14px] font-normal leading-[150%]";

  const navigate = useNavigate();
  const { translations, requestTranslations } = useTranslations(); // ✅ 번역 Context

  // ----------------------------
  // 번역 요청
  // ----------------------------
  useEffect(() => {
    if (!booths || booths.length === 0) return;

    const items = booths.flatMap((booth) => [
      {
        entity_type: "booth",
        entity_id: booth.booth_id,
        field: "BoothName",
        source_text: booth.name
      },
      {
        entity_type: "location",
        entity_id: booth.location?.id ?? booth.booth_id,
        field: "LocationName",
        source_text: booth.location?.name ?? ""
      }
    ]);

    requestTranslations(items);
  }, [booths, requestTranslations]);

  // ----------------------------
  // 드래그 핸들러 (원래 코드 유지)
  // ----------------------------
  const handleStart = useCallback((clientY) => {
    setIsDragging(true);
    setStartY(clientY);
    setStartHeight(sheetHeight);
  }, [sheetHeight]);

  const handleMove = useCallback((clientY) => {
    if (!isDragging) return;
    const deltaY = startY - clientY;
    const newHeight = Math.max(
      minHeight,
      Math.min(maxHeight, startHeight + deltaY)
    );
    setSheetHeight(newHeight);
  }, [isDragging, startY, startHeight, minHeight, maxHeight]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    if (sheetHeight < minHeight + 30) {
      setSheetHeight(minHeight);
    }
  }, [sheetHeight, minHeight]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    handleStart(e.clientY);
  }, [handleStart]);

  const handleMouseMove = useCallback((e) => {
    handleMove(e.clientY);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const handleTouchStart = useCallback((e) => {
    handleStart(e.touches[0].clientY);
  }, [handleStart]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientY);
  }, [handleMove]);

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // 글로벌 이벤트 리스너
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // ----------------------------
  // 검색 및 필터링
  // ----------------------------
  const searchFilteredBooths = booths.filter((booth) => {
    const boothName = translations[booth.booth_id + "-BoothName"] ?? booth.name;
    const locationName =
      translations[(booth.location?.id ?? booth.booth_id) + "-LocationName"] ??
      booth.location?.name ?? "";

    const matchesSearch =
      searchTerm === "" ||
      boothName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      locationName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPin =
      selectedPin === null || locationName === selectedPin;

    return matchesSearch && matchesPin;
  });

  const sortedBooths = [...searchFilteredBooths].sort((a, b) => {
    if (!searchTerm) return 0;
    const aName = translations[a.booth_id + "-BoothName"] ?? a.name;
    const bName = translations[b.booth_id + "-BoothName"] ?? b.name;
    const aMatch = aName.toLowerCase().includes(searchTerm.toLowerCase()) ? 0 : 1;
    const bMatch = bName.toLowerCase().includes(searchTerm.toLowerCase()) ? 0 : 1;
    return aMatch - bMatch;
  });

  // ----------------------------
  // 렌더링
  // ----------------------------
  return (
    <div
      ref={sheetRef}
      className={`
        fixed flex flex-col
        left-0 right-0
        max-w-md mx-auto
        rounded-t-[20px] shadow-[0_-1px_5px_rgba(0,0,0,0.10)] bg-[#FFF]
        ${isDragging ? "" : "transition-all duration-300 ease-out"}
      `}
      style={{
        bottom: "62px",
        height: `${sheetHeight}px`,
        zIndex: 40,
        transform: isDragging ? "none" : undefined,
      }}
    >
      {/* 드래그 핸들 */}
      <div
        className="w-full py-6 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-[163px] h-[4px] rounded-[100px] bg-[#A1A1AA] mx-auto"></div>
      </div>

      {/* 헤더 */}
      <div className="px-[17px] pb-4">
        <span className={`${textClass} text-[#2A2A2A]`}>미리보기</span>
      </div>

      {/* 스크롤 가능한 콘텐츠 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-[17px] pb-[17px] hide-scrollbar">
          {sortedBooths.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <span className={`${textClass} text-[#8A8A8A]`}>
                {selectedPin
                  ? `${selectedPin}에 부스가 없어요`
                  : searchTerm
                  ? "검색 결과가 없어요"
                  : `${selectedFilter}에 부스가 없어요`}
              </span>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-2">
              {sortedBooths.map((booth) => {
                const boothName = translations[booth.booth_id + "-BoothName"] ?? booth.name;
                const locationName =
                  translations[(booth.location?.id ?? booth.booth_id) + "-LocationName"] ??
                  booth.location?.name ?? "";

                return booth.category === "Booth" || booth.category === "FoodTruck" ? (
                  <BoothCard
                    key={booth.booth_id}
                    boothId={booth.booth_id}
                    title={boothName}          // ✅ 번역된 이름
                    image={booth.image_url}
                    isNight={booth.is_night}
                    startTime={booth.start_time}
                    endTime={booth.end_time}
                    businessDays={booth.business_days?.[0]?.weekday}
                    location={locationName}   // ✅ 번역된 위치
                    isOperating={booth.isOperating}
                    isDorder={booth.is_dorder}
                    isEvent={booth.is_event}
                    likesCount={booth.like_cnt} //좋아요 개수
                    isLiked={booth.is_liked} //좋아요 눌렀는지
                    className="w-full"
                    onClick={() =>
                      navigate(
                        booth.category === "FoodTruck"
                          ? `/foodtruck/${booth.booth_id}`
                          : `/booth/${booth.booth_id}`
                      )
                    }
                  />
                ) : (
                  <NotBoothCard
                    key={booth.booth_id}
                    title={boothName}          // ✅ 번역된 이름
                    distance_m={booth.distance_m}
                    category={booth.category}
                    onClick={() => {
                      if (booth.category === "Drink") navigate(`/drink/${booth.booth_id}`);
                      else if (booth.category === "Toilet") navigate(`/toilet/${booth.booth_id}`);
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PullList;
