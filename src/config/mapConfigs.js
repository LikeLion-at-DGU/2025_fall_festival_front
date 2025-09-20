// src/config/mapConfigs.js

// ✅ 모든 상세지도 이미지를 detailmap-icons 폴더에서 import
import DetailMapManhae from "../assets/images/icons/detailmap-icons/DetailMapManhae.svg";
import DetailMapDahyang from "../assets/images/icons/detailmap-icons/DetailMapDahyang.svg";
import DetailMapSocSci from "../assets/images/icons/detailmap-icons/DetailMapSocSci.svg";
import DetailMapWonheung from "../assets/images/icons/detailmap-icons/DetailMapWonheung.svg";
import DetailMapHyehwa from "../assets/images/icons/detailmap-icons/DetailMapHyehwa.svg";
import DetailMapPaljeongdo from "../assets/images/icons/detailmap-icons/DetailMapPaljeongdo.svg";

// 건물별 상세 지도 + 버튼 좌표
export const mapConfigs = {
"만해/법학관": {
  img: DetailMapManhae,
  buttons: [
    { type: "button", label: "테스트부스1", x: 50, y: 30 }, // 클릭 가능
    { type: "label", label: "입구", x: 20, y: 80 },         // 표시만
  ],
},

  "다향관": {
    img: DetailMapDahyang,
    buttons: [{ label: "입구", x: 40, y: 70 }],
  },
  "사회과학관": {
    img: DetailMapSocSci,
    buttons: [
      { label: "강의실", x: 60, y: 40 },
      { label: "엘리베이터", x: 75, y: 60 },
    ],
  },
  "원흥관": {
    img: DetailMapWonheung,
    buttons: [{ label: "입구", x: 30, y: 85 }],
  },
  "혜화관": {
    img: DetailMapHyehwa,
    buttons: [{ label: "홀", x: 50, y: 50 }],
  },
  "팔정도": {
    img: DetailMapPaljeongdo,
    buttons: [
      { label: "중앙", x: 50, y: 50 },
      { label: "출구", x: 10, y: 90 },
    ],
  },
};
