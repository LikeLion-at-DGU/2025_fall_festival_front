import DetailMapManhae from "../assets/images/icons/detailmap-icons/DetailMapManhae.png";
import DetailMapDahyang from "../assets/images/icons/detailmap-icons/DetailMapDahyang.png";
import DetailMapSocSci from "../assets/images/icons/detailmap-icons/DetailMapSocsci.png";
import DetailMapWonheung from "../assets/images/icons/detailmap-icons/DetailMapWonheung.png";
import DetailMapHyehwa from "../assets/images/icons/detailmap-icons/DetailMapHyehwa.png";
import DetailMapPaljeongdo from "../assets/images/icons/detailmap-icons/DetailMapPaljeongdo.png";
import DetailMapMyungjin from "../assets/images/icons/detailmap-icons/DetailMapMyungjin.png";
import DetailMapLaw from "../assets/images/icons/detailmap-icons/DetailMapLaw.png";

// 건물별 상세 지도 + 날짜별 버튼 좌표
export const mapConfigs = {
  11: { // 만해광장
    img: DetailMapManhae,
    schedules: {
      "2025-09-25:day": [
        { label: "갤럭시아머니트리", x: 40, y: 50 },
        { label: "스타벅스 RTD", x: 80, y: 50 },
      ],
      "2025-09-25:night": [
        { label: "FC 엘레펜테", x: 50, y: 50 },
        { label: "끼리끼리", x: 70, y: 70 },
      ],
      "2025-09-26:day": [
        { label: "이공헤르츠", x: 35, y: 40 },
        { label: "레드불", x: 33, y: 60 },
      ],
    },
  },

  8: { // 사회과학관
    img: DetailMapSocSci,
    schedules: {
      "2025-09-24:night": [
        { label: "식품산업관리학과", x: 70, y: 30 },
        { label: "광고홍보학과", x: 60, y: 50 },
        { label: "행정학과", x: 85, y: 50 },
      ],
      "2025-09-25:night": [
        { label: "행정학과", x: 70, y: 30 },
        { label: "프론티어", x: 60, y: 50 },
        { label: "정치외교학과", x: 85, y: 50 },
      ],
      "2025-09-26:night": [
        { label: "북한학과", x: 70, y: 30 },
      ],
    },
  },

  7: { // 팔정도
    img: DetailMapPaljeongdo,
    schedules: {
      "2025-09-24:day": [
        { label: "그래픽커뮤니케이션 사이언스", x: 34, y: 25 },
        { label: "키운셀러", x: 75, y: 25 },
        { label: "108리더스 상록수커피클럽", x: 20, y: 60 },
        { label: "사다리\n 극락정토", x: 85, y: 47 },
        { label: "축기단 굿즈부스", x: 85, y: 60 },
      ],
      "2025-09-24:night": [
        { label: "에코코", x: 34, y: 25 },
      ],
      "2025-09-25:day": [
        { label: "그래픽커뮤니케이션 사이언스", x: 34, y: 25 },
        { label: "키운셀러", x: 75, y: 25 },
        { label: "동국이네 슈퍼마켓 자연순환보증금관리센터 x 코카콜라", x: 20, y: 55 },
        { label: "디그램", x: 50, y: 60 },
        { label: "축기단 굿즈부스", x: 85, y: 55 },
      ],
      "2025-09-25:night": [
        { label: "에코코", x: 34, y: 25 },
      ],
      "2025-09-26:day": [
        { label: "그래픽커뮤니케이션 사이언스", x: 34, y: 25 },
        { label: "키운셀러", x: 75, y: 25 },
        { label: "108리더스 상록수커피클럽", x: 20, y: 60 },
        { label: "사다리 극락정토", x: 85, y: 47 },
        { label: "축기단 굿즈부스", x: 85, y: 60 },
      ],
      "2025-09-26:night": [
        { label: "에코코", x: 34, y: 25 },
      ],
    },
  },

  5: { // 명진관
    img: DetailMapMyungjin,
    schedules: {
      "2025-09-24:night": [
        { label: "문과대학", x: 20, y: 60 },
        { label: "국어국문문예창작학부", x: 55, y: 60 },
        { label: "철학과", x: 80, y: 60 },
      ],
      "2025-09-25:night": [
        { label: "참사랑 봉사단", x: 55, y: 60 },
        { label: "푸름누리", x: 80, y: 60 },
      ],
      "2025-09-26:night": [
        { label: "FC 엘레펜테", x: 55, y: 60 },
      ],
    },
  },

  3: { // 다향관
    img: DetailMapDahyang,
    schedules: {
      "2025-09-24:day": [
        { label: "플리마켓", x: 50, y: 75 },
      ],
      "2025-09-24:night": [
        { label: "사범대학", x: 50, y: 75 },
      ],
      "2025-09-25:day": [
        { label: "플리마켓", x: 50, y: 75 },
      ],
      "2025-09-26:day": [
        { label: "플리마켓", x: 50, y: 75 },
      ],
      "2025-09-26:night": [
        { label: "체육교육과", x: 50, y: 75 },
      ],
    },
  },

  12: { // 원흥관
    img: DetailMapWonheung,
    schedules: {
      "2025-09-24:night": [
        { label: "공과대학", x: 50, y: 50 },
      ],
    },
  },

  17: { // 혜화관
    img: DetailMapHyehwa,
    schedules: {
      "2025-09-24:night": [
        { label: "디프", x: 50, y: 50 },
      ],
      "2025-09-25:night": [
        { label: "디프", x: 50, y: 50 },
        { label: "경영학과", x: 70, y: 50 },
      ],
      "2025-09-26:night": [
        { label: "디프", x: 50, y: 50 },
      ],
    },
  },

  4: { // 만해/법학관
    img: DetailMapLaw,
    schedules: {
      "2025-09-24:day": [
        { label: "테스트부스1", x: 50, y: 70 },
        { label: "야구부 프런트 다독다독", x: 50, y: 30 },
      ],
      "2025-09-24:night": [
        { label: "테스트부스1", x: 50, y: 70 },
        { label: "야구부 프런트 다독다독", x: 50, y: 30 },
      ],
      "2025-09-25:day": [
        { label: "더플레이", x: 50, y: 70 },
        { label: "야구부 프런트 다독다독", x: 50, y: 30 },
        { label: "인액터스", x: 50, y: 30 },
      ],
      "2025-09-25:night": [
        { label: "불교 대학", x: 50, y: 70 },
        { label: "법과 대학", x: 50, y: 30 },
      ],
      "2025-09-26:day": [
        { label: "메이투", x: 50, y: 70 },
      ],
      "2025-09-26:night": [
        { label: "첨단융합대학", x: 50, y: 70 },
      ],
    },
  },
};
