// src/hooks/useTranslation.js
import i18n from "i18next";
import { useEffect } from "react";
import { useTranslations } from "../context/TranslationContext";
import {
  createBoothTranslationItems,
  createStageTranslationItems,
  createBoardTranslationItems,
  createNoticeTranslationItems,
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
  const lang = i18n.language;

  useEffect(() => {
    if (booths && booths.length > 0) {
      const translationItems = createBoothTranslationItems(booths);
      requestBatchTranslations(translationItems);
    }
  }, [booths, lang]); // ✅ requestBatchTranslations 제거

  const getTranslatedBooths = () => {
    if (!booths) return [];

    return booths.map((booth) => ({
      ...booth,
      translatedName: getTranslation("booth", booth.booth_id, "BoothName", booth.name),
      translatedCategory: booth.category
        ? getTranslation(
            "booth",
            booth.booth_id,
            "BoothCategory",
            categoryMapping[booth.category] || booth.category
          )
        : booth.category,
      translatedLocation: booth.location?.name
        ? getTranslation("booth", booth.booth_id, "BoothLocation", booth.location.name)
        : booth.location?.name,
    }));
  };

  return { getTranslatedBooths };
};

// 공연 데이터 번역 훅
export const useStageTranslation = (stages) => {
  const { requestBatchTranslations, getTranslation } = useTranslations();
  const lang = i18n.language;

  useEffect(() => {
    if (stages && stages.length > 0) {
      const translationItems = createStageTranslationItems(stages);
      requestBatchTranslations(translationItems);
    }
  }, [stages, lang]); // ✅ 수정

  const getTranslatedStages = () => {
    if (!stages) return [];

    return stages.map((stage) => ({
      ...stage,
      translatedName: getTranslation("stage", stage.stage_id, "StageName", stage.name),
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
  const lang = i18n.language;

  useEffect(() => {
    if (boards && boards.length > 0) {
      const translationItems = createBoardTranslationItems(boards);
      requestBatchTranslations(translationItems);
    }
  }, [boards, lang]);

  const getTranslatedBoards = () => {
    if (!boards) return [];

    return boards.map((board, idx) => {
      // 항상 String(board.id)로 강제 변환
      const entityId = board?.id ? String(board.id) : `temp-${idx}`;

      return {
        ...board,
        translatedTitle: getTranslation(
          "board",
          entityId,
          "BoardTitle",
          board.title || ""
        ),
        translatedContent: board?.content
          ? getTranslation("board", entityId, "BoardContent", board.content)
          : "",
        translatedWriter: board?.writer
          ? getTranslation("board", entityId, "WriterName", board.writer)
          : "",
      };
    });
  };

  return { getTranslatedBoards };
};


// 긴급공지 번역 훅
export const useNoticeTranslation = (notice) => {
  const { requestBatchTranslations, getTranslation } = useTranslations();
  const lang = i18n.language;

  useEffect(() => {
    if (notice) {
      const translationItems = createNoticeTranslationItems(notice);
      if (translationItems.length > 0) {
        requestBatchTranslations(translationItems);
      }
    }
  }, [notice, lang]); // ✅ 수정

  const getTranslatedNotice = () => {
    if (!notice) return null;

    const entityId = notice.id ? notice.id.toString() : "emergency";

    return {
      ...notice,
      translatedTitle: getTranslation("notice", entityId, "NoticeTitle", notice.title),
      translatedContent: notice.content
        ? getTranslation("notice", entityId, "NoticeContent", notice.content)
        : notice.content,
    };
  };

  return { getTranslatedNotice };
};

// 단일 아이템 번역 훅 (상세 페이지용)
export const useSingleItemTranslation = (item) => {
  const { requestSingleTranslation, getTranslation } = useTranslations();
  const lang = i18n.language;

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
  }, [item, lang]); // ✅ 수정 (언어 바뀔 때도 다시 요청)

  const getTranslatedText = () => {
    if (!item) return "";
    return getTranslation(item.entity_type, item.entity_id, item.field, item.source_text);
  };

  return { getTranslatedText };
};
