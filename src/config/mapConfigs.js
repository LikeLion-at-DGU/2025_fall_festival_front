import DetailMapManhae from "../assets/images/icons/detailmap-icons/DetailMapManhae.png";
import DetailMapDahyang from "../assets/images/icons/detailmap-icons/DetailMapDahyang.png";
import DetailMapSocSci from "../assets/images/icons/detailmap-icons/DetailMapSocsci.png";
import DetailMapWonheung from "../assets/images/icons/detailmap-icons/DetailMapWonheung.png";
import DetailMapHyehwa from "../assets/images/icons/detailmap-icons/DetailMapHyehwa.png";
import DetailMapPaljeongdo from "../assets/images/icons/detailmap-icons/DetailMapPaljeongdo.png";
import DetailMapMyungjin from "../assets/images/icons/detailmap-icons/DetailMapMyungjin.png";
import DetailMapLaw from "../assets/images/icons/detailmap-icons/DetailMapLaw.png";

// 건물별 상세 지도 + 버튼 좌표
export const mapConfigs = {
  만해광장: {
    img: DetailMapManhae,
    buttons: [
      // 9.25 낮
      { label: "갤럭시아머니트리", x: 40, y: 50, showIf: { date: "2024-09-25", time: "day" } },
      { label: "스타벅스 RTD", x: 80, y: 50, showIf: { date: "2024-09-25", time: "day" } },
    ],
  },

  사회과학관: {
    img: DetailMapSocSci,
    buttons: [
      // 9.24 밤
      { label: "식품산업관리학과", x: 70, y: 30, showIf: { date: "2024-09-24", time: "night" } },
      { label: "광고홍보학과", x: 60, y: 50, showIf: { date: "2024-09-24", time: "night" } },
      { label: "행정학과", x: 85, y: 50, showIf: { date: "2024-09-24", time: "night" } },
    ],
  },

  팔정도: {
    img: DetailMapPaljeongdo,
    buttons: [
      // 9.24 낮
      { label: "그래픽커뮤니케이션 사이언스", x: 34, y: 25, showIf: { date: "2024-09-24", time: "day" } },
      { label: "키운셀러", x: 75, y: 25, showIf: { date: "2024-09-24", time: "day" } },
      { label: "108리더스 상록수커피클럽", x: 20, y: 60, showIf: { date: "2024-09-24", time: "day" } },
      { label: "사다리 극락정토", x: 85, y: 47, showIf: { date: "2024-09-24", time: "day" } },
      { label: "축기단 굿즈부스", x: 85, y: 60, showIf: { date: "2024-09-24", time: "day" } },
    ],
  },

  명진관: {
    img: DetailMapMyungjin,
    buttons: [
      // 9.24 밤
      { label: "문과대학", x: 20, y: 60, showIf: { date: "2024-09-24", time: "night" } },
      { label: "국어국문문예창작학부", x: 55, y: 60, showIf: { date: "2024-09-24", time: "night" } },
      { label: "철학과", x: 80, y: 60, showIf: { date: "2024-09-24", time: "night" } },
    ],
  },

  다향관: {
    img: DetailMapDahyang,
    buttons: [
      // 9.24 낮 (계속)
      { label: "플리마켓", x: 50, y: 75, showIf: { date: "2024-09-24", time: "day" } },
    ],
  },

  원흥관: {
    img: DetailMapWonheung,
    buttons: [
      // 9.24 밤
      { label: "공과대학", x: 50, y: 50, showIf: { date: "2024-09-24", time: "night" } },
    ],
  },

  혜화관: {
    img: DetailMapHyehwa,
    buttons: [
      // 9.25 밤
      { label: "디프", x: 50, y: 50, showIf: { date: "2024-09-25", time: "night" } },
      // { label: "경영학과", x: 70, y: 50 },
    ],
  },

  "만해/법학관": {
    img: DetailMapLaw,
    buttons: [
      // 9.24 낮
      { label: "테스트부스1", x: 50, y: 70, showIf: { date: "2024-09-24", time: "day" } },
      { label: "야구부 프런트 다독다독", x: 50, y: 30, showIf: { date: "2024-09-24", time: "day" } },
    ],
  },
};
