import React from "react";
import { Link } from "react-router-dom";

import backBtn from "../../assets/images/icons/header-icons/left.svg";

const BoardDetailHeader = () => {
  return (
    <header
      className="flex items-center
    fixed top-0 
    w-full max-w-[430px]
    bg-white 
    h-[65px] px-[5px] flex-shrink-0 flex-col justify-center"
    >
      <div className="flex items-center w-full mb-[6px]">
        {/* Board.jsx로 돌아가기 */}
        <Link to="/board">
          <img src={backBtn} alt="back" className="h-full w-auto m-[10px]" />
        </Link>
        <h1 className="text-[#2A2A2E] font-[SUITE] text-[14px] not-italic font-semibold leading-[150%] ml-[5px]">
          게시판
        </h1>
      </div>
      {/* 구분선 */}
      <div className="h-[4px] w-full bg-[#F4F4F5]" />
    </header>
  );
};

export default BoardDetailHeader;