import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

import BoothCard from "./BoothCard";
import NotBoothCard from "./NotBoothCard";

function PullList({
  booths,
  selectedFilter,
  searchTerm,
  selectedPin,
  selectedBooth,
}) {
  const minHeight = 150;
  const maxHeight = Math.min(480, window.innerHeight - 100 - 62);
  const defaultHeight = 150;

  const snapPoints = [minHeight, maxHeight];

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
  // 검색 및 필터링
  // ----------------------------
  const searchFilteredBooths = useMemo(() => {
    return booths.filter((booth) => {
      const boothName = booth.name;
      const locationName = booth.location?.name ?? "";

      const matchesSearch =
        searchTerm === "" ||
        boothName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        locationName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPin = selectedPin === null || locationName === selectedPin;

      return matchesSearch && matchesPin;
    });
  }, [booths, searchTerm, selectedPin]);

  const sortedBooths = useMemo(() => {
    return [...searchFilteredBooths].sort((a, b) => {
      if (!searchTerm) return 0;
      const aName = a.name;
      const bName = b.name;
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
                const boothName = booth.name;
                const locationName = booth.location?.name ?? "";

                return booth.category === "Booth" ||
                  booth.category === "FoodTruck" ||
                  booth.category === "Drink" ? (
                  <BoothCard
                    key={booth.booth_id}
                    boothId={booth.booth_id}
                    title={booth.name ?? ""} // ✅ 이름 없으면 빈칸
                    image={booth.image_url || undefined} // ✅ 없으면 undefined (img 자체 안 그림)
                    location={booth.location?.name ?? ""} // ✅ 위치 없으면 빈칸
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
