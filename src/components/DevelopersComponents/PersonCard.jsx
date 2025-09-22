import React from "react";
import profileBack from "../../assets/images/banners/profile-backgroud.png";
import { useTranslations } from "../../context/TranslationContext";

function PersonCard({ name, role, major, image, developerId }) {
  const { getTranslation } = useTranslations();

  // 번역된 텍스트 가져오기
  const translatedRole = getTranslation(
    "developer",
    developerId.toString(),
    "DeveloperRole",
    role
  );
  const translatedMajor = getTranslation(
    "developer",
    developerId.toString(),
    "DeveloperMajor",
    major
  );

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-[23px]"
      style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* 정보 영역 */}
      <div className="absolute top-[38px] left-[13px]">
        <h3
          className="text-xl font-bold mb-[5px] text-[#2A2A2E]"
          style={name === "SON YOUNG CHAE" ? { letterSpacing: "-0.05em" } : {}}
        >
          {name.split(" ")[0]}
          <br />
          {name.split(" ").slice(1).join(" ")}
        </h3>
        <p className="text-[8px] font-normal mb-[3px] text-[#52525B]">
          {translatedRole}
        </p>
        <p className="text-[9px] font-semibold text-[#52525B]">
          {translatedMajor}
        </p>
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
