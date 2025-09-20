import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import { createNormalPost, updateNormalPost } from "../../apis/admin/festa";

function NormalPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingData = location.state; // ✅ 넘어온 데이터

  const [title, setTitle] = useState(editingData?.title || "");
  const [content, setContent] = useState(editingData?.content || "");
  const [toastMsg, setToastMsg] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = { title, content };

      if (editingData) {
        // ✅ 수정 API 호출
        const res = await updateNormalPost(editingData.id, payload);
        alert(res.message || "공지 수정 성공");
        console.log("수정할 데이터:", payload);
      } else {
        // 신규 작성
        const res = await createNormalPost(payload);
        alert(res.message || "공지 작성 성공");
      }
      navigate("/admin/festa");
    } catch (err) {
        console.error("에러 전체:", err);

        let msg = "요청 실패";
        if (err.response) {
          if (typeof err.response.data === "string") {
            // 서버가 그냥 문자열만 줬을 때
            msg = err.response.data;
          } else if (err.response.data?.message) {
            msg = err.response.data.message;
          } else if (err.response.data?.error) {
            msg = err.response.data.error;
          }
        } else {
          msg = err.message;
        }

        setToastMsg(msg);
      }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full px-4 py-8 mx-auto">
      <div className="flex flex-col items-center w-full h-full mx-auto gap-4">
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
      <Submitbtn
        text={editingData ? "수정하기" : "등록하기"}
        onClick={handleSubmit}
        disabled={
          !title.trim() || !content.trim() // 하나라도 비어 있으면 비활성화
        }
      />

    </div>
  );
}

export default NormalPost;
