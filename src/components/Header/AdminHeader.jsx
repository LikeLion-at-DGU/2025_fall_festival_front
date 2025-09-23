import React from "react";
import { useLocation } from "react-router-dom";
import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";

import backBtn from "../../assets/images/icons/header-icons/left.png";

const AdminHeader = () => {
  const navigate = usePrefixedNavigate();
  const location = useLocation();

  const handleBack = () => {
    // 특정 경로일 때 → 메인 페이지로 이동
    if (location.pathname.endsWith === "/admin/booth" || 
        location.pathname.endsWith === "/admin/festa") {
      navigate(""); // Home 컴포넌트 경로
    } else {
      navigate(-1); // 일반적인 직전 페이지로 이동
    }
  };

  return (
    <header
      className="flex items-center justify-between 
      fixed top-0 
      w-full max-w-[430px]
      bg-white 
      h-[54px] px-[5px]"
      style={{
        boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.05)"
      }}
    >
      <button onClick={handleBack}>
        <img src={backBtn} alt="back" className="m-[10px]" width={24} height={24} />
      </button>
    </header>
  );
};

export default AdminHeader;
