// src/pages/Board/Board.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "../../assets/images/icons/board-icons/Search.svg";

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
   재사용 소컴포넌트
   ========================= */
function Tag({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex py-[4px] px-[8px] justify-center items-center gap-[10px] rounded-[12px]",
        active
          ? "bg-black text-white font-[SUITE] text-[12px] not-italic font-normal leading-[150%]"
          : "bg-white text-[#2A2A2E] font-[SUITE] text-[12px] not-italic font-normal leading-[150%]",
      ].join(" ")}
    >
      #{label}
    </button>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center rounded-[8px] bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.15)] px-4 py-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className="flex-1 text-black placeholder:text-[#A1A1AA] font-[SUITE] text-[12px] not-italic font-normal leading-[150%] outline-none"
        />
        <div className="flex items-center justify-center">
          <img
            src={SearchIcon}
            alt="검색"
            className="w-[13.875px] h-[14.219px] flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================
   리스트 아이템
   ========================= */
function BoardItem({ item }) {
  const { category, title } = item;
  const displayWriter = item.writer || item.booth_name || "";

  const pillCls =
    category === "Notice"
      ? "bg-[#EF7063] text-white border border-[#EF7063] w-[42px]"
      : category === "Event"
      ? "bg-white text-[#EF7063] border border-[#EF7063] w-[42px]"
      : "bg-white text-[#71717A] border border-[#71717A] w-[42px]";

  return (
    <li className="rounded-[12px] bg-white">
      <Link
        to={`/board/${item.id}`}
        className="flex h-[41px] py-[8px] px-[8px] items-center justify-between gap-3 w-full"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`inline-flex h-[23px] w-[42px] shrink-0 items-center justify-center rounded-[8px] text-[10px] font-[SUITE] font-normal leading-none ${pillCls}`}
          >
            {CATEGORY_MAP[category] ?? category}
          </span>
        </div>
        <div className="flex items-center gap-3 min-w-0 flex-1 justify-between">
          <p className="truncate text-[#52525B] font-[SUITE] text-[12px] not-italic font-semibold leading-[150%]">
            {title}
          </p>
          {displayWriter && (
            <span className="text-[#52525B] font-[SUITE] text-[10px] not-italic font-normal leading-[150%] shrink-0">
              - {displayWriter}
            </span>
          )}
        </div>
      </Link>
    </li>
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
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-lg border px-2 py-1 text-sm disabled:opacity-40"
      >
        이전
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
              "rounded-lg border px-2 py-1 text-sm " +
              (item === page ? "bg-black text-white border-black" : "")
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
        className="rounded-lg border px-2 py-1 text-sm disabled:opacity-40"
      >
        다음
      </button>
    </div>
  );
}


/* =========================
   메인 페이지 (프론트에서 필터+검색+페이지네이션 처리)
   ========================= */
export default function Board() {
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [activeTag, setActiveTag] = useState("전체");

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [totalFromServer, setTotalFromServer] = useState(0);

  const BOARD_ENDPOINT = `${API_BASE}/board/`;

  useEffect(() => {
    const category = location.state?.category;
    const search = location.state?.search;

    if (category) {
      const koreanCategory = CATEGORY_MAP[category] || "전체";
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
          setError(e?.message || "게시글을 불러오지 못했습니다.");
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

  // 검색/태그 변경 시 1페이지로
  useEffect(() => {
    setPage(1);
  }, [keyword, activeTag]);

  const clickTag = (korLabel) => setActiveTag(korLabel);

  const totalForUI = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalForUI / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  return (
    <div className="mx-auto max-w-screen-sm px-4 pb-4">
      {/* 검색 */}
      <div className="pt-4">
        <SearchBar value={keyword} onChange={setKeyword} />
      </div>

      {/* 태그 */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["전체", "공지", "이벤트", "분실물"].map((lbl) => (
          <Tag
            key={lbl}
            label={lbl}
            active={activeTag === lbl}
            onClick={() => clickTag(lbl)}
          />
        ))}
      </div>

      {/* 리스트 헤더 */}
      <div className="mt-6 mb-5">
        <h2 className="text-[#2A2A2E] font-[SUITE] text-[16px] not-italic font-normal leading-normal">
          게시물
        </h2>
      </div>

      {/* 리스트 */}
      <div className="min-h-[320px]">
        {loading && (
          <div className="py-16 text-center text-gray-500">불러오는 중…</div>
        )}
        {!loading && error && (
          <div className="py-16 text-center text-rose-600">{error}</div>
        )}
        {!loading && !error && paged.length === 0 && (
          <div className="text-[#2A2A2E] font-[SUITE] text-[10px] not-italic font-normal leading-[150%]">
            현재 게시물이 없습니다
          </div>
        )}
        {!loading && !error && paged.length > 0 && (
          <ul className="flex flex-col gap-[8px]">
            {paged.map((item) => (
              <BoardItem key={item.id} item={item} />
            ))}
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
  );
}
