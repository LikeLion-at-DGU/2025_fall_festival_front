// src/pages/Board/Board.jsx

import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";
import { useTranslation } from "react-i18next";
import { useBoardTranslation } from "../../hooks/useTranslation";
import { useTranslations } from "../../context/TranslationContext";
const EVENT_TIME_CACHE = new Map();
import SearchIcon from "../../assets/images/icons/map-icons/Search.svg";
import EmptyLogo from "../../assets/images/icons/logo/empty-logo.png";
import dirvana from "../../assets/images/icons/Timetable-icons/DIRVANA.svg";

/* =========================
   환경변수 기반 API 베이스
   ========================= */
const API_BASE = "/api";
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
          ? "bg-[#E65B4D] text-white font-suite text-[13px] not-italic font-normal leading-[150%] shadow-[0_1px_4px_0_rgba(0,0,0,0.15)]"
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
      <div className="flex w-full items-center rounded-[10px] bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.15)] py-[8px] px-[16px]">
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
            className="w-[16px] h-[16px] flex-shrink-0 opacity-60"
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="inline-flex w-[300px] h-[83px] pt-[29px] pr-[68px] pb-[28px] pl-[69px] rounded-[16px] bg-white shadow-[0_3px_5px_0_rgba(0,0,0,0.10)]">
        <div className="text-black text-center font-suite text-[19px] leading-[130%]">
          {message}
        </div>
      </div>
    </div>
  );
}

const BoardItem = ({ item, currentCategory }) => {
  const { t } = useTranslation();
  const navigate = usePrefixedNavigate();
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

  const translatedTitle = item.translatedTitle || title;

  const pillCls =
    category === "Notice"
      ? "bg-white text-[#D33E2F] w-[42px]"
      : category === "Event" || category === "LostItem"
      ? "bg-white text-[#A1A1AA] w-[42px]" 
      : "bg-white text-[#71717A] w-[42px]"; 

  const separatorCls = "w-[1px] h-[12px] bg-[#D1D5DB] mx-2"; 

  const isEnded = (endISO) => {
    if (!endISO) return false;
    const endMs = Date.parse(endISO);
    if (Number.isNaN(endMs)) return false;
    return Date.now() > endMs;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (category !== "Event") {
      navigate(`/board/${item.id}`, { state: { category: currentCategory } });
      return;
    }

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
          navigate(`/board/${item.id}`, { state: { category: currentCategory } });
          return;
        }
      } catch {
        navigate(`/board/${item.id}`, { state: { category: currentCategory } });
        return;
      }
    }

    if (isEnded(endISO)) {
      setToast(t("board.toast.endedEvent"));
      setTimeout(() => setToast(""), 2000);
      return;
    }

    navigate(`/board/${item.id}`, { state: { category: currentCategory } });
  };

  return (
    <>
      <li className="rounded-[12px] bg-white">
        <Link
          to={`/board/${item.id}`}
          onClick={handleClick}
          className="flex py-[10px] pl-[8.5px] pr-[13px] rounded-[10px] shadow-[0_1px_4px_0_rgba(0,0,0,0.15)] items-center justify-between gap-1.5 w-full"
        >
          <div className="flex items-center min-w-0">
            <span
              className={`inline-flex h-[23px] w-[42px] shrink-0 items-center justify-center rounded-[8px] text-[11px] font-suite font-normal leading-none ${pillCls}`}
            >
              #{t(
                category === "LostItem"
                  ? "board.tabs.lost"
                  : category
                  ? `board.tabs.${category.toLowerCase()}`
                  : "board.tabs.lost"
              ) ?? CATEGORY_MAP[category] ?? category}
            </span>
            <div className={separatorCls}></div>
          </div>
          <div className="flex items-center min-w-0 flex-1 justify-between">
            <p className="truncate text-[#52525B] font-suite text-[14px] not-italic font-semibold leading-[150%]">
              {translatedTitle}
            </p>
            {displayWriter && (
              <span className="text-[#52525B] font-suite text-[12px] not-italic font-normal leading-[150%] shrink-0">
                - {displayWriter}
              </span>
            )}
          </div>
        </Link>
      </li>
      <Toast message={toast} />
    </>
  );
};

/* =========================
  페이지네이션
   ========================= */
