import { useEffect, useState } from "react";
import axios from "axios";

// 전체 부스 리스트를 한 번만 가져오는 훅
function useBooths(selectedFilter) {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedFilter) return;

    setLoading(true);

     axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/booths/list/`,
      { category: [selectedFilter] }, // 현재 선택된 필터만 보내기
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
  }, [selectedFilter]); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행

  return { booths, loading, error };
}

export default useBooths;
