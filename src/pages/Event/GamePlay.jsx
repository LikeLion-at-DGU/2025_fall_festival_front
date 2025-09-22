import React, { useState, useEffect } from "react";
import GameHeader from "../../components/GameComponents/GameHeader";
import ProgressBar from "../../components/GameComponents/ProgressBar";
import StatusMessage from "../../components/GameComponents/StatusMessage";
import WordGrid from "../../components/GameComponents/WordGrid";
import ActionButton from "../../components/GameComponents/ActionButton";
import GameSuccessModal from "../../components/GameComponents/GameSuccessModal";
import { getRandomWordSet, getGameStage } from "../../utils/gameData";
import usePostSuccessGame from "../../hooks/GameHooks/usePostSuccessGame";
import usePostStartGame from "../../hooks/GameHooks/usePostStartGame";

function GamePlay({ onGameEnd, onRetryFromCountdown }) {
  const [currentStage, setCurrentStage] = useState(1); // 현재 단계 (1-4)
  const [gameStatus, setGameStatus] = useState("playing"); // 'ready', 'playing', 'correct', 'timeout', 'wrong'
  const [timeLeft, setTimeLeft] = useState(5.5); // 5.5초 제한
  const [timeProgress, setTimeProgress] = useState(0); // 시간 진행률 (0-100)
  const [words, setWords] = useState([]);
  const [currentWordSet, setCurrentWordSet] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(""); // distractor가 정답
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [couponResult, setCouponResult] = useState(null); // 쿠폰 결과 저장

  // 게임 성공 API 훅
  const { postGameSuccess, isLoading: isSubmittingSuccess } = usePostSuccessGame();
  
  // 게임 시작 API 훅
  const { mutate: startGameAPI, isLoading: isStartingGame } = usePostStartGame();

  // 게임 초기화
  useEffect(() => {
    prepareStage(currentStage);
  }, [currentStage]);

  // 타이머 및 진행률 업데이트
  useEffect(() => {
    if (gameStatus === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        const newTimeLeft = timeLeft - 0.1; // 0.1초씩 감소
        setTimeLeft(newTimeLeft);

        // 진행률 계산 (시간이 지날수록 증가)
        const progress = ((5.5 - newTimeLeft) / 5.5) * 100;
        setTimeProgress(progress);

        if (newTimeLeft <= 0) {
          setGameStatus("timeout");
          setTimeProgress(100);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [gameStatus, timeLeft]);

  // 단계 준비
  const prepareStage = (stage) => {
    console.log(`${stage}단계 준비 중...`);
    const wordSet = getRandomWordSet();
    setCurrentWordSet(wordSet);
    setCorrectAnswer(wordSet.distractor);
    
    const stageConfig = getGameStage(stage);
    const totalWords = stageConfig.gridSize;
    const normalWords = Array(totalWords - 1).fill(wordSet.target);
    const allWords = [...normalWords, wordSet.distractor];
    
    // Fisher-Yates 알고리즘으로 셔플
    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }
    
    setWords(allWords);
    setGameStatus("playing");
    setTimeLeft(5.5);
    setTimeProgress(0);
  };

  // 게임 시작
  const startGame = () => {
    // 백엔드에 게임 시작 정보 전송
    startGameAPI({}, {
      onSuccess: (response) => {
        console.log('게임 시작 성공:', response);
        
        // 게임 상태 업데이트
        setGameStatus("playing");
        setTimeLeft(5.5);
        setTimeProgress(0);
      },
      onError: (error) => {
        console.error('게임 시작 실패:', error);
        
        // 에러가 있어도 게임은 시작 (오프라인 동작)
        setGameStatus("playing");
        setTimeLeft(5.5);
        setTimeProgress(0);
      }
    });
  };

  // 단어 클릭 처리
  const handleWordClick = (word) => {
    if (gameStatus !== "playing") return;

    if (word === correctAnswer) {
      setGameStatus("correct");
    } else {
      setGameStatus("wrong");
    }
  };

  // 다음 단계로 이동
  const handleNextStep = async () => {
    // 개발 중: 3단계까지만 완료해도 성공 모달 표시
    if (currentStage < 3) {
      console.log(`${currentStage}단계에서 ${currentStage + 1}단계로 이동`);
      setCurrentStage(currentStage + 1);
    } else {
      // 게임 완료 (개발 중: 3단계 완료 시) - 백엔드에 성공 정보 전송 및 쿠폰 확인
      try {
        // user_id는 훅 내부에서 localStorage에서 자동으로 가져옴
        const result = await postGameSuccess();
        
        console.log('게임 성공 결과:', result);
        setCouponResult(result);
        
        // 성공 모달 표시
        setShowCompleteModal(true);
      } catch (error) {
        console.error('게임 성공 처리 중 오류:', error);
        // 오류가 있어도 모달은 표시
        setShowCompleteModal(true);
      }
    }
  };

  // 다시 도전하기 (카운트다운부터 재시작)
  const handleRetry = () => {
    // 게임 재시작 시 백엔드에 시작 정보 전송
    startGameAPI({}, {
      onSuccess: (response) => {
        console.log('게임 재시작 성공:', response);
        
        // 카운트다운부터 재시작하거나 현재 스테이지 재시작
        if (onRetryFromCountdown) {
          onRetryFromCountdown();
        } else {
          // fallback: 현재 스테이지 재시작
          prepareStage(currentStage);
        }
      },
      onError: (error) => {
        console.error('게임 재시작 실패:', error);
        
        // 에러가 있어도 게임은 재시작 (오프라인 동작)
        if (onRetryFromCountdown) {
          onRetryFromCountdown();
        } else {
          prepareStage(currentStage);
        }
      }
    });
  };

  // 모달 닫기
  const handleModalClose = () => {
    setShowCompleteModal(false);
    if (onGameEnd) {
      onGameEnd(); // 게임 종료 후 intro로 돌아가기
    }
  };



  if (!currentWordSet)
    return (
      <div className="w-full max-w-[430px] mx-auto h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="w-full min-h-screen relative bg-neutral-100 overflow-hidden flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen flex flex-col items-center px-4 py-safe">
        {/* 게임 헤더 */}
        <div className="w-full flex-shrink-0 mt-safe flex justify-center">
          <div className="w-full max-w-sm">
            <GameHeader round={currentStage} currentStep={currentStage} />
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="w-full flex-shrink-0 flex justify-center">
          <div className="w-full max-w-sm">
            <ProgressBar timeProgress={timeProgress} isTimeOut={gameStatus === "timeout"} />
          </div>
        </div>

        {/* 상태 메시지 */}
        <div className="w-full flex-shrink-0 flex justify-center">
          <div className="w-full max-w-sm">
            <StatusMessage
              targetWord={currentWordSet.target}
              gameStatus={gameStatus}
            />
          </div>
        </div>

        {/* 게임 영역 - WordGrid와 ActionButton을 포함 */}
        <div className="flex-1 flex flex-col justify-start items-center w-full pt-20 pb-8 min-h-0 overflow-hidden">
          {/* 단어 격자 - 10px 아래로 이동 */}
          <div className="flex justify-center items-center mb-6 flex-shrink-0 mt-2.5">
            <WordGrid
              words={words}
              size={getGameStage(currentStage).size}
              correctAnswer={correctAnswer}
              onWordClick={handleWordClick}
              gameStatus={gameStatus}
            />
          </div>

          {/* 액션 버튼 - 30px 위로 이동 */}
          <div className="w-full max-w-80 px-4 flex-shrink-0 -mt-5 flex justify-center">
            <div className="w-full max-w-sm">
              <ActionButton
                gameStatus={gameStatus}
                onNextStep={handleNextStep}
                onRetry={handleRetry}
                onStartGame={startGame}
                currentStage={currentStage}
                isLoading={isStartingGame || isSubmittingSuccess}
              />
            </div>
          </div>
        </div>

        {/* 게임 완료 모달 (성공 시만) */}
        <GameSuccessModal
          isOpen={showCompleteModal}
          onClose={handleModalClose}
          couponResult={couponResult}
          isLoading={isSubmittingSuccess}
        />
      </div>
    </div>
  );
}

export default GamePlay;