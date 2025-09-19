import React from "react";
import profileBack from "../../assets/images/banners/profile-backgroud.png";

function PersonCard({ name, role, major, image }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-[25px]"
      style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* 정보 영역 */}
      <div className="absolute top-[38px] left-[13px]">
        <h3 className="text-xl font-bold mb-[5px] text-[#2A2A2E]">
          {name.split(" ")[0]}
          <br />
          {name.split(" ").slice(1).join(" ")}
        </h3>
        <p className="text-[8px] font-normal mb-[3px] text-[#52525B]">{role}</p>
        <p className="text-[9px] font-semibold text-[#52525B]">{major}</p>
      </div>

      {/* 배경 이미지 */}
      <img
        src={profileBack}
        alt="프로필 배경"
        className="w-full h-full object-cover"
      />

      {/* 프로필 이미지 */}
      <div className="absolute bottom-[3px] right-[2px] w-[91px] h-[106px]">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default PersonCard;
