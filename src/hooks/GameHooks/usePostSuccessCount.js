import { useMutation } from "@tanstack/react-query";
import { postSuccessCountGame } from "../../apis/GamePage/game";

export const usePostSuccessCount = () => {
  return useMutation({
    mutationFn: () => {
      return postSuccessCountGame({});
    },
    onError: (error) => {
      console.error("성공 횟수 조회 실패:", error);
    },
  });
};
