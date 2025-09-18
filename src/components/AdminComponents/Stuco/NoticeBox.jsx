import React from "react";

function NoticeBox({ tag = "공지", text, writer }) {
  return (
    <div
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
            rounded-md
          "
        >
          {tag}
        </span>
        <p className="text-sm text-gray-800 truncate max-w-[180px]">
          {text}
        </p>
      </div>

      {/* 오른쪽: 작성자 */}
      <span className="text-xs text-gray-500">{writer}</span>
    </div>
  );
}

export default NoticeBox;
