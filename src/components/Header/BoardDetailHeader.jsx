import React from "react";
import { useNavigate } from "react-router-dom";

import backBtn from "../../assets/images/icons/header-icons/left.png";

const BoardDetailHeader = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header
      className="flex items-center
    fixed top-0 
    w-full max-w-[430px]
    bg-white 
    h-[65px] px-[5px] flex-shrink-0 flex-col justify-center"
    >
      <div className="flex items-center w-full mb-[6px]">
        <button
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
          게시판
        </h1>
      </div>
    </header>
  );
};

export default BoardDetailHeader;