function Pagination({ total, page, pageSize, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const buildPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 3) {
      return [1, 2, 3, 4, totalPages];
    }
    if (page >= totalPages - 2) {
      return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, page - 1, page, page + 1, totalPages];
  };

  const pages = buildPages();

  const withGaps = [];
  for (let i = 0; i < pages.length; i++) {
    const prev = pages[i - 1];
    const cur = pages[i];
    if (i > 0 && cur - prev > 1) withGaps.push("gap-" + i);
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
          <span key={item} className="text-gray-400 mr-[-8px] ml-[-8px]">
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
   메인 페이지
   ========================= */
export default function Board() {
  const { t } = useTranslation();
  const location = useLocation();
  const { getTranslation } = useTranslations();
  const [keyword, setKeyword] = useState("");
  const [activeTag, setActiveTag] = useState("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [totalFromServer, setTotalFromServer] = useState(0);
  const { getTranslatedBoards } = useBoardTranslation(allItems);
  const { requestSingleTranslation } = useTranslations();

  useEffect(() => {
    if (!allItems || allItems.length === 0) return;
    allItems.forEach((item) => {
      if (item.writer) {
        requestSingleTranslation({
          entity_type: "writer",
          entity_id: item?.id?.toString() || `temp-${Math.random()}`,
          field: "WriterName",
          source_lang: "ko",
          source_text: item.writer,
        });
      }
    });
  }, [allItems, requestSingleTranslation]);

  const BOARD_ENDPOINT = `${API_BASE}/board/`;

  // ✅ CORRECTED: This effect now properly restores the category from navigation state
  useEffect(() => {
    const category = location.state?.category;
    const search = location.state?.search;

    if (category) {
      setActiveTag(category);
    }

    if (search) {
      setKeyword(search);
    }
  }, [location.state]); // ✅ Dependency array changed to listen for state changes

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
          typeof data?.total_count === "number" ? data.total_count : list.length;
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

  const serverCategory = activeTag;
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

  const reordered = useMemo(() => {
    if (activeTag !== "ALL") return filtered;
  
    // 공지 항목을 먼저 필터링하고 4개만 가져오기
    const notices = filtered
      .filter((it) => it.category === "Notice")
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 4); // 상위 4개 공지
  
    // 나머지 항목 (공지 제외) 가져오기
    const rest = filtered.filter((it) => it.category !== "Notice");
  
    // 상위 4개의 공지를 먼저 배치하고, 나머지 게시물(rest) 그대로 추가
    const remainingNotices = filtered.filter(
      (it) => it.category === "Notice" && !notices.includes(it)
    );
  
    // 나머지 공지를 이어서 추가하고, 나머지 게시물은 백엔드 순서대로 추가
    return [...notices, ...rest, ...remainingNotices];
  }, [filtered, activeTag]);

  const totalForUI = reordered.length;
  const totalPages = Math.max(1, Math.ceil(totalForUI / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return reordered.slice(start, start + pageSize);
  }, [reordered, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  return (
    <div className="mx-auto max-w-screen-sm px-[19px] pb-4 flex flex-col">
      <div className="pt-[24px]">
        <SearchBar value={keyword} onChange={setKeyword} />
      </div>
      <div className="mt-4 flex flex-wrap gap-[10px]">
        {["ALL", "Notice", "Event", "LostItem"].map((cat) => {
          const key = cat === "LostItem" ? "lost" : cat.toLowerCase();
          return (
            <Tag
              key={cat}
              label={t(`board.tabs.${key}`)}
              active={activeTag === cat}
              onClick={() => setActiveTag(cat)}
            />
          );
        })}
      </div>
      <div className="mt-7 mb-3">
        <h2 className="text-[#2A2A2E] font-suite text-[16px] not-italic font-normal leading-[130%]">
          {t("board.header")}
        </h2>
      </div>
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
                const translatedBoards = getTranslatedBoards();
                const translatedItem =
                  translatedBoards.find((board) => board.id === item.id) || item;
                return (
                  <BoardItem
                    key={item.id || `board-${Math.random()}`}
                    item={translatedItem}
                    currentCategory={activeTag} // ✅ Pass the active tag down
                  />
                );
              })}
            </ul>
          )}
        </div>
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