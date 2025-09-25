import moopung from "../assets/images/performers/moopung.png";
import arirang from "../assets/images/performers/arirang.png";
import ajax from "../assets/images/performers/ajax.png";
import odc from "../assets/images/performers/odc.png";
import doodoom from "../assets/images/performers/doodoom.png";
import moong from "../assets/images/performers/moong.png";
import future from "../assets/images/performers/future.png";
import lets from "../assets/images/performers/lets.png";
import eum from "../assets/images/performers/eum.png";
import darack from "../assets/images/performers/darack.png";
import baeksang from "../assets/images/performers/baeksang.png";
import defaultImg from "../assets/images/banners/default-img.png";

export const clubPerformances = {
  "2025-09-25": [
    {
      id: 1,
      name: "무풍",
      startTime: "15:50",
      endTime: "16:20",
      image: moopung,
    },
    {
      id: 2,
      name: "아리랑",
      startTime: "16:20",
      endTime: "16:50",
      image: arirang,
    },
    {
      id: 3,
      name: "AJAX",
      startTime: "16:50",
      endTime: "17:20",
      image: ajax,
    },
    {
      id: 4,
      name: "ODC",
      startTime: "17:20",
      endTime: "17:50",
      image: odc,
    },
    {
      id: 5,
      name: "두둠칫",
      startTime: "17:50",
      endTime: "18:20",
      image: doodoom,
    },
    {
      id: 6,
      name: "목멱성",
      startTime: "18:20",
      endTime: "18:50",
      image: defaultImg,
    },
  ],
  "2025-09-26": [
    {
      id: 7,
      name: "뭉게구름",
      startTime: "15:30",
      endTime: "16:00",
      image: moong,
    },
    {
      id: 8,
      name: "미래융합교육원",
      startTime: "16:00",
      endTime: "16:30",
      image: future,
    },
    {
      id: 9,
      name: "피어리스던",
      startTime: "16:30",
      endTime: "17:00",
      image: defaultImg,
    },
    {
      id: 10,
      name: "렛츠무드",
      startTime: "17:00",
      endTime: "17:30",
      image: lets,
    },
    {
      id: 11,
      name: "음샘",
      startTime: "17:30",
      endTime: "18:00",
      image: eum,
    },
    {
      id: 12,
      name: "다락",
      startTime: "18:00",
      endTime: "18:30",
      image: darack,
    },
    {
      id: 13,
      name: "백상 응원단",
      startTime: "18:30",
      endTime: "19:50",
      image: baeksang,
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
