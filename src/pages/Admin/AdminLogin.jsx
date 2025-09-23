import React, { useState } from "react";
import Codeinput from "../../components/AdminComponents/CodeInput";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import ToastMessage from "../../components/AdminComponents/ToastMessage";

import dirvana from "../../assets/images/icons/logo/dirvanablack.svg";
import likelion from "../../assets/images/icons/logo/likelionblack.svg";
import collab from "../../assets/images/icons/logo/collab.svg";

import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";
import { adminLogin } from "../../apis/admin/admin";

/* ------- 관리자 로그인 구현 플로우 -------- */
/*
// CodeInput에 입력하는 값을 state로 연결합니다. (value, onChange)
// SubmitBtn 클릭 시 handleSubmit을 실행합니다.
// adminLogin API 호출 후 uid/role/name을 저장하고, 이후 게시글목록 페이지로 이동합니다.

/* -------------- 인증 방식 --------------- */
/*
 * 로그인 방식 : 부여받은 관리자 코드로 로그인 시, 일회성 uid 발급 => 세션스토리지에 role, uid, name 저장
 * 접근 : role을 기준으로 페이지 분기 접근
 * 게시글 작성 허용 : (1) role이 허용 되었을 경우 + (2) uid가 유효할 경우
 * 작성 및 접근 거부 트리거 : POST 시도 시 >> 로그인(인증) 만료 여부 판단 및 로그인 리다이렉트
 * 로그인(인증) 만료 판단 기준 : uid_value === false
 * ++ uid 만료 기준 : 1시간 후 db에서 해당 uid 자동 삭제 => uid_value === false 반환 => 유효하지 않음 판단
 */

function AdminLogin() {
  
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = usePrefixedNavigate();

  const showToast = (setter, message) => {
    setter(message);
    setTimeout(() => setter(""), 3000); // 3초 뒤 메시지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // ✅ 로그인 전에 세션스토리지 비우기 (꼬인 uid 방지)
    sessionStorage.clear();

    try {
      const data = await adminLogin({ admin_code: code });

      // ✅ 서버에서 내려온 데이터 확인용 로그
      console.log("📡 로그인 응답:", data);

      // 로그인 성공 시 응답 데이터에서 uid, role, name을 꺼내서 sessionStorage에 저장합니다.
      sessionStorage.setItem("uid", data.uid);
      sessionStorage.setItem("role", data.role);
      sessionStorage.setItem("name", data.name);

      // ✅ 저장된 값도 다시 로그로 확인
      console.log("✅ 세션스토리지 저장 완료:", {
        uid: sessionStorage.getItem("uid"),
        role: sessionStorage.getItem("role"),
        name: sessionStorage.getItem("name"),
      });
      
      alert("로그인 성공");

      // role에 따라서 라우팅 분기
      if (data.role === "Staff" || data.role === "Stuco") {
        navigate("/admin/festa");
      } else if (data.role === "Club" || data.role === "Major") {
        navigate("/admin/booth");
      } else {
        // 혹시 모를 예외 처리
        console.warn("Unknown role:", data.role);
        navigate("/");
      }

    } catch (err) {
      showToast(setErrorMsg, "관리자 코드를 확인해주세요");
      //showToast(setErrorMsg, err.response?.data?.error || "로그인 실패");
      // 1. 관리자 코드가 존재하지 않을 경우
      // 2. 필드에 입력값이 없을 경우
    }
  };

  return (
    <div className="flex flex-col items-center justify-center
    w-full gap-[104px]
    pt-[155px] ">
      <div className="flex flex-col items-center gap-8">
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
