import React, { useState } from "react";
import PersonCard from "../../components/DevelopersComponents/PersonCard";
import likelionIcon from "../../assets/images/icons/logo/likelion-filter.png";
import { getDevelopersByRole } from "../../data/developers";

function Developers() {
  const [selectedFilter, setSelectedFilter] = useState("Team Lead");

  const filters = [
    { id: "Team Lead", name: "Team Lead" },
    { id: "PM/DS", name: "PM/DS" },
    { id: "Front-End", name: "Front-End" },
    { id: "Back-End", name: "Back-End" },
    { id: "Corporate Affairs", name: "Corporate Affairs" },
  ];

  return (
    <div className="bg-white min-h-screen pt-[30px] pb-[70px] px-4">
      <div className="flex flex-col items-center justify-center">
        <p className="text-[10px] font-normal">멋쟁이사자처럼 13기</p>
        <p className="text-[32px] font-semibold">Developers</p>
        <div className="w-[86px] h-[2px] bg-[#F8B0A9] mt-[16px] mb-[34px]"></div>
      </div>

      {/* 필터 버튼 */}
      <div className="flex flex-col items-center gap-2 px-4 mb-6">
        <div className="flex justify-center gap-2">
          {filters.slice(0, 3).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`inline-flex items-center justify-center gap-[4.726px] px-[7.562px] py-[3.781px] rounded-[11.343px] border border-[#E4E4E7] text-[12px] text-[#52525B] font-normal transition-colors duration-200 ${
                selectedFilter === filter.id
                  ? "text-white border-[#E65B4D]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                boxShadow: "0 0.945px 3.781px 0 rgba(0, 0, 0, 0.15)",
                backgroundColor:
                  selectedFilter === filter.id
                    ? "rgba(230, 91, 77, 0.85)"
                    : undefined,
              }}
            >
              <img
                src={likelionIcon}
                alt="멋쟁이사자처럼"
                className="w-4 h-4 flex-shrink-0"
              />
              {filter.name}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {filters.slice(3, 5).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`inline-flex items-center justify-center gap-[4.726px] px-[7.562px] py-[3.781px] rounded-[11.343px] border border-[#E4E4E7] text-[12px] text-[#52525B] font-normal transition-colors duration-200 ${
                selectedFilter === filter.id
                  ? "text-white border-[#E65B4D]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                boxShadow: "0 0.945px 3.781px 0 rgba(0, 0, 0, 0.15)",
                backgroundColor:
                  selectedFilter === filter.id
                    ? "rgba(230, 91, 77, 0.85)"
                    : undefined,
              }}
            >
              <img
                src={likelionIcon}
                alt="멋쟁이사자처럼"
                className="w-4 h-4 flex-shrink-0"
              />
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* 개발자 카드 */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {getDevelopersByRole(selectedFilter).map((developer) => (
          <PersonCard
            key={developer.id}
            name={developer.name}
            role={developer.roleDisplay}
            major={developer.major}
            image={developer.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Developers;
