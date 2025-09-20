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
     buttons: [
    { type: "button", label: "테스트부스9", x: 50, y: 50 }, 
    { type: "label", label: "입구", x: 20, y: 80 },        
    { type: "label", label: "신공학관", x: 10, y: 30 },         
    { type: "label", label: "중앙도서관", x: 10, y: 80 }, 
    { type: "label", label: "원흥관", x: 50, y: 20 },      
    { type: "label", label: "본관", x: 50, y: 80 },      
  ],
  },
  
  "혜화관": {
    img: DetailMapHyehwa,
    buttons: [{ label: "홀", x: 50, y: 50 }],
  },
"팔정도": {
  img: DetailMapPaljeongdo,
  buttons: [
    {
      type: "button",
      label: "이벤트 부스",
      x: 50,
      y: 50,
      showIf: {
        startDate: "2025-09-25",  // 시작 날짜
        endDate: "2025-09-27",    // 종료 날짜
        startTime: "09:00",       // 하루 시작 시간
        endTime: "18:00",         // 하루 종료 시간
      },
    },
  ],
},

};
