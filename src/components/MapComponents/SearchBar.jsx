import React from 'react';
import SearchIcon from "../../assets/images/icons/map-icons/Search.svg";

function SearchBar({searchTerm, setSearchTerm  }) {
  return (
           <div className="z-10 relative flex flex-col items-start self-stretch p-[8px] px-[16px] gap-[10px] rounded-[8px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
             <input
               type="text"
               placeholder="학과/동아리/부스명을 입력하세요"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full
               text-[#000] font-sans text-[12px] font-normal leading-[18px]
               focus:outline-none"
             />
             <div className="absolute right-3 top-2.5">
               <img src={SearchIcon} alt="검색" className="w-4 h-4 opacity-60" />
             </div>
           </div>
  );
};

export default SearchBar;
