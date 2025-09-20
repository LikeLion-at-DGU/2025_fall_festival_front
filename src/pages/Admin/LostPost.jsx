import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import PhotoUpload from "../../components/AdminComponents/Admin/PhotoUpload";
import ToastMessage from "../../components/AdminComponents/ToastMessage";
import { createLostPost, updateLostPost } from "../../apis/admin/festa";

function LostPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingData = location.state; // ✅ 넘어온 데이터 (수정 모드일 때)

  const [title, setTitle] = useState(editingData?.title || "");
  const [content, setContent] = useState(editingData?.content || "");
  const [locationText, setLocationText] = useState(editingData?.location || "");
  const [image, setImage] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  /*---- 세션 체크 ----*/
  useEffect(() => {
    const uid = sessionStorage.getItem("uid");
    if (!uid) {
      setToastMsg("세션이 만료되었습니다. 다시 로그인해주세요.");
      setTimeout(() => navigate("/admin/login"), 2000);
    }
  }, [navigate]);

  // 제출 로직: 분실물 게시글 작성/수정
  const handleSubmit = async () => {
    try {
      const uid = sessionStorage.getItem("uid");
      if (!uid) {
        setToastMsg("세션이 만료되었습니다. 다시 로그인해주세요");
        setTimeout(() => navigate("/admin/login"), 2000);
        return;
      }

      console.log("=== LostPost 요청 직전 ===");
      console.log("uid:", uid);
      console.log("title:", title);
      console.log("content:", content);
      console.log("location:", locationText);
      console.log("image:", image);

      const formData = new FormData();
      formData.append("uid", uid);
      formData.append("category", "LostItem"); // ✅ 누락 방지
      formData.append("title", title);
      formData.append("content", content);
      formData.append("location", locationText);
      if (image) formData.append("image", image);

      if (editingData) {
        const res = await updateLostPost(editingData.id, formData);
        setToastMsg(res.message || "분실물이 수정되었습니다");
        console.log("수정할 데이터:", { title, content, locationText, image });
      } else {
        const res = await createLostPost(formData);
        setToastMsg(res.message || "분실물이 등록되었습니다");
      }

      setTimeout(() => navigate("/admin/festa"), 2500);
    } catch (err) {
      console.error("에러 전체:", err);

      let msg = "다시 한 번 시도해주세요";

      if (err.response) {
        if (typeof err.response.data === "string") {
          msg = err.response.data;
        } else if (err.response.data?.message) {
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
        err.response?.status === 401
      ) {
        //setTimeout(() => navigate("/admin/login"), 2000);
      }
    }
  };

  // 버튼 비활성화 조건
  const isDisabled =
    !title.trim() ||
    !content.trim() ||
    !locationText.trim() ||
    !image || // 이미지 필수로 일단 설정해둠
    (editingData &&
      title.trim() === editingData.title &&
      content.trim() === editingData.content &&
      locationText.trim() === (editingData.location || "") &&
      !image); // 새 이미지를 업로드하지 않은 경우

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
        disabled={isDisabled}
        // ✅ 이미지(image)는 선택사항이면 disabled 조건에서 제외 가능
      />

      {toastMsg && (
        <ToastMessage text={toastMsg} onClose={() => setToastMsg("")} />
      )}
    </div>
  );
}

export default LostPost;
