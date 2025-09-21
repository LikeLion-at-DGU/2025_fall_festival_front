import { useState, useEffect } from "react";
import { toggleBoothLike } from "../apis/mainpage";

const useBoothLikes = (
  boothId,
  initialLikesCount = 0,
  initialIsLiked = false
) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 처음 마운트될 때 로컬스토리지 값 반영
  useEffect(() => {
    if (!boothId) return;

    const loadLikesState = () => {
      const likedBooths = JSON.parse(
        localStorage.getItem("likedBooths") || "[]"
      );
      const isBoothLiked = likedBooths.includes(boothId.toString());
      setIsLiked(isBoothLiked);
    };

    loadLikesState();

    const cleanupOldData = () => {
      if (localStorage.getItem("likedCounts")) {
        localStorage.removeItem("likedCounts");
      }
    };
    cleanupOldData();

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
  }, [boothId, initialIsLiked]);

  const toggleLike = async (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    if (loading || !boothId) return;

    setLoading(true);

    try {
      const isCurrentlyLiked = isLiked;
      const newIsLiked = !isCurrentlyLiked;

      // 낙관적 업데이트 (UI 먼저 업데이트)
      setIsLiked(newIsLiked);
      const newLikesCount = newIsLiked
        ? likesCount + 1
        : Math.max(0, likesCount - 1);
      setLikesCount(newLikesCount);

      const storedUserId = localStorage.getItem("booth_user_id");
      const userId = storedUserId || null;

      let response;
      try {
        response = await toggleBoothLike(boothId, userId);

        if (response && typeof response.likes_count === "number") {
          setLikesCount(response.likes_count);
          setIsLiked(response.is_liked);

          // 백엔드에서 받은 user_id를 저장 (Django 세션 키)
          if (response.user_id) {
            localStorage.setItem("booth_user_id", response.user_id);
          }
        }

        const currentLikedBooths = JSON.parse(
          localStorage.getItem("likedBooths") || "[]"
        );

        if (response.is_liked) {
          /* 좋아요 추가 */
          if (!currentLikedBooths.includes(boothId.toString())) {
            currentLikedBooths.push(boothId.toString());
          }
        } else {
          /* 좋아요 제거 */
          const index = currentLikedBooths.indexOf(boothId.toString());
          if (index > -1) {
            currentLikedBooths.splice(index, 1);
          }
        }

        localStorage.setItem("likedBooths", JSON.stringify(currentLikedBooths));

        const event = new CustomEvent("boothLikeChanged", {
          detail: {
            boothId: boothId.toString(),
            isLiked: response.is_liked,
            likesCount: response.likes_count,
          },
        });
        window.dispatchEvent(event);
      } catch (apiError) {
        console.error("좋아요 API 실패:", apiError);
        setIsLiked(isCurrentlyLiked);
        setLikesCount(likesCount);
        return;
      }
    } catch (error) {
      console.error("좋아요 토글 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return { isLiked, likesCount, toggleLike, loading, error };
};

export default useBoothLikes;
