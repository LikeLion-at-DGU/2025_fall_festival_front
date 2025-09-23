import React, { useState, useEffect } from "react";
import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import NoticeBox from "../../components/AdminComponents/Booth/NoticeBox";
import { getBoothEvents } from "../../apis/admin/booth";

/* -------------- 접근권한 --------------- */
/*
 * 허용 : Club || Major
 * 허용된 role만 navigate된 상태 (세션스토리지에 유저 정보 저장된 상태)
 */

function BoothMain() {

  const [events, setEvents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = usePrefixedNavigate();

  const bigWrapperClass = "flex flex-col justify-between w-full px-4 py-8 mx-auto gap-6";
  const wrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-4";

  // ------------------ 게시글 목록 ------------------ //

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

  // -------------------- 이벤트 추가하기 ---------------------- //
  // 추가 버튼 누르면 유저 정보 확인 후, 이벤트 개최 페이지로 연결
  // 조건 1 : uid 존재 + 유효 
  // 조건 2 : role 충족

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
      alert("이벤트 추가 권한이 없습니다.");
      navigate("/admin/login");
      return;
    }
    // 3. 권한 문제 없으면 이벤트 작성 페이지로 이동
    navigate("event");
  };

  
  //============================== UI ==================================//

  return (
    <div className="flex flex-col justify-between w-full px-4 py-8 mx-auto gap-6">
      <div className="flex flex-col w-full h-full mx-auto gap-5">
        <AdminTitle text="진행한 이벤트 목록" />
        <div className="overflow-y-scroll h-[65vh] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center flex-col w-full h-full mx-auto gap-2.5">
          {/* 이벤트 목록 렌더링 */}
          {events.map((event) => (
            <NoticeBox
              key={event.id}
              id={event.id}
              noticeText="이벤트"
              content={event.title}
              org={event.booth_name}
            />
          ))}
          </div>
        </div>

        <Submitbtn text="이벤트 추가하기" onClick={handleAddEvent} />
      </div>
    </div>
  );
}

export default BoothMain;
