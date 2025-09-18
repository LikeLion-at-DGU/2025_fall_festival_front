import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";

function AdminMain() {

  const navigate = useNavigate();
  const bigWrapperClass = "flex flex-col justify-between w-full px-4 py-8 mx-auto gap-6";
  const wrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-4";
  const middleWrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-3";
  const smallWrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-1";

  // 제출 로직: 긴급 공지 수정 field의 수정 사항을 반영합니다.
  const handlePatchEvent = () => {
    // ⚠️ 작업 예정
  }

  // 제출 로직: 유저 정보 확인 후, 일반공지 post 페이지로 이동합니다.
  const handleAddEvent = () => {
    
    const uid = sessionStorage.getItem("uid");
    const role = sessionStorage.getItem("role");

    // 1. 유저 로그인 여부 체크 (uid 존재 여부)
    if (!uid) {
      alert("로그인이 필요합니다."); // ⛔ stale time 관련 자동 로그아웃 안내 필요해보임. 수정 예정
      navigate("/admin/login");
      return;
    }
    // 2. 권한 체크(role 기반)
    if (role !== "Staff") {
      alert("공지 추가 권한이 없습니다."); // ⛔ toastMsg로 수정, 로그인페이지로 리다이렉트 필요
      return;
    }
    // 3. 권한 문제 없으면 이벤트 작성 페이지로 이동
    navigate("notice/normal");
  };

  return (
    <div className={bigWrapperClass}>
      <div className={wrapperClass}>
        <AdminTitle text="긴급 공지" />
        <PostInput placeholder="긴급하게 올릴 공지를 입력해주세요" />
        <Submitbtn text="긴급 공지 수정하기" onClick={handlePatchEvent} />
      </div>
      <div className={wrapperClass}>
        <AdminTitle text="게시글 목록" />
        <div className={smallWrapperClass}>
          <div>검색 </div>
          <div>게시글 </div>
          <div>게시글 </div>
          <div>게시글 </div>
        </div>
        <Submitbtn text="공지 추가하기" onClick={handleAddEvent} />
      </div>
    </div>
  );
}

export default AdminMain;
