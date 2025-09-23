
import { useMutation } from '@tanstack/react-query';
import { postGameCoupon } from '../../apis/GamePage/game';

export const usePostGameCoupon = () => {
  return useMutation({
    mutationFn: (couponData = {}) => {
      // 기존 user_id가 있으면 사용, 없으면 "none"으로 설정
      const existingUserId = localStorage.getItem('game_user_id');
      const payload = {
        user_id: couponData?.user_id || existingUserId || "none",
        booth_name: couponData?.booth_name
      };
      
      console.log('쿠폰 발급 API 호출:', payload);
      return postGameCoupon(payload);
    },
    onSuccess: (response) => {
      console.log('쿠폰 발급 성공:', response);
    },
    onError: (error) => {
      console.error('게임 시작 실패:', error);
      
      // 시도 횟수 초과 에러의 경우 특별 처리
      if (error.response?.status === 400) {
        console.warn('시도 횟수 초과 또는 기타 제한 사항');
      }
    },
  });
};

export default usePostGameCoupon;
