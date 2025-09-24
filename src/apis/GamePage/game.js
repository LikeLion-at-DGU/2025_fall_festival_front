import instance from "../instance";

const BASE_URL = "/api";

export async function postStartGame(data) {
  const res = await instance.post(`${VITE_API_BASE_URL}/game/games/start/`, data);
  return res.data;
}

export async function postSuccessGame(data) {
  const res = await instance.post(`${VITE_API_BASE_URL}/game/games/success/`, data);
  return res.data;
}

export async function postSuccessCountGame(data) {
  const res = await instance.post(`${VITE_API_BASE_URL}/game/games/successcount/`, data);
  return res.data;
}

export async function postGameCoupon(data) {
  const res = await instance.post(`${VITE_API_BASE_URL}/game/games/coupon/`, data);
  return res.data;
}