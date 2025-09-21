import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoothEventDetail } from "../../apis/admin/booth";

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
    <div className="max-w-md mx-auto bg-white px-6 py-8 min-h-screen">
      {/* 카테고리 뱃지 */}
      <span className="bg-[#EF7063] text-white px-1 py-1 text-[12px] font-medium
              rounded-[10px] w-[45px] h-[26px] flex items-center justify-center">
        공지
      </span>

      {/* 제목 */}
      <h1 className="text-xl font-bold mt-4">{event.title}</h1>

      <div className="mt-5">
        {/* 작성자 */}
        <span className="text-sm text-gray-500 mt-1">작성자 : {event.writer}</span>
        {/* 기간 */}
        <div className="mt-4 text-sm text-gray-600">
          이벤트 시작시간 : {new Date(event.start_time).toLocaleString()} {" "} <br/>
          이벤트 종료시간 : {new Date(event.end_time).toLocaleString()}
        </div>
      </div>

      {/* 본문 */}
      <div className="mt-8 leading-relaxed text-gray-800 whitespace-pre-line">
        {event.detail}
      </div>

      
    </div>
  );
}

export default EventDetail;
