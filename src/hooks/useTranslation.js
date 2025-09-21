// src/hooks/useTranslation.js
import { useEffect } from "react";
import { useTranslations } from "../context/TranslationContext";
import {
  createBoothTranslationItems,
  createStageTranslationItems,
  createBoardTranslationItems,
} from "../utils/translationApi";

// 카테고리 영어-한글 매핑
const categoryMapping = {
  FoodTruck: "푸드트럭",
  Toilet: "화장실",
  Drink: "주류판매",
  Store: "편의점",
  Booth: "부스",
};

// 부스 데이터 번역 훅
export const useBoothTranslation = (booths) => {
  const { requestBatchTranslations, getTranslation } = useTranslations();

  useEffect(() => {
    if (booths && booths.length > 0) {
      const translationItems = createBoothTranslationItems(booths);
      requestBatchTranslations(translationItems);
    }
  }, [booths, requestBatchTranslations]);

  // 번역된 부스 데이터 반환
  const getTranslatedBooths = () => {
    if (!booths) return [];

    return booths.map((booth) => ({
      ...booth,
      translatedName: getTranslation(
        "booth",
        booth.booth_id,
        "BoothName",
        booth.name
      ),
      translatedCategory: booth.category
        ? getTranslation(
            "booth",
            booth.booth_id,
            "BoothCategory",
            categoryMapping[booth.category] || booth.category
          )
        : booth.category,
      translatedLocation: booth.location?.name
        ? getTranslation(
            "booth",
            booth.booth_id,
            "BoothLocation",
            booth.location.name
          )
        : booth.location?.name,
    }));
  };

  return { getTranslatedBooths };
};

// 공연 데이터 번역 훅
export const useStageTranslation = (stages) => {
  const { requestBatchTranslations, getTranslation } = useTranslations();

  useEffect(() => {
    if (stages && stages.length > 0) {
      const translationItems = createStageTranslationItems(stages);
      requestBatchTranslations(translationItems);
    }
  }, [stages, requestBatchTranslations]);

  // 번역된 공연 데이터 반환
  const getTranslatedStages = () => {
    if (!stages) return [];

    return stages.map((stage) => ({
      ...stage,
      translatedName: getTranslation(
        "stage",
        stage.stage_id,
        "StageName",
        stage.name
      ),
      translatedPlace: stage.place
        ? getTranslation("stage", stage.stage_id, "StagePlace", stage.place)
        : stage.place,
    }));
  };

  return { getTranslatedStages };
};

// 게시판 데이터 번역 훅
export const useBoardTranslation = (boards) => {
  const { requestBatchTranslations, getTranslation } = useTranslations();

  useEffect(() => {
    if (boards && boards.length > 0) {
      // 게시판 데이터 번역 요청
      const translationItems = createBoardTranslationItems(boards);
      requestBatchTranslations(translationItems);
    }
  }, [boards, requestBatchTranslations]);

  // 번역된 게시판 데이터 반환
  const getTranslatedBoards = () => {
    if (!boards) return [];

    return boards.map((board) => ({
      ...board,
      translatedTitle: getTranslation(
        "board",
        board.id,
        "BoardTitle",
        board.title
      ),
      translatedContent: board.content
        ? getTranslation("board", board.id, "BoardContent", board.content)
        : board.content,
    }));
  };

  return { getTranslatedBoards };
};

// 단일 아이템 번역 훅 (상세 페이지용)
export const useSingleItemTranslation = (item) => {
  const { requestSingleTranslation, getTranslation } = useTranslations();

  useEffect(() => {
    if (
      item &&
      item.entity_type &&
      item.entity_id &&
      item.field &&
      item.source_text
    ) {
      requestSingleTranslation(item);
    }
  }, [item, requestSingleTranslation]);

  // 번역된 텍스트 반환
  const getTranslatedText = () => {
    if (!item) return "";
    return getTranslation(
      item.entity_type,
      item.entity_id,
      item.field,
      item.source_text
    );
  };

  return { getTranslatedText };
};
