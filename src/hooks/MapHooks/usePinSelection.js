import { useState, useEffect } from "react";
import { buildingLocations } from "../../components/MapComponents/MapWithPins"; // 경로 확인 필요

const usePinSelection = (selectedFilter) => {
  const [selectedPin, setSelectedPin] = useState(null);     // 선택된 건물 id
  const [selectedBooth, setSelectedBooth] = useState(null); // 상세지도 버튼 선택

  // 지도 핀 클릭 핸들러
  const handlePinClick = (id) => {
    if (id === null) {
      setSelectedPin(null);
    } else {
      setSelectedPin(Number(id));  // 숫자 id 저장
      setSelectedBooth(null);      // 상세지도 들어가면 강조 초기화
    }
  };

  // 라벨(ko 이름) 가져오기 도우미
  const getSelectedPinLabel = () => {
    const building = buildingLocations.find((b) => b.id === Number(selectedPin));
    return building ? building.ko : null;
  };

  // 필터 변경 시 초기화
  useEffect(() => {
    setSelectedPin(null);
    setSelectedBooth(null);
  }, [selectedFilter]);

  return {
    selectedPin,         // 선택된 건물 id
    selectedBooth,       // 상세지도 버튼
    setSelectedBooth,    // 상세지도 버튼 갱신
    handlePinClick,      // id 기반 핸들러
    getSelectedPinLabel, // 필요 시 라벨 접근
  };
};

export default usePinSelection;
