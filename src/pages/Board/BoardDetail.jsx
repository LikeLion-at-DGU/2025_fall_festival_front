import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BoardDetailHeader from "../../components/Header/BoardDetailHeader";
import BoothCard from "../../components/MapComponents/BoothCard";

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

export default function BoardDetail() {
  const { boardId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError("");
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
      } catch (e) {
        if (!isAbortError(e)) {
          console.error(e);
          setError(e?.message || "게시글을 불러오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [boardId]);

  const isNotice = post?.category === "Notice";
  const isLost = post?.category === "LostItem";
  const isEvent = post?.category === "Event";

  // 본문 텍스트 파싱
  const paragraphs = useMemo(() => {
    if (!post?.content) return [];
    return String(post.content).split(/\n+/);
  }, [post]);

  return (
    <div className="mx-auto w-full max-w-[430px] bg-white">
      {/* 상단 고정 헤더 */}
      <BoardDetailHeader />
      <div className="h-[4px] bg-[#F4F4F5]" />
      <main className="">
        <div className="px-5 min-h-[calc(100vh-54px-62px)] flex flex-col">
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
                  {post?.writer && (
                    <p>
                      <span className="text-gray-400">작성자 : </span>
                      <span className="text-gray-600">{post.writer}</span>
                    </p>
                  )}
                  {isLost && post?.location && (
                    <p>
                      <span className="text-gray-400">발견 위치 : </span>
                      <span className="text-gray-600">{post.location}</span>
                    </p>
                  )}
                  {isEvent && (post?.booth_location || post?.event_time) && (
                    <>
                      {post?.booth_location && (
                        <p>
                          <span className="text-gray-400">부스 위치 : </span>
                          <span className="text-gray-600">
                            {post.booth_location}
                          </span>
                        </p>
                      )}
                      {post?.event_time && (
                        <p>
                          <span className="text-gray-400">이벤트 시간 : </span>
                          <span className="text-gray-600">{post.event_time}</span>
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

                {/* 본문 이미지 */}
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

                {/* 부스 카드 */}
                {post?.booth && (
                  <div className="mt-6">
                    <BoothCard booth={post.booth} />
                  </div>
                )}
              </div>

              {/* --- 다른 게시물: 하단 고정 + 배경 #F4F4F5 --- */}
              <section className="-mx-5 mt-8 bg-[#F4F4F5] px-5 py-4">
                <div className="text-lg font-semibold text-gray-800">
                  다른 게시물
                </div>

                <ul className="mt-3 flex flex-col gap-3">
                  {related.slice(0, 3).map((item) => {
                    const pillCls = pillClsByCategory(item.category);
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
                            <p className="truncate text-[15px] text-[#52525B] font-[SUITE] font-semibold">
                              {item.title}
                            </p>
                          </div>
                          <span className="shrink-0 text-[#52525B] font-[SUITE] text-[10px]">
                            - {item.writer}
                          </span>
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
