import React, { useState } from "react";
import Codeinput from "../../components/AdminComponents/CodeInput";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import ToastMessage from "../../components/AdminComponents/ToastMessage";

import dirvana from "../../assets/images/icons/logo/dirvanablack.svg";
import likelion from "../../assets/images/icons/logo/likelionblack.svg";
import collab from "../../assets/images/icons/logo/collab.svg";

import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../apis/admin";

/*----관리자 로그인 구현 플로우----*/
// CodeInput에 입력하는 값을 state로 연결합니다. (value, onChange)
// SubmitBtn 클릭 시 handleSubmit을 실행합니다.
// adminLogin API 호출 후 uid/role을 저장하고, 이후 게시글목록 페이지로 이동합니다.

function AdminLogin() {
  
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await adminLogin({ code });

      // 로그인 성공 시 응답 데이터에서 UID, role 꺼내서 localStorage에 저장합니다.
      localStorage.setItem("uid", data.uid);   // ⛔ token → uid 변경 여부 백이랑 논의 후 확정 예정
      localStorage.setItem("role", data.role);
      
      alert("로그인 성공");

      // role에 따라서 라우팅 분기 (⛔ 백 확정 후 변수명 수정 필요)
      if (data.role === "총학") {
        navigate("/adminlist");
      } else if (data.role === "동아리" || data.role === "학과") {
        navigate("/admin"); // ⛔ 라우팅 수정 후 navigate 수정 예정
      } else {
        // 혹시 모를 예외 처리
        console.warn("Unknown role:", data.role);
        navigate("/");
      }

    } catch (err) {
      alert(err.response?.data?.error || "로그인 실패");
    }
  };

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80">
        <Codeinput 
          placeholder="관리자 코드를 입력해주세요"
          value={code}
          onChange={(e) => setCode(e.target.value)} 
        />
        <Submitbtn text="로그인" type="submit" />
      </form>
      {/*로그인 실패 시 토스트 메시지 
      <ToastMessage text="관리자 코드를 확인해주세요"/>*/}
    </div>
  );
}

export default AdminLogin;
