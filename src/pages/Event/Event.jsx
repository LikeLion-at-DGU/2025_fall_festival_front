import React, { useState } from "react";
import GameIntroPage from "./GameIntroPage"; // 새로운 게임 소개 페이지
import GameCountdown from "./GameCountdown"; // 카운트다운 컴포넌트
import GamePlay from "./GamePlay";

function Event() {
  const [gamePhase, setGamePhase] = useState("intro"); // intro -> countdown -> playing

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

  if (gamePhase === "intro") {
    return <GameIntroPage onStartGame={handleStartCountdown} />;
  }

  if (gamePhase === "countdown") {
    return <GameCountdown onCountdownEnd={handleStartGame} />;
  }

  if (gamePhase === "playing") {
    return <GamePlay onGameEnd={handleGameEnd} />;
  }

  return null;
}

export default Event;