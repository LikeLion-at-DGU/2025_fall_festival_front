import React from "react";
import WordCard from "./WordCard";

/**
 * 글자 격자 컴포넌트
 * @param {Array} words - 표시할 단어들의 배열
 * @param {string} size - 카드 크기
 * @param {string} correctAnswer - 실제 정답 (distractor)
 * @param {Function} onWordClick - 단어 클릭 핸들러
 * @param {string} gameStatus - 게임 상태
 */
const WordGrid = ({ words, size, correctAnswer, onWordClick, gameStatus }) => {
  const getGridLayout = () => {
    switch (size) {
      case "XL":
        return { rows: 2, cols: 2 };
      case "L":
        return { rows: 3, cols: 3 };
      case "M":
        return { rows: 4, cols: 4 };
      case "S":
        return { rows: 5, cols: 5 };
      default:
        return { rows: 3, cols: 3 };
    }
  };

  const getGapSize = () => {
    switch (size) {
      case "XL":
        return "gap-[16px]";
      case "L":
        return "gap-[16px]";
      case "M":
        return "gap-[12px]";
      case "S":
        return "gap-[12px]";
      default:
        return "gap-3";
    }
  };

  const renderGrid = () => {
    const { rows, cols } = getGridLayout();
    const grid = [];

    for (let row = 0; row < rows; row++) {
      const rowCards = [];
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        if (index < words.length) {
          const word = words[index];
          rowCards.push(
            <WordCard
              key={index}
              text={word}
              size={size}
              status={
                word === correctAnswer &&
                (gameStatus === "correct" ||
                  gameStatus === "timeout" ||
                  gameStatus === "wrong")
                  ? "Answer"
                  : "Normal"
              }
              onClick={() => onWordClick(word)}
              isCorrectAnswer={
                word === correctAnswer &&
                (gameStatus === "correct" ||
                  gameStatus === "timeout" ||
                  gameStatus === "wrong")
              }
            />
          );
        }
      }

      grid.push(
        <div
          key={row}
          className={`flex justify-center items-center ${getGapSize()}`}
        >
          {rowCards}
        </div>
      );
    }

    return grid;
  };

  return (
    <div
      className={`flex flex-col justify-center items-center ${getGapSize()} scale-90 transform`}
    >
      {renderGrid()}
    </div>
  );
};

export default WordGrid;
