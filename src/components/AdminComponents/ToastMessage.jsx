import React, { useEffect, useState } from "react";

function ToastMessage({ text, duration = 2500, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    // fade-in 시작
    setVisible(true);

    // duration - 500ms 후 fade-out 시작
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 500); // fade-out 끝난 후 컴포넌트 제거
    }, duration - 1000);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-[350px] left-1/2 transform -translate-x-1/2 z-50 pointer-events-none 
        transition-opacity duration-500 ease-in-out
        ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className="inline-flex justify-center items-center 
                  h-[83px] w-[300px]
                  px-[20px] py-[20px]
                  rounded-xl bg-white 
                  shadow-[0_3px_5px_0_rgba(0,0,0,0.1)] 
                  flex-shrink-0 pointer-events-auto"
      >
        <p className="text-[#000] text-[16px] font-normal leading-[130%]">
          {text}
        </p>
      </div>
    </div>
  );
}

export default ToastMessage;
