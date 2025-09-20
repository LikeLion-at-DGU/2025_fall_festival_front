/**
 * 글자 찾기 게임 데이터
 * 피그마 순서에 맞게 고정된 단계별 진행 (1단계 → 2단계 → 3단계 → 4단계)
 */

export const gameStages = [
    { 
        id: 1,
        stage: 1,
        target: '동국멋사', 
        distractor: '동곡멋사',
        size: 'XL',
        gridSize: 4 // 2x2
    },
    { 
        id: 2,
        stage: 2,
        target: '디오더', 
        distractor: '다오더',
        size: 'L',
        gridSize: 9 // 3x3
    },
    { 
        id: 3,
        stage: 3,
        target: '디르바나', 
        distractor: '디르비나',
        size: 'M',
        gridSize: 16 // 4x4
    },
    { 
        id: 4,
        stage: 4,
        target: '동국대',
        distractor: '동곡대',
        size: 'S',
        gridSize: 25 // 5x5
    }
];

/**
 * 특정 단계의 게임 데이터를 가져오는 함수
 * @param {number} stage - 단계 번호 (1-4)
 * @returns {Object} 게임 데이터 객체
 */
export const getGameDataByStage = (stage) => {
    return gameStages.find(data => data.stage === stage) || gameStages[0];
};

/**
 * 전체 게임 단계 수를 반환하는 함수
 * @returns {number} 총 단계 수
 */
export const getTotalStages = () => {
    return gameStages.length;
};