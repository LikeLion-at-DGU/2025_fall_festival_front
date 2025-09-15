import React from "react";
import { Link } from "react-router-dom";

import likelion from "../../assets/images/icons/logo/likelionpink.svg";
import dirvana from "../../assets/images/icons/logo/dirvana.svg";

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
        <img src={dirvana} 
        alt="DIRVANA" 
        className="h-full w-auto m-[10px]" />
      </Link>

      {/* 오른쪽 로고 */}
      <Link to="/admin">
        <img src={likelion} 
        alt="ADMIN" 
        className="h-full w-auto m-[10px]" />
      </Link>
    </header>
  );
};

export default Header;
