import React from "react";
import { Link } from "react-router-dom";

import dirvana from "../../assets/images/icons/logo/dirvanablack.svg";
import dorder from "../../assets/images/icons/logo/dorder.svg";
import likelion from "../../assets/images/icons/logo/likeliongray.svg";
import instagram from "../../assets/images/icons/logo/instagram.svg";

const Footer = () => {
  const fontClass = "text-center whitespace-nowrap font-normal";
  return (
    <footer
      className={`flex flex-col items-center justify-between
      w-full max-h-[350px] gap-[32px]
      px-[36px] py-[50px] 
      bg-[#E4E4E7]`}
    >
      <div className={`flex justify-between h-9 gap-10`}>
        <img src={dirvana} alt="DIRVANA" className="w-[132px]" />
        <img src={dorder} alt="Dorder" className="w-44" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col items-center w-[156px] gap-2 ">
        {/* 검정 */}
        <span
          className={`${fontClass} font-pretendard font-normal text-[var(--Neutral-600,#2A2A2E)]`}
        >
          동국대학교 멋쟁이사자처럼
          <br />
          @LIKELION DGU. All rights Reserved
        </span>

        {/* 회색 */}
        <span
          className={`${fontClass} font-pretendard font-light text-[var(--Neutral-300,#A1A1AA)]`}
        >
          @Data supported by 축제기획단
        </span>

        {/* 로고 + 텍스트 */}
        <div className="flex justify-center items-center gap-6 mt-2">
          {/* likelion */}
          <Link to="/developers">
            <div className="flex flex-col justify-center items-center gap-1">
              <img src={likelion} alt="LIKELION" />
              <span
                className={`${fontClass} font-pretendard font-normal text-[var(--Neutral-300,#A1A1AA)]`}
              >
                DEVELOPERS
              </span>
            </div>
          </Link>

          {/* instagram */}
          <a
            href="https://www.instagram.com/likelion_dongguk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex flex-col justify-center items-center gap-1">
              <img src={instagram} alt="Instagram" />
              <span
                className={`${fontClass} font-pretendard font-normal text-[var(--Neutral-300,#A1A1AA)]`}
              >
                INSTAGRAM
              </span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
