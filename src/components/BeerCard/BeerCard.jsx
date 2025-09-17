import React from "react";
import BeerIcon from "../../assets/images/icons/map-icons/Beer.png";
import FilterButton from "../FilterButton/FilterButton";

const BeerCard = ({
  name,
  location,
  distance,
  isSelected = false,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border p-3 ${className} ${
        isSelected ? "border-red-500 border-2" : "border-neutral-200"
      }`}
      style={{
        boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
          <img
            src={BeerIcon}
            alt="맥주"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h3
            className="text-xl font-semibold mb-0.5 font-suite leading-[130%]"
            style={{ color: "#000" }}
          >
            {name}
          </h3>

          <FilterButton isActive={true} className="w-fit">
            {distance}
          </FilterButton>
        </div>
      </div>
    </div>
  );
};

export default BeerCard;
