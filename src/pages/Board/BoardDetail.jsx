// src/pages/Board/BoardDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BoardDetailHeader from "../../components/Header/BoardDetailHeader";
import BoothCard from "../../components/MapComponents/BoothCard";
import { formatTimeWithDay } from "../../utils/dateUtils";

// .env 설정
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

// 카테고리 맵
const CATEGORY_MAP = {
  ALL: "전체",
  Notice: "공지",
  Event: "이벤트",
  LostItem: "분실물",
};

// 카테고리별 pill 스타일
const pillClsByCategory = (category) =>
  category === "Notice"
    ? "bg-[#EF7063] text-white border border-[#EF7063] w-[42px]"
    : category === "Event"
    ? "bg-white text-[#EF7063] border border-[#EF7063] w-[42px]"
    : "bg-white text-[#71717A] border border-[#71717A] w-[42px]";

// 태그 컴포넌트
function TagPill({ category }) {
  return (
    <span
      className={`inline-flex h-[23px] w-[42px] shrink-0 items-center justify-center rounded-[8px] text-[10px] font-[SUITE] font-normal leading-none ${pillClsByCategory(
        category
      )}`}
    >
      {CATEGORY_MAP[category] ?? category}
    </span>
  );
}

// AbortError 무시
const isAbortError = (e) =>
  e?.name === "AbortError" ||
  (typeof e?.message === "string" && e.message.toLowerCase().includes("abort"));

// 간단한 날짜/시간 포맷터
function fmtDateTime(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const pad = (n) => String(n).padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
  } catch {
    return iso;
  }
}

