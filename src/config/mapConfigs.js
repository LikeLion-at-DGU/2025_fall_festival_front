// src/config/mapConfigs.js

import DetailMapManhae from "../assets/images/icons/detailmap-icons/DetailMapManhae.png";
import DetailMapDahyang from "../assets/images/icons/detailmap-icons/DetailMapDahyang.png";
import DetailMapSocSci from "../assets/images/icons/detailmap-icons/DetailMapSocSci.png";
import DetailMapWonheung from "../assets/images/icons/detailmap-icons/DetailMapWonheung.png";
import DetailMapHyehwa from "../assets/images/icons/detailmap-icons/DetailMapHyehwa.png";
import DetailMapPaljeongdo from "../assets/images/icons/detailmap-icons/DetailMapPaljeongdo.png";
import DetailMapMyungjin from "../assets/images/icons/detailmap-icons/DetailMapMyungjin.png";
import DetailMapLaw from "../assets/images/icons/detailmap-icons/DetailMapLaw.png";

// 건물별 상세 지도 + 버튼 좌표
export const mapConfigs = {
  "만해광장": {
    img: DetailMapManhae,
    buttons: [
      // 9.25 낮
      { label: "갤럭시아머니트리", x: 40, y: 50 },
      { label: "스타벅스 RTD", x: 80, y: 50 },
    ],
  },
  
  "사회과학관": {
    img: DetailMapSocSci,
    buttons: [
      // 9.24 밤
      { label: "식품산업관리학과", x: 70, y: 30 },
      { label: "광고홍보학과", x: 60, y: 50 },
      { label: "행정학과", x: 85, y: 50 },
    ],
  },
  
  "팔정도": {
    img: DetailMapPaljeongdo,
    buttons: [
      // 9.24 낮
      { label: "그래픽커뮤니케이션 사이언스", x: 34, y: 25 },
      { label: "키운셀러", x: 75, y: 25 },
      { label: "108리더스 상록수커피클럽", x:20, y:60 },
      { label: "사다리 극락정토", x: 85, y: 47 },
      { label: "축기단 굿즈부스", x: 85, y: 60 },

    ],
  },
  "명진관": {
    img: DetailMapMyungjin,
    buttons: [
      // 9.24 밤
      { label: "문과대학", x: 20, y: 60 },
      { label: "국어국문문예창작학부", x: 55, y: 60 },
      { label: "철학과", x: 80, y: 60 },

    ],
  },
  "다향관": {
    img: DetailMapDahyang,
    buttons: [
      // 9.24~ 낮
      { label: "플리마켓", x: 50, y: 75 },
    ],
  },


  "원흥관": {
    img: DetailMapWonheung,
    buttons: [
      // 9.24 밤
      { label: "공과대학", x: 50, y: 50 },
   
    ],
  },

  "혜화관": {
    img: DetailMapHyehwa,
    buttons: [
      // 9.25 밤
      { label: "디프", x: 50, y: 50 },
      // { label: "경영학과", x: 70, y: 50 },

    ],
  },
    "만해/법학관": {
    img: DetailMapLaw,
    buttons: [
      //9.24 낮
      { label: "테스트부스1", x: 50, y: 70 },
      { label: "야구부 프런트 다독다독", x: 50, y: 30 },
    ],
  },

};
