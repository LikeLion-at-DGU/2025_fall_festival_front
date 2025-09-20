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
  const editingData = location.state; // ✅ 수정 모드일 경우 전달받은 데이터

  // 상태 관리
  const [title, setTitle] = useState(editingData?.title || "");
  const [content, setContent] = useState(editingData?.content || "");
  const [locationText, setLocationText] = useState(editingData?.location || "");
  const [image, setImage] = useState(null); // 새로 업로드할 파일
  const [previewImage, setPreviewImage] = useState(editingData?.image || null); // 기존 이미지 or 새로 업로드한 이미지 미리보기
  const [toastMsg, setToastMsg] = useState("");

  /* ---- 세션 체크 ---- */
  useEffect(() => {
    const uid = sessionStorage.getItem("uid");
    if (!uid) {
      setToastMsg("세션이 만료되었습니다. 다시 로그인해주세요.");
      setTimeout(() => navigate("/admin/login"), 2000);
    }
  }, [navigate]);

  /* ---- 제출 로직: 분실물 게시글 작성/수정 ---- */
  const handleSubmit = async () => {
    try {
      const uid = sessionStorage.getItem("uid");
      if (!uid) {
        setToastMsg("세션이 만료되었습니다. 다시 로그인해주세요");
        setTimeout(() => navigate("/admin/login"), 2000);
        return;
      }

      // ✅ 작성 모드일 때는 이미지 필수 체크 (방어로직입니다)
      if (!editingData && !image) {
        setToastMsg("이미지를 등록해주세요.");
        return;
      }

      console.log("=== LostPost 요청 직전 ===");
      console.log("uid:", uid);
      console.log("title:", title);
      console.log("content:", content);
      console.log("location:", locationText);
      console.log("image:", image);

      // FormData 구성
      const formData = new FormData();
      formData.append("uid", uid);
      formData.append("category", "LostItem"); // ✅ 카테고리 고정
      formData.append("title", title);
      formData.append("content", content);
      formData.append("location", locationText);
      if (image) {
        formData.append("image", image); // ✅ 새 파일이 있을 때만 전송
      }

      // 수정 모드 vs 신규 작성
      if (editingData) {
        const res = await updateLostPost(editingData.id, formData);
        setToastMsg(res.message || "분실물이 수정되었습니다");
        console.log("수정할 데이터:", { title, content, locationText, image });
      } else {
        const res = await createLostPost(formData);
        setToastMsg(res.message || "분실물이 등록되었습니다");
      }

      // 성공 시 2.5초 후 목록으로 이동
      setTimeout(() => navigate("/admin/festa"), 2500);
    } catch (err) {
      console.error("에러 전체:", err);

      let msg = "다시 한 번 시도해주세요";

      // 서버에서 내려주는 에러 메시지 처리
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

      // 세션 관련 에러일 경우 → 로그인 페이지로 이동
      if (
        msg.includes("세션") ||
        msg.includes("UID") ||
        msg.includes("로그인") ||
        err.response?.status === 401
      ) {
        // setTimeout(() => navigate("/admin/login"), 2000);
      }
    }
  };

  /* ---- 이미지 업로드 시 미리보기 갱신 ---- */
  const handleImageChange = (file) => {
    setImage(file);
    setPreviewImage(URL.createObjectURL(file)); // 새 파일 업로드 시 기존 미리보기 교체
  };

  /* ---- 버튼 비활성화 조건 ----
     1) 제목, 내용, 위치가 비어있으면 비활성화
     2) 작성 모드: 이미지 필수 (지금은 이미지 필수 조건으로 설정)
     3) 수정 모드: 기존 데이터와 모두 동일하고 새 이미지도 없으면 비활성화
  */
  // 버튼 비활성화 조건
  const isDisabled = editingData
    ? (
        // ✅ 수정 모드
        title.trim() === editingData.title &&
        content.trim() === editingData.content &&
        locationText.trim() === (editingData.location || "") &&
        !image // 기존 값과 동일 + 새 이미지 없음 → 비활성화
      )
    : (
        // ✅ 작성 모드
        !title.trim() ||
        !content.trim() ||
        !locationText.trim() ||
        !image // 작성할 때는 이미지 필수
      );


  return (
    <div className="flex flex-col justify-between w-full h-full px-4 py-8 gap-4 mx-auto">
      {/* 제목 / 내용 입력 */}
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

      {/* 이미지 업로드 */}
      <div className="flex flex-col items-center w-full h-full mx-auto gap-4">
        <AdminTitle text="분실물 사진 추가" />
        {/* 기존 이미지 or 새로 업로드한 이미지 미리보기 */}
        {previewImage && (
          <img
            src={previewImage}
            alt="분실물 이미지"
            className="w-40 h-40 object-cover rounded-lg mb-2"
          />
        )}
        <PhotoUpload onChange={handleImageChange} />
      </div>

      {/* 발견 위치 입력 */}
      <div className="flex flex-col items-center w-full h-full mx-auto gap-4">
        <AdminTitle text="분실물 발견 위치" />
        <PostInput
          placeholder="분실물이 발견된 위치를 입력하세요"
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
        />
      </div>

      {/* 제출 버튼 */}
      <Submitbtn
        text={editingData ? "수정하기" : "등록하기"}
        onClick={handleSubmit}
        disabled={isDisabled}
        // ✅ 이미지(image)는 선택사항이면 위 isDisabled 조건에서 !image 제거
      />

      {/* 토스트 메시지 */}
      {toastMsg && (
        <ToastMessage text={toastMsg} onClose={() => setToastMsg("")} />
      )}
    </div>
  );
}

export default LostPost;
