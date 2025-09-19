/**
 * 4가지 단어 세트
 */
export const wordSets = [
    { target: '동국멋사', distractor: '동곡멋사' },
    { target: '디오더', distractor: '다오더' },
    { target: '디르바나', distractor: '디르비나' },
    { target: '동국대', distractor: '동곡대' }
];

/**
 * 게임 단계 설정 (피그마 순서대로)
 */
export const gameStages = [
    { 
        id: 1,
        stage: 1,
        title: '1단계 [1/4]',
        size: 'XL',
        gridSize: 4, // 2x2
        gameTime: 5.5 // 5.5초
    },
    { 
        id: 2,
        stage: 2,
        title: '2단계 [2/4]',
        size: 'L',
        gridSize: 9, // 3x3
        gameTime: 5.5
    },
    { 
        id: 3,
        stage: 3,
        title: '3단계 [3/4]',
        size: 'M',
        gridSize: 16, // 4x4
        gameTime: 5.5
    },
    { 
        id: 4,
        stage: 4,
        title: '4단계 [4/4]',
        size: 'S',
        gridSize: 25, // 5x5
        gameTime: 5.5
    }
];

/**
 * 랜덤 단어 세트 선택 함수
 */
export const getRandomWordSet = () => {
    const randomIndex = Math.floor(Math.random() * wordSets.length);
    return wordSets[randomIndex];
};

/**
 * 게임 단계 정보 가져오기
 */
export const getGameStage = (stageNumber) => {
    return gameStages.find(stage => stage.stage === stageNumber) || gameStages[0];
};