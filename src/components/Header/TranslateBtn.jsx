import React, { useState } from "react";
import i18n from "i18next";
import triangle from "../../assets/images/icons/header-icons/triangle.svg";

const TranslateBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("ko"); // 기본값: 한국어 코드

  // 표시용 텍스트
  const displayMap = {
    ko: "KR",
    en: "ENG",
    "zh-CN": "中文",
    ja: "日本語"
  };

  const languages = Object.keys(displayMap); // ["ko", "en", "zh-CN", "ja"]

  const fontClass =
    "text-[#2A2A2E] text-[10px] font-semibold leading-[15px]";

  return (
    <div className="relative inline-block whitespace-nowrap">
      {/* 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex flex-row items-center justify-center
          min-w-[50px] h-[23px] px-[6px] py-[4px] gap-[4px]
          rounded-[16px] border border-[0.5px] border-lightgray
          whitespace-nowrap bg-white`}
      >
        <div className={fontClass}>{displayMap[selected]}</div>
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
          className={`absolute mt-2 bg-white
            rounded-[10px] border border-[0.5px] border-lightgray`}
        >
          {languages.map((lang) => (
            <li
              key={lang}
              className={`${fontClass} px-4 py-2 hover:bg-gray-100 cursor-pointer`}
              onClick={() => {
                setSelected(lang); // 코드 저장
                setIsOpen(false);
                i18n.changeLanguage(lang); // i18n 적용
              }}
            >
              {displayMap[lang]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TranslateBtn;
