// components/MapComponents/Badge.jsx
import React from "react";

const Badge = ({
  text = "Badge",
  backgroundColor = "rgba(239, 112, 99, 0.90)",
  className = "",
}) => {
  return (
    <span
      className={`inline-flex px-2 py-0.5 justify-center items-center rounded-xl text-white text-[10px] font-normal leading-[150%] font-suite shadow-tag ${className}`}
      style={{ background: backgroundColor }}
    >
      {text}
    </span>
  );
};

export default Badge;
