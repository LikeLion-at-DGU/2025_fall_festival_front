import React from "react";
import { Routes, Route } from "react-router-dom";

// 앞으로 만들 모든 페이지들을 여기서 import
import Map from "../pages/Map/Map";
import Timetable from "../pages/Timetable/Timetable";
import Home from "../pages/Home/Home";
import Board from "../pages/Board/Board";
import Event from "../pages/Event/Event";

import Admin from "../pages/Admin/Admin";
import AdminList from "../pages/Admin/AdminList";
import AdminLogin from "../pages/Admin/AdminLogin";
import BoothList from "../pages/Admin/BoothList";
import EventPost from "../pages/Admin/EventPost";
import NormalPost from "../pages/Admin/AdminList";
import LostPost from "../pages/Admin/LostPost";

import Developers from "../pages/Developers/Developers";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/board" element={<Board />} />
      <Route path="/event" element={<Event />} />

      <Route path="/admin" element={<Admin />} /> {/*미사용예정*/}
      {/*공통로그인*/}
      <Route path="/admin/login" element={<AdminLogin />} />
      {/*총학*/}
      <Route path="/admin/stuco/main" element={<AdminList />} /> {/*메인(게시글)*/}
      <Route path="/admin/stuco/notice/normal" element={<NormalPost />} /> {/*일반공지 작성*/}
      <Route path="/admin/stuco/notice/lost" element={<LostPost />} /> {/*분실물 작성*/}
      {/*부스관리자*/}
      <Route path="/admin/booth/main" element={<BoothList />} /> {/*메인(게시글)*/}
      <Route path="/admin/booth/event" element={<EventPost />} /> {/*이벤트 작성*/}

      <Route path="/developers" element={<Developers />} /> 
    </Routes>
  );
};

export default Router;
