import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import Popup from "../../components/AdminComponents/Popup";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import {createEvent} from "../../apis/admin/booth";

function EventPost() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();
  const timeWrapper = "flex flex-row items-center w-1/2 gap-2";

  // 제출 로직: 이벤트 등록 후 부스관리자 메인으로 이동합니다.
  const handleSubmit = async () => {
    try {
      const start_time = `2025-09-20T${startHour}:${startMinute}:00`;
      const end_time = `2025-09-20T${endHour}:${endMinute}:00`;

      await createEvent({ title, detail, start_time, end_time });

      alert("이벤트가 등록되었습니다.");
      setIsPopupOpen(false); // 팝업 닫기
      navigate("/admin/booth");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "이벤트 등록 실패");
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-8 mx-auto gap-4">
      {/* 이벤트 제목 */}
      <PostInput
        placeholder="이벤트 제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 이벤트 내용 */}
      <PostInput
        className="h-[370px]"
        placeholder="공지 내용을 입력하세요"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />

      {/* 이벤트 시간 */}
      <AdminTitle text="이벤트 시작 시간" />
      <div className="flex flex-row justify-start items-start gap-2 w-full">
        <div className={timeWrapper}>
          <PostInput
            placeholder="ex) 10"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
          />
          <AdminTitle text="시간" />
        </div>
        <div className={timeWrapper}>
          <PostInput
            placeholder="ex) 30"
            value={startMinute}
            onChange={(e) => setStartMinute(e.target.value)}
          />
          <AdminTitle text="분" />
        </div>
      </div>

      <AdminTitle text="이벤트 종료 시간" />
      <div className="flex flex-row justify-start items-start gap-2 w-full">
        <div className={timeWrapper}>
          <PostInput
            placeholder="ex) 18"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
          />
          <AdminTitle text="시간" />
        </div>
        <div className={timeWrapper}>
          <PostInput
            placeholder="ex) 00"
            value={endMinute}
            onChange={(e) => setEndMinute(e.target.value)}
          />
          <AdminTitle text="분" />
        </div>
      </div>

      {/* 버튼 클릭 시 팝업 열림 */}
      <Submitbtn text="확인" onClick={() => setIsPopupOpen(true)} />

      {/* 팝업 */}
      {isPopupOpen && (
        <Popup
          text={
            <>
              이벤트는 수정이 어려워요
              <br />
              정말 등록하시겠어요?
            </>
          }
          buttontext="확인했어요"
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default EventPost;
