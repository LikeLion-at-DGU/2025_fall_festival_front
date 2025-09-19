import React from "react";
import { useNavigate } from "react-router-dom";

import backBtn from "../../assets/images/icons/header-icons/left.svg";

const MapDetailHeader = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header
      className="flex items-center justify-between 
    fixed top-0 
    w-full max-w-[430px]
    bg-white 
    h-[54px] px-[5px]"
    >
      <button
        onClick={handleBackClick}
        className="hover:opacity-70 transition-opacity"
      >
        <img src={backBtn} alt="back" className="h-full w-auto m-[10px]" />
      </button>
    </header>
  );
};

export default MapDetailHeader;
