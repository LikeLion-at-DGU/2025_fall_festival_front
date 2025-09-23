import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";
import imageCompression from "browser-image-compression";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import PhotoUpload from "../../components/AdminComponents/Admin/PhotoUpload";
import ToastMessage from "../../components/AdminComponents/ToastMessage";
import { createLostPost, updateLostPost } from "../../apis/admin/festa";

/* ------- 분실물을 게시합니다/(POST) -------- */
/*
 ### 접근권한
 * 접근 : 축제관리자 [축기단, 총학 UID]
 * 작성 허용 : role = Staff || Stuco
 * 접근 거부 트리거 : "POST 시도 시" 인증 만료 여부 판단 및 로그인 리다이렉트

 ### POST 조건
 * 전 필드 input (이미지 제외)
 * submitBtn 활성화
 */

function LostPost() {
  const navigate = usePrefixedNavigate();
  const location = useLocation();
  const editingData = location.state; // ✅ 수정 모드일 경우 전달받은 데이터

  // 상태 관리
  const [title, setTitle] = useState(editingData?.title || "");
  const [content, setContent] = useState(editingData?.content || "");
  const [locationText, setLocationText] = useState(editingData?.location || "");
  const [image, setImage] = useState(null); // 새로 업로드할 파일
  const [previewImage, setPreviewImage] = useState(editingData?.image || null); // 기존 이미지 or 새로 업로드한 이미지 미리보기
  const [toastMsg, setToastMsg] = useState("");

  /* ---- 접근 시 바로 세션 체크 ---- */
  useEffect(() => {
    const uid = sessionStorage.getItem("uid");
    if (!uid) {
      setToastMsg("로그인이 필요합니다.");
      setTimeout(() => navigate("/admin/login"), 2000);
    }
  }, [navigate]);

  /* ---- 제출 로직: 분실물 게시글 작성/수정 ---- */
  const handleSubmit = async () => {
    try {
      const uid = sessionStorage.getItem("uid");
      if (!uid) {
        setToastMsg("세션이 만료되었습니다. \n 다시 로그인해주세요");
        setTimeout(() => navigate("/admin/login"), 2000);
        return;
      }

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
      } else {
        const res = await createLostPost(formData);
        setToastMsg(res.message || "분실물이 등록되었습니다");
      }

      // 성공 시 1초 후 목록으로 이동
      setTimeout(() => navigate("/admin/festa"), 1000);
    } catch (err) {
      console.error("에러 전체:", err);
      console.error("uid_valid:", err.uid_valid);      

      // uid 만료 판별 → 자동 로그아웃 안내(toastMsg) + 로그인 페이지로 이동
      if (err.uid_valid === false) {
        setToastMsg("세션이 만료되었습니다. \n 다시 로그인해주세요");
        setTimeout(() => {
          navigate("/admin/login");
        }, 1500);
        return;
      }// ⚠️ 여기서 빠져나오는 로직! 

      let msg = null;
      const data = err
      const errorMessageMap = {
        title: "제목은 200자 이내여야 합니다.",
        location: "위치는 200자 이내여야 합니다.",
        content: "내용을 입력해주세요.",
        image: "1MB 이하의 이미지만 첨부 가능합니다."
      };

      if (data) {
        // 1) 필드별 제약 조건 체크
        for (const field of Object.keys(errorMessageMap)) {
          if (data[field]) {
            msg = errorMessageMap[field]; // 커스텀 메시지
            break; // 첫 번째 발견된 필드 에러만 처리
          }
        }
        // 2) 공통 메시지 처리
        if (!msg) {
          msg = data.message || data.error || data.detail;
        }
      }

        // 3) fallback 메시지
        if (!msg) {
          msg = "알 수 없는 오류가 발생했습니다. \n 잠시 후 다시 시도해주세요.";
        }

        setToastMsg(msg);

        // 4) 세션 관련 키워드일 경우 → 로그인 페이지 이동
        if (
          msg.includes("세션") ||
          msg.includes("UID") ||
          msg.includes("로그인") ||
          err.response?.status === 401
        ) {
          setTimeout(() => navigate("/admin/login"), 2000);
      }
    }

  };

  /* ---- 이미지 업로드 시 미리보기 갱신 ---- */
  const handleImageChange = async (file) => {
    try {
    const options = {
      maxSizeMB: 1,            // 1MB 이하
      maxWidthOrHeight: 1024,  // 최대 가로/세로 1024px
      useWebWorker: true,
    };

    // 압축 실행
    const compressedFile = await imageCompression(file, options);
    if (compressedFile.size > 1024 * 1024) {
      setToastMsg("이미지는 1MB 이하로 압축된 파일만 업로드 가능합니다.");
      return;
    }

    // 원본 확장자 유지
    const ext = file.name.split(".").pop(); // jpg, png 등
    const newFile = new File([compressedFile], `compressed.${ext}`, {
      type: file.type,
    });
    
    // ⛔ 삭제 예정
    console.log("압축 전:", (file.size / 1024 / 1024).toFixed(2), "MB");
    console.log("압축 후:", (compressedFile.size / 1024 / 1024).toFixed(2), "MB");
    
    // 상태 반영 (압축된 파일 저장)
    setImage(newFile); // ✅ 서버로 보낼 파일은 확장자 포함된 newFile
    setPreviewImage(URL.createObjectURL(newFile));
  } catch (error) {
    console.error("이미지 압축 실패:", error);
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  }
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
        !locationText.trim()
        //!image // 작성할 때는 이미지 필수
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
            className="w-full h-40 object-cover rounded-lg mb-2"
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
        className="mt-auto"
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
