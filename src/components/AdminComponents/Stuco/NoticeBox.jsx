import React from "react";
import { useNavigate } from "react-router-dom";

function NoticeBox({ id, category, title, writer }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/board/${id}`)}
      className="
        flex items-center justify-between 
        w-full h-[48px] 
        px-3 py-2
        rounded-lg 
        border border-[#E4E4E7] bg-[#F9FAFB]
      "
    >
      {/* 왼쪽: 태그 + 텍스트 */}
      <div className="flex items-center gap-2">
        <span
          className="
            px-2 py-1 text-sm font-medium
            text-white bg-[#EF7063] 
            rounded-md w-10 h-6
          "
        >
          {category === "Notice" ? "공지" : category === "LostItem" ? "분실물" : category}
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
