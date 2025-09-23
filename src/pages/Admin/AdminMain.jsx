import React, { useState, useEffect } from "react";
import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";

import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import NoticeBox from "../../components/AdminComponents/Admin/NoticeBox";
import NoticeSearch from "../../components/AdminComponents/Admin/NoticeSearch";
import ToastMessage from "../../components/AdminComponents/ToastMessage";

import {
  patchEmergencyNotice,
  getEmergencyNotice,
  getEmergencyNoticeById,
  getEmergencyNotices, // ✅ 최신 긴급공지 가져오기 추가
  getUnionNotices,
  getUnionLosts,
} from "../../apis/admin/festa";

function AdminMain() {
  const navigate = usePrefixedNavigate();

  // 게시글 목록 (공지 + 분실물)
  const [notices, setNotices] = useState([]);
  // 긴급공지 입력 필드 값
  const [notice, setNotice] = useState("");
  // 입력 필드가 수정되었는지 여부 → 버튼 활성화 제어
  const [isEdited, setIsEdited] = useState(false);
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 토스트 메시지 상태
  const [toast, setToast] = useState(null);

  const bigWrapperClass =
    "flex flex-col justify-between w-full px-4 py-8 mx-auto gap-6";
  const wrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-4";
  const noticeWrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-0";
  const postWrapperClass = "flex flex-col items-center w-full h-[30vh] mx-auto gap-2 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";
  const bottomWrapperClass = "flex flex-col w-full";
  

  // ✅ 게시글 및 긴급공지 불러오기
  useEffect(() => {
    const fetchEmergency = async () => {
      try {
        const emergency = await getEmergencyNotice();
        if (emergency) {
          setNotice(emergency.title); // title을 바로 반영
        } else {
          setNotice(""); // 긴급 공지가 없으면 빈칸
        }
      } catch (err) {
        console.error("긴급공지 불러오기 실패:", err);
        setNotice("");
      }
    };

    const fetchPosts = async () => {
      try {
        const [noticeList, lostList] = await Promise.all([
          getUnionNotices(),
          getUnionLosts(),
        ]);

        // 두 배열 합치고
        const combined = [...noticeList, ...lostList];

        // 최신순 정렬 (created_at 기준)
        combined.sort((a, b) => b.id - a.id);

        setNotices(combined);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    };

    fetchEmergency();
    fetchPosts();
  }, []);

  

  // 검색 기능
  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
  };
  const filteredNotices = notices.filter((n) =>
    n.title.includes(searchTerm)
  );

  // 제출 로직: 긴급 공지 수정 field의 수정 사항 반영
  const handlePatchEvent = async () => {
    try {
      const result = await patchEmergencyNotice(143, {
        title: notice,
        content: notice,
      });

      setToast(result.message);

      // 🔥 PATCH 후 최신 긴급공지 다시 불러오기
      const updated = await getEmergencyNotice();
      if (updated) setNotice(updated.title);

      setIsEdited(false);
    } catch (err) {
      setToast(err.error || "수정 실패");
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
    if (role !== "Staff" && role !== "Stuco") {
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
    if (role !== "Staff" && role !== "Stuco") {
      alert("공지 추가 권한이 없습니다.");
      return;
    }
    navigate("notice/normal");
  };

  return (
    <div className={bigWrapperClass}>
      {/* 긴급공지 */}
      <div className={wrapperClass}>
        <AdminTitle text="긴급 공지" />

        <div className={noticeWrapperClass} style={{ position: "relative" }}>
          <PostInput
            placeholder="긴급하게 올릴 공지를 입력해주세요"
            value={notice}
            onChange={(e) => {
              setNotice(e.target.value);
              setIsEdited(true); // 입력값이 변경되면 버튼 활성화
            }}
          />

          {/* X 버튼: 필드 내부 오른쪽 */}
          {notice && (
            <button
              type="button"
              onClick={() => {
                setNotice("");
                setIsEdited(true); // 지워도 수정된 걸로 인식
              }}
              className="absolute right-[20px] top-[25px] -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}

          <Submitbtn
            text="긴급 공지 수정하기"
            onClick={handlePatchEvent}
            disabled={!isEdited || !notice.trim()} // 값 없거나 수정 안 됐으면 비활성화
          />
        </div>
      </div>


      {/* 게시글 목록 */}
      <div className={wrapperClass}>
        <AdminTitle text="게시글 목록" />
        <NoticeSearch onSearch={handleSearch} />
        <div className={postWrapperClass}>
          

          
          {filteredNotices.length > 0 ? (
            filteredNotices.map((n) => (
              <NoticeBox
                key={n.id}
                id={n.id}
                category={n.category}
                title={n.title}
                writer={n.writer}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400 mt-2">검색 결과가 없습니다.</p>
          )}
        </div>

        <div className={bottomWrapperClass}>
          <Submitbtn text="분실물 공지 추가하기" onClick={handleAddLostItem} className="mt-2"/>
          <Submitbtn text="일반 공지 추가하기" onClick={handleAddNotice} />
        </div>
      </div>

      {toast && (
        <ToastMessage
          text={toast}
          onClose={() => setToast(null)} // 닫히면 상태 초기화
        />
      )}
    </div>
  );
}

export default AdminMain;
