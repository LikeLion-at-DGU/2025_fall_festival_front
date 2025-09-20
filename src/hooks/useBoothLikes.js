import { useState, useEffect } from "react";
import axios from "axios";

const useBoothLikes = (boothId, initialIsLiked = false, initialLikesCount = 0) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 처음 마운트될 때 로컬스토리지 값 반영
  useEffect(() => {
    if (!boothId) return;

    const likedBooths = JSON.parse(localStorage.getItem("likedBooths") || "[]");
    const isBoothLiked = likedBooths.includes(boothId.toString());
    if (isBoothLiked) setIsLiked(true);

    const likedCounts = JSON.parse(localStorage.getItem("likedCounts") || "{}");
    const savedCount = likedCounts[boothId.toString()];
    if (savedCount !== undefined) {
      setLikesCount(savedCount);
    }
  }, [boothId]);

  // 좋아요 토글 (서버 + 로컬스토리지 반영)
  const toggleLike = async (e) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (!boothId || loading) return;

    setLoading(true);
    setError(null);

    try {
      // 서버에 POST 요청
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/booths/${boothId}/likes/`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );

      // 서버 응답 구조에 맞게 수정하세요!
      const newIsLiked = response.data.is_liked;
      const newLikesCount = response.data.likes_count;

      setIsLiked(newIsLiked);
      setLikesCount(newLikesCount);

      // 로컬스토리지 업데이트
      const likedBooths = JSON.parse(localStorage.getItem("likedBooths") || "[]");
      const likedCounts = JSON.parse(localStorage.getItem("likedCounts") || "{}");

      if (newIsLiked) {
        if (!likedBooths.includes(boothId.toString())) {
          likedBooths.push(boothId.toString());
        }
      } else {
        const index = likedBooths.indexOf(boothId.toString());
        if (index > -1) likedBooths.splice(index, 1);
      }

      likedCounts[boothId.toString()] = newLikesCount;

      localStorage.setItem("likedBooths", JSON.stringify(likedBooths));
      localStorage.setItem("likedCounts", JSON.stringify(likedCounts));

      // 이벤트 발송 (다른 컴포넌트들도 동기화)
      const event = new CustomEvent("boothLikeChanged", {
        detail: {
          boothId: boothId.toString(),
          isLiked: newIsLiked,
          likesCount: newLikesCount,
        },
      });
      window.dispatchEvent(event);
    } catch (err) {
      console.error("좋아요 업데이트 실패:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { isLiked, likesCount, toggleLike, loading, error };
};

export default useBoothLikes;
