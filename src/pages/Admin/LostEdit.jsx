// 폐기 예정
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBoardDetail, updateNotice, deleteNotice } from "../../apis/board";
import SubmitBtn from "../../components/AdminComponents/SubmitBtn";

function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getBoardDetail("notices", id); // GET /board/notices/:id
      setNotice(data);
    }
    fetchData();
  }, [id]);

  if (!notice) return <p>로딩 중...</p>;

  const handleUpdate = async () => {
    await updateNotice(id, {
      title: notice.title,
      content: notice.content,
    });
    alert("수정 완료");
  };

  const handleDelete = async () => {
    await deleteNotice(id);
    alert("삭제 완료");
    navigate(-1);
  };

  return (
    <div className="p-6">
      <span className="px-2 py-1 text-sm rounded bg-red-400 text-white">
        공지
      </span>
      <h2 className="text-xl font-bold mt-2">{notice.title}</h2>
      <p className="text-sm text-gray-600">작성자: {notice.writer}</p>
      <p className="mt-4">{notice.content}</p>

      <div className="mt-6 flex flex-col gap-3">
        <SubmitBtn text="수정" onClick={handleUpdate} />
        <SubmitBtn text="삭제" onClick={handleDelete} />
      </div>
    </div>
  );
}

export default NoticeDetail;
