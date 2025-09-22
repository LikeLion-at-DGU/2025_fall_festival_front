import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import Header from "./Header/Header";
import AdminHeader from "./Header/AdminHeader";
import BoardDetailHeader from "./Header/BoardDetailHeader"; // ⬅️ 추가
import MapDetailHeader from "./Header/MapDetailHeader";
import BottomNav from "./BottomNav/BottomNav";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // 축제 전 삭제
  const hasSecret = searchParams.get("secret") === "1031";
  //
  //
  //

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
  // festa 화면 상세 조회 (/admin/festa/notice/:id)
  const adminDetailRegex = /^\/admin\/festa\/notice\/\d+$/;
  // booth 화면 상세 조회 (/admin/booth/notice/:id)
  const boothDetailRegex = /^\/admin\/booth\/notice\/event\/\d+$/;
  // 수정 페이지 (/admin/stuco/notice/edit/:id)
  const adminEditRegex = /^\/admin\/festa\/notice\/edit\/\d+$/;
  // 분실물 수정 페이지 (/admin/stuco/lost/edit/:id)
  const adminLostEditRegex = /^\/admin\/festa\/lost\/edit\/\d+$/;

  const isAdminPage =
    adminPaths.includes(location.pathname) ||
    adminDetailRegex.test(location.pathname) ||
    adminEditRegex.test(location.pathname) ||
    adminLostEditRegex.test(location.pathname) ||
    boothDetailRegex.test(location.pathname);

  // 🎯 스크롤바 숨길 admin 경로 판별
  const isAdminScrollHidden =
    location.pathname === "/admin/festa" ||
    location.pathname === "/admin/booth";

  // 2) 게시판 상세 경로 판별: /board/:boardId
  //   - 숫자만이 아니라 슬러그도 허용하려면 ([^/]+) 유지
  const isBoardDetail = /^\/board\/[^/]+$/.test(location.pathname);

  // 부스/푸드트럭 상세 경로 판별
  const isMapDetail =
    /^\/booth\/[^/]+$/.test(location.pathname) ||
    /^\/toilet\/[^/]+$/.test(location.pathname) ||
    /^\/drink\/[^/]+$/.test(location.pathname) ||
    /^\/foodtruck\/[^/]+$/.test(location.pathname);

  // Event 페이지 판별
  const phase = searchParams.get("phase"); // intro, instruction, countdown, playing
  const isEventPage = location.pathname === "/event";

  // Event 페이지에서는 네비게이션을 완전히 숨김 (게임 집중 환경 제공)
  const shouldHideNavigation =
    isEventPage && phase !== "intro" && phase !== "instruction";

  // 3) 헤더 선택 로직: 관리자 > 게시판상세 > 기본
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
        {/* 조건부 Header (카운트다운/게임플레이 단계가 아닐 때만 표시) */}
        {/* ✅ secret=1031 있을 때만 헤더 */}
        {hasSecret &&
          (!shouldHideNavigation || location.pathname === "/event") && (
            <HeaderComponent />
          )}
        {/* 페이지의 실제 내용과 푸터가 이 안에서 스크롤됩니다. */}
        <main
          className={`flex-grow ${
            !hasSecret ? "" : "pt-[52px] pb-[62px]"
          } ${
            isAdminScrollHidden
              ? "overflow-y-scroll hide-scrollbar" // 🎯 스크롤은 되지만 스크롤바 숨김
              : location.pathname === "/map"
              ? "overflow-hidden"
              : "overflow-y-auto"
          }`}
        >
          {/* 1. 페이지의 실제 내용 */}
          {children}

          {/* ✅ secret=1031 있을 때만 Footer */}
          {hasSecret && location.pathname === "/" && <Footer />}
        </main>

        {/* ✅ secret=1031 있을 때만 BottomNav */}
        {hasSecret &&
          !isAdminPage &&
          (!shouldHideNavigation || location.pathname === "/event") && (
            <BottomNav />
          )}
      </div>
    </div>
  );
};

export default Layout;
