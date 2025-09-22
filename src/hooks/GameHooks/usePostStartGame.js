
import { useMutation } from '@tanstack/react-query';
import { postStartGame } from '../../apis/GamePage/game';

export const usePostStartGame = () => {
  return useMutation({
    mutationFn: (userData = {}) => {
      // 기존 user_id가 있으면 사용, 없으면 "none"으로 설정
      const existingUserId = localStorage.getItem('game_user_id');
      const payload = {
        user_id: userData?.user_id || existingUserId || "none"
      };
      
      console.log('게임 시작 API 호출:', payload);
      return postStartGame(payload);
    },
    onSuccess: (response) => {
      console.log('게임 시작 성공:', response);
      
      // 백엔드에서 받은 user_id를 로컬스토리지에 저장
      if (response.data && response.data.user_id) {
        localStorage.setItem('game_user_id', response.data.user_id);
      }
      
      // 시도 횟수도 저장 (필요한 경우)
      if (response.data && response.data.try_times) {
        localStorage.setItem('game_try_times', response.data.try_times.toString());
      }
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

export default usePostStartGame;
