import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardDetail, deleteBoard } from "../../apis/admin/stuco";

function PostDetail() {
  const { boardId } = useParams(); // ✅ 라우트와 일치시킴
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBoardDetail(boardId);
        setBoard(data);
      } catch (err) {
        console.error("상세 조회 실패:", err);
      }
    }
    fetchData();
  }, [boardId]);

  if (!board) return <div>로딩 중...</div>;

  return (
    <div className="p-4">
      {/* 카테고리에 따라 스타일 다르게 */}
      <span
        className={`px-2 py-1 rounded ${
          board.category === "Notice"
            ? "bg-red-400 text-white"
            : "bg-green-400 text-white"
        }`}
      >
        {board.category === "Notice" ? "공지" : "분실물"}
      </span>

      <h1 className="text-xl font-bold mt-2">{board.title}</h1>
      <p className="text-sm text-gray-500">작성자: {board.writer}</p>
      {board.location && <p>위치: {board.location}</p>}
      {board.image && (
        <img src={board.image} alt="첨부 이미지" className="mt-2 rounded" />
      )}
      <p className="mt-4">{board.content}</p>

      {/* 수정/삭제 버튼 */}
      <div className="mt-6 flex flex-col gap-2">
        <button
          className="bg-[#EF7063] text-white py-2 rounded"
          onClick={() =>
            navigate(
              board.category === "Notice"
                ? `/admin/stuco/notice/edit/${board.id}`
                : `/admin/stuco/lost/edit/${board.id}`
            )
          }
        >
          수정
        </button>
        <button
          className="bg-gray-400 text-white py-2 rounded"
          onClick={async () => {
            if (window.confirm("정말 삭제하시겠습니까?")) {
              await deleteBoard(boardId); // ✅ boardId 사용
              navigate("/admin/stuco"); // ✅ 목록 페이지로 이동
            }
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default PostDetail;
