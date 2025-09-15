import React, { useState } from "react";
import triangle from "../../assets/images/icons/header-icons/triangle.svg";

const TranslateBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("KR"); // 기본값 KR
  const languages = ["KR", "ENG", "中文", "日本語"];

  return (
    <div className="relative inline-block whitespace-nowrap ">
      {/* 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          ` flex flex-row items-center justify-center
          min-w-[50px] h-[23px] px-[6px] py-[4px] gap-[4px]
          rounded-[16px] border border-[0.5px] border-lightgray
          whitespace-nowrap
          bg-white
          `
        }
      >
        {selected} {/* 선택된 값 표시 */}
        <img src={triangle}
         alt="triangle" 
         className={`w-3 h-3 
         transition-transform duration-200 
         ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <ul className={`absolute 
          mt-2 
          bg-white
          rounded-[10px] border border-[0.5px] border-lightgray
          rounded-md`} >
          {languages.map((lang) => (
            <li
              key={lang}
              className={`px-4 py-2 
                cursor-pointer`}
              onClick={() => {
                setSelected(lang); // 선택값 변경
                setIsOpen(false); // 메뉴 닫기
              }}
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TranslateBtn;
