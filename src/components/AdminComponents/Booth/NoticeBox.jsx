import React from "react";
import { useNavigate } from "react-router-dom";

function NoticeBox({ id, noticeText = "공지", content, org }) {
  const navigate = useNavigate();

  // 이벤트 상세 페이지 이동
  const handleClick = () => {
    navigate(`notice/event/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex items-center justify-between 
        w-full h-[41px] 
        px-2 py-2
        rounded-[15px] cursor-pointer
        border-b border-[#A1A1AA]/50 bg-[#F4F4F5]
        hover:bg-gray-100 transition
      "
    >
      {/* 왼쪽: 태그 + 텍스트 */}
      <div className="flex items-center gap-[10px] min-w-0">
        <span
          className="
            inline-flex items-center justify-center 
            w-[40px] h-[25px] 
            px-[1px] py-[4px]
            rounded-[20px] 
            text-xs
            bg-[#FFA6A6] 
            text-white text-sm font-medium flex-shrink-0
          "
        >
          {noticeText}
        </span>
        <p className="text-sm text-black truncate max-w-[200px]">
          {content}
        </p>
      </div>

      {/* 오른쪽: 기관명 */}
      <span className="text-sm text-gray-500 flex-shrink-0">- {org}</span>
    </div>
  );
}

export default NoticeBox;
