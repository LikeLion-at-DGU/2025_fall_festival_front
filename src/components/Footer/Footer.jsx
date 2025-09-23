import React from "react";
import PrefixedLink from "../../components/PrefixedLink";
import { useTranslation } from "react-i18next";

import dirvana from "../../assets/images/icons/logo/dirvanawhite.png";
import dorder from "../../assets/images/icons/logo/dorder.png";
import likelion from "../../assets/images/icons/logo/likelionwhite.png";
import instagram from "../../assets/images/icons/logo/instagram.png";
import line from "../../assets/images/icons/logo/line.svg";

const Footer = () => {
  const fontClass = "text-center whitespace-nowrap font-normal";
  const { t } = useTranslation();
  return (
    <footer
      className={`flex flex-col items-center justify-between
      w-full max-h-[350px]
      px-[36px] pb-[50px] 
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
          className={`${fontClass} font-suite font-normal text-white mb-[8px]`}
        >
          {t("footer.team")}
          <br />
          @LIKELION DGU. All rights Reserved
        </span>

        {/* 회색 */}
        <span
          className={`${fontClass} font-suite font-light text-white mb-[27px]`}
        >
          {t("footer.dataSupport")}
        </span>

        {/* 로고 + 텍스트 */}
        <div className="flex justify-center items-center gap-6 mt-2">
          {/* likelion */}
          <PrefixedLink to="/admin/login">
            <div className="flex justify-center items-center gap-1">
              <img src={likelion} alt="LIKELION" className="w-[26px] h-[16px]" />
              <span
                className={`${fontClass} font-suite font-normal text-[12px] text-white`}
              >
                Administrator
              </span>
            </div>
          </PrefixedLink>

          {/* instagram */}
          <a
            href="https://www.instagram.com/likelion_dongguk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex justify-center items-center gap-[6px]">
              <img src={instagram} alt="Instagram" className="w-[20px] h-[20px]"/>
              <span
                className={`${fontClass} font-suite font-normal text-[12px] text-white`}
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
