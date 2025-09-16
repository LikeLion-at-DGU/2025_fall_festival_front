import React from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header/Header";
import AdminHeader from "./Header/AdminHeader";
import BottomNav from "./BottomNav/BottomNav";
// import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const adminPaths = [
    "/admin",
    "/adminlogin",
    "/adminlist",
    "/adminevent",
    "/adminnormal",
    "/adminlost",
  ];
  const isAdminPage = adminPaths.includes(location.pathname);
  const HeaderComponent = adminPaths.includes(location.pathname)
    ? AdminHeader
    : Header;

  return (
    <div
      className="flex flex-col 
    min-w-[375px] min-h-[812px] w-screen h-screen
    bg-gray"
    >
      {/* 조건부 Header */}
      <HeaderComponent />
      {/* 페이지의 실제 내용과 푸터가 이 안에서 스크롤됩니다. */}
      <main className="flex-grow overflow-y-auto pt-[54px] pb-[62px]">
        {/* 1. 페이지의 실제 내용 (Home, Board 등) */}
        {children}

        {/* 2. 페이지 내용 맨 끝에 위치하는 정보성 푸터 */}
        {/* <Footer /> */}
        <footer className="w-full bg-gray-800 text-white p-6 text-center text-sm mt-12">
          여기는 저작권, 정보 등을 표시하는 푸터(Footer) 영역입니다.
        </footer>
      </main>

      {/* 관리자 페이지가 아니면 BottomNav 보여주기 */}
      {!isAdminPage && <BottomNav />}
    </div>
  );
};

export default Layout;
