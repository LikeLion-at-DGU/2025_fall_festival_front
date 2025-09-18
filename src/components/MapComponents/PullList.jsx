import React, { useState, useRef } from "react";

import BoothCard from "./BoothCard";
import NotBoothCard from "./NotBoothCard";

function PullList({ booths, selectedFilter, searchTerm, selectedPin }) {
  const textClass = "text-[14px] font-normal leading-[150%]";
 
  // 클라이언트에서 검색 및 핀 선택 필터링
  const searchFilteredBooths = booths.filter((booth) => {
    // 검색어 필터링
    const matchesSearch = searchTerm === "" || booth.name.toLowerCase().includes(searchTerm.toLowerCase());
    // 핀 선택 필터링
    const matchesPin = selectedPin === null || booth.location.name === selectedPin;
    return matchesSearch && matchesPin;
  });

  // 검색어와 일치하는 부스를 맨 위로 정렬
  const sortedBooths = [...searchFilteredBooths].sort((a, b) => {
    if (!searchTerm) return 0;
    const aMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 0 : 1;
    const bMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 0 : 1;
    return aMatch - bMatch;
  });
    console.log("PullList searchTerm:", searchTerm); // <- 이거 찍어보기

  return (
    <div
      className={`
        absolute flex flex-col gap-2
        px-[17px] py-[45px]
         w-full  mt-auto
    rounded-t-[20px] shadow-[0_-1px_5px_rgba(0,0,0,0.10)] bg-[#FFF]`}
      style={{
        bottom: 0, // 화면 하단부터 시작
        minHeight: "368px", // 최소 높이
        maxHeight: "368px", // 최대 높이
      }}
    >
      <div className="w-[163px] h-[3px] flex-shrink-0 rounded-[100px] bg-[#A1A1AA] absolute top-[15px] left-1/2 -translate-x-1/2"></div>

      <span
        className={`${textClass} text-[#2A2A2A] absolute top-[18px] left-[18px]`}
      >
        미리보기
      </span>
      {/* 조건부 렌더링 */}
      {sortedBooths.length === 0 ? (
        <span
          className={`${textClass} text-[#8A8A8A] absolute top-[163px] left-1/2 -translate-x-1/2`}
        >
          {selectedPin ? `${selectedPin}에 부스가 없어요` : searchTerm ? "검색 결과가 없어요" : `${selectedFilter}에 부스가 없어요`}
        </span>
      ) : (
        <div
          className=" w-full flex flex-col gap-2"
        >
          {sortedBooths.map((booth) => (
            (booth.category === "Booth" || booth.category === "FoodTruck") ? (
              <BoothCard
                key={booth.booth_id} //부스 아이디
                title={booth.name} //만해광장 푸드트럭
                image={booth.image_url} //이미지
                isNight={booth.is_night}
                startTime={booth.start_time} //영업시작
                endTime={booth.end_time} //영업종료
                businessDays={ booth.business_days?.[0]?.weekday} //영업요일
                location={booth.location.name} //만해광장
                isOperating={booth.isOperating}
                isDorder={booth.is_dorder}
                isEvent={booth.is_event}
                likesCount={booth.likes_count} //좋아요 개수
                isLiked={booth.is_liked} //좋아요 눌렀는지
                className="w-full"
              />
            ) : (
              <NotBoothCard
                key={booth.booth_id}
                title={booth.name}
                distance_m={booth.distance_m}
                category={booth.category}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default PullList;
