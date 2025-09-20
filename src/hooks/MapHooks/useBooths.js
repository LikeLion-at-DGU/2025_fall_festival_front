import { useEffect, useState } from "react";
import axios from "axios";

function useBooths(userLocation = null) {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const isNight = now.getHours() >= 18 || now.getHours() < 6;

    const baseURL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    axios
      .get(`${baseURL}/booths/`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const results = res.data.results || res.data.booths || [];
        const filtered = results.filter((b) => {
          if (b.category === "Booth") {
            return isNight ? b.is_night : !b.is_night;
          }
          return true;
        });
        setBooths(filtered);
      })
      .catch((err) => {
        console.error("API 호출 실패:", err);
        setError(err);
        setBooths([]);
      })
      .finally(() => setLoading(false));
  }, [userLocation]);

  return { booths, loading, error };
}

export default useBooths;
