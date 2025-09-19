import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import NoticeBox from "../../components/AdminComponents/Admin/NoticeBox";
import NoticeSearch from "../../components/AdminComponents/Admin/NoticeSearch";

import { patchEmergencyNotice, getUnionNotices, getUnionLosts } from "../../apis/admin/stuco";


function AdminMain() {

  const navigate = useNavigate();

  // ⛔ 더미
  const [notices, setNotices] = useState([
  { id: 1, title: "중요 공지입니다 !!!!!", writer: "총학" },
  { id: 2, title: "분실물 공지 안내", writer: "총학" },
  { id: 3, title: "축제 일정 변경", writer: "총학" },
  { id: 4, title: "일반 공지입니다", writer: "총학" },
]);

  const [notice, setNotice] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const bigWrapperClass = "flex flex-col justify-between w-full px-4 py-8 mx-auto gap-6";
  const wrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-4";
  const middleWrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-3";
  const smallWrapperClass = "flex flex-col items-center w-full h-full mx-auto gap-1";
  const bottomWrapperClass = "flex flex-col w-full";

  // 게시글 불러오기
  useEffect(() => {
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
      const result = await patchEmergencyNotice(1, { // id는 상황에 맞게
        title: "긴급 공지",
        content: notice,
      });

      alert(result.message);
      setIsEdited(false);
    } catch (err) {
      alert(err.error || "수정 실패");
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

        <PostInput
          placeholder="긴급하게 올릴 공지를 입력해주세요"
          value={notice}
          onChange={(e) => {
            setNotice(e.target.value);
            setIsEdited(true);
          }}
          
        />
        <Submitbtn
          text="긴급 공지 수정하기"
          onClick={handlePatchEvent}
          disabled={!isEdited || !notice.trim()}
          className="mt-0"
        />
      </div>
      
      {/* 게시글 목록 */}
      <div className={wrapperClass}>
        <AdminTitle text="게시글 목록" />
        <div className={smallWrapperClass}>
          <NoticeSearch onSearch={handleSearch} />

          {filteredNotices.length > 0 ? (
            filteredNotices.map((n) => (
              <NoticeBox 
                key={n.id} 
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
          <Submitbtn text="분실물 추가하기" onClick={handleAddLostItem} />
          <Submitbtn text="공지 추가하기" onClick={handleAddNotice} />
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
