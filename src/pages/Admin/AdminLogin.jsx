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
// adminLogin API 호출 후 uid/role/name을 저장하고, 이후 게시글목록 페이지로 이동합니다.

/*----관리자 임의 생성 코드----*/
// 총학: abc123
// 동아리: abc456
// 학과: abc789

function AdminLogin() {
  
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const showToast = (setter, message) => {
    setter(message);
    setTimeout(() => setter(""), 3000); // 3초 뒤 메시지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const data = await adminLogin({ admin_code: code });

      // 로그인 성공 시 응답 데이터에서 uid, role, name을 꺼내서 sessionStorage에 저장합니다.
      sessionStorage.setItem("uid", data.uid);
      sessionStorage.setItem("role", data.role);
      sessionStorage.setItem("name", data.name);
      
      alert("로그인 성공"); // ⛔ alert 창 최종 확인 후 제거 예정

      // role에 따라서 라우팅 분기
      if (data.role === "Staff") {
        navigate("/admin/stuco/main");
      } else if (data.role === "Club" || data.role === "Major") {
        navigate("/admin/booth/main");
      } else {
        // 혹시 모를 예외 처리
        console.warn("Unknown role:", data.role);
        navigate("/");
      }

    } catch (err) {
      showToast(setErrorMsg, err.response?.data?.error || "로그인 실패");
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
      {errorMsg && <ToastMessage text={errorMsg} />}
    </div>
  );
}

export default AdminLogin;
