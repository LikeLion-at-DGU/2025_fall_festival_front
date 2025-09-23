import instance from "../instance";

// [총학,축기단] 페이지 기능

//-------- 일반공지 게시글을 post합니다. --------//
export async function createNormalPost(postData) {
  const uid = sessionStorage.getItem("uid");
  const role = sessionStorage.getItem("role");

  // ⛔ 폐기 예정 ⛔ uid는 늘 존재함
  //if (!uid) {
    //throw new Error("로그인이 필요합니다."); // ⛔ toastMsg 변경 예정
  //}
  if (role !== "Staff" && role !== "Stuco") {
    throw new Error("일반공지 작성 권한이 없습니다.");
  }

  const payload = {
    uid,
    category: "Notice",
    title: postData.title,
    content: postData.content,
  };

  const res = await instance.post("/board/notices", payload);

  // uid 유효성 체크
  //if (res.data?.uid_valid === false) {
  //  throw { uidExpired: true, message: res.data.message || "만료된 UID 입니다." };
  //}

  return res.data;
}

//-------- 분실물 게시글을 post합니다. --------//
export async function createLostPost(formData) {
  try {
    const res = await instance.post("/board/losts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

  // uid 유효성 체크
  //if (res.data?.uid_valid === false) {
  //  throw { uidExpired: true, message: res.data.message || "만료된 UID 입니다." };
  //}

    return res.data;
  } catch (err) {
    throw err.response?.data || err; //?
  }
}

//-------- 긴급공지 patch --------//
export async function patchEmergencyNotice(data) {
  try {
    // id 빼고 그냥 /board/emergency 로 PATCH
    const res = await instance.patch(`/board/emergency`, data);
    return res.data; 
  } catch (err) {
    throw err.response?.data || { error: "알 수 없는 오류" };
  }
}

//-------- ⛔폐기예정⛔ 가장 최근 긴급공지 get --------//
export async function getEmergencyNotices() {
  try {
    const res = await instance.get(`/board/${id}`);
    return res.data; // ✅ 반드시 res.data 반환
  } catch (err) {
    throw err.response?.data || { error: "알 수 없는 오류" };
  }
}

// -------- 긴급공지 GET -------- //
export async function getEmergencyNotice() {
  try {
    const res = await instance.get("/board/emergency");
    return res.data.notice; // ✅ response 안의 notice 객체만 반환
  } catch (err) {
    throw err.response?.data || { error: "알 수 없는 오류" };
  }
}

// ⛔폐기예정⛔ 긴급공지 GET - id 직접 지정
export async function getEmergencyNoticeById(id = 1) {
  try {
    const res = await instance.get(`/board/${id}`);
    return res.data; // { board_id, board_title, board_content, ... }
  } catch (err) {
    throw err.response?.data || { error: "알 수 없는 오류" };
  }
}

//-------- 본인이 작성한 공지글 get --------//
export async function getUnionNotices() {
  const res = await instance.get("/board/notices");
  const name = sessionStorage.getItem("name");
  
  return res.data.filter(
    (item) => item.writer === name && item.is_emergency !== true
  );
  //return res.data.filter(
  //  (item) => item.writer === name && item.id !== 143 // id=143은 제외 >> 추천x 임시용입니다
  //);
}

export async function getUnionLosts() {
  const res = await instance.get("/board/losts");
  console.log("📡 getUnionLosts 응답:", res.data);
  const name = sessionStorage.getItem("name");
  return (res.data.results || res.data).filter((item) => item.writer === name);
} // 두 경우 커버로 일단 설정해둠 (필요하면 getUnionNotices도 수정)


//-------- 공지글 상세페이지 get --------//
export async function getBoardDetail(boardId) {
  console.log("📡 getBoardDetail 호출됨:", boardId);
  const res = await instance.get(`/board/${boardId}`);
  console.log("📡 서버 응답:", res.data);
  return res.data;
}

// -------- 일반공지 수정 -------- //
export async function updateNormalPost(boardId, postData) {
  const uid = sessionStorage.getItem("uid");

  const payload = {
    uid,
    category: "Notice",
    title: postData.title,
    content: postData.content,
  };

  const res = await instance.patch(`/board/notices/${boardId}`, payload);
  return res.data;
}

// -------- 분실물 수정 -------- //
export async function updateLostPost(boardId, formData) {
  formData.append("uid", sessionStorage.getItem("uid"));
  if (!formData.get("category")) {
    formData.append("category", "LostItem"); // ✅ 안정화
  }

  const res = await instance.patch(`/board/losts/${boardId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

//-------- 게시글 삭제 --------//
export async function deleteBoard(board_id) {
  try {
    const res = await instance.delete(`/board/${board_id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "알 수 없는 오류" };
  }
}
