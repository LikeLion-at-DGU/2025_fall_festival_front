import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoothEventDetail } from "../../apis/admin/booth";
import SubmitBtn from "../../components/AdminComponents/SubmitBtn";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBoothEventDetail(id);
        setEvent(data);
      } catch (err) {
        console.error("이벤트 상세 조회 실패:", err);
      }
    }
    fetchData();
  }, [id]);

  if (!event) return <div className="grid place-items-center mt-[200px]">loading...⌛</div>;

  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 min-h-screen">
      {/* 카테고리 */}
      <span className="inline-block px-3 py-1 text-sm font-semibold rounded bg-blue-400 text-white">
        이벤트
      </span>

      {/* 제목 */}
      <h1 className="text-2xl font-bold mt-3">{event.title}</h1>

      {/* 작성자 / 부스명 */}
      <p className="text-sm text-gray-500 mt-1">작성자: {event.writer}</p>
      <p className="text-sm text-gray-500">부스명: {event.booth_name}</p>

      {/* 본문 */}
      <p className="mt-4 leading-relaxed">{event.detail}</p>

      {/* 기간 */}
      <p className="mt-2 text-sm text-gray-600">
        {new Date(event.start_time).toLocaleString()} ~ {new Date(event.end_time).toLocaleString()}
      </p>

      {/* 뒤로가기 버튼 */}
      <div className="mt-6">
        <SubmitBtn text="뒤로가기" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}

export default EventDetail;
