import { useState, useEffect } from 'react';

const useUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('브라우저가 위치 서비스를 지원하지 않습니다.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          x: position.coords.latitude,
          y: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError('위치를 가져올 수 없습니다: ' + err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return { location, loading, error, getCurrentLocation };
};

export default useUserLocation;