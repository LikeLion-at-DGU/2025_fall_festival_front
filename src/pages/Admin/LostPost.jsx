import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import PhotoUpload from "../../components/AdminComponents/Admin/PhotoUpload";
import { createLostPost } from "../../apis/admin/stuco";

function LostPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null); // 파일 업로드
  const navigate = useNavigate();

  // 제출 로직: 공지 작성 후 admin 메인으로 이동
  const handleSubmit = async () => {
    try {
      const uid = sessionStorage.getItem("uid"); // 로그인한 admin uid
      const formData = new FormData();
      formData.append("uid", uid);
      formData.append("category", "LostItem");
      formData.append("title", title);
      formData.append("content", content);
      formData.append("location", location);
      if (image) formData.append("image", image);

      const res = await createLostPost(formData);
      alert(res.message);
      navigate("/admin/stuco");
    } catch (err) {
      alert(err.error || "등록 실패");
    }
  };

  const wrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-4";
  
  return (
    <div
      className="flex flex-col justify-between
    w-full h-full 
    px-4 py-8 
    gap-4
    mx-auto "
    >
      {/* 제목 & 내용 */}
      <div className={wrapperClass}>
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
      {/* 사진 업로드 */}
      <div className={wrapperClass}>
        <AdminTitle text="분실물 사진 추가" />
        <PhotoUpload onChange={(file) => setImage(file)} />
      </div>
      {/* 위치 입력 */}
      <div className={wrapperClass}>
        <AdminTitle text="분실물 발견 위치" />
        <PostInput
          placeholder="분실물이 발견된 위치를 입력하세요"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <Submitbtn text="확인" onClick={handleSubmit} />
    </div>
  );
}

export default LostPost;
