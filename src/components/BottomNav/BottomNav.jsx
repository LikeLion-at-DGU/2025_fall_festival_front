import React from 'react';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  // 공통으로 사용할 클래스를 변수로 분리합니다.
  // 백틱(`)을 사용하면 여러 줄로 나눠 쓸 수 있어 가독성이 좋아집니다.
  const linkClassName = `
    flex flex-col items-center justify-center
    text-gray-500 hover:text-blue-500
    w-full
  `;

  return (
<nav className="fixed bottom-0 w-full bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">      <div className="flex justify-around h-16">
        {/* 지도로 가는 링크 */}
        <Link to="/map" className={linkClassName}>
          <span>🗺️</span>
          <span className="text-xs">지도</span>
        </Link>

        {/* 타임테이블로 가는 링크 */}
        <Link to="/timetable" className={linkClassName}>
          <span>🗓️</span>
          <span className="text-xs">일정</span>
        </Link>

        {/* 홈으로 가는 링크 */}
        <Link to="/" className={linkClassName}>
          <span>🏠</span>
          <span className="text-xs">홈</span>
        </Link>

        {/* 게시판으로 가는 링크 */}
        <Link to="/board" className={linkClassName}>
          <span>📝</span>
          <span className="text-xs">게시판</span>
        </Link>

        {/* 이벤트로 가는 링크 (새로 추가) */}
        <Link to="/event" className={linkClassName}>
          <span>🎉</span>
          <span className="text-xs">이벤트</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;

