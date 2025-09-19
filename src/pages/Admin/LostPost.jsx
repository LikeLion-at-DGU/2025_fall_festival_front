import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import PhotoUpload from "../../components/AdminComponents/Admin/PhotoUpload";
import ToastMessage from "../../components/AdminComponents/ToastMessage";
import { createLostPost, updateLostPost } from "../../apis/admin/stuco";

function LostPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingData = location.state; // ✅ 넘어온 데이터

  const [title, setTitle] = useState(editingData?.title || "");
  const [content, setContent] = useState(editingData?.content || "");
  const [locationText, setLocationText] = useState(editingData?.location || "");
  const [image, setImage] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  // 제출 로직: 공지 작성 후 admin 메인으로 이동
  const handleSubmit = async () => {
    try {
      const uid = sessionStorage.getItem("uid");
      const formData = new FormData();
      formData.append("uid", uid);
      formData.append("category", "LostItem");
      formData.append("title", title);
      formData.append("content", content);
      formData.append("location", locationText);
      if (image) formData.append("image", image);

      if (editingData) {
        const res = await updateLostPost(editingData.id, formData);
        setToastMsg(res.message || "분실물 수정 성공");
        console.log("수정할 데이터:", { title, content, locationText, image });
      } else {
        // 신규 작성
        const res = await createLostPost(formData);
        setToastMsg(res.message);
      }
      setTimeout(() => navigate("/admin/stuco"), 2500);
      navigate("/admin/stuco");
    } catch (err) {
        console.error("에러 전체:", err);

        let msg = "세션이 만료되었습니다. 다시 로그인해주세요";

        if (err.response) {
          if (typeof err.response.data === "string") {
            // 서버가 그냥 문자열을 내려줌
            msg = err.response.data;
          } else if (err.response.data?.message) {
            // JSON 안에 message 키가 있음
            msg = err.response.data.message;
          } else if (err.response.data?.error) {
            msg = err.response.data.error;
          }
        }

        setToastMsg(msg);
       if (
    msg.includes("세션") || 
    msg.includes("UID") || 
    msg.includes("로그인") ||
    err.response?.status === 401 // Unauthorized
  ) {
    setTimeout(() => {
      navigate("/admin/login");
    }, 2000); // 토스트 2초 보여주고 이동
  }
}

  };

  return (
    <div className="flex flex-col justify-between w-full h-full px-4 py-8 gap-4 mx-auto">
      <div className="flex flex-col items-center w-full h-full mx-auto gap-4">
        <PostInput
          placeholder="분실물 공지 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <PostInput
          className="h-[370px]"
          placeholder="분실물 공지 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center w-full h-full mx-auto gap-4">
        <AdminTitle text="분실물 사진 추가" />
        <PhotoUpload onChange={(file) => setImage(file)} />
      </div>
      <div className="flex flex-col items-center w-full h-full mx-auto gap-4">
        <AdminTitle text="분실물 발견 위치" />
        <PostInput
          placeholder="분실물이 발견된 위치를 입력하세요"
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
        />
      </div>
      <Submitbtn
        text={editingData ? "수정하기" : "등록하기"}
        onClick={handleSubmit}
        disabled={
          !title.trim() ||
          !content.trim() ||
          !locationText.trim()
          // image는 선택사항이면 체크 안 함
        }
      />

      {toastMsg && (
        <ToastMessage text={toastMsg} onClose={() => setToastMsg("")} />
      )}

    </div>
  );
}

export default LostPost;
