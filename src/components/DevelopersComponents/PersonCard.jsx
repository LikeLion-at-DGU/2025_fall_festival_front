import React from "react";
function PersonCard({ imgsrc, track, name, info }) {
  const cardClass =
    "w-[136px] h-[169px] rounded-xl border border-primary-300 bg-developers-card shadow-card flex flex-col justify-center gap-[3px]";
  const smallTextClass = "text-center text-[8px] font-medium leading-[150%]";
  const textClass = "text-center text-[13px] font-semibold leading-[150%] ";
  const groupClass = "flex justify-center items-center gap-1";

  return (
    <div className={`${cardClass}`}>
        <img src={imgsrc}/>
      <div className="flex flex-col justify-center gap-[3px]">
        <p className={`${groupClass}`}>
          <span className={`${smallTextClass} text-[#52525B]`}>{track}</span>
          <span className={`${textClass} text-[#2A2A2E]`}>{name}</span>
        </p>
        <span className={`${textClass} text-[#526749]`}>{info}</span>
      </div>
    </div>
  );
}

export default PersonCard;
