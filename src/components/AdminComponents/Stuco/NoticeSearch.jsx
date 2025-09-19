import React, { useState } from "react";
import { Search } from "lucide-react"; // npm install lucide-react 필요

function NoticeSearch({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  // 엔터키 눌렀을 때 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(inputValue);
    }
  };

  // 돋보기 버튼 클릭 시 검색 실행
  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="
          w-full h-11 pl-4 pr-10
          mb-10
          rounded-md  
          bg-white
          shadow-sm
          text-sm text-gray-700
          focus:outline-none
        "
      />
      <button
        type="button"
        onClick={handleSearchClick}
        className="absolute right-2 top-1/4 -translate-y-1/2 text-gray-500 hover:text-[#EF7063]"
      >
        <Search size={18} />
      </button>
    </div>
  );
}

export default NoticeSearch;
