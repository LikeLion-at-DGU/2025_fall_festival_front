import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import LostPhotoUpload from "../../components/AdminComponents/PhotoUpload";

function LostPost() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate(); // 페이지 이동 훅

  // 제출 로직: 홈으로 이동
  const handleSubmit = () => {
    // 필요한 제출 처리(서버 요청 등) 수행
    setIsPopupOpen(false); // 팝업 닫기
    navigate("/"); // 홈으로 이동
  };
  const wrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-4";
  return (
    <div
      className="flex flex-col justify-between
    w-full h-full 
    px-4 py-8 
    gap-4
    mx-auto "
    >
      {/* 이벤트 생성 */}
      <div className={wrapperClass}>
        <PostInput placeholder="분실물 공지 제목을 입력하세요" />
        <PostInput
          className="h-[370px]"
          placeholder="분실물 공지 내용을 입력하세요"
        />
      </div>
      <div className={wrapperClass}>
        <AdminTitle text="분실물 사진 추가" />
        <Submitbtn text="사진 업로드하기" />
      </div>
      <div className={wrapperClass}>
        <AdminTitle text="분실물 사진 추가" />
        <PostInput placeholder="분실물이 발견된 위치를 입력하세요" />
      </div>
      <Submitbtn text="확인" />
    </div>
  );
}

export default LostPost;
