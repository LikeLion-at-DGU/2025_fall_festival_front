import React from "react";
import Codeinput from "../../components/AdminComponents/CodeInput";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import dirvana from "../../assets/images/icons/logo/dirvanablack.svg";
import likelion from "../../assets/images/icons/logo/likelionblack.svg";
import collab from "../../assets/images/icons/logo/collab.svg";

function AdminLogin() {
  return (
    <div className="flex flex-col items-center w-full h-screen justify-center gap-36 px-4">
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
    </div>
  );
}

export default AdminLogin;
