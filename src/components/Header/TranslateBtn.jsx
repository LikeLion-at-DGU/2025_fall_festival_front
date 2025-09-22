import React, { useState, useEffect, useRef } from "react";
import i18n from "i18next";
import triangle from "../../assets/images/icons/header-icons/triangle.svg";

const TranslateBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(i18n.language); // i18n의 현재 언어 사용
  const dropdownRef = useRef(null);

  // i18n 언어 변경 감지
  useEffect(() => {
    const handleLanguageChange = () => {
      setSelected(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // 표시용 텍스트
  const displayMap = {
    ko: "KR",
    en: "ENG",
    "zh-CN": "中文",
    ja: "日本語",
  };

  const languages = Object.keys(displayMap); // ["ko", "en", "zh-CN", "ja"]

  const fontClass =
    "text-[#2A2A2E] text-[11px] font-suite font-semibold leading-[15px]";

  return (
    <div className="relative inline-block whitespace-nowrap" ref={dropdownRef}>
      {/* 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex flex-row items-center justify-center
          min-w-[65px] h-[25px] px-[6px] py-[6px] gap-[5px]
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
          {languages.map((lang, index) => (
            <li
              key={lang}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                index === 0 ? "rounded-t-[10px]" : ""
              } ${index === languages.length - 1 ? "rounded-b-[10px]" : ""} ${
                lang === selected
                  ? "text-primary-400 text-[11px] font-extrabold leading-[15px] bg-primary-50"
                  : fontClass // 기본 스타일
              }`}
              onClick={() => {
                setIsOpen(false);
                i18n.changeLanguage(lang); // i18n 적용 (useEffect에서 selected 자동 업데이트됨)
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
