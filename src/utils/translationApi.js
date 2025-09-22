// src/utils/translationApi.js
import api from "./axiosInstance";

// 단일 텍스트 번역 (resolve) - 상세 페이지용
export async function translateSingle(item, targetLang) {
  try {
    const res = await api.post("/resolve/?refresh=true", {
      entity_type: item.entity_type,
      entity_id: item.entity_id,
      field: item.field,
      source_lang: item.source_lang || "ko",
      target_lang: targetLang,
      source_text: item.source_text,
    });

    if (res.status === 200) {
      return {
        translated_text: res.data.translated_text,
        status: res.data.status,
        provider: res.data.provider,
        meta: res.data.meta,
      };
    } else if (res.status === 202) {
      // 번역 대기 중 - 원문 반환
      return {
        translated_text: item.source_text,
        status: "pending",
        provider: null,
        meta: { message: "translation pending" },
      };
    } else {
      throw new Error(`Translation failed: ${res.status}`);
    }
  } catch (error) {
    console.error("단일 번역 실패:", error);
    // 에러 시 원문 반환
    return {
      translated_text: item.source_text,
      status: "error",
      provider: null,
      meta: { error: error.message },
    };
  }
}

// 배치 텍스트 번역 (resolve-batch) - 리스트 페이지용
export async function translateBatch(items, targetLang) {
  try {
    const requestData = {
      target_lang: targetLang,
      items: items,
    };

    const res = await api.post("/resolve-batch/?refresh=true", requestData);

    if (res.status === 200) {
      return res.data.results;
    } else {
      throw new Error(`Batch translation failed: ${res.status}`);
    }
  } catch (error) {
    console.error("배치 번역 실패:", error);
    // 에러 시 원문들 반환
    return items.flatMap((item) =>
      item.fields.map((field) => ({
        entity_type: item.entity_type,
        entity_id: item.entity_id,
        field: field.field,
        translated: {
          translated_text: field.source_text,
          status: "error",
          provider: null,
          meta: { error: error.message },
        },
      }))
    );
  }
}

// 카테고리 영어-한글 매핑
const categoryMapping = {
  FoodTruck: "푸드트럭",
  Toilet: "화장실",
  Drink: "주류판매",
  Store: "편의점",
  Booth: "부스",
};

// 부스 데이터 번역용 헬퍼 함수
export function createBoothTranslationItems(booths) {
  return booths.map((booth) => ({
    entity_type: "booth",
    entity_id: booth.booth_id.toString(),
    fields: [
      {
        field: "BoothName",
        source_lang: "ko",
        source_text: booth.name || "",
      },
      ...(booth.category
        ? [
            {
              field: "BoothCategory",
              source_lang: "ko",
              source_text: categoryMapping[booth.category] || booth.category,
            },
          ]
        : []),
      ...(booth.location?.name
        ? [
            {
              field: "BoothLocation",
              source_lang: "ko",
              source_text: booth.location.name,
            },
          ]
        : []),
    ],
  }));
}

// 공연 데이터 번역용 헬퍼 함수
export function createStageTranslationItems(stages) {
  return stages.map((stage) => ({
    entity_type: "stage",
    entity_id: stage.stage_id.toString(),
    fields: [
      {
        field: "StageName",
        source_lang: "ko",
        source_text: stage.name || "",
      },
      ...(stage.place
        ? [
            {
              field: "StagePlace",
              source_lang: "ko",
              source_text: stage.place,
            },
          ]
        : []),
    ],
  }));
}

// 게시판 데이터 번역용 헬퍼 함수
export function createBoardTranslationItems(boards) {
  return boards.map((board, idx) => ({
    entity_type: "board",
    entity_id: board?.id?.toString() || `temp-${idx}`, // ⛔ 안전 처리
    fields: [
      {
        field: "BoardTitle",
        source_lang: "ko",
        source_text: board.title || "",
      },
      ...(board.content
        ? [
            {
              field: "BoardContent",
              source_lang: "ko",
              source_text: board.content,
            },
          ]
        : []),
    ],
  }));
}

// 긴급공지 데이터 번역용 헬퍼 함수
export function createNoticeTranslationItems(notice) {
  if (!notice) return [];

  return [
    {
      entity_type: "notice",
      entity_id: notice.id ? notice.id.toString() : "emergency",
      fields: [
        {
          field: "NoticeTitle",
          source_lang: "ko",
          source_text: notice.title || "",
        },
        ...(notice.content
          ? [
              {
                field: "NoticeContent",
                source_lang: "ko",
                source_text: notice.content,
              },
            ]
          : []),
      ],
    },
  ];
}

export function createDeveloperTranslationItems(developers) {
  return developers.map((developer) => ({
    entity_type: "developer",
    entity_id: developer.id.toString(),
    fields: [
      {
        field: "DeveloperRole",
        source_lang: "ko",
        source_text: developer.roleDisplay || "",
      },
      {
        field: "DeveloperMajor",
        source_lang: "ko",
        source_text: developer.major || "",
      },
    ],
  }));
}
