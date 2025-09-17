import React from "react";
import { Link, useLocation } from "react-router-dom";

import map from "../../assets/images/icons/nav-icons/map.svg";
import timetable from "../../assets/images/icons/nav-icons/calendar.svg";
import home from "../../assets/images/icons/nav-icons/home.svg";
import document from "../../assets/images/icons/nav-icons/document.svg";
import game from "../../assets/images/icons/nav-icons/game.svg";

import mapActive from "../../assets/images/icons/nav-icons/map-active.svg";
import timetableActive from "../../assets/images/icons/nav-icons/calendar-active.svg";
import homeActive from "../../assets/images/icons/nav-icons/home-active.svg";
import documentActive from "../../assets/images/icons/nav-icons/document-active.svg";
import gameActive from "../../assets/images/icons/nav-icons/game-active.svg";

const BottomNav = () => {
  const location = useLocation(); // 현재 URL 확인

  const navItems = [
    { name: "지도", path: "/map", icon: map, activeIcon: mapActive },
    {
      name: "일정",
      path: "/timetable",
      icon: timetable,
      activeIcon: timetableActive,
    },
    { name: "홈", path: "/", icon: home, activeIcon: homeActive },
    {
      name: "게시판",
      path: "/board",
      icon: document,
      activeIcon: documentActive,
    },
    { name: "게임", path: "/event", icon: game, activeIcon: gameActive }, // 게시판 이미지 그대로 사용
  ];

  const linkClassName = (active) => `
    flex flex-col items-center justify-center
    w-[55px] h-[55px]  px-[5px]
    whitespace-nowrap
    font-normal 
    text-[12px]
     ${
       active
         ? "text-orange font-semibold border-t-[1.5px] border-orange"
         : "text-black"
     }
  `;

  return (
    <nav className="fixed bottom-0 w-full bg-white z-[60] border-t border-gray-200">
      <div className="flex items-start justify-around h-[62px]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.name}
              className={linkClassName(isActive)}
            >
              <img
                src={isActive ? item.activeIcon : item.icon} // 활성 아이콘 적용
                alt={item.name}
                className="h-[24px] w-[24px]"
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
