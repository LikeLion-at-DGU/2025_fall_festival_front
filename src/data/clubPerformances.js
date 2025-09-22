// 동아리 공연 정보
export const clubPerformances = {
  //TODO: 동아리 이미지 받는 대로 수정 예정
  "2025-09-25": [
    {
      id: 1,
      name: "무풍",
      startTime: "15:50",
      endTime: "16:20",
      image: "/src/assets/images/performers/moopung.png",
    },
    {
      id: 2,
      name: "아리랑",
      startTime: "16:20",
      endTime: "16:50",
      image: "/src/assets/images/performers/arirang.png",
    },
    {
      id: 3,
      name: "AJAX",
      startTime: "16:50",
      endTime: "17:20",
      image: "/src/assets/images/performers/ajax.png",
    },
    {
      id: 4,
      name: "ODC",
      startTime: "17:20",
      endTime: "17:50",
      image: "/src/assets/images/performers/odc.png",
    },
    {
      id: 5,
      name: "두둠칫",
      startTime: "17:50",
      endTime: "18:20",
      image: "/src/assets/images/performers/doodoom.png",
    },
    {
      id: 6,
      name: "목멱성",
      startTime: "18:20",
      endTime: "18:50",
      image: "/src/assets/images/performers/theater-club.png",
    },
  ],
  "2025-09-26": [
    {
      id: 7,
      name: "뭉게구름",
      startTime: "15:30",
      endTime: "16:00",
      image: "/src/assets/images/performers/moong.png",
    },
    {
      id: 8,
      name: "미래융합교육원",
      startTime: "16:00",
      endTime: "16:30",
      image: "/src/assets/images/performers/future.png",
    },
    {
      id: 9,
      name: "피어리스던",
      startTime: "16:30",
      endTime: "17:00",
      image: "/src/assets/images/performers/fusion-band.png",
    },
    {
      id: 10,
      name: "렛츠무드",
      startTime: "17:00",
      endTime: "17:30",
      image: "/src/assets/images/performers/lets.png",
    },
    {
      id: 11,
      name: "음샘",
      startTime: "17:30",
      endTime: "18:00",
      image: "/src/assets/images/performers/eum.png",
    },
    {
      id: 12,
      name: "다락",
      startTime: "18:00",
      endTime: "18:30",
      image: "/src/assets/images/performers/darack.png",
    },
    {
      id: 13,
      name: "백상 응원단",
      startTime: "18:30",
      endTime: "19:50",
      image: "/src/assets/images/performers/theater-club.png",
    },
  ],
};

export const getCurrentClubPerformance = () => {
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().slice(0, 5);

  const todayPerformances = clubPerformances[currentDate];
  if (!todayPerformances) return null;

  const currentPerformance = todayPerformances.find((performance) => {
    return (
      currentTime >= performance.startTime && currentTime <= performance.endTime
    );
  });

  return currentPerformance || null;
};

export const formatPerformanceTime = (startTime, endTime) => {
  return `${startTime} - ${endTime}`;
};
