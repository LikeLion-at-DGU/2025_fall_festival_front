import React from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header/Header";
import AdminHeader from "./Header/AdminHeader";
import BoardDetailHeader from "./Header/BoardDetailHeader"; // ⬅️ 추가
import BottomNav from "./BottomNav/BottomNav";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  // 1) 관리자 경로 판별 (정확히 일치)
  const adminPaths = [
    "/admin",
    "/admin/login",
    "/admin/stuco",
    "/admin/stuco/notice/normal",
    "/admin/stuco/notice/lost",
    "/admin/booth",
    "/admin/booth/event",
  ];
  const isAdminPage = adminPaths.includes(location.pathname);

  // 2) 게시판 상세 경로 판별: /board/:boardId
  //   - 숫자만이 아니라 슬러그도 허용하려면 ([^/]+) 유지
  const isBoardDetail = /^\/board\/[^/]+$/.test(location.pathname);

  // 3) 헤더 선택 로직: 관리자 > 게시판상세 > 기본
  const HeaderComponent = isAdminPage
    ? AdminHeader
    : isBoardDetail
    ? BoardDetailHeader
    : Header;

  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col 
          min-w-[375px] max-w-[430px]
          w-screen h-screen
          bg-gray"
      >
        {/* 조건부 Header (관리자/상세/기본) */}
        <HeaderComponent />

        {/* 페이지의 실제 내용과 푸터가 이 안에서 스크롤됩니다. */}
        <main
          className={`flex-grow pt-[54px] pb-[62px] ${
            location.pathname === "/map" ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          {/* 1. 페이지의 실제 내용 */}
          {children}

          {/* 2. 홈에서만 정보성 푸터 */}
          {location.pathname === "/" && <Footer />}
        </main>

        {/* 관리자 페이지가 아니면 BottomNav 표시 */}
        {!isAdminPage && <BottomNav />}
      </div>
    </div>
  );
};

export default Layout;
