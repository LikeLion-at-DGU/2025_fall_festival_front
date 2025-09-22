import React from "react";
import { useNavigate } from "react-router-dom";

function NoticeBox({ id, category, title, writer }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`notice/${id}`);  // ✅ 상세페이지로 이동
  };

 // 수정 페이지 이동 시 참고
 // const handleClick = () => {
 //   if (category === "Notice") {
 //     navigate(`/notice/edit/${id}`);   // 일반공지 수정페이지
 //   } else if (category === "LostItem") {
 //     navigate(`/lost/edit/${id}`);     // 분실물 수정페이지
 //   } else {
 //     navigate(`/board/${id}`);         // fallback: 일반 상세 조회
 //   }
 // };

  return (
    <div
      onClick={handleClick}
      className="
        flex items-center justify-between 
        w-full h-[41px] 
        px-2 py-2
        rounded-[13px] cursor-pointer
        border-[#f1f1f1] bg-[#ffffff]
        hover:bg-gray-100 transition
      "
    >
      {/* 왼쪽: 태그 + 텍스트 */}
      <div className="flex items-center">
        <span
            className={`
              px-2 py-1 text-[11px] font-normal
              rounded-[10px] w-[55px] h-[26px] flex items-center
              ${
                category === "Notice"
                  ? "text-[#D33E2F]" // 공지 → 빨간 배경, 흰 글씨
                  : category === "Event"
                  ? "text-[#EF7063]" // 이벤트 → 빨간 테두리, 빨간 글씨
                  : category === "LostItem"
                  ? "text-[#71717A]"   // 분실물 → 회색 테두리, 회색 글씨
                  : "bg-gray-200 text-gray-700"              // 기본값
              }
            `}
          >
          #{category === "Notice"
            ? "공지"
            : category === "LostItem"
            ? "분실물"
            : category}
        </span>
        <p className="text-sm text-gray-800 truncate max-w-[180px]">
          <span className="text-[#e3e3e3] mr-3">|</span>
          {title}
        </p>
      </div>

      {/* 오른쪽: 작성자 */}
      <span className="text-xs text-gray-500">- {writer}</span>
    </div>
  );
}

export default NoticeBox;
