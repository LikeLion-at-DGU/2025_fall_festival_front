import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import ToastMessage from "../../components/AdminComponents/ToastMessage";
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
        setToastMsg("공지가 수정되었습니다");
        console.log("수정할 데이터:", payload);
      } else {
        // 신규 작성
        const res = await createNormalPost(payload);
        setToastMsg(res.message || "공지가 등록되었습니다");
      }
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

  // ✅ toastMsg가 성공 메시지일 때만 2초 후 이동
  useEffect(() => {
    if (toastMsg && (toastMsg.includes("수정") || toastMsg.includes("등록"))) {
      const timer = setTimeout(() => {
        navigate("/admin/festa");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg, navigate]);

  // 제출 버튼 비활성화
  const isDisabled =
    !title.trim() ||
    !content.trim() ||
    (editingData &&
      title.trim() === editingData.title &&
      content.trim() === editingData.content);

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
        disabled={isDisabled}
      />

      {/* ✅ 토스트 메시지 표시 */}
      {toastMsg && (
        <ToastMessage text={toastMsg} onClose={() => setToastMsg("")} />
      )}

    </div>
  );
}

export default NormalPost;
