import React from "react";
import { Link } from "react-router-dom";

import likelion from "../../assets/images/icons/logo/likelionpink.svg";
import dirvana from "../../assets/images/icons/logo/dirvanawhite.svg";
import TranslateBtn from "./TranslateBtn";
const Header = () => {
  return (
    <header
      className="flex items-center justify-between 
    fixed top-0 w-full 
    bg-orange 
    h-[54px] px-[5px]"
    >
      {/* 왼쪽 로고 */}
      <Link to="/">
        <img src={dirvana} alt="DIRVANA" className="h-full w-auto m-[10px]" />
      </Link>
      <div  className=" flex items-center gap-[10px]">
        {/* 번역버튼 */}
        <TranslateBtn />
        {/* 오른쪽 로고 */}
        <Link to="/admin">
          <img src={likelion} alt="ADMIN" className="h-full w-auto m-[10px]" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
