import { useEffect, useState } from "react";
import axios from "axios";

// 전체 부스 리스트를 가져오는 훅 (사용자 위치 포함)
function useBooths(selectedFilter, userLocation = null) {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedFilter) return;

    setLoading(true);

    // 현재 날짜와 시간 정보 생성
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    const isNight = now.getHours() >= 18 || now.getHours() < 6; // 18시 이후 또는 6시 이전이면 밤

    if (userLocation && (selectedFilter === "Store" || selectedFilter === "Drink")) {
      // 사용자 위치가 있고 편의점/주류 카테고리일 때만 nearby API 사용
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/booths/nearby/`,
        {
          user_location: userLocation,
          date: date,
          is_night: isNight,
          category: selectedFilter
        },
        { headers: { "Content-Type": "application/json" } }
      )
        .then((res) => {
          console.log("nearby API 응답:", res.data); // 디버깅
          // 서버에서 이미 필터링된 데이터를 받으므로 그대로 사용
          const results = res.data.results || res.data;
          setBooths(Array.isArray(results) ? results : []);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // 사용자 위치가 없으면 기존 API 사용
      const params = new URLSearchParams();
      params.append('category', selectedFilter);

      axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/booths/?${params.toString()}`,
        { headers: { "Content-Type": "application/json" } }
      )
        .then((res) => {
          setBooths(res.data.results);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedFilter, userLocation]); // userLocation 의존성 추가

  return { booths, loading, error };
}

export default useBooths;
