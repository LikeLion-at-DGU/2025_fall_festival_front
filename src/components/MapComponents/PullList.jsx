import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";
import { useLocation } from "react-router-dom";
import BoothCard from "./BoothCard";
import NotBoothCard from "./NotBoothCard";
import { useBoothTranslation } from "../../hooks/useTranslation";
import { useTranslation } from "react-i18next";

function PullList({
  booths,
  selectedFilter,
  searchTerm,
  selectedPin,
  selectedBooth,
}) {
  console.log("바텀시트 핀 확인:", selectedPin)
  // 번역 훅 사용
  const { getTranslatedBooths } = useBoothTranslation(booths);
  const { t } = useTranslation();

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

  const navigate = usePrefixedNavigate();
  // 글씨 단순화
  const normalizeLabel = (str = "") => str.replace(/\s+/g, " ").trim();

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

      //  숫자 변환해서 비교
      const matchesPin =
        selectedPin === null ||
        Number(booth.location?.id) === Number(selectedPin);

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
        max-w-[430px] mx-auto
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
      <div className="px-[17px] pb-4"></div>

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
                    isSelected={selectedPin === booth.location?.id}
                    isHighlighted={
                      selectedBooth &&
                      normalizeLabel(selectedBooth) ===
                        normalizeLabel(boothName)
                    }
                    startTime={booth.start_time}
                    endTime={booth.end_time}
                    businessDays={booth.business_days}
                    likesCount={booth.like_cnt || 0}
                    isLiked={booth.is_liked || false}
                    badges={{
                      isEventActive: booth.is_event || false,
                      isDOrderPartner: booth.is_dorder || false,
                    }}
                    category={booth.category}
                    distance_m={booth.distance_m}
                    className="w-full"
                    onClick={() => {
                      const path =
                        booth.category === "FoodTruck"
                          ? `/foodtruck/${booth.booth_id}`
                          : booth.category === "Drink"
                          ? `/drink/${booth.booth_id}`
                          : `/booth/${booth.booth_id}`;

                      const pinId = booth.location?.id; // ✅ location.id 확보

                      const state =
                        booth.category === "FoodTruck" ||
                        booth.category === "Drink" ||
                        booth.category === "Toilet"
                          ? { filter: selectedFilter }
                          : {
                              pin: pinId,
                              filter: selectedFilter,
                            };

                      if (selectedFilter)
                        sessionStorage.setItem("lastFilter", selectedFilter);
                      if (booth.category === "Booth" && pinId) {
                        sessionStorage.setItem("lastPin", pinId);
                      }

                      navigate(path, { state });
                    }}
                  />
                ) : (
                  <NotBoothCard
                    key={booth.booth_id}
                    title={boothName}
                    image={booth.image_url || undefined}
                    distance_m={booth.distance_m}
                    category={booth.category}
                    location={locationName}
                    boothId={booth.booth_id}
                    isSelected={
                      Number(selectedPin) === Number(booth.location?.id)
                    }
                    onClick={() => {
                      if (booth.category === "Toilet") {
                        // ✅ sessionStorage에 현재 필터 저장
                        if (selectedFilter) {
                          sessionStorage.setItem("lastFilter", selectedFilter);
                        }

                        // ✅ 필터 state도 같이 넘김
                        navigate(`/toilet/${booth.booth_id}`, {
                          state: { filter: selectedFilter },
                        });
                      }
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
