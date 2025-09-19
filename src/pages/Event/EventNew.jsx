import React, { useState, useEffect } from 'react';
import GameHeader from '../../components/GameComponents/GameHeader';
import ProgressBar from '../../components/GameComponents/ProgressBar';
import StatusMessage from '../../components/GameComponents/StatusMessage';
import WordGrid from '../../components/GameComponents/WordGrid';
import ActionButton from '../../components/GameComponents/ActionButton';
import { gameStages, getRandomWordSet, getGameStage } from '../../utils/gameData';

function Event() {
  const [currentStage, setCurrentStage] = useState(1); // 현재 단계 (1-4)
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'correct', 'timeout', 'wrong'
  const [timeLeft, setTimeLeft] = useState(5.5); // 5.5초 제한
  const [timeProgress, setTimeProgress] = useState(0); // 시간 진행률 (0-100)
  const [words, setWords] = useState([]);
  const [currentWordSet, setCurrentWordSet] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(''); // distractor가 정답

  // 게임 초기화
  useEffect(() => {
    initializeStage(currentStage);
  }, [currentStage]);

  // 타이머 및 진행률 업데이트
  useEffect(() => {
    if (gameStatus === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        const newTimeLeft = timeLeft - 0.1; // 0.1초씩 감소
        setTimeLeft(newTimeLeft);
        
        // 진행률 계산 (시간이 지날수록 증가)
        const stageData = getGameStage(currentStage);
        const progress = ((stageData.gameTime - newTimeLeft) / stageData.gameTime) * 100;
        setTimeProgress(Math.min(100, Math.max(0, progress)));
      }, 100);
      
      return () => clearTimeout(timer);
    } else if (timeLeft <= 0 && gameStatus === 'playing') {
      setGameStatus('timeout');
      setTimeProgress(100);
    }
  }, [timeLeft, gameStatus, currentStage]);

  // 단계 초기화
  const initializeStage = (stage) => {
    const stageData = getGameStage(stage);
    const wordSet = getRandomWordSet(); // 랜덤 단어 세트 선택
    
    setCurrentWordSet(wordSet);
    setCorrectAnswer(wordSet.distractor); // distractor가 정답
    
    // 카드 배열 생성: (gridSize - 1)개의 target + 1개의 distractor
    const cardsArray = [];
    
    // target 단어들로 대부분 채우기
    for (let i = 0; i < stageData.gridSize - 1; i++) {
      cardsArray.push(wordSet.target);
    }
    
    // distractor 1개 추가
    cardsArray.push(wordSet.distractor);
    
    // 배열 섞기
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    
    setWords(cardsArray);
    setGameStatus('playing');
    setTimeLeft(stageData.gameTime);
    setTimeProgress(0);
  };

  // 단어 클릭 처리
  const handleWordClick = (clickedWord) => {
    if (gameStatus !== 'playing') return;
    
    // distractor를 클릭해야 성공
    if (clickedWord === correctAnswer) {
      setGameStatus('correct');
      setTimeProgress(100);
    } else {
      setGameStatus('wrong');
    }
  };

  // 다음 단계로
  const handleNextStep = () => {
    if (currentStage < 4) {
      setCurrentStage(currentStage + 1);
    } else {
      // 게임 완료
      alert('모든 단계를 완료했습니다!');
      setCurrentStage(1);
    }
  };

  // 다시 도전하기
  const handleRetry = () => {
    initializeStage(currentStage);
  };

  const currentStageData = getGameStage(currentStage);
  if (!currentStageData || !currentWordSet) return null;

  return (
    <div className="w-96 h-[812px] relative bg-neutral-100 overflow-hidden mx-auto">
      {/* 게임 헤더 */}
      <GameHeader round={currentStage} currentStep={currentStage} />
      
      {/* 시간 진행률 바 */}
      <ProgressBar 
        timeProgress={timeProgress}
        isTimeOut={gameStatus === 'timeout'} 
      />
      
      {/* 상태 메시지 - 찾아야 할 단어는 distractor */}
      <StatusMessage 
        targetWord={correctAnswer}
        gameStatus={gameStatus}
      />
      
      {/* 개발용 정보 (필요시 제거) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-[140px] left-[16px] text-xs text-neutral-500 space-y-1">
          <div>시간: {timeLeft.toFixed(1)}초</div>
          <div>정답: {correctAnswer}</div>
          <div>진행률: {timeProgress.toFixed(1)}%</div>
        </div>
      )}
      
      {/* 단어 격자 */}
      <WordGrid
        words={words}
        size={currentStageData.size}
        targetWord={correctAnswer} // distractor가 정답
        onWordClick={handleWordClick}
        gameStatus={gameStatus}
      />
      
      {/* 액션 버튼 */}
      <ActionButton
        gameStatus={gameStatus}
        onNextStep={handleNextStep}
        onRetry={handleRetry}
      />
    </div>
  );
}

export default Event;