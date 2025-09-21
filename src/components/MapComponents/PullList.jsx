import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import i18n from "i18next";

import BoothCard from "./BoothCard";
import NotBoothCard from "./NotBoothCard";
import { useBoothTranslation } from "../../hooks/useTranslation";
import { useTranslation } from 'react-i18next';

function PullList({
  booths,
  selectedFilter,
  searchTerm,
  selectedPin,
  selectedBooth,
}) {
  // 번역 훅 사용
  const { getTranslatedBooths } = useBoothTranslation(booths);
  const { t } = useTranslation();

  // 언어 변경 감지 로그
  useEffect(() => {
    console.log("PullList - 현재 언어:", i18n.language);
    if (booths && booths.length > 0) {
      const translatedBooths = getTranslatedBooths();
      console.log("PullList - 번역된 부스 데이터:", {
        원본: booths[0]?.name,
        번역: translatedBooths[0]?.translatedName,
        위치원본: booths[0]?.location?.name,
        위치번역: translatedBooths[0]?.translatedLocation,
      });
    }
  }, [i18n.language, booths, getTranslatedBooths]);
  const minHeight = 150;
  const defaultHeight = 150;

  // ✅ maxHeight를 상태로 관리
  const [maxHeight, setMaxHeight] = useState(
    Math.min(410, window.innerHeight - 100 - 82)
  );

  useEffect(() => {
    const handleResize = () => {
      setMaxHeight(Math.min(480, window.innerHeight - 100 - 82));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ snapPoints를 useMemo로 관리 → maxHeight 변하면 같이 반영
  const snapPoints = useMemo(
    () => [minHeight, maxHeight],
    [minHeight, maxHeight]
  );

  const [sheetHeight, setSheetHeight] = useState(defaultHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(defaultHeight);
  const sheetRef = useRef(null);
  const textClass = "text-[14px] font-normal leading-[150%]";

  const navigate = useNavigate();

  // ----------------------------
  // 드래그 핸들러
  // ----------------------------
  const handleStart = useCallback(
    (clientY) => {
      setIsDragging(true);
      setStartY(clientY);
      setStartHeight(sheetHeight);
    },
    [sheetHeight]
  );

  const handleMove = useCallback(
    (clientY) => {
      if (!isDragging) return;
      const deltaY = startY - clientY;
      const newHeight = Math.max(
        minHeight,
        Math.min(maxHeight, startHeight + deltaY)
      );
      setSheetHeight(newHeight);
    },
    [isDragging, startY, startHeight, minHeight, maxHeight]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);

    let closestSnap = snapPoints[0];
    let minDistance = Math.abs(sheetHeight - snapPoints[0]);

    snapPoints.forEach((snapPoint) => {
      const distance = Math.abs(sheetHeight - snapPoint);
      if (distance < minDistance) {
        minDistance = distance;
        closestSnap = snapPoint;
      }
    });

    setSheetHeight(closestSnap);
  }, [sheetHeight, snapPoints]);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      handleStart(e.clientY);
    },
    [handleStart]
  );

  const handleMouseMove = useCallback(
    (e) => {
      handleMove(e.clientY);
    },
    [handleMove]
  );

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const handleTouchStart = useCallback(
    (e) => {
      handleStart(e.touches[0].clientY);
    },
    [handleStart]
  );

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientY);
    },
    [handleMove]
  );

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // 글로벌 이벤트 리스너
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // ----------------------------
  // 검색 및 필터링 (번역된 데이터 사용)
  // ----------------------------
  const searchFilteredBooths = useMemo(() => {
    const translatedBooths = getTranslatedBooths();

    return translatedBooths.filter((booth) => {
      const boothName = booth.translatedName || booth.name;
      const locationName =
        booth.translatedLocation || (booth.location?.name ?? "");

      const matchesSearch =
        searchTerm === "" ||
        boothName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        locationName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPin = selectedPin === null || locationName === selectedPin;

      return matchesSearch && matchesPin;
    });
  }, [booths, searchTerm, selectedPin, getTranslatedBooths]);

  const sortedBooths = useMemo(() => {
    return [...searchFilteredBooths].sort((a, b) => {
      if (!searchTerm) return 0;
      const aName = a.translatedName || a.name;
      const bName = b.translatedName || b.name;
      const aMatch = aName.toLowerCase().includes(searchTerm.toLowerCase())
        ? 0
        : 1;
      const bMatch = bName.toLowerCase().includes(searchTerm.toLowerCase())
        ? 0
        : 1;
      return aMatch - bMatch;
    });
  }, [searchFilteredBooths, searchTerm]);

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
      </div>

      {/* 스크롤 가능한 콘텐츠 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-[17px] pb-[17px] hide-scrollbar">
          {sortedBooths.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <span className={`${textClass} text-[#8A8A8A]`}>
                {selectedPin
                  ? t("pullList.noBooths")
                  : searchTerm
                  ? t("pullList.noSearchResults")
                  : t("pullList.noBooths")}
              </span>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-[12px]">
              {sortedBooths.map((booth) => {
                const boothName = booth.translatedName || booth.name;
                const locationName =
                  booth.translatedLocation || (booth.location?.name ?? "");

                return booth.category === "Booth" ||
                  booth.category === "FoodTruck" ||
                  booth.category === "Drink" ? (
                  <BoothCard
                    key={booth.booth_id}
                    boothId={booth.booth_id}
                    title={boothName}
                    image={booth.image_url || undefined}
                    location={locationName}
                    isSelected={selectedBooth === booth.name}
                    startTime={booth.start_time}
                    endTime={booth.end_time}
                    businessDays={booth.business_days[0]?.weekday}
                    className="w-full"
                    onClick={() =>
                      navigate(
                        booth.category === "FoodTruck"
                          ? `/foodtruck/${booth.booth_id}`
                          : booth.category === "Drink"
                          ? `/drink/${booth.booth_id}`
                          : `/booth/${booth.booth_id}`
                      )
                    }
                  />
                ) : (
                  <NotBoothCard
                    key={booth.booth_id}
                    title={boothName}
                    distance_m={booth.distance_m}
                    category={booth.category}
                    isSelected={selectedPin === locationName}
                    onClick={() => {
                      if (booth.category === "Toilet")
                        navigate(`/toilet/${booth.booth_id}`);
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
