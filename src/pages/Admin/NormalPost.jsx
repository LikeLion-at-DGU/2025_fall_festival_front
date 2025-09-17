import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";

function NormalPost() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate(); // 페이지 이동 훅

  // 제출 로직: 홈으로 이동
  const handleSubmit = () => {
    // 필요한 제출 처리(서버 요청 등) 수행
    setIsPopupOpen(false); // 팝업 닫기
    navigate("/"); // 홈으로 이동
  };

  return (
    <div
      className="flex flex-col justify-between
    w-full h-full 
    px-4 py-8 
    mx-auto "
    >
      {/* 이벤트 생성 */}
      <div
        className="flex flex-col items-center 
    w-full h-full 
    mx-auto gap-4 "
      >
        <PostInput placeholder="공지 제목을 입력하세요" />
        <PostInput className="h-[370px]" placeholder="공지 내용을 입력하세요" />
      </div>

      <Submitbtn text="확인" />
    </div>
  );
}

export default NormalPost;
