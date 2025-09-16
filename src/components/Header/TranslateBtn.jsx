import React, { useState } from "react";
import triangle from "../../assets/images/icons/header-icons/triangle.svg";

const TranslateBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("KR"); // 기본값 KR
  const languages = ["KR", "ENG", "中文", "日本語"];
  const fontClass=" text-[#2A2A2E] text-[10px] font-semibold leding-[15px]"
  return (
    <div className="relative inline-block whitespace-nowrap ">
      {/* 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={` flex flex-row items-center justify-center
          min-w-[50px] h-[23px] px-[6px] py-[4px] gap-[4px]
          rounded-[16px] border border-[0.5px] border-lightgray
          whitespace-nowrap
          bg-white
          `}
      ><div className={fontClass}>
        {selected} {/* 선택된 값 표시 */}

      </div>
        <img
          src={triangle}
          alt="triangle"
          className={`w-[7px] h-[7px] 
         transition-transform duration-200 
         ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <ul
          className={`absolute 
          mt-2 
          bg-white
          rounded-[10px] border border-[0.5px] border-lightgray
          rounded-md`}
        >
          {languages.map((lang) => (
            <li
              key={lang}
              className={`${fontClass} px-4 py-2 hover:bg-gray-100 cursor-pointer`}
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
