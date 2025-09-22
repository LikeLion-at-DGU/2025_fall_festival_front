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
        w-[99%] h-[48px]
        px-2 py-2
        rounded-[13px] cursor-pointer
        border-[#f1f1f1] bg-[#ffffff]
        hover:bg-gray-100 transition
        shadow-[0_3px_5px_0_rgba(0,0,0,0.10)]
      "
    >
      {/* 왼쪽: 태그 + 텍스트 */}
      <div className="flex items-center gap-[10px] min-w-0">
        <span
          className="
            inline-flex items-center justify-center 
            w-[auto] h-[25px] 
            px-[1px] py-[4px]
            text-xs
            text-[#A1A1AA] text-sm font-light flex-shrink-0
          "
        >
          #{noticeText}<span className="text-[#e3e3e3] ml-2">|</span>
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
