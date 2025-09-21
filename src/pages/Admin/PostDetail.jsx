import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardDetail, deleteBoard } from "../../apis/admin/festa";
import SubmitBtn from "../../components/AdminComponents/SubmitBtn"; // ✅ 공용 버튼 가져오기
import Popup from "../../components/AdminComponents/Popup";

function PostDetail() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBoardDetail(boardId);
        console.log("board 응답:", data); // 전체 구조 출력
        setBoard(data);
      } catch (err) {
        console.error("상세 조회 실패:", err);
      }
    }
    fetchData();
  }, [boardId]);

  if (!board) return <div className="grid place-items-center mt-[400px]">loading..⌛</div>;

  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 min-h-screen">
      {/* 카테고리 뱃지 */}
      <span
        className={`inline-block px-3 py-1 text-sm font-semibold rounded ${
          board.category === "Notice"
            ? "bg-red-400 text-white"
            : "bg-green-500 text-white"
        }`}
      >
        {board.category === "Notice" ? "공지" : "분실물"}
      </span>

      {/* 제목 */}
      <h1 className="text-2xl font-bold mt-3">{board.title}</h1>

      {/* 작성자 / 위치 */}
      <p className="text-sm text-gray-500 mt-1">작성자 : {board.writer}</p>
      {board.location && (
        <p className="text-sm text-gray-500">발견 위치 : {board.location}</p>
      )}

      {/* 본문 */}
      <p className="mt-4 leading-relaxed">{board.content}</p>

      {/* 이미지 */}
      {board.image && (
        <img
          src={board.image}
          alt="첨부 이미지"
          className="mt-4 rounded-lg shadow"
        />
      )}

      {/* 수정/삭제 버튼 */}
      <div className="mt-6 flex flex-col gap-3">
        <SubmitBtn
          text="수정"
          onClick={() =>
            navigate(
              board.category === "Notice"
                ? `/admin/festa/notice/edit/${board.id}`
                : `/admin/festa/lost/edit/${board.id}`,
              { state: board }
            )
          }
        />
        <SubmitBtn text="삭제" onClick={() => setIsPopupOpen(true)} />
      </div>

      {/* ✅ 삭제 확인 모달 */}
      {isPopupOpen && (
        <Popup
          text="정말 삭제하시겠습니까?"
          buttontext="삭제하기"
          onSubmit={async () => {
            try {
              await deleteBoard(boardId);
              navigate("/admin/festa");
            } catch (err) {
              console.error("삭제 실패:", err);
            } finally {
              setIsPopupOpen(false);
            }
          }}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
}

export default PostDetail;
