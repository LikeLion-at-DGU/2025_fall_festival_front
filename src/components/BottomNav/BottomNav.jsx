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

import { useTranslation } from "react-i18next";

const BottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation(); // 현재 URL 확인

  // name → i18n key 로 교체
  const navItems = [
    { key: "nav.map", path: "/map", icon: map, activeIcon: mapActive },
    { key: "nav.timetable", path: "/timetable", icon: timetable, activeIcon: timetableActive },
    { key: "nav.home", path: "/", icon: home, activeIcon: homeActive },
    { key: "nav.board", path: "/board", icon: document, activeIcon: documentActive },
    { key: "nav.game", path: "/event", icon: game, activeIcon: gameActive }
  ];

  const linkClassName = (active) => `
    flex flex-col items-center justify-center
    w-[55px] h-[55px] px-[5px]
    whitespace-nowrap
    font-normal text-[12px]
    ${
      active
        ? "text-orange font-semibold border-t-[1.5px] border-orange"
        : "text-black"
    }
  `;

  return (
    <nav className="fixed bottom-0 z-999 w-full max-w-[430px] bg-white">
      <div className="flex items-start justify-around h-[62px]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.key}
              className={linkClassName(isActive)}
            >
              <img
                src={isActive ? item.activeIcon : item.icon}
                alt={t(item.key)} // ✅ 번역 적용
                className="h-[24px] w-[24px]"
              />
              <span>{t(item.key)}</span> {/* ✅ 번역 적용 */}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
