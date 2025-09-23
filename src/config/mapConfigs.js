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
        { label: "골 때리는 엘레펜테", x: 50, y: 50 },
        { label: "끼리끼리", x: 70, y: 70 },
      ],
      "2025-09-26:day": [
        { label: "이공헤르츠", x: 35, y: 40 },
        { label: "레드불", x: 35, y: 60 },
      ],
    },
  },

  8: { // 경영.사과관
    img: DetailMapSocSci,
    schedules: {
      "2025-09-24:day": [
        { label: "식품산업관리학과", x: 70, y: 30 },

      ],
      "2025-09-24:night": [
        { label: "식품산업관리학과", x: 70, y: 30 },
        { label: "테무에서 온 광홍", x: 60, y: 50 },
        { label: "응답PA라, 2025!", x: 85, y: 50 },
      ],
      "2025-09-25:night": [
        { label: "응답PA라, 2025!", x: 70, y: 30 },
        { label: "프론티어 문구점", x: 60, y: 50 },
        { label: "정치외교학과", x: 85, y: 50 },
      ],
      "2025-09-26:night": [
        { label: "금강산도 식후경", x: 70, y: 30 },
      ],
    },
  },

  7: { // 팔정도
    img: DetailMapPaljeongdo,
    schedules: {
      "2025-09-24:day": [
        { label: "그래픽커뮤니케이션사이언스", x: 31, y: 25 },
        { label: "카운셀러", x: 72, y: 25 },
        { label: "일공팔상회", x: 20, y: 47 },
        { label: "상록수커피클럽", x: 20, y: 60 },
        { label: "사다리\n 극락정토", x: 85, y: 47 },
        { label: "축기단 굿즈부스", x: 85, y: 60 },
      ],
      "2025-09-24:night": [
        { label: "용기 있는 동국 : 다회용기 사용 축제", x: 51, y: 64 },
      ],
      "2025-09-25:day": [
        { label: "그래픽커뮤니케이션\n사이언스", x: 31, y: 25 },
        { label: "카운셀러", x: 72, y: 25 },
        { label: "식-생활", x: 20, y: 60 },

        { label: "디그램", x: 50, y: 60 },
        { label: "축기단 굿즈부스", x: 85, y: 55 },
      ],
      "2025-09-25:night": [
                { label: "용기 있는 동국 : 다회용기 사용 축제", x: 51, y: 64 },

      ],
      "2025-09-26:day": [
      { label: "Re:Blue", x: 31, y: 25 },
        { label: "카운셀러", x: 72, y: 25 },
        { label: "동국이네 슈퍼마켓\n자연순환보증금관리센터 x 코카콜라", x: 20, y: 55 },
        { label: "디그램 \n글로벌 부스", x: 50, y: 60 },

        { label: "축기단\n굿즈부스", x: 85, y: 60 },
      ],
      "2025-09-26:night": [
             { label: "용기 있는 동국 : 다회용기 사용 축제", x: 51, y: 64 },

      ],
    },
  },

  5: { // 명진관
    img: DetailMapMyungjin,
    schedules: {
      "2025-09-24:night": [
        { label: "꽃보다 문과", x: 20, y: 60 },
        { label: "대동제로 보는\n그리스 로마 신화", x: 55, y: 60 },
        { label: "철수네 슈퍼", x: 80, y: 60 },
      ],
      "2025-09-25:night": [
        { label: "참사랑 봉사단", x: 55, y: 60 },
        { label: "푸름누리\n마을회관", x: 80, y: 60 },
      ],
      "2025-09-26:night": [
        { label: "골 때리는 엘레펜테", x: 55, y: 60 },
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
        { label: "DEMU", x: 50, y: 75 },
      ],
      "2025-09-25:day": [
        { label: "플리마켓", x: 50, y: 75 },
      ],
      "2025-09-26:day": [
        { label: "플리마켓", x: 50, y: 75 },
      ],
      "2025-09-26:night": [
        { label: "체교 주점? \n바로 가야징~", x: 50, y: 75 },
      ],
    },
  },

  12: { // 원흥관
    img: DetailMapWonheung,
    schedules: {
      "2025-09-25:night": [
        { label: "파도", x: 52, y: 50 },
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
        { label: "다독다독", x: 50, y: 30 },
      ],
      "2025-09-24:night": [
        { label: "FOMU'LAW'1:법대의질주", x: 50, y: 70 },
        { label: "해탈해요\n 중생의숲", x: 50, y: 30 },
      ],
      "2025-09-25:day": [
        { label: "더플레이", x: 50, y: 70 },
        { label: "야구부 프런트 다독다독", x: 50, y: 30 },
        { label: "인액터스", x: 50, y: 30 },
      ],
     "2025-09-25:night": [
        { label: "FOMU'LAW'1:법대의질주", x: 50, y: 70 },
        { label: "해탈해요\n 중생의숲", x: 50, y: 30 },
      ],
      "2025-09-26:day": [
        { label: "메이투", x: 50, y: 70 },
      ],
      "2025-09-26:night": [
        { label: "첨융주막", x: 50, y: 70 },
      ],
    },
  },
};
