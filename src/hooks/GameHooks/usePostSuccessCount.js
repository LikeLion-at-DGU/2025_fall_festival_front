import { useMutation } from '@tanstack/react-query';
import { postSuccessCountGame } from '../../apis/GamePage/game';

export const usePostSuccessCount = () => {
  return useMutation({
    mutationFn: () => {
      console.log('성공 횟수 조회 API 호출');
      return postSuccessCountGame({});
    },
    onSuccess: (response) => {
      console.log('성공 횟수 조회 성공:', response);
    },
    onError: (error) => {
      console.error('성공 횟수 조회 실패:', error);
    },
  });
};
