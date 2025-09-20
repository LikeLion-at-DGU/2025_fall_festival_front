import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import NoticeBox from "../../components/AdminComponents/Booth/NoticeBox";
import { getBoothEvents } from "../../apis/admin/booth";

function BoothMain() {

  const [events, setEvents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const bigWrapperClass = "flex flex-col justify-between w-full px-4 py-8 mx-auto gap-6";
  const wrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-4";

  // 게시글 가져오기
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBoothEvents();
        setEvents(data.result); // result 배열 그대로 세팅
      } catch (err) {
        console.error("이벤트 불러오기 실패:", err);
      }
    }
    fetchData();
  }, []);

  // 제출 로직: 유저 정보 확인 후, post 페이지로 이동합니다.
  const handleAddEvent = () => {
    
    const uid = sessionStorage.getItem("uid");
    const role = sessionStorage.getItem("role");

    // 1. 유저 로그인 여부 체크 (uid 존재 여부)
    if (!uid) {
      alert("로그인이 필요합니다.");
      navigate("/admin/login");
      return;
    }
    // 2. 권한 체크(role 기반)
    if (role !== "Club" && role !== "Major") {
      alert("이벤트 추가 권한이 없습니다."); // ⛔ toastMsg로 수정, 로그인페이지로 리다이렉트 필요
      return;
    }
    // 3. 권한 문제 없으면 이벤트 작성 페이지로 이동
    navigate("event");
  };

  return (
    <div className="flex flex-col justify-between w-full px-4 py-8 mx-auto gap-6">
      <div className="flex flex-col items-center w-full h-full mx-auto gap-4">
        <AdminTitle text="진행한 이벤트 목록" />
        
        {/* 이벤트 목록 렌더링 */}
        {events.map((event) => (
          <NoticeBox
            key={event.id}
            noticeText="이벤트"
            content={event.title}
            org={event.booth_name}
          />
        ))}

        <Submitbtn text="이벤트 추가하기" onClick={handleAddEvent} />
      </div>
    </div>
  );
}

export default BoothMain;
