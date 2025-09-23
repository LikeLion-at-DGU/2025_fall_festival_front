import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const DateDropdown = ({ selectedDate, setSelectedDate }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "2025-09-24", label: t("date.2025-09-24") },
    { value: "2025-09-25", label: t("date.2025-09-25") },
    { value: "2025-09-26", label: t("date.2025-09-26") },
  ];

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === selectedDate)?.label || options[0].label;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center 
          min-w-[70px] h-[25px] px-[10px] gap-[4px]
          rounded-[16px] border border-[0.5px] border-lightgray
          bg-white text-[11px] font-suite font-semibold text-[#2A2A2E]
          transition-colors duration-200"
      >
        {selectedLabel}
        <span
          className={`ml-1 text-[10px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <ul
          className="absolute mt-2 w-full bg-white rounded-[10px]
            border border-[0.5px] border-lightgray shadow-md z-10"
        >
          {options.map((opt, idx) => (
            <li
              key={opt.value}
              className={`px-4 py-2 text-[11px] cursor-pointer hover:bg-gray-100
                ${idx === 0 ? "rounded-t-[10px]" : ""}
                ${idx === options.length - 1 ? "rounded-b-[10px]" : ""}
                ${
                  opt.value === selectedDate
                    ? "text-primary-400 font-extrabold bg-primary-50"
                    : "text-[#2A2A2E] font-suite font-semibold"
                }`}
              onClick={() => {
                setSelectedDate(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DateDropdown;
