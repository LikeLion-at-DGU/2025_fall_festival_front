import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import BoothCard from "./BoothCard";
import NotBoothCard from "./NotBoothCard";

function PullList({ booths, selectedFilter, searchTerm, selectedPin }) {
  const minHeight = 80; // 최소 높이 - 더 낮게
  const maxHeight = Math.min(450, window.innerHeight - 100 - 62); // 최대 높이를 더 제한
  const defaultHeight = 150; // 첫 시작 높이 150px

  const [sheetHeight, setSheetHeight] = useState(defaultHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(defaultHeight);
  const sheetRef = useRef(null);
  const textClass = "text-[14px] font-normal leading-[150%]";

  // 마우스/터치 이벤트 핸들러
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

      const deltaY = startY - clientY; // 위로 드래그하면 양수
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

    // 최소 높이 근처에서만 스냅, 나머지는 고정
    if (sheetHeight < minHeight + 30) {
      // 80px + 30px = 110px 이하일 때만 스냅
      setSheetHeight(minHeight); // 80px - 접힌 상태로 스냅
    }
    // 그 외의 경우는 현재 높이에서 고정 (스냅하지 않음)
  }, [sheetHeight, minHeight]);

  // 마우스 이벤트
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

  // 터치 이벤트
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

  const navigate = useNavigate();

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

  // 클라이언트에서 검색 및 핀 선택 필터링
  const searchFilteredBooths = booths.filter((booth) => {
    // 검색어 필터링
    const matchesSearch =
      searchTerm === "" ||
      booth.name.toLowerCase().includes(searchTerm.toLowerCase());
    // 핀 선택 필터링
    const matchesPin =
      selectedPin === null || booth.location.name === selectedPin;
    return matchesSearch && matchesPin;
  });

  // 검색어와 일치하는 부스를 맨 위로 정렬
  const sortedBooths = [...searchFilteredBooths].sort((a, b) => {
    if (!searchTerm) return 0;
    const aMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase())
      ? 0
      : 1;
    const bMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase())
      ? 0
      : 1;
    return aMatch - bMatch;
  });

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
        bottom: "62px", // BottomNav 높이만큼 위에서 시작
        height: `${sheetHeight}px`,
        zIndex: 40,
        transform: isDragging ? "none" : undefined,
      }}
    >
      {/* 드래그 핸들 - 더 큰 영역 */}
      <div
        className="w-full py-6 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-[163px] h-[4px] flex-shrink-0 rounded-[100px] bg-[#A1A1AA] mx-auto"></div>
      </div>

      {/* 헤더 */}
      <div className="px-[17px] pb-4">
        <span className={`${textClass} text-[#2A2A2A]`}>미리보기</span>
      </div>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-[17px] pb-[17px] hide-scrollbar">
          {/* 조건부 렌더링 */}
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
              {sortedBooths.map((booth) =>
                booth.category === "Booth" || booth.category === "FoodTruck" ? (
                  <BoothCard
                    key={booth.booth_id} //부스 아이디
                    boothId={booth.booth_id} //부스 아이디 추가
                    title={booth.name} //만해광장 푸드트럭
                    image={booth.image_url} //이미지
                    isNight={booth.is_night}
                    startTime={booth.start_time} //영업시작
                    endTime={booth.end_time} //영업종료
                    businessDays={booth.business_days?.[0]?.weekday} //영업요일
                    location={booth.location.name} //만해광장
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
                    title={booth.name}
                    distance_m={booth.distance_m}
                    category={booth.category}
                    onClick={() => {
                      if (booth.category === "Drink")
                        navigate(`/drink/${booth.booth_id}`);
                      else if (booth.category === "Toilet")
                        navigate(`/toilet/${booth.booth_id}`);
                    }}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PullList;
