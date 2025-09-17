import React from "react";
import Banner from "../../components/HomepageComponents/Banner";
import Notification from "../../components/HomepageComponents/Notification";
import Stage from "../../components/HomepageComponents/Stage";
import Event from "../../components/HomepageComponents/Event";
import BoothRank from "../../components/HomepageComponents/BoothRank";

function Home() {
  const backgroundStyle = {
    background:
      "linear-gradient(180deg, #F4F4F5 0%, #FFFBFB 48.56%, #F3CDC9 100%)",
    minHeight: "100vh",
  };

  return (
    <div style={backgroundStyle}>
      <Banner />
      <div className="px-4 flex flex-col">
        <Notification />
        <Stage />
        <Event />
        <BoothRank />
      </div>
    </div>
  );
}

export default Home;
