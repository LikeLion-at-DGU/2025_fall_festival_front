// src/pages/Board/Board.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBoardTranslation } from "../../hooks/useTranslation";
import { useTranslations } from "../../context/TranslationContext";
const EVENT_TIME_CACHE = new Map();
import SearchIcon from "../../assets/images/icons/board-icons/Search.svg";
import EmptyLogo from "../../assets/images/icons/logo/empty-logo.png";
import dirvana from "../../assets/images/icons/Timetable-icons/DIRVANA.svg";

/* =========================
   환경변수 기반 API 베이스
   ========================= */
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

/* =========================
   카테고리 매핑
   ========================= */

const CATEGORY_MAP = {
  ALL: "전체",
  Notice: "공지",
  Event: "이벤트",
  LostItem: "분실물",
};
const KOR_TO_SERVER = {
  전체: "ALL",
  공지: "Notice",
  이벤트: "Event",
  분실물: "LostItem",
};

/* =========================
   유틸: AbortError 판단
   ========================= */
function isAbortError(err) {
  return (
    err?.name === "AbortError" ||
    (typeof err?.message === "string" &&
      err.message.toLowerCase().includes("aborted"))
  );
}

/* =========================
   빈 상태 컴포넌트
   ========================= */
function EmptyState({ hasSearchKeyword, activeTag }) {
  const { t } = useTranslation();

  const getEmptyMessage = () => {
    if (hasSearchKeyword) {
      return t("board.empty.noResult");
    }

    switch (activeTag) {
      case t("board.tabs.all"):
        return t("board.empty.noPosts");
      case t("board.tabs.notice"):
        return t("board.empty.noNotice");
      case t("board.tabs.event"):
        return t("board.empty.noEvent");
      case t("board.tabs.lost"):
        return t("board.empty.noLost");
      default:
        return t("board.empty.noPosts");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] w-full gap-6">
      <img
        src={dirvana}
        alt={t("board.empty.noPosts")}
        className="w-[185px] h-[35px] mb-0"
      />
      <p className="text-center text-[#A1A1AA] text-[16px] font-[400]">
        {getEmptyMessage()}
      </p>
    </div>
  );
}

/* =========================
   재사용 소컴포넌트
   ========================= */
function Tag({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex py-[4px] px-[8px] justify-center items-center gap-[10px] rounded-[12px] shadow-[0_1px_4px_0_rgba(0,0,0,0.15)]",
        active
          ? "bg-black text-white font-suite text-[13px] not-italic font-normal leading-[150%] shadow-[0_1px_4px_0_rgba(0,0,0,0.15)]"
          : "bg-white text-[#2A2A2E] font-suite text-[13px] not-italic font-normal leading-[150%] shadow-[0_1px_4px_0_rgba(0,0,0,0.15)]",
      ].join(" ")}
    >
      #{label}
    </button>
  );
}

