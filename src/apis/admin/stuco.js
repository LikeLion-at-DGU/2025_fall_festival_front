import instance from "../instance";

// [총학] 페이지 기능

//--------일반공지 게시글을 post합니다.--------//

export async function createNormalPost(postData) {
  const uid = sessionStorage.getItem("uid");
  const role = sessionStorage.getItem("role");

  if (!uid) {
    throw new Error("로그인이 필요합니다."); // ⛔ toastMsg 변경 예정
  }
  if (role !== "Staff") {
    throw new Error("일반공지 작성 권한이 없습니다.");
  } 
  // ⛔ 접근 권한 체크: 메인페이지에서 넘어올 때, post 페이지>>둘 중 하나만 해야하나 고민 중. 수정 예정!

  const payload = {
    uid,
    category: "Notice",
    title: postData.title,
    content: postData.content,
  }

  const res = await instance.post("/board/notices", payload);
  return res.data;
}
