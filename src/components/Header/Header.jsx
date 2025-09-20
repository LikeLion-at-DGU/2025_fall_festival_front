import React from "react";
import { Link } from "react-router-dom";

import likelion from "../../assets/images/icons/logo/likelionblack.svg";
import dirvana from "../../assets/images/icons/logo/dirvanablacksmall.png";
import TranslateBtn from "./TranslateBtn";
const Header = () => {
  return (
    <header
      className="flex items-center justify-between 
    fixed top-0 z-50
    w-full max-w-[430px]
    bg-white 
    h-[54px] px-[5px]"
    >
      {/* 왼쪽 로고 */}
      <Link to="/">
        <img src={dirvana} alt="DIRVANA" className="h-full w-[85px] m-[10px]" />
      </Link>
      <div className=" flex items-center gap-[10px]">
        {/* 번역버튼 */}
        <TranslateBtn />
        {/* 오른쪽 로고 */}
        <Link to="/admin/login">
          <img src={likelion} alt="ADMIN" className="h-full w-auto m-[10px]" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
