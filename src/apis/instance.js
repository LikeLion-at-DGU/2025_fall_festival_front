import axios from "axios";

const instance = axios.create({
    baseURL: "/api", 
  withCredentials: true, // 현재 세션/쿠키 로그인 방식이라서 작성.(백이랑 UID 논의 후 다시 확인 예정)
});

export default instance;
