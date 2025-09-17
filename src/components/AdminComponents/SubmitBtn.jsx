import React from "react";

function SubmitBtn({ text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick} // 부모에서 전달한 클릭 이벤트 연결
      className={`
        h-14 w-full
        px-6 py-4
        rounded-lg
        bg-[#EF7063] text-[#F4F4F5]
        font-semibold
        flex items-center justify-center
      `}
    >
      <span>{text}</span>
    </button>
  );
}

export default SubmitBtn;
