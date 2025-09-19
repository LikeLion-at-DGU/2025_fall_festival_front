import instance from "../instance";

// [총학] 페이지 기능

//-------- 일반공지 게시글을 post합니다. --------//

export async function createNormalPost(postData) {
  const uid = sessionStorage.getItem("uid");
  const role = sessionStorage.getItem("role");

  if (!uid) {
    throw new Error("로그인이 필요합니다."); // ⛔ toastMsg 변경 예정
  }
  if (role !== "Staff") {
    throw new Error("일반공지 작성 권한이 없습니다.");
  } 
  
  // ⛔ 접근 권한 체크: 메인페이지에서 넘어올 때, post 페이지>>둘 중 하나만 해야하나->수정 예정

  const payload = {
    uid,
    category: "Notice",
    title: postData.title,
    content: postData.content,
    //writer: sessionStorage.getItem("role") === "Staff" ? "총학" : sessionStorage.getItem("name"),
  }

  const res = await instance.post("/board/notices", payload);
  return res.data;
}

//-------- 분실물 게시글을 post합니다. --------//

export async function createLostPost(formData) {
  try {
    const res = await instance.post("/board/losts", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 업로드 시 필요
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

//-------- 긴급공지 patch --------//

export async function patchEmergencyNotice(id, data) {
  try {
    const res = await instance.patch(`/board/${id}`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "알 수 없는 오류" };
  }
}

//-------- 가장 최근 긴급공지 get --------//

export async function getEmergencyNotices() {
  try {
    const res = await instance.get("/board?type=emergency");
    return res.data; // 배열 형태 [{id, title, content, created_at}, ...]
  } catch (err) {
    throw err.response?.data || { error: "알 수 없는 오류" };
  }
}

//-------- 본인이 작성한 공지글 get --------//

// 일반공지 조회
export async function getUnionNotices() {
  const res = await instance.get("/board/notices");
  const name = sessionStorage.getItem("name");  // 로그인 시 저장한 이름
  return res.data.results.filter((item) => item.writer === name);
}

// 분실물 조회
export async function getUnionLosts() {
  const res = await instance.get("/board/losts");
  const name = sessionStorage.getItem("name");
  return res.data.results.filter((item) => item.writer === name);
}

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
  const uid = sessionStorage.getItem("uid");
  formData.append("uid", uid);

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