export default function BoardDetail() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);

  // 부스 정보 상태 (이벤트 + booth_id 일 때만 로드)
  const [boothRaw, setBoothRaw] = useState(null);
  const [boothLoading, setBoothLoading] = useState(false);
  const [boothError, setBoothError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError("");
      setBoothRaw(null);
      setBoothError("");

      try {
        if (!API_BASE) throw new Error("API BASE 설정이 없습니다.");

        // 상세 요청
        const res = await fetch(`${API_BASE}/board/${boardId}`, {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`상세 요청 실패: ${res.status}`);
        const data = await res.json();
        setPost(data);

        // 관련 게시물 요청
        const r = await fetch(`${API_BASE}/board/${boardId}/related`, {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (r.ok) {
          const rel = await r.json();
          setRelated(Array.isArray(rel?.related) ? rel.related.slice(0, 3) : []);
        } else {
          setRelated([]);
        }

        // 이벤트 + booth_id 가 있으면 부스 상세 로드
        if (data?.category === "Event" && data?.booth_id) {
          setBoothLoading(true);
          await fetchBoothById({
            apiBase: API_BASE,
            boothId: data.booth_id,
            signal: controller.signal,
            onSuccess: (booth) => setBoothRaw(booth),
            onError: (msg) =>
              setBoothError(msg || "부스 정보를 불러오지 못했습니다."),
          });
        }
      } catch (e) {
        if (!isAbortError(e)) {
          console.error(e);
          setError(e?.message || "게시글을 불러오지 못했습니다.");
        }
      } finally {
        setBoothLoading(false);
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [boardId]);

  const isNotice = post?.category === "Notice";
  const isLost = post?.category === "LostItem";
  const isEvent = post?.category === "Event";

  // 이벤트 스키마 대비: content가 없으면 detail 사용
  const contentText = post?.content ?? post?.detail ?? "";

  // 본문 텍스트 파싱
  const paragraphs = useMemo(() => {
    if (!contentText) return [];
    return String(contentText).split(/\n+/);
  }, [contentText]);

  // 이벤트/공지/분실물 작성자 보정: writer 없으면 booth_name 사용
  const displayWriter = post?.writer || post?.booth_name || "";

  // 이벤트 시간 보정: start_time ~ end_time (또는 기존 event_time)
  const eventTime =
    post?.event_time ||
    (post?.start_time && post?.end_time
      ? `${fmtDateTime(post.start_time)} ~ ${fmtDateTime(post.end_time)}`
      : post?.start_time
      ? fmtDateTime(post.start_time)
      : "");

  // 이벤트 부스 정보 보정: booth_location이 없다면 booth_name을 부스명으로 표시
  const boothLabel =
    post?.booth_location ||
    (post?.booth_name ? `부스명: ${post.booth_name}` : "");

  // BoothCard가 기대하는 형태로 변환
  const boothCardProps = useMemo(() => {
    if (!boothRaw) return null;

    // boothRaw 예시 스키마:
    // {
    //   booth_id, name, location:{name}, business_days, start_time, end_time,
    //   like_cnt, is_event, is_dorder, ...
    // }
    const id = boothRaw.booth_id ?? boothRaw.id;
    const title = boothRaw.name ?? "";
    const locationName = boothRaw.location?.name ?? "";
    const timeText = formatTimeWithDay(
      boothRaw.business_days,
      boothRaw.start_time,
      boothRaw.end_time
    );
    const likes = boothRaw.like_cnt ?? 0;
    const badges = {
      isEventActive: !!boothRaw.is_event,
      isDOrderPartner: !!boothRaw.is_dorder,
    };

    return {
      boothId: id,
      title,
      location: locationName,
      time: timeText,
      isOperating: true, // 상세 페이지에서는 운영중 여부 표시를 단순화
      likesCount: likes,
      badges,
    };
  }, [boothRaw]);

  const handleClickBoothCard = () => {
    if (!boothCardProps?.boothId) return;
    navigate(`/booth/${boothCardProps.boothId}`);
  };

  return (
    <div className="mx-auto w-full max-w-[430px] bg-white">
      {/* 상단 고정 헤더 */}
      <BoardDetailHeader />

      <main className="">
        <div className="px-5 min-h-[calc(100vh)] flex flex-col">
          {loading && (
            <div className="py-16 text-center text-gray-500">불러오는 중…</div>
          )}
          {!loading && error && (
            <div className="py-16 text-center text-rose-600">{error}</div>
          )}
          {!loading && !error && post && (
            <>
              {/* 가변 본문 */}
              <div className="flex-1">
                {/* 태그 */}
                <div className="flex w-[335px] py-[20px] flex-col items-start gap-[24px]">
                  <TagPill category={post.category} />
                </div>

                {/* 제목 */}
                <h1 className="text-[#2A2A2E] font-[SUITE] text-[24px] not-italic font-semibold leading-[130%]">
                  {post.title}
                </h1>

                {/* 작성자/위치/시간 */}
                <div className="text-[#71717A] font-[SUITE] text-[14px] not-italic font-normal leading-[150%] mt-[4px]">
                  {displayWriter && (
                    <p>
                      <span className="text-gray-400">작성자 : </span>
                      <span className="text-gray-600">{displayWriter}</span>
                    </p>
                  )}

                  {isLost && post?.location && (
                    <p>
                      <span className="text-gray-400">발견 위치 : </span>
                      <span className="text-gray-600">{post.location}</span>
                    </p>
                  )}

                  {isEvent && (boothLabel || eventTime) && (
                    <>
                      {boothLabel && (
                        <p>
                          <span className="text-gray-400">부스 위치 : </span>
                          <span className="text-gray-600">
                            {boothCardProps?.location ?? boothLabel}
                          </span>
                        </p>
                      )}
                      {eventTime && (
                        <p>
                          <span className="text-gray-400">이벤트 시간 : </span>
                          <span className="text-gray-600">{eventTime}</span>
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* 본문 텍스트 */}
                {paragraphs.length > 0 && (
                  <section className="text-[#2A2A2E] font-[SUITE] text-[16px] not-italic font-normal leading-[150%] mt-[24px]">
                    {paragraphs.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </section>
                )}

                {/* 본문 이미지 (옵션) */}
                {post?.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="mt-5 w-full rounded-2xl object-cover shadow"
                  />
                )}
                {Array.isArray(post?.images) &&
                  post.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${post.title}-${i + 1}`}
                      className="mt-5 w-full rounded-2xl object-cover shadow"
                    />
                  ))}

                {/* 부스 카드 (이벤트 + booth_id 있을 때, 정상 데이터면 표시) */}
                {isEvent && post?.booth_id && (
                  <div className="mt-6">
                    {boothLoading && (
                      <div className="text-sm text-gray-500">
                        부스 정보를 불러오는 중…
                      </div>
                    )}
                    {boothError && (
                      <div className="text-sm text-rose-600">{boothError}</div>
                    )}
                    {boothCardProps && (
                      <div
                        className="cursor-pointer"
                        onClick={handleClickBoothCard}
                      >
                        <BoothCard
                          boothId={boothCardProps.boothId}
                          title={boothCardProps.title}
                          location={boothCardProps.location}
                          time={boothCardProps.time}
                          isOperating={boothCardProps.isOperating}
                          likesCount={boothCardProps.likesCount}
                          badges={boothCardProps.badges}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* --- 다른 게시물: 하단 고정 + 배경 #F4F4F5 --- */}
              <section className="-mx-5 mt-8 bg-[#F4F4F5] px-5 py-[32px]">
                <div className="text-[#2A2A2E] font-[SUITE] text-[20px] not-italic font-normal mb-[16px]">
                  다른 게시물
                </div>

                <ul className="mt-3 flex flex-col gap-[4px]">
                  {related.slice(0, 3).map((item) => {
                    const pillCls = pillClsByCategory(item.category);
                    const writerOrBooth = item.writer || item.booth_name || "";
                    return (
                      <li
                        key={item.id}
                        className="rounded-[12px] bg-white border border-gray-100 px-3 py-2 shadow-sm"
                      >
                        <Link
                          to={`/board/${item.id}`}
                          className="flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`inline-flex h-[23px] w-[42px] shrink-0 items-center justify-center rounded-[8px] text-[10px] font-[SUITE] font-normal leading-none ${pillCls}`}
                            >
                              {CATEGORY_MAP[item.category] ?? item.category}
                            </span>
                            <p className="truncate text-[#52525B] font-[SUITE] text-[12px] not-italic font-semibold leading-[150%]">
                              {item.title}
                            </p>
                          </div>
                          {writerOrBooth && (
                            <span className="shrink-0 text-[#52525B] font-[SUITE] text-[10px]">
                              - {writerOrBooth}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                  {related.length === 0 && (
                    <li className="py-10 text-center text-gray-400">
                      관련 게시물이 없습니다.
                    </li>
                  )}
                </ul>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================
   부스 상세 조회 (API는 /booths/:id/ 사용)
   ========================= */
async function fetchBoothById({
  apiBase,
  boothId,
  signal,
  onSuccess,
  onError,
}) {
  // 실제 운영 API 우선 → 그 외는 폴백
  const candidates = [
    `${apiBase}/booths/${boothId}/`,          // ✅ 주요 엔드포인트
    `${apiBase}/booths/detail/${boothId}/`,   // fallback
    `${apiBase}/booths/${boothId}`,           // fallback (슬래시 없음)
  ];

  try {
    for (const url of candidates) {
      try {
        const res = await fetch(url, {
          method: "GET",
          signal,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          onSuccess?.(data);
          return;
        }
      } catch (e) {
        if (isAbortError(e)) throw e;
        // 실패해도 다음 후보 시도
      }
    }
    onError?.("부스 상세 엔드포인트를 찾지 못했습니다.");
  } catch (e) {
    if (!isAbortError(e)) {
      console.error(e);
      onError?.("부스 정보를 불러오는 중 오류가 발생했습니다.");
    }
  }
}
