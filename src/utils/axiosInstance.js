import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/common/translations`,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-Translation-Refresh": "true",
  },
});

export default api;
