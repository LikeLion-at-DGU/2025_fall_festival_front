import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import backBtn from "../../assets/images/icons/header-icons/left.png";

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <header
      className="flex items-center justify-between 
    fixed top-0 
    w-full max-w-[430px]
    bg-white 
    h-[54px] px-[5px]"
    >
      {/* 직전 페이지로 돌아가기 */}
      <button
        onClick={() => navigate(-1)}
      >
        <img src={backBtn} alt="back" className="m-[10px]" width={24} height={24}/>
      </button>
    </header>
  );
};

export default AdminHeader;