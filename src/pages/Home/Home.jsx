import React, { useState, useEffect } from "react";
import Banner from "../../components/HomepageComponents/Banner";
import Notification from "../../components/HomepageComponents/Notification";
import Stage from "../../components/HomepageComponents/Stage";
import Event from "../../components/HomepageComponents/Event";
import BoothRank from "../../components/HomepageComponents/BoothRank";
import { getEmergencyNotice } from "../../apis/mainpage";

function Home() {
  const [emergencyNotice, setEmergencyNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventDataStatus, setEventDataStatus] = useState({
    hasData: false,
    isLoading: true,
  });
  const [boothRankDataStatus, setBoothRankDataStatus] = useState({
    hasData: false,
    isLoading: true,
  });

  /* 동적 배경 스타일 계산 */
  const getBackgroundStyle = () => {
    const hasAnyData = eventDataStatus.hasData || boothRankDataStatus.hasData;
    const isAnyLoading =
      eventDataStatus.isLoading || boothRankDataStatus.isLoading;

    if (hasAnyData && !isAnyLoading) {
      return {
        background:
          "linear-gradient(180deg, #F4F4F5 0%, #FFFBFB 48.56%, #F3CDC9 100%)",
        minHeight: "100vh",
      };
    }

    return {
      background: "linear-gradient(180deg, #F4F4F5 39.95%, #FAE9E7 100%)",
      minHeight: "100vh",
    };
  };

  useEffect(() => {
    const fetchEmergencyNotice = async () => {
      try {
        setLoading(true);
        const response = await getEmergencyNotice();
        setEmergencyNotice(response.notice);
        setError(null);
      } catch (err) {
        console.error("긴급공지 조회 실패:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyNotice();
  }, []);

  return (
    <div style={getBackgroundStyle()}>
      <Banner />
      <div className="px-4 flex flex-col">
        <Notification
          notice={emergencyNotice}
          loading={loading}
          error={error}
        />
        <Stage />
        <Event onDataChange={setEventDataStatus} />
        <BoothRank onDataChange={setBoothRankDataStatus} />
      </div>
    </div>
  );
}

export default Home;
