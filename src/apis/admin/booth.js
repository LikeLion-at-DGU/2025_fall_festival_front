import instance from "../instance";

// [부스관리자] 페이지 기능

//-------- 이벤트 게시글 post --------//

export async function createEvent(eventData) {
  const uid = sessionStorage.getItem("uid");
  const role = sessionStorage.getItem("role");

  if (role !== "Club" && role !== "Major") {
    throw new Error("이벤트 작성 권한이 없습니다.");
  } 
  // ⛔ 접근 권한 체크: 메인페이지에서 넘어올 때, post 페이지>>둘 중 하나만 해야하나 고민 중. 수정 예정!

  const payload = {
    uid,
    title: eventData.title,
    detail: eventData.detail,
    start_time: eventData.start_time,
    end_time: eventData.end_time,
  };

  const res = await instance.post("/board/events", payload);

  // uid 유효성 체크
  //if (res.data?.uid_valid === false) {
  //  throw { uidExpired: true, message: res.data.message || "만료된 UID 입니다." };
  //}

  return res.data;
}

//-------- 부스 이벤트 목록 조회 --------//

export async function getBoothEvents() {
  const res = await instance.get("/board/events");
  return res.data;
}

//-------- 부스 이벤트 상세 페이지 조회 --------//

export async function getBoothEventDetail(eventId) {
  const res = await instance.get(`/board/events/${eventId}`);
  return res.data;
}
