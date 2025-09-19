import { useState, useEffect } from "react";

const useBoothLikes = (boothId, initialLikesCount) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!boothId) return;

    const loadLikesState = () => {
      const likedBooths = JSON.parse(
        localStorage.getItem("likedBooths") || "[]"
      );
      const isBoothLiked = likedBooths.includes(boothId.toString());
      setIsLiked(isBoothLiked);

      const likedCounts = JSON.parse(
        localStorage.getItem("likedCounts") || "{}"
      );
      const savedCount = likedCounts[boothId.toString()];
      if (savedCount !== undefined) {
        setLikesCount(savedCount);
      }
    };

    loadLikesState();

    const handleBoothLikeChanged = (event) => {
      if (event.detail.boothId === boothId.toString()) {
        setIsLiked(event.detail.isLiked);
        setLikesCount(event.detail.likesCount);
      }
    };

    window.addEventListener("boothLikeChanged", handleBoothLikeChanged);

    return () => {
      window.removeEventListener("boothLikeChanged", handleBoothLikeChanged);
    };
  }, [boothId]);

  // 좋아요 토글 함수 (로컬스토리지 기반)
  const toggleLike = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    if (loading || !boothId) return;

    setLoading(true);

    try {
      const likedBooths = JSON.parse(
        localStorage.getItem("likedBooths") || "[]"
      );
      const isCurrentlyLiked = likedBooths.includes(boothId.toString());
      const newIsLiked = !isCurrentlyLiked;

      setIsLiked(newIsLiked);
      const newLikesCount = newIsLiked
        ? likesCount + 1
        : Math.max(0, likesCount - 1);
      setLikesCount(newLikesCount);

      if (newIsLiked) {
        /* 좋아요 추가 */
        if (!likedBooths.includes(boothId.toString())) {
          likedBooths.push(boothId.toString());
        }
      } else {
        /* 좋아요 제거 */
        const index = likedBooths.indexOf(boothId.toString());
        if (index > -1) {
          likedBooths.splice(index, 1);
        }
      }

      const likedCounts = JSON.parse(
        localStorage.getItem("likedCounts") || "{}"
      );
      likedCounts[boothId.toString()] = newLikesCount;

      localStorage.setItem("likedBooths", JSON.stringify(likedBooths));
      localStorage.setItem("likedCounts", JSON.stringify(likedCounts));

      const event = new CustomEvent("boothLikeChanged", {
        detail: {
          boothId: boothId.toString(),
          isLiked: newIsLiked,
          likesCount: newLikesCount,
        },
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error("좋아요 토글 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLiked,
    likesCount,
    toggleLike,
    loading,
  };
};

export default useBoothLikes;
