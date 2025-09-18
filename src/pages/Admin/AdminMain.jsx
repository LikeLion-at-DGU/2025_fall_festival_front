import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import { patchEmergencyNotice } from "../../apis/admin/stuco";


function AdminMain() {

  const navigate = useNavigate();

  const [notice, setNotice] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const bigWrapperClass = "flex flex-col justify-between w-full px-4 py-8 mx-auto gap-6";
  const wrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-4";
  const middleWrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-3";
  const smallWrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-1";

  const bottomWrapperClass = "flex flex-col w-full";

  // 제출 로직: 긴급 공지 수정 field의 수정 사항을 반영합니다.
  const handlePatchEvent = async () => {
    const uid = sessionStorage.getItem("uid");
    const role = sessionStorage.getItem("role");

    if (!uid) {
      alert("로그인이 필요합니다.");
      navigate("/admin/login");
      return;
    }
    if (role !== "Staff") {
      alert("공지 수정 권한이 없습니다.");
      return;
    }

    try {
      const result = await patchEmergencyNotice(1, { // id는 상황에 맞게
        title: "긴급 공지",
        content: notice,
      });

      alert(result.message);
      setIsEdited(false);
    } catch (err) {
      alert(err.error || "수정 실패");
    }
  };

  // 제출 로직: 유저 정보 확인 후, 분실물 페이지로 연결
  const handleAddLostItem = () => {
    const uid = sessionStorage.getItem("uid");
    const role = sessionStorage.getItem("role");

    if (!uid) {
      alert("로그인이 필요합니다.");
      navigate("/admin/login");
      return;
    }
    if (role !== "Staff") {
      alert("분실물 추가 권한이 없습니다.");
      return;
    }
    navigate("notice/lost");
  };

  // 제출 로직: 유저 정보 확인 후, 공지 페이지로 연결
  const handleAddNotice = () => {
    const uid = sessionStorage.getItem("uid");
    const role = sessionStorage.getItem("role");

    if (!uid) {
      alert("로그인이 필요합니다.");
      navigate("/admin/login");
      return;
    }
    if (role !== "Staff") {
      alert("공지 추가 권한이 없습니다.");
      return;
    }
    navigate("notice/normal"); 
  };

  return (
    <div className={bigWrapperClass}>
      <div className={wrapperClass}>
        <AdminTitle text="긴급 공지" />

        <PostInput
          placeholder="긴급하게 올릴 공지를 입력해주세요"
          value={notice}
          onChange={(e) => {
            setNotice(e.target.value);
            setIsEdited(true);
          }}
        />
        <Submitbtn
          text="긴급 공지 수정하기"
          onClick={handlePatchEvent}
          disabled={!isEdited || !notice.trim()}
        />

      </div>
      <div className={wrapperClass}>
        <AdminTitle text="게시글 목록" />
        <div className={smallWrapperClass}>
          <div>검색 </div>
          <div>게시글 </div>
          <div>게시글 </div>
          <div>게시글 </div>
        </div>

        <div className={bottomWrapperClass}>
          <Submitbtn text="분실물 추가하기" onClick={handleAddLostItem} />
          <Submitbtn text="공지 추가하기" onClick={handleAddNotice} />
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
