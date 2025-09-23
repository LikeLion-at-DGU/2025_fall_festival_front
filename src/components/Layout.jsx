import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { BASE_PATH } from "../config/routes";

import Header from "./Header/Header";
import AdminHeader from "./Header/AdminHeader";
import BoardDetailHeader from "./Header/BoardDetailHeader"; 
import MapDetailHeader from "./Header/MapDetailHeader";
import BottomNav from "./BottomNav/BottomNav";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  //임시차단
  const isComingSoonPage = !location.pathname.startsWith(BASE_PATH);
  if (isComingSoonPage) {
    // ✅ ComingSoon 페이지는 레이아웃 제외
    return <>{children}</>;
  }

  // ✅ BASE_PATH(/comingsoon) 제거 후 비교
  const currentPath = location.pathname.replace(BASE_PATH, "") || "/";

  // 1) 관리자 경로 판별 (정확히 일치)
  const adminPaths = [
    "/admin",
    "/admin/login",
    "/admin/festa",
    "/admin/festa/notice/normal",
    "/admin/festa/notice/lost",
    "/admin/booth",
    "/admin/booth/event",
  ];

  // 2) 동적 경로 정규식 추가
  const adminDetailRegex = /^\/admin\/festa\/notice\/\d+$/;
  const boothDetailRegex = /^\/admin\/booth\/notice\/event\/\d+$/;
  const adminEditRegex = /^\/admin\/festa\/notice\/edit\/\d+$/;
  const adminLostEditRegex = /^\/admin\/festa\/lost\/edit\/\d+$/;

  const isAdminPage =
    adminPaths.includes(currentPath) ||
    adminDetailRegex.test(currentPath) ||
    adminEditRegex.test(currentPath) ||
    adminLostEditRegex.test(currentPath) ||
    boothDetailRegex.test(currentPath);

  // 🎯 스크롤바 숨길 admin 경로 판별
  const isAdminScrollHidden =
    currentPath === "/admin/festa" || currentPath === "/admin/booth";

  // 게시판 상세 경로 판별
  const isBoardDetail = /^\/board\/[^/]+$/.test(currentPath);

  // 부스/푸드트럭 상세 경로 판별
  const isMapDetail =
    /^\/booth\/[^/]+$/.test(currentPath) ||
    /^\/toilet\/[^/]+$/.test(currentPath) ||
    /^\/drink\/[^/]+$/.test(currentPath) ||
    /^\/foodtruck\/[^/]+$/.test(currentPath);

  // Event 페이지 판별
  const phase = searchParams.get("phase");
  const isEventPage = currentPath === "/event";

  // Event 페이지에서는 네비게이션을 숨김
  const shouldHideNavigation =
    isEventPage && phase !== "intro" && phase !== "instruction";

  // 3) 헤더 선택 로직
  const HeaderComponent = isAdminPage
    ? AdminHeader
    : isBoardDetail
    ? BoardDetailHeader
    : isMapDetail
    ? MapDetailHeader
    : Header;

  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col 
          min-w-[375px] max-w-[430px]
          w-screen min-h-[100dvh]
          bg-gray"
      >
        {/* 조건부 Header */}
        {!shouldHideNavigation && <HeaderComponent />}

        {/* 페이지의 실제 내용 */}
        <main
          className={`flex-grow pt-[52px] pb-[62px] ${
            isAdminScrollHidden
              ? "overflow-y-scroll hide-scrollbar"
              : currentPath === "/map"
              ? "overflow-hidden"
              : "overflow-y-auto"
          }`}
        >
          {children}

          {/* 홈(/)에서만 Footer 표시 */}
          {currentPath === "/" && <Footer />}
        </main>

        {/* BottomNav (관리자/게임특수상황 제외) */}
        {!isAdminPage && !shouldHideNavigation && <BottomNav />}
      </div>
    </div>
  );
};

export default Layout;
