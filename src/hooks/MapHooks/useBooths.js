import { useEffect, useState } from "react";
import axios from "axios";

function useBooths(selectedFilter, userLocation = null) {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 위치 없으면 요청 안 보냄

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
            types: [selectedFilter],
            limit: 50,
            ordering: "distance",

            // 🚀 Booth일 때만 is_night 추가
            ...(selectedFilter === "Booth" && { is_night: isNight }),

            // 🚀 Toilet 아닐 때만 user_location 추가
            ...(selectedFilter !== "toilet" && {
              user_location: userLocation
                ? { x: userLocation.x, y: userLocation.y }
                : null,
            }),
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
