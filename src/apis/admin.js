import instance from "./instance";

//--------관리자 코드를 post하여 로그인 함수를 구현합니다.--------//

export async function adminLogin(data) {
  const res = await instance.post("/admin/login", data);
  return res.data;
  // { message: "로그인 성공",
  //  uid: "...",
  //  role: "총학 | 동아리(부스) | 학과(부스)" }
}
