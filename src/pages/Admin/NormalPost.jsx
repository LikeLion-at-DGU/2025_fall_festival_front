import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import { createNormalPost } from "../../apis/admin/stuco";

function NormalPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // 제출 로직: 공지 작성 후 총학 메인으로 이동
  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        content,
      };

      const res = await createNormalPost(payload);
      alert(res.message || "공지 작성 성공"); 
      navigate("/admin/stuco");
    } catch (err) {
      alert(err.response?.data?.error || err.message || "공지 작성 실패");
    }
  };

  return (
    <div
      className="flex flex-col justify-between
    w-full h-full 
    px-4 py-8 
    mx-auto "
    >
      {/* 공지 입력 */}
      <div
        className="flex flex-col items-center 
    w-full h-full 
    mx-auto gap-4 "
      >
        <PostInput
          placeholder="공지 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <PostInput
          className="h-[370px]"
          placeholder="공지 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <Submitbtn text="확인" onClick={handleSubmit} />
    </div>
  );
}

export default NormalPost;
