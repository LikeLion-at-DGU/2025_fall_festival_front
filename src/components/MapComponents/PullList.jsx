import React, { useState, useRef } from "react";

import BoothCard from "./BoothCard";

function PullList({ booths, selectedFilter }) {
  const textClass = "text-[14px] font-normal leading-[150%]";
  const filteredBooths = booths.filter(
    (booth) => booth.category === selectedFilter
  );
  return (
    <div
      className={` 
        relative flex flex-col gap-2
        px-[17px] py-[45px]
         w-full min-h-[369px] mt-auto
    rounded-t-[20px] shadow-[0_-1px_5px_rgba(0,0,0,0.10)] bg-[#FFF]`}
    >
      <div className="w-[163px] h-[3px] flex-shrink-0 rounded-[100px] bg-[#A1A1AA] absolute top-[15px] left-1/2 -translate-x-1/2"></div>

      <span
        className={`${textClass} text-[#2A2A2A] absolute top-[18px] left-[18px]`}
      >
        미리보기
      </span>
      {/* 조건부 렌더링 */}
      {filteredBooths.length === 0 ? (
        <span
          className={`${textClass} text-[#8A8A8A] absolute top-[163px] left-1/2 -translate-x-1/2`}
        >
         {selectedFilter}에 부스가 없어요
        </span>
      ) : (
        <div
          className=" w-full
 flex flex-col gap-2"
        >
          {filteredBooths.map((booth) => (
            <BoothCard
              key={booth.booth_id}//부스 아이디
              title={booth.name}//만해광장 푸드트럭
              image={booth.image_url}//이미지
              isNight={booth.is_night}
              startTime={booth.start_time}//영업시작
              endTime={booth.end_time}//영업종료
              businessDays={booth.business_days}//영업요일

              location={booth.location.name}//만해광장
              isOperating={booth.isOperating}

              isDorder={booth.is_dorder}
              isEvent={booth.is_event}

              likesCount={booth.likes_count}//좋아요 개수
              isLiked={booth.is_liked}//좋아요 눌렀는지
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PullList;
