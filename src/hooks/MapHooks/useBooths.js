import { useEffect, useState } from "react";
import axios from "axios";

function useBooths(selectedFilter, userLocation = null) {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedFilter) return;

    setLoading(true);

    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const isNight = now.getHours() >= 18 || now.getHours() < 6;

    const baseURL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    const handleResponse = (res) => {
      const results =
        res.data.results || res.data.booths || []; // 통합 처리

      const filtered = results.filter((b) => {
        if (b.category === "Booth") {
          return isNight ? b.is_night : !b.is_night;
        }
        return true;
      });

      setBooths(filtered);
    };

    if (userLocation && (selectedFilter === "Store" || selectedFilter === "Drink")) {
      axios
        .post(
          `${baseURL}/booths/nearby/`,
          {
            user_location: userLocation,
            date,
            category: selectedFilter,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(handleResponse)
        .catch((err) => {
          console.error("API 호출 실패:", err);
          setError(err);
          setBooths([]);
        })
        .finally(() => setLoading(false));
    } else {
      const params = new URLSearchParams();
      params.append("category", selectedFilter);

      axios
        .get(`${baseURL}/booths/?${params.toString()}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then(handleResponse)
        .catch((err) => {
          console.error("API 호출 실패:", err);
          setError(err);
          setBooths([]);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedFilter, userLocation]);

  return { booths, loading, error };
}

export default useBooths;
