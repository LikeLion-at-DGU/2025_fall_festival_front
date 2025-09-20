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
        w-full h-[48px] 
        px-3 py-2
        rounded-lg cursor-pointer
        border border-[#E4E4E7] bg-[#F9FAFB]
        hover:bg-gray-100 transition
      "
    >
      {/* 왼쪽: 태그 + 텍스트 */}
      <div className="flex items-center gap-2">
        <span
          className="
            px-0.1 py-1 text-sm font-medium
            text-white bg-[#EF7063] 
            rounded-md w-10 h-6 flex items-center justify-center
          "
        >
          {category === "Notice"
            ? "공지"
            : category === "LostItem"
            ? "분실물"
            : category}
        </span>
        <p className="text-sm text-gray-800 truncate max-w-[180px]">
          {title}
        </p>
      </div>

      {/* 오른쪽: 작성자 */}
      <span className="text-xs text-gray-500">{writer}</span>
    </div>
  );
}

export default NoticeBox;
