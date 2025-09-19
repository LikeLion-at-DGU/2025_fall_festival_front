import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 긴급공지 조회 API
export const getEmergencyNotice = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/board/emergency`);
    return response.data;
  } catch (error) {
    console.error("긴급공지 조회 실패:", error);
    throw error;
  }
};

// 부스 랭킹 조회 API (좋아요 많은 상위 3개)
export const getBoothRanking = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/booths/list/`, {
      top_liked_3: true,
      types: ["Booth"],
      ordering: "-likes",
    });
    return response.data;
  } catch (error) {
    console.error("부스 랭킹 조회 실패:", error);
    throw error;
  }
};

// 이벤트 진행 부스 조회 API (이벤트 중인 부스 최신순 5개)
export const getEventBooths = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/booths/list/`, {
      types: ["Booth"],
      ordering: "-id",
      limit: 5,
    });
    const eventBooths = response.data.results.filter((booth) => booth.is_event);
    return { results: eventBooths };
  } catch (error) {
    console.error("이벤트 진행 부스 조회 실패:", error);
    throw error;
  }
};

// 부스 좋아요 토글 API
export const toggleBoothLike = async (boothId) => {
  try {
    const response = await axios.post(`${BASE_URL}/booths/${boothId}/likes`);
    return response.data;
  } catch (error) {
    console.error("부스 좋아요 토글 실패:", error);
    throw error;
  }
};
