import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
function AdminMain() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate(); // 페이지 이동 훅
  const bigWrapperClass =
    "flex flex-col justify-between w-full px-4 py-8 mx-auto gap-6";

  const wrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-4";
  const middleWrapperClass =
    "flex flex-col items-center w-full h-full mx-auto gap-3";
  const smallWrapperClass =
    "flex flex-col items-center w-full h-full mx-auto gap-1";

  // 제출 로직: 홈으로 이동
  const handleSubmit = () => {
    // 필요한 제출 처리(서버 요청 등) 수행
    setIsPopupOpen(false); // 팝업 닫기
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className={bigWrapperClass}>
      <div className={wrapperClass}>
        <AdminTitle text="긴급 공지" />
        <PostInput placeholder="긴급하게 올릴 공지를 입력해주세요" />
        <Submitbtn text="긴급 공지 수정하기" />
      </div>
      <div className={wrapperClass}>
        <AdminTitle text="게시글 목록" />
        <div className={smallWrapperClass}>
          <div>검색 </div>
          <div>게시글 </div>
          <div>게시글 </div>
          <div>게시글 </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
