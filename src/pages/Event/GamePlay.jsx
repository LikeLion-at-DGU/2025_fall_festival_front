import React, { useState, useEffect } from "react";
import GameHeader from "../../components/GameComponents/GameHeader";
import ProgressBar from "../../components/GameComponents/ProgressBar";
import StatusMessage from "../../components/GameComponents/StatusMessage";
import WordGrid from "../../components/GameComponents/WordGrid";
import ActionButton from "../../components/GameComponents/ActionButton";
import GameSuccessModal from "../../components/GameComponents/GameSuccessModal";
import { getRandomWordSet, getGameStage } from "../../utils/gameData";

function GamePlay({ onGameEnd, onRetryFromCountdown }) {
  const [currentStage, setCurrentStage] = useState(1); // 현재 단계 (1-4)
  const [gameStatus, setGameStatus] = useState("playing"); // 'ready', 'playing', 'correct', 'timeout', 'wrong'
  const [timeLeft, setTimeLeft] = useState(5.5); // 5.5초 제한
  const [timeProgress, setTimeProgress] = useState(0); // 시간 진행률 (0-100)
  const [words, setWords] = useState([]);
  const [currentWordSet, setCurrentWordSet] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(""); // distractor가 정답
  const [showCompleteModal, setShowCompleteModal] = useState(false);

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
    setGameStatus("playing");
    setTimeLeft(5.5);
    setTimeProgress(0);
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
  const handleNextStep = () => {
    if (currentStage < 4) {
      console.log(`${currentStage}단계에서 ${currentStage + 1}단계로 이동`);
      setCurrentStage(currentStage + 1);
    } else {
      // 게임 완료 - 성공 모달 표시
      setShowCompleteModal(true);
    }
  };

  // 다시 도전하기 (카운트다운부터 재시작)
  const handleRetry = () => {
    if (onRetryFromCountdown) {
      onRetryFromCountdown();
    } else {
      // fallback: 현재 스테이지 재시작
      prepareStage(currentStage);
    }
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
    <div className="w-full max-w-[430px] mx-auto h-screen relative bg-neutral-100 overflow-hidden flex flex-col items-center px-4">
      {/* 게임 헤더 */}
      <GameHeader round={currentStage} currentStep={currentStage} />

      {/* 진행률 바 */}
      <ProgressBar progress={timeProgress} isTimeOut={gameStatus === "timeout"} />

      {/* 상태 메시지 */}
      <StatusMessage
        targetWord={currentWordSet.target}
        gameStatus={gameStatus}
      />

      {/* 타이머 (개발용 - 필요시 제거) */}
      {gameStatus === "playing" && (
        <div className="absolute top-[140px] left-[16px] text-sm text-neutral-500">
          남은 시간: {timeLeft.toFixed(1)}초
        </div>
      )}

      {/* 단어 격자 */}
      <WordGrid
        words={words}
        size={getGameStage(currentStage).size}
        correctAnswer={correctAnswer}
        onWordClick={handleWordClick}
        gameStatus={gameStatus}
      />

      {/* 액션 버튼 - 고정 위치 */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-80 px-4">
        <ActionButton
          gameStatus={gameStatus}
          onNextStep={handleNextStep}
          onRetry={handleRetry}
          onStartGame={startGame}
          currentStage={currentStage}
        />
      </div>

      {/* 게임 완료 모달 (성공 시만) */}
      <GameSuccessModal
        isOpen={showCompleteModal}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default GamePlay;