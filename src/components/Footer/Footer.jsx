import React from "react";
import { Link } from "react-router-dom";

import dirvana from "../../assets/images/icons/logo/dirvanawhite.png";
import dorder from "../../assets/images/icons/logo/dorder.png";
import likelion from "../../assets/images/icons/logo/likelionwhite.png";
import instagram from "../../assets/images/icons/logo/instagram.png";
import line from "../../assets/images/icons/logo/line.svg";

const Footer = () => {
  const fontClass = "text-center whitespace-nowrap font-normal";
  return (
    <footer
      className={`flex flex-col items-center justify-between
      w-full max-h-[350px]
      px-[36px] py-[50px] 
      bg-[#F3CDC9]`}
    >
      <img src={line} alt="Line" className="w-full mb-[42px]" />
      <div className={`flex justify-between items-center h-9 gap-10 mb-[36px]`}>
        <img src={dirvana} alt="DIRVANA" className="w-[93px] h-[18.12px]" />
        <img src={dorder} alt="Dorder" className="w-[96px] h-[26.42px]" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col items-center gap-2 ">
        {/* 검정 */}
        <span
          className={`${fontClass} font-pretendard font-normal text-white mb-[8px]`}
        >
          동국대학교 멋쟁이사자처럼
          <br />
          @LIKELION DGU. All rights Reserved
        </span>

        {/* 회색 */}
        <span
          className={`${fontClass} font-pretendard font-light text-white mb-[27px]`}
        >
          @Data supported by 축제기획단
        </span>

        {/* 로고 + 텍스트 */}
        <div className="flex justify-center items-center gap-6 mt-2">
          {/* likelion */}
          <Link to="/admin/login">
            <div className="flex justify-center items-center gap-1">
              <img src={likelion} alt="LIKELION" className="w-[23px] h-[13px]" />
              <span
                className={`${fontClass} font-suite font-normal text-[11px] text-white`}
              >
                Administrator
              </span>
            </div>
          </Link>

          {/* instagram */}
          <a
            href="https://www.instagram.com/likelion_dongguk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex justify-center items-center gap-[6px]">
              <img src={instagram} alt="Instagram" className="w-[15px] h-[15px]"/>
              <span
                className={`${fontClass} font-suite font-normal text-[11px] text-white`}
              >
                Instagram
              </span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
