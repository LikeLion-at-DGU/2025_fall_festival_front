import React from "react";
import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";

import backBtn from "../../assets/images/icons/header-icons/left.png";

const MapDetailHeader = () => {
  const navigate = usePrefixedNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header
      className="flex items-center justify-between 
    fixed top-0 
    w-full max-w-[430px]
    bg-white 
    h-[54px] px-[5px] z-50"
      style={{
        boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
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
    </header>
  );
};

export default MapDetailHeader;
