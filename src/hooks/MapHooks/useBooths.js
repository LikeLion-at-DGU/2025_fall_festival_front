import { useEffect, useState } from "react";
import axios from "axios";

function useBooths(selectedFilter, userLocation = null) {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 위치 없으면 요청 안 보냄
    if (!userLocation) return;

    const fetchBooths = async () => {
      setLoading(true);

      try {
        const now = new Date();
        const isNight = now.getHours() >= 18 || now.getHours() < 6;

        const baseURL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

        const response = await axios.post(
          `${baseURL}/booths/list/`,
          {
            // 🔹 백엔드에서 types로 필터
            types: [selectedFilter],
            // 🔹 사용자 위치 전달 (distance_m 계산용)
            user_location: {
              x: userLocation.x,
              y: userLocation.y,
            },
            // 🔹 필요하다면 야간 여부도 같이 전달
            isNight: isNight,
            // 🔹 갯수 제한 (필요 없으면 제거 가능)
            limit: 50,
            ordering: "distance",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const results = response.data.results || response.data.booths || [];
        setBooths(results);
      } catch (err) {
        console.error("부스 조회 실패:", err);
        setError(err);
        setBooths([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooths();
  }, [selectedFilter, userLocation]);

  return { booths, loading, error };
}

export default useBooths;
