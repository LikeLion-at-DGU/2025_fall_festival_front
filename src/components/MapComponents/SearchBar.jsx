import React from "react";
import { useTranslation } from 'react-i18next';
import SearchIcon from "../../assets/images/icons/map-icons/Search.svg";

function SearchBar({ searchTerm, setSearchTerm }) {
  const { t } = useTranslation();
  
  return (
    <div className="mx-auto w-full">
      <div
        className="z-10 h-[40px] relative 
      flex flex-col items-start  justify-center
      self-stretch p-[8px] px-[16px] gap-[10px] rounded-[10px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
      >
        <div className="w-full flex flex-row justify-between"> 
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full
               text-[#000] font-sans text-[16px] font-normal leading-[18px]

               focus:outline-none"
          />
          <img src={SearchIcon} alt={t("search.alt")} className="w-4 h-4 opacity-60" />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
