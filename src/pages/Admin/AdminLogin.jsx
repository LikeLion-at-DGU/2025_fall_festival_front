import React from "react";
import Codeinput from "../../components/AdminComponents/CodeInput";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import ToastMessage from "../../components/AdminComponents/ToastMessage";

import dirvana from "../../assets/images/icons/logo/dirvanablack.svg";
import likelion from "../../assets/images/icons/logo/likelionblack.svg";
import collab from "../../assets/images/icons/logo/collab.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../apis/admin";

function AdminLogin() {
  
  return (
    <div className="flex flex-col items-center justify-center
    w-full gap-[104px]
    pt-[155px] ">
      <div className="flex flex-col items-center gap-2">
        <img className="h-10" src={dirvana} alt="DIRVANA" />
        <img className="h-3" src={collab} alt="with" />
        <img className="h-10" src={likelion} alt="LIKELION" />
      </div>

      {/* 로그인 페이지 */}
      <div className="flex flex-col gap-2 w-80">
        <Codeinput placeholder="관리자 코드를 입력해주세요" />
        <Submitbtn text="로그인" />
      </div>
      {/*로그인 실패 시 토스트 메시지 */}
      <ToastMessage text="관리자 코드를 확인해주세요"/>
    </div>
  );
}

export default AdminLogin;
