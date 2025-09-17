import React, { useEffect } from "react";

function ToastMessage({ text, duration = 3000, onClose }) {
  // 3초 후 자동으로 닫기
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-[283px] left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <div
        className="inline-flex justify-center items-center 
                  h-[83px] 
                  px-[43px] pt-[29px] pb-[28px] 
                  rounded-xl bg-white 
                  shadow-[0_3px_5px_0_rgba(0,0,0,0.1)] 
                  flex-shrink-0 pointer-events-auto"
      >
        <p className="text-[#000] text-[20px] font-normal leading-[130%]">
          {text}
        </p>
      </div>
    </div>
  );
}

export default ToastMessage;
