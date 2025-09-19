import React from "react";

function SubmitBtn({ text, onClick, type = "button", disabled = false, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick} // 부모에서 전달한 클릭 이벤트 연결
      disabled={disabled}
      className={`
        h-14 w-full
        mt-4
        px-6 py-4
        rounded-lg
        font-semibold
        flex items-center justify-center
        ${className}
        ${disabled 
          ? "bg-[#CBCBCB] text-[#ffffff] border border-[#D4D4D8] shadow-none"
          : "bg-[#EF7063] text-white hover:opacity-90 shadow-md"}
      `}
    >
      <span>{text}</span>
    </button>
  );
}

export default SubmitBtn;
