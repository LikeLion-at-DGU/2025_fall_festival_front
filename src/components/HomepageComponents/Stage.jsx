import React from "react";
import stage from "../../assets/images/icons/main-icons/stage.svg";
import stage1 from "../../assets/images/banners/stage1-ex.png";

const Stage = () => {
  return (
    <div className="mt-[27px] flex flex-col gap-[8px]">
      <div className="flex items-center gap-[5px]">
        <img src={stage} alt="stage" className="w-6 h-6" />
        <p className="text-xl font-semibold font-suite text-black">STAGE NOW</p>
      </div>
      <div className="relative">
        <img
          src={stage1}
          alt="stage1"
          className="w-full h-[156px] rounded-[12px] object-cover"
        />
        <div
          className="absolute inset-0 rounded-[12px]"
          style={{
            background:
              "linear-gradient(179.37deg, rgba(0, 0, 0, 0) 36.37%, rgba(0, 0, 0, 0.77) 99.45%)",
          }}
        />
        <p className="absolute bottom-4 right-4 text-2xl font-semibold font-suite text-white">
          프로미스나인
        </p>
      </div>
    </div>
  );
};

export default Stage;
