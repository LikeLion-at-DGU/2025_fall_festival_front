import { useState } from "react";
import axios from "axios";

const useLikes = (boothId, initialLiked, initialCount = 0) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/booths/${boothId}/likes/`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );

      setIsLiked(response.data.is_liked);
      setLikesCount(response.data.likes_count);
    } catch (err) {
      setError(err);
      console.error("좋아요 업데이트 실패", err);
    } finally {
      setLoading(false);
    }
  };

  return { isLiked, likesCount, toggleLike, loading, error };
};

export default useLikes;
