import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

/**
 * 게임 성공 처리 훅
 * 게임 성공 시 백엔드에 성공 정보를 전송하고 쿠폰 발급 여부를 확인합니다.
 */
const usePostSuccessGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  /**
   * 게임 성공 API 호출
   * @param {string} gameId - 게임 ID
   * @returns {Promise<{isWon: boolean, couponBooths?: string[], message: string}>}
   */
  const postGameSuccess = async (gameId) => {
    setIsLoading(true);
    setError(null);
    setSuccessData(null);

    try {
      // POST /game/games/success/
      const response = await axiosInstance.post(`/game/games/success/`, {
        game_id: gameId
      });

      const { message, data } = response.data;

      // 쿠폰 당첨 여부 확인
      const isWon = message === "쿠폰 당첨";
      const result = {
        isWon,
        message,
        couponBooths: isWon ? data?.coupon_booth : null
      };

      setSuccessData(result);
      return result;

    } catch (err) {
      const errorMessage = err.response?.data?.message || '게임 성공 처리 중 오류가 발생했습니다.';
      setError(errorMessage);
      
      // 에러 시에도 결과 반환
      return {
        isWon: false,
        message: errorMessage,
        couponBooths: null
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 상태 초기화
   */
  const resetState = () => {
    setError(null);
    setSuccessData(null);
    setIsLoading(false);
  };

  return {
    postGameSuccess,
    isLoading,
    error,
    successData,
    resetState
  };
};

export default usePostSuccessGame;
