import React from "react";
import { useNavigate } from "react-router-dom";
import notification from "../../assets/images/icons/main-icons/notification.svg";

const Notification = ({ notice, loading, error }) => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate("/board", { state: { category: "Notice" } });
  };

  /* 로딩 중이거나 에러가 있거나 긴급공지가 없을 때 */
  if (loading || error || !notice) {
    return (
      <div
        className="flex items-center gap-2 px-4 py-[13px] rounded-[12px] bg-lightgray mt-[27px] overflow-hidden cursor-pointer"
        onClick={handleNotificationClick}
      >
        <img
          src={notification}
          alt="notification"
          className="w-6 h-6 flex-shrink-0"
        />
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-semibold font-suite text-black whitespace-nowrap animate-marquee">
            긴급하거나 중요한 공지는 이곳에서 전달드립니다~
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 px-4 py-[13px] rounded-[12px] bg-lightgray mt-[27px] overflow-hidden cursor-pointer"
      onClick={handleNotificationClick}
    >
      <img
        src={notification}
        alt="notification"
        className="w-6 h-6 flex-shrink-0"
      />
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-semibold font-suite text-black whitespace-nowrap animate-marquee">
          {notice.title}
        </p>
      </div>
    </div>
  );
};

export default Notification;
