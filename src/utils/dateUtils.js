export const formatTimeWithDay = (businessDays, startTime, endTime) => {
  if (!businessDays || businessDays.length === 0 || !startTime || !endTime) {
    return "운영시간 정보 없음";
  }

  if (
    businessDays[0] &&
    typeof businessDays[0] === "object" &&
    businessDays[0].weekday
  ) {
    const days = businessDays.map((day) => day.weekday).join(",");
    return `${days} ${startTime} ~ ${endTime}`;
  }

  const days = businessDays
    .map((day) => {
      const date = new Date(day);
      const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
      return dayNames[date.getDay()];
    })
    .join(",");

  return `${days} ${startTime} ~ ${endTime}`;
};
