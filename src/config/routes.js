// 전역 라우트 prefix
// 배포 전에는 "/comingsoon", 오픈 후에는 "" 로만 바꿔주면 됨
export const BASE_PATH = "";

// 주요 경로를 상수화
export const ROUTES = {
  home: `${BASE_PATH}/`,
  map: `${BASE_PATH}/map`,
  board: `${BASE_PATH}/board`,
  adminLogin: `${BASE_PATH}/admin/login`,
  developers: `${BASE_PATH}/developers`,
};
