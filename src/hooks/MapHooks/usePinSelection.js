import { useState, useEffect } from "react";

const usePinSelection = (selectedFilter) => {
  const [selectedPin, setSelectedPin] = useState(null);     // 지도 핀 선택
  const [selectedBooth, setSelectedBooth] = useState(null); // 상세지도 버튼 선택

  // 지도 핀 클릭 핸들러
  const handlePinClick = (item) => {
    if (item === null) {
      setSelectedPin(null);
    } else {
      const locationName = item.location.name;
      setSelectedPin(locationName);   // ✅ 상세지도 열기용
      setSelectedBooth(null);         // ✅ 상세지도 들어가면 강조 초기화
    }
  };

  // 필터 변경 시 초기화
  useEffect(() => {
    setSelectedPin(null);
    setSelectedBooth(null);
  }, [selectedFilter]);

  return {
    selectedPin,       // 지도 핀
    selectedBooth,     // 상세지도 버튼
    setSelectedBooth,  // 상세지도에서 직접 업데이트
    handlePinClick,
  };
};

export default usePinSelection;
