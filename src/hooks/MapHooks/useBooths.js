import { useEffect, useState } from "react";  // ✅ useState 추가
import axios from "axios";

function useBooths(selectedFilter, userLocation = null, isNightToggle = null, selectedDate=null) {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooths = async () => {
      setLoading(true);

      try {
        // 기본: 현재 시간 기준
        const now = new Date();
        const autoIsNight = now.getHours() >= 18 || now.getHours() < 6;

        // 토글값이 있으면 우선 반영
        const isNight = isNightToggle !== null ? isNightToggle : autoIsNight;
        const baseURL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

        const response = await axios.post(
          `${baseURL}/booths/list/`,
          {
            types: [selectedFilter],
            limit: 50,
            ordering: "distance",

            ...(selectedFilter === "Booth" && { is_night: isNight }),

            ...(selectedFilter !== "Toilet" && {
              user_location: userLocation
                ? { x: userLocation.x, y: userLocation.y }
                : null,
            }),
             ...(selectedDate && { date: selectedDate }), 
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const results = response.data.results || response.data.booths || [];
        //  날짜 필터링 추가
     const filtered = selectedDate
  ? results.filter((booth) => {
      if (booth.category === "Booth") {
        return booth.business_days?.some((d) => {
          const boothDate = new Date(d.day).toISOString().split("T")[0];
          return boothDate === selectedDate;
        });
      }
      // 🚀 Booth가 아닌 건 무조건 그대로 보여줌
      return true;
    })
  : results;



        setBooths(filtered);
      } catch (err) {
        console.error("부스 조회 실패:", err);
        setError(err);
        setBooths([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooths();
  }, [selectedFilter, userLocation, isNightToggle, selectedDate]);

  return { booths, loading, error };
}

export default useBooths;
