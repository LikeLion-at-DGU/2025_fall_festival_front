import React from "react";
import notification from "../../assets/images/icons/main-icons/notification.svg";

const Notification = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-[13px] rounded-[12px] bg-lightgray mt-[27px] overflow-hidden">
      <img
        src={notification}
        alt="notification"
        className="w-6 h-6 flex-shrink-0"
      />
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-semibold font-suite text-black whitespace-nowrap animate-marquee">
          긴급하거나 중요한 공지는 이곳에 슬라이드
        </p>
      </div>
    </div>
  );
};

export default Notification;
