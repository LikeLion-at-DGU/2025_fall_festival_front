// src/components/Header/BoardDetailHeader.jsx
import React from "react";
import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import backBtn from "../../assets/images/icons/header-icons/left.png";

const BoardDetailHeader = () => {
  const { t } = useTranslation();
  const navigate = usePrefixedNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    const category = location.state?.category || "ALL";
    navigate("/board", { state: { category } });
  };

  return (
    <header
      className="flex items-center
    fixed top-0 
    w-full max-w-[430px]
    bg-white 
    h-[65px] px-[5px] flex-shrink-0 flex-col justify-center z-50"
      style={{
        boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="flex items-center w-full">
        {/* ✅ CHANGED: Added type="button" to prevent page reloads */}
        <button
          type="button" 
          onClick={handleBackClick}
          className="hover:opacity-70 transition-opacity"
        >
          <img
            src={backBtn}
            alt="back"
            className="m-[10px]"
            width={24}
            height={24}
          />
        </button>
        <h1 className="text-[#2A2A2E] text-[14px] font-semibold leading-[150%] ml-[5px]">
          {t("board.title")}
        </h1>
      </div>
    </header>
  );
};

export default BoardDetailHeader;