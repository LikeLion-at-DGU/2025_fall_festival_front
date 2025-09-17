import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import Popup from "../../components/AdminComponents/Popup";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";

function EventPost() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate(); // 페이지 이동 훅

  // 제출 로직: 홈으로 이동
  const handleSubmit = () => {
    // 필요한 제출 처리(서버 요청 등) 수행
    setIsPopupOpen(false); // 팝업 닫기
    navigate("/"); // 홈으로 이동
  };
  const timeWrapper = "flex flex-row items-center w-1/2 gap-2";

  return (
    <div className="flex flex-col items-center w-full px-4 py-8 mx-auto gap-4">
      {/* 이벤트 생성 */}
      <PostInput placeholder="이벤트 제목을 입력하세요" />
      <PostInput className="h-[370px]" placeholder="공지 내용을 입력하세요" />
      <AdminTitle text="이벤트 시간" />
      <div className={`flex flex-row justify-start items-start gap-2 w-full`}>
        <div className={timeWrapper}>
          <PostInput placeholder="ex) 23" />
          <AdminTitle text="시간" />
        </div>
        <div className={timeWrapper}>
          <PostInput placeholder="ex) 30" />
          <AdminTitle text="분" />
        </div>
      </div>

      {/* 버튼 클릭 시 팝업 열림 */}
      <Submitbtn text="확인" onClick={() => setIsPopupOpen(true)} />

      {/* 팝업: 조건부 렌더링 */}
      {isPopupOpen && (
        <Popup
          text={
            <>
              이벤트는 수정이 어려워요
              <br />
              정말 등록하시겠어요?
            </>
          }
          buttontext="확인했어요"
          onClose={() => setIsPopupOpen(false)} // X 버튼 클릭 시 팝업 닫기
          onSubmit={handleSubmit} // 제출 버튼 클릭 시 로직 실행
        />
      )}
    </div>
  );
}

export default EventPost;
