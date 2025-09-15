import React from 'react';

// import Header from './Header/Header';
import BottomNav from './BottomNav/BottomNav';
// import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-w-[375px] min-h-[812px] w-screen h-screen">
      {/* 화면 상단에 고정되는 헤더 */}
      {/* <Header /> */}
      <header className="w-full bg-gray-100 p-4 text-center font-bold shadow-md">
        여기는 헤더(Header) 영역입니다.
      </header>

      {/* 페이지의 실제 내용과 푸터가 이 안에서 스크롤됩니다. */}
      <main className="flex-grow overflow-y-auto">
        {/* 1. 페이지의 실제 내용 (Home, Board 등) */}
        {children}

        {/* 2. 페이지 내용 맨 끝에 위치하는 정보성 푸터 */}
        {/* <Footer /> */}
        <footer className="w-full bg-gray-800 text-white p-6 text-center text-sm mt-12">
          여기는 저작권, 정보 등을 표시하는 푸터(Footer) 영역입니다.
        </footer>
      </main>

      {/* 화면 하단에 고정되는 하단 네비게이션 바 */}
      <BottomNav />
   
    </div>
  );
};

export default Layout;

