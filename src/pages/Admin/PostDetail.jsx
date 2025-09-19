import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardDetail } from "../../apis/admin/stuco";

function BoardDetail() {
  const { board_id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    async function fetchBoard() {
      try {
        const data = await getBoardDetail(board_id);
        setBoard(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoard();
  }, [board_id]);

  if (!board) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{board.title}</h1>
      <p>{board.content}</p>
      <p>작성자: {board.writer}</p>
      {board.image && <img src={board.image} alt="첨부 이미지" />}
      {board.location && <p>위치: {board.location}</p>}
    </div>
  );
}

export default BoardDetail;
