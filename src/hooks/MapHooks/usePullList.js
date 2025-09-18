import { useRef, useCallback } from "react";

export default function usePullList() {
  const ref = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  // 드래그 시작
  const handleDragStart = useCallback((e) => {
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  }, []);

  // 드래그 이동
  const handleDragMove = useCallback((e) => {
    if (!ref.current) return;

    const y = e.touches ? e.touches[0].clientY : e.clientY;
    currentY.current = y - startY.current;

    if (currentY.current < 0) currentY.current = 0;

    // 최대 translateY = PullList 높이 - 최소 높이 369px
    const maxTranslate = ref.current.offsetHeight - 369;
    if (currentY.current > maxTranslate) currentY.current = maxTranslate;

    ref.current.style.transform = `translateY(-${currentY.current}px)`;
  }, []);

  const handleDragEnd = useCallback(() => {
    currentY.current = 0; // 손 놓으면 위치 유지 안 함
  }, []);

  return {
    ref,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
}
