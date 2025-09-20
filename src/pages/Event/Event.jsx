import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GameIntroPage from "./GameIntroPage"; // D'order 로고 페이지
import GameInstructionPage from "./GameInstructionPage"; // "다르게 적힌 글자를 찾아주세요" 페이지
import GameCountdown from "./GameCountdown"; // 카운트다운 컴포넌트
import GamePlay from "./GamePlay";

function Event() {
  const [gamePhase, setGamePhase] = useState("intro"); // intro -> instruction -> countdown -> playing
  const [, setSearchParams] = useSearchParams();

  // URL 쿼리 파라미터 업데이트
  useEffect(() => {
    setSearchParams({ phase: gamePhase });
  }, [gamePhase, setSearchParams]);

  const handleShowInstruction = () => {
    console.log("handleShowInstruction 호출됨 - instruction으로 변경");
    setGamePhase("instruction");
  };

  const handleStartCountdown = () => {
    console.log("handleStartCountdown 호출됨 - countdown으로 변경");
    setGamePhase("countdown");
  };

  const handleStartGame = () => {
    console.log("handleStartGame 호출됨 - playing으로 변경");
    setGamePhase("playing");
  };

  const handleGameEnd = () => {
    console.log("handleGameEnd 호출됨 - intro로 변경");
    setGamePhase("intro");
  };

  const handleRetryFromCountdown = () => {
    console.log("handleRetryFromCountdown 호출됨 - countdown으로 변경");
    setGamePhase("countdown");
  };

  if (gamePhase === "intro") {
    return <GameIntroPage onStartGame={handleShowInstruction} />;
  }

  if (gamePhase === "instruction") {
    return <GameInstructionPage onStartChallenge={handleStartCountdown} />;
  }

  if (gamePhase === "countdown") {
    return <GameCountdown onCountdownEnd={handleStartGame} />;
  }

  if (gamePhase === "playing") {
    return <GamePlay onGameEnd={handleGameEnd} onRetryFromCountdown={handleRetryFromCountdown} />;
  }

  return null;
}

export default Event;