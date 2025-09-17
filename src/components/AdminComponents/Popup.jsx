import React from "react";
import SubmitBtn from "./SubmitBtn";
import close from "../../assets/images/icons/admin-icons/close.svg";

function Popup({ text, buttontext, onSubmit, onClose }) {
  return (
    // 검은 배경 클릭 시 팝업 닫기
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
      onClick={onClose} // 배경 클릭 → 팝업 닫기
    >
      <div
        className="relative flex flex-col justify-between items-center w-4/5 max-w-sm h-[143px] rounded-xl bg-white text-black p-4 shadow-md"
        onClick={(e) => e.stopPropagation()} // 팝업 클릭 시 닫히지 않도록 막기
      >
        {/* 닫기 버튼: 팝업만 닫기 */}
        <img
          src={close}
          alt="close"
          onClick={onClose} // 닫기 버튼 클릭 시 팝업 닫기
          className="absolute
           top-[9px] right-[15px]
           p-2
          text-[14px] font-normal leading-[150%]
            cursor-pointer"
        />

        <p className="text-[#2A2A2E] 
        text-center 
        leading-[21px] whitespace-pre-line">
          {text}
        </p>

        {/* Submit 버튼: 제출 + 팝업 닫기 */}
        <SubmitBtn text={buttontext} onClick={onSubmit} />
      </div>
    </div>
  );
}

export default Popup;
