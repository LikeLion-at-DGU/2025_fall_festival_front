import React from "react";
import { Link } from "react-router-dom";

import backBtn from "../../assets/images/icons/header-icons/left.svg";
const MapDetailHeader = () => {
  return (
    <header
      className="flex items-center justify-between 
    fixed top-0 
    w-full max-w-[430px]
    bg-white 
    h-[54px] px-[5px]"
    >
      {/* 지도로 돌아가기 */}
      <Link to="/map">
        <img src={backBtn} alt="back" className="h-full w-auto m-[10px]" />
      </Link>
    </header>
  );
};

export default MapDetailHeader;
