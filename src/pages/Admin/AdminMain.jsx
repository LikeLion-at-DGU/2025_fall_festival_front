import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import NoticeBox from "../../components/AdminComponents/Admin/NoticeBox";
import NoticeSearch from "../../components/AdminComponents/Admin/NoticeSearch";
import ToastMessage from "../../components/AdminComponents/ToastMessage";

import {
  patchEmergencyNotice,
  getEmergencyNotice,
  getEmergencyNotices, // ✅ 최신 긴급공지 가져오기 추가
  getUnionNotices,
  getUnionLosts,
} from "../../apis/admin/festa";

function AdminMain() {
  const navigate = useNavigate();

  // ⛔ 더미 (초기 데이터) → useEffect에서 실제 API로 대체됨
  // 게시글 목록 (공지 + 분실물)
  const [notices, setNotices] = useState([
    { id: 1, title: "중요 공지입니다 !!!!!", writer: "총학" },
    { id: 2, title: "분실물 공지 안내", writer: "총학" },
    { id: 3, title: "축제 일정 변경", writer: "총학" },
    { id: 4, title: "일반 공지입니다", writer: "총학" },
  ]);

  // 긴급공지 입력 필드 값
  const [notice, setNotice] = useState("");

  // 입력 필드가 수정되었는지 여부 → 버튼 활성화 제어
  const [isEdited, setIsEdited] = useState(false);

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  
  // ✅ 토스트 메시지 상태
  const [toast, setToast] = useState(null);


  const bigWrapperClass =
    "flex flex-col justify-between w-full px-4 py-8 mx-auto gap-6";
  const wrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-4";
  const noticeWrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-0";
  const postWrapperClass = "flex flex-col items-center w-full h-[43vh] mx-auto gap-2.5 overflow-y-scroll";
  const bottomWrapperClass = "flex flex-col w-full";
  

  // ✅ 게시글 및 긴급공지 불러오기
  useEffect(() => {
    // (1) 최신 긴급공지 가져오기
    const fetchEmergency = async () => {
      try {
        const res = await getEmergencyNotice();
        console.log("📡 getEmergencyNotice 응답:", res.title);
        if (res && res.title) {
          setNotice(res.title); // 긴급공지 필드에 최신값 반영
        }
      } catch (err) {
        console.error("긴급공지 불러오기 실패:", err);
      }
    };

    // (2) 일반 공지 + 분실물 게시글 불러오기
    const fetchPosts = async () => {
      try {
        const [noticeList, lostList] = await Promise.all([
          getUnionNotices(),
          getUnionLosts(),
        ]);
        setNotices([...noticeList, ...lostList]);
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
    const uid = sessionStorage.getItem("uid");
    const role = sessionStorage.getItem("role");

    if (!uid) {
      alert("로그인이 필요합니다.");
      navigate("/admin/login");
      return;
    }
    if (role !== "Staff" && role !== "Stuco") {
      alert("공지 수정 권한이 없습니다.");
      return;
    }

    try {
      // PATCH 요청 → 서버에 수정 반영
      const result = await patchEmergencyNotice(1, {
        title: notice, // 입력 필드 값 전송
        content: notice, // 현재 title만 써서 content 비활성화 해도 되나, 안전장치로 걸어둠
      });

      setToast(result.message); 
      setIsEdited(false); // 버튼 비활성화
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
  
        <div className={noticeWrapperClass}>
        <PostInput
          placeholder="긴급하게 올릴 공지를 입력해주세요"
          value={notice}
          onChange={(e) => {
            setNotice(e.target.value);
            setIsEdited(true); // 입력값이 변경되면 버튼 활성화
          }}
        />
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
          <Submitbtn text="분실물 공지 추가하기" onClick={handleAddLostItem} />
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
