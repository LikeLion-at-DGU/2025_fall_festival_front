import axios from "axios";

const api = axios.create({
  baseURL: `/api/common/translations`,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export default api;
