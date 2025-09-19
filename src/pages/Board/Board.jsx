import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="w-full"
    >
      <div className="flex w-full items-center rounded-[8px] bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.15)] px-4 py-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className="flex-1 text-[#A1A1AA] font-[SUITE] text-[12px] not-italic font-normal leading-[150%] outline-none"
        />
        <button type="submit" className="flex items-center justify-center">
          <img
            src={SearchIcon}
            alt="검색"
            className="w-[13.875px] h-[14.219px] flex-shrink-0"
          />
        </button>
      </div>
    </form>
  );
}

function BoardItem({ item }) {
  const { category, title, writer } = item;

  // 카테고리별 태그 스타일
  const pillCls =
    category === "Notice"
      ? "bg-[#EF7063] text-white border border-[#EF7063] w-[42px]"
      : category === "Event"
      ? "bg-white text-[#EF7063] border border-[#EF7063] w-[42px]"
      : "bg-white text-[#71717A] border border-[#71717A] w-[42px]";

  return (
    <li className="rounded-[12px] bg-white">
      {/* 게시물 클릭 → 상세 페이지 이동 */}
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
          <p className="truncate text-[#52525B] font-[SUITE] text-[12px] not-italic font-semibold leading-[150%]">
            {title}
          </p>
        </div>
        <span className="text-[#52525B] font-[SUITE] text-[10px] not-italic font-normal leading-[150%] shrink-0">
          - {writer}
        </span>
      </Link>
    </li>
  );
}


function Pagination({ total, page, pageSize, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const windowSize = 5;
  const start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-lg border px-2 py-1 text-sm disabled:opacity-40"
      >
        이전
      </button>

      {start > 1 && (
        <>
          <button
            className="rounded-lg border px-2 py-1 text-sm"
            onClick={() => onChange(1)}
          >
            1
          </button>
          <span className="px-1 text-gray-400">…</span>
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={
            "rounded-lg border px-2 py-1 text-sm " +
            (p === page ? "bg-black text-white border-black" : "")
          }
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          <span className="px-1 text-gray-400">…</span>
          <button
            className="rounded-lg border px-2 py-1 text-sm"
            onClick={() => onChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
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
   메인 페이지
   ========================= */
export default function Board() {
  // UI 상태
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [activeTag, setActiveTag] = useState("전체");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // 데이터 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rawList, setRawList] = useState([]);
  const [serverTotal, setServerTotal] = useState(0);

  // 서버 호출 함수 (GET 시도 → 실패 시 POST 폴백)
  const requestBoard = async (signal) => {
    const serverCategory = KOR_TO_SERVER[activeTag];
    const params = new URLSearchParams();
    if (serverCategory && serverCategory !== "ALL")
      params.set("category", serverCategory);
    if (submittedKeyword) params.set("q", submittedKeyword);
    params.set("page", String(page));
    params.set("limit", String(pageSize));

    // 1) GET
    try {
      const res = await fetch(`${API_BASE}/board?${params.toString()}`, {
        method: "GET",
        signal,
        headers: { Accept: "application/json" },
      });
      if (res.ok) return res.json();
    } catch (e) {
      if (isAbortError(e)) throw e; // 상위에서 무시하도록 전달
      // GET 자체가 실패(CORS/네트워크 등) → 아래 POST 폴백 시도
    }

    // 2) POST 폴백 (백엔드가 body만 받는 경우 대비)
    const postRes = await fetch(`${API_BASE}/board`, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        category: serverCategory === "ALL" ? undefined : serverCategory,
        q: submittedKeyword || undefined,
        page,
        limit: pageSize,
      }),
    });

    if (!postRes.ok) {
      const text = await postRes.text().catch(() => "");
      throw new Error(`요청 실패: ${postRes.status} ${text}`);
    }
    return postRes.json();
  };

  // 로드 & 의존성 변화시 호출
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_BASE) {
          throw new Error(
            "API 베이스 주소가 설정되지 않았습니다. .env의 VITE_API_BASE_URL을 확인하세요."
          );
        }

        const data = await requestBoard(controller.signal);

        // 방어적 파싱
        const list = Array.isArray(data?.board) ? data.board : [];
        const total =
          typeof data?.total_count === "number" ? data.total_count : list.length;

        setRawList(list);
        setServerTotal(total);
      } catch (e) {
        // ✅ StrictMode로 인해 발생한 AbortError는 화면 에러로 노출하지 않음
        if (isAbortError(e)) {
          // 콘솔만 참고용으로 남기고 화면 에러는 표시하지 않음
          console.debug("Fetch aborted (expected in dev StrictMode)");
        } else {
          console.error(e);
          setError(
            e?.message ||
              "게시글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요."
          );
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
    // page 포함: 서버가 페이지 파라미터를 받지 않아도 문제 없음(클라에서 보정)
  }, [activeTag, submittedKeyword, page]);

  // 클라 보정(서버 미지원 대비)
  const filtered = useMemo(() => {
    const serverCategory = KOR_TO_SERVER[activeTag];
    const kw = (submittedKeyword || "").trim().toLowerCase();
    return rawList.filter((item) => {
      const okCat =
        serverCategory === "ALL" ||
        !serverCategory ||
        item.category === serverCategory;
      const okKw =
        !kw ||
        item.title?.toLowerCase().includes(kw) ||
        item.writer?.toLowerCase().includes(kw);
      return okCat && okKw;
    });
  }, [rawList, activeTag, submittedKeyword]);

  const totalCount =
    serverTotal > 0 ? Math.max(serverTotal, filtered.length) : filtered.length;

  const paged = useMemo(() => {
    if (rawList.length <= pageSize && (serverTotal === 0 || serverTotal <= pageSize)) {
      return filtered;
    }
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, rawList.length, page, pageSize, serverTotal]);

  // 핸들러
  const submitSearch = () => {
    setPage(1);
    setSubmittedKeyword(keyword);
  };
  const clickTag = (korLabel) => {
    setActiveTag(korLabel);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-screen-sm px-4 pb-4">
      {/* 검색 */}
      <div className="pt-4">
        <SearchBar value={keyword} onChange={setKeyword} onSubmit={submitSearch} />
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
        <h2 className="text-[#2A2A2E] font-[SUITE] text-[16px] not-italic font-normal leading-normal">게시물</h2>
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
          <div className="text-[#2A2A2E] font-[SUITE] text-[10px] not-italic font-normal leading-[150%]">현재 진행 중인 이벤트가 없습니다</div>
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
      {!loading && !error && totalCount > 0 && (
        <Pagination
          total={totalCount}
          page={page}
          pageSize={pageSize}
          onChange={setPage}
        />
      )}
    </div>
  );
}