function SearchBar({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="flex w-full items-center rounded-[10px] bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.15)] px-4 py-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("board.searchPlaceholder")}
          className="flex-1 text-black placeholder:text-[#A1A1AA] font-suite text-[16px] not-italic font-normal leading-[150%] outline-none"
        />
        <div className="flex items-center justify-center">
          <img
            src={SearchIcon}
            alt={t("board.searchPlaceholder")}
            className="w-[18px] h-[18px] flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================
   리스트 아이템
   ========================= */
function Toast({ message }) {
  if (!message) return null;
  return (
    // 레이아웃과 상호작용 완전 분리: fixed + z-index + pointer-events-none
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="inline-flex w-[300px] h-[83px] pt-[29px] pr-[68px] pb-[28px] pl-[69px] rounded-[16px] bg-white shadow-[0_3px_5px_0_rgba(0,0,0,0.10)]">
        <div className="text-black text-center font-[SUITE] text-[19px] leading-[130%]">
          {message}
        </div>
      </div>
    </div>
  );
}

function BoardItem({ item }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { category, title } = item;
  const [toast, setToast] = useState("");
  const { getTranslation } = useTranslations();

  const displayWriter = item.writer
    ? (() => {
      const translatedName = getTranslation(
        "writer",
        item?.id?.toString() || `temp-${Math.random()}`,
        "WriterName",
        item.writer
      );
      return translatedName.length > 20
        ? translatedName.substring(0, 20) + "..."
        : translatedName;
    })()
    : "";

  // 번역된 제목 사용 (부모 컴포넌트에서 전달받음)
  const translatedTitle = item.translatedTitle || title;

  const pillCls =
    category === "Notice"
      ? "bg-[#EF7063] text-white border border-[#EF7063] w-[42px]"
      : category === "Event"
        ? "bg-white text-[#EF7063] border border-[#EF7063] w-[42px]"
        : "bg-white text-[#71717A] border border-[#71717A] w-[42px]";

  // 종료 여부 판단(목록엔 시간이 없으므로, 필요한 경우 상세 1회 조회)
  const isEnded = (endISO) => {
    if (!endISO) return false;
    const endMs = Date.parse(endISO);
    if (Number.isNaN(endMs)) return false;
    return Date.now() > endMs;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // 이벤트가 아니면 바로 이동
    if (category !== "Event") {
      navigate(`/board/${item.id}`);
      return;
    }

    // 이벤트: 종료 여부 확인을 위해 상세 한 번 조회(캐시 사용)
    let startISO = null;
    let endISO = null;

    if (EVENT_TIME_CACHE.has(item.id)) {
      ({ start_time: startISO, end_time: endISO } = EVENT_TIME_CACHE.get(
        item.id
      ));
    } else {
      try {
        const res = await fetch(`${API_BASE}/board/${item.id}`, {
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const detail = await res.json();
          startISO = detail?.start_time ?? null;
          endISO = detail?.end_time ?? null;
          EVENT_TIME_CACHE.set(item.id, {
            start_time: startISO,
            end_time: endISO,
          });
        } else {
          // 상세를 못 받으면 차단 판단 불가 → 그냥 이동(정책에 따라 조정 가능)
          navigate(`/board/${item.id}`);
          return;
        }
      } catch {
        navigate(`/board/${item.id}`);
        return;
      }
    }

    // 종료된 이벤트면 토스트 2초 + 접속 차단
    if (isEnded(endISO)) {
      setToast(t("board.toast.endedEvent"));
      setTimeout(() => setToast(""), 2000);
      return;
    }

    // 시작 전/진행 중이면 접속 허용
    navigate(`/board/${item.id}`);
  };

  return (
    <>
      <li className="rounded-[12px] bg-white">
        <Link
          to={`/board/${item.id}`}
          onClick={handleClick}
          className="flex py-[13px] px-[10px] rounded-[10px] shadow-[0_1px_4px_0_rgba(0,0,0,0.15)] items-center justify-between gap-3 w-full"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`inline-flex h-[23px] w-[42px] shrink-0 items-center justify-center rounded-[8px] text-[10px] font-suite font-normal leading-none ${pillCls}`}
            >
              {t(
                category === "LostItem"
                  ? "board.tabs.lost"
                  : category
                  ? `board.tabs.${category.toLowerCase()}`
                  : "board.tabs.lost"
              ) ?? CATEGORY_MAP[category] ?? category}
            </span>
          </div>
          <div className="flex items-center gap-3 min-w-0 flex-1 justify-between">
            <p className="truncate text-[#52525B] font-suite text-[14px] not-italic font-semibold leading-[150%]">
              {translatedTitle}
            </p>
            {displayWriter && (
              <span className="text-[#52525B] font-suite text-[10px] not-italic font-normal leading-[150%] shrink-0">
                - {displayWriter}
              </span>
            )}
          </div>
        </Link>
      </li>

      {/* 독립적인 중앙 토스트 */}
      <Toast message={toast} />
    </>
  );
}

/* =========================
  페이지네이션
   ========================= */
function Pagination({ total, page, pageSize, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // 표시할 페이지 번호(버튼) 목록을 만든다. (최대 5개)
  const buildPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 총 페이지가 6 이상인 경우
    if (page <= 3) {
      // 예: 1 2 3 4 ... N
      return [1, 2, 3, 4, totalPages];
    }

    if (page >= totalPages - 2) {
      // 예: 1 ... N-3 N-2 N-1 N
      return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // 가운데 근처
    // 예: 1 ... p-1 p p+1 ... N  (버튼은 1, p-1, p, p+1, N)
    return [1, page - 1, page, page + 1, totalPages];
  };

  const pages = buildPages();

  // 인접하지 않는 구간 사이에만 '…'를 표시
  const withGaps = [];
  for (let i = 0; i < pages.length; i++) {
    const prev = pages[i - 1];
    const cur = pages[i];
    if (i > 0 && cur - prev > 1) withGaps.push("gap-" + i); // gap marker
    withGaps.push(cur);
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-lg bg-white px-3 py-2 text-sm disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black hover:bg-primary-400 hover:text-white"
      >
        &lt;
      </button>

      {withGaps.map((item) =>
        typeof item === "string" ? (
          // gap 표시 (실제 숨겨진 페이지가 있을 때만 보임)
          <span key={item} className="px-1 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={
              "rounded-lg px-3 py-2 text-sm " +
              (item === page
                ? "bg-primary-500 text-white"
                : "bg-white hover:bg-primary-400 hover:text-white")
            }
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-lg bg-white px-3 py-2 text-sm disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black hover:bg-primary-400 hover:text-white"
      >
        &gt;
      </button>
    </div>
  );
}

/* =========================
   메인 페이지 (프론트에서 필터+검색+페이지네이션 처리)
   ========================= */
/* =========================
   메인 페이지 (프론트에서 필터+검색+페이지네이션 처리)
   ========================= */
export default function Board() {
  const { t } = useTranslation();
  const location = useLocation();
  const { getTranslation } = useTranslations();
  const [keyword, setKeyword] = useState("");
  const [activeTag, setActiveTag] = useState(t("board.tabs.all"));

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [totalFromServer, setTotalFromServer] = useState(0);

  // 번역 훅 사용
  const { getTranslatedBoards } = useBoardTranslation(allItems);
  const { requestSingleTranslation } = useTranslations();

  // 작성자 이름 번역 요청
  useEffect(() => {
    if (!allItems || allItems.length === 0) return;

    allItems.forEach((item) => {
      if (item.writer) {
        requestSingleTranslation({
     entity_type: "writer",
     entity_id: item?.id?.toString() || `temp-${Math.random()}`, // ✅ 안전 처리
     field: "WriterName",
     source_lang: "ko",
     source_text: item.writer,
   });
      }
    });
  }, [allItems, requestSingleTranslation]);

  const BOARD_ENDPOINT = `${API_BASE}/board/`;

  useEffect(() => {
    const category = location.state?.category;
    const search = location.state?.search;

    if (category) {
      const koreanCategory = CATEGORY_MAP[category] || t("board.tabs.all");
      setActiveTag(koreanCategory);
    }

    if (search) {
      setKeyword(search);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(BOARD_ENDPOINT, {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`요청 실패: ${res.status} ${text}`);
        }

        const data = await res.json();
        const list = Array.isArray(data?.result) ? data.result : [];
        const total =
          typeof data?.total_count === "number"
            ? data.total_count
            : list.length;

        setAllItems(list);
        setTotalFromServer(total);
      } catch (e) {
        if (isAbortError(e)) {
          console.debug("Fetch aborted");
        } else {
          console.error(e);
          setError(e?.message || t("board.error"));
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  // ✅ keyword 바로 사용해서 필터링
  const serverCategory = KOR_TO_SERVER[activeTag];
  const kw = keyword.trim().toLowerCase();

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      const okCat =
        serverCategory === "ALL" ||
        !serverCategory ||
        item.category === serverCategory;

      const t = item.title?.toLowerCase() || "";
      const w = item.writer?.toLowerCase() || "";
      const b = item.booth_name?.toLowerCase() || "";
      const d = item.detail?.toLowerCase() || "";
      const okKw =
        !kw ||
        t.includes(kw) ||
        w.includes(kw) ||
        b.includes(kw) ||
        d.includes(kw);

      return okCat && okKw;
    });
  }, [allItems, serverCategory, kw]);

  // ✅ "전체"일 때만 상단 4개 공지 고정
  const reordered = useMemo(() => {
    if (activeTag !== t("board.tabs.all")) return filtered;

    const pinned = [];
    const rest = [];
    for (const it of filtered) {
      if (it.category === "Notice" && pinned.length < 4) {
        pinned.push(it);
      } else {
        rest.push(it);
      }
    }
    return [...pinned, ...rest];
  }, [filtered, activeTag]);

  // 페이지네이션은 재정렬된 배열 기준
  const totalForUI = reordered.length;
  const totalPages = Math.max(1, Math.ceil(totalForUI / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return reordered.slice(start, start + pageSize);
  }, [reordered, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  // ✅ 렌더링
  return (
    <div className="mx-auto max-w-screen-sm px-4 pb-4 flex flex-col">
      {/* 검색 */}
      <div className="pt-4">
        <SearchBar value={keyword} onChange={setKeyword} />
      </div>

      {/* 태그 */}
      <div className="mt-4 flex flex-wrap gap-[10px]">
        {[
          t("board.tabs.all"),
          t("board.tabs.notice"),
          t("board.tabs.event"),
          t("board.tabs.lost"),
        ].map((lbl) => (
          <Tag
            key={lbl}
            label={lbl}
            active={activeTag === lbl}
            onClick={() => setActiveTag(lbl)}
          />
        ))}
      </div>

      {/* 리스트 헤더 */}
      <div className="mt-6 mb-3">
        <h2 className="text-[#2A2A2E] font-suite text-[16px] ml-[2px] not-italic font-normal leading-normal">
          {t("board.header")}
        </h2>
      </div>

      {/* 리스트 영역 */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          {loading && (
            <div className="py-16 text-center text-gray-500">
              {t("board.loading")}
            </div>
          )}
          {!loading && error && (
            <div className="py-16 text-center text-rose-600">{error}</div>
          )}
          {!loading && !error && paged.length === 0 && (
            <EmptyState hasSearchKeyword={!!keyword} activeTag={activeTag} />
          )}
          {!loading && !error && paged.length > 0 && (
            <ul className="flex flex-col gap-[12px]">
              {paged.map((item) => {
                // 번역된 데이터 가져오기
                const translatedBoards = getTranslatedBoards();
                const translatedItem =
                  translatedBoards.find((board) => board.id === item.id) || item;
                return (
                <BoardItem
                  key={item.id || `board-${Math.random()}`} // ✅ fallback key
                  item={translatedItem}
                />
              );
              })}
            </ul>
          )}
        </div>

        {/* 페이지네이션 */}
        {!loading && !error && totalForUI > 0 && totalPages > 1 && (
          <Pagination
            total={totalForUI}
            page={page}
            pageSize={pageSize}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  );
}