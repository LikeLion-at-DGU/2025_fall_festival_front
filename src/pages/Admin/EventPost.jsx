import React, { useState } from "react";
import { usePrefixedNavigate } from "../../hooks/usePrefixedNavigate";
import Submitbtn from "../../components/AdminComponents/SubmitBtn";
import Popup from "../../components/AdminComponents/Popup";
import PostInput from "../../components/AdminComponents/PostInput";
import AdminTitle from "../../components/AdminComponents/AdminTitle";
import ToastMessage from "../../components/AdminComponents/ToastMessage";
import { createEvent } from "../../apis/admin/booth";
import Tooltip from "../../components/AdminComponents/Tooltip";

/* ------- 이벤트를 개최합니다/(POST) -------- */
/*
 ### 접근권한
 * 접근 : 부스관리자 [동아리, 학과 UID]
 * 작성 허용 : role = Club && Major
 * 접근 거부 트리거 : "POST 시도 시" 인증 만료 여부 판단 및 로그인 리다이렉트
 * 
 *  
 ### POST 조건
 * 전 필드 input
 * 시간 유효성 검사 통과
 * submitBtn 활성화
 * 
 */

function EventPost() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [timeError, setTimeError] = useState("");
  const navigate = usePrefixedNavigate();

  const timeWrapper = "flex flex-row items-center w-1/2 gap-2";

  //------- 시간 필드 유효성 검사 로직 ------//

  // 1. 올바른 시각 형태 여부 검사
  const isValidTime = (hour, minute) => {
    const h = Number(hour);
    const m = Number(minute);
    return (
      !isNaN(h) &&
      !isNaN(m) &&
      h >= 0 &&
      h < 24 &&
      m >= 0 &&
      m < 60
    );
  };

  // 2. 시간 검증 함수 (현재 시각 / 종료 시간 비교까지 포함)
  const validateTimes = (startHour, startMinute, endHour, endMinute) => {
    // 필수 입력 체크
    if (!startHour || !startMinute || !endHour || !endMinute) {
      return "시작/종료 시간을 모두 입력해주세요.";
    }
    // 오늘 날짜 구하기
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    // 두 자리 인식으로 보정 완료
    const pad = (num) => String(num).padStart(2, "0");
    const startDate = new Date(`${yyyy}-${mm}-${dd}T${pad(startHour)}:${pad(startMinute)}:00`);
    const endDate = new Date(`${yyyy}-${mm}-${dd}T${pad(endHour)}:${pad(endMinute)}:00`);
    // Date 유효성 체크
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return "올바른 시간 형식이 아닙니다.";
    }
      // (1) 숫자 범위 유효성 체크
      if (!isValidTime(startHour, startMinute)) {
        return "유효하지 않은 숫자입니다 (00~23시, 00~59분).";
      }
      if (!isValidTime(endHour, endMinute)) {
        return "유효하지 않은 숫자입니다 (00~23시, 00~59분).";
      }
      // (2) 시작 시간이 현재보다 이전인지 체크
      const now = new Date();
      if (startDate < now) {
        return "시작 시간은 현재보다 이전일 수 없습니다.";
      }
      // (3) 종료 시간이 시작 시간보다 빠른지 체크
      if (endDate <= startDate) {
        return "종료 시간은 시작 시간보다 \n 이전일 수 없습니다.";
      }
    return null; // ✅ 모든 검증 통과
  };

  // 인풋 onChange에서 바로 검증
  const handleTimeChange = (field, value) => {
    // state 업데이트
    if (field === "startHour") setStartHour(value);
    if (field === "startMinute") setStartMinute(value);
    if (field === "endHour") setEndHour(value);
    if (field === "endMinute") setEndMinute(value);

    // 유효성 검사 (단순 숫자 범위 확인)
    if (
      !isValidTime(
        field === "startHour" ? value : startHour,
        field === "startMinute" ? value : startMinute
      )
    ) {
      setTimeError("유효하지 않은 숫자입니다 (00~23시, 00~59분).");
      return;
    }
    if (
      !isValidTime(
        field === "endHour" ? value : endHour,
        field === "endMinute" ? value : endMinute
      )
    ) {
      setTimeError("유효하지 않은 숫자입니다 (00~23시, 00~59분).");
      return;
    }
    // ✅ 모두 통과
    setTimeError("");
  };

  //------- 이벤트 개최 폼 제출 로직 ------//

  // 제출 로직: 이벤트 등록 후 부스관리자 메인으로 이동합니다.
  const handleSubmit = async () => {
    try {
      const uid = sessionStorage.getItem("uid");
      if (!uid) {
        setToastMsg("세션이 만료되었습니다. \n 다시 로그인해주세요."); // ⛔ 폐기 예정
        setTimeout(() => navigate("/admin/login"), 2000);
        return;
      }

      // 시작/종료/현재시간 비교
      const validationError = validateTimes(startHour, startMinute, endHour, endMinute);
      if (validationError) {
        setToastMsg(validationError); // 🔥 토스트로 에러 표시
        return;
      }

      // 오늘 날짜 구하기
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");

      // 최종 request body용 start/end_time
      const start_time = `${yyyy}-${mm}-${dd}T${startHour}:${startMinute}:00`;
      const end_time = `${yyyy}-${mm}-${dd}T${endHour}:${endMinute}:00`;

      await createEvent({ title, detail, start_time, end_time });

      setToastMsg("이벤트가 등록되었습니다");
      setIsPopupOpen(false);
      setTimeout(() => navigate("/admin/booth"), 1000);
    } catch (err) {
      console.error(err);

      // uid 만료 판별 → 자동 로그아웃 안내(toastMsg) + 로그인 페이지로 이동
      if (err.response?.data?.uid_valid === false) {
        setToastMsg("세션이 만료되었습니다.\n 다시 로그인해주세요");
        setTimeout(() => {
          navigate("/admin/login");
        }, 1500);
        return;
      }

      // ⛔ 여기서 서버 메시지 받아오기
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "이벤트 등록 실패";
      setToastMsg(msg);
    }
  };

  //------------- UI --------------//

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
          <Tooltip text="24시간 형식으로 입력해주세요">
            <PostInput
              placeholder="ex) 10"
              value={startHour}
              onChange={(e) => handleTimeChange("startHour", e.target.value)}
            />
          </Tooltip>
          <AdminTitle text="시" />
        </div>
        <div className={timeWrapper}>
          <PostInput
            placeholder="ex) 30"
            value={startMinute}
            onChange={(e) => handleTimeChange("startMinute", e.target.value)}
          />
          <AdminTitle text="분" />
        </div>
      </div>

      <AdminTitle text="이벤트 종료 시간" />
      <div className="flex flex-row justify-start items-start gap-2 w-full">
        <div className={timeWrapper}>
          <Tooltip text="24시간 형식으로 입력해주세요">
            <PostInput
              placeholder="ex) 18"
              value={endHour}
              onChange={(e) => handleTimeChange("endHour", e.target.value)}
            />
          </Tooltip>
          <AdminTitle text="시" />
        </div>
        <div className={timeWrapper}>
          <PostInput
            placeholder="ex) 00"
            value={endMinute}
            onChange={(e) => handleTimeChange("endMinute", e.target.value)}
          />
          <AdminTitle text="분" />
        </div>
      </div>

      {/* 시간 에러 메시지 (입력 단계) */}
      {timeError && <p className="text-red-500 text-xs">{timeError}</p>}

      {/* 버튼 클릭 시: 모달 열기 전에 시간 검증 먼저 실행 */}
      <Submitbtn
        text="확인"
        onClick={() => {
          const validationError = validateTimes(startHour, startMinute, endHour, endMinute);
          if (validationError) {
            setToastMsg(validationError); // 🔥 토스트로 표시
            return;
          }
          setIsPopupOpen(true); // ✅ 검증 통과했을 때만 모달 열림
        }}
        disabled={
          !title.trim() ||
          !detail.trim() ||
          !startHour.trim() ||
          !startMinute.trim() ||
          !endHour.trim() ||
          !endMinute.trim() ||
          !!timeError
        }
      />

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

      {/* ✅ 토스트 메시지 */}
      {toastMsg && (
        <ToastMessage
          text={toastMsg}
          onClose={() => setToastMsg("")} // 닫히면 초기화
        />
      )}
    </div>
  );
}

export default EventPost;
