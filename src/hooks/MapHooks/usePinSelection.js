import { useState, useEffect } from 'react';

const usePinSelection = (selectedFilter) => {
  const [selectedPin, setSelectedPin] = useState(null);

  // 핀 클릭 핸들러 - 위치 기준으로 선택
  const handlePinClick = (item) => {
    if (item === null) {
      // 지도 클릭 시 핀 초기화
      setSelectedPin(null);
    } else {
      const locationName = item.location.name;
      setSelectedPin(selectedPin === locationName ? null : locationName);
    }
  };

  // 필터 변경 시 선택된 핀 초기화
  useEffect(() => {
    setSelectedPin(null);
  }, [selectedFilter]);

  // 필터 클릭 시 핀 초기화
  const handleFilterClick = () => {
    setSelectedPin(null);
  };

  return {
    selectedPin,
    handlePinClick,
    handleFilterClick,
  };
};

export default usePinSelection;