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
import EventPost from "../pages/Admin/EventPost";
import NormalPost from "../pages/Admin/AdminList";
import LostPost from "../pages/Admin/LostPost";

import Developers from "../pages/Developers/Developers";
import MapOld from "../pages/Map/MapOld";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
            <Route path="/mapold" element={<MapOld />} />

      <Route path="/timetable" element={<Timetable />} />
      <Route path="/board" element={<Board />} />
      <Route path="/event" element={<Event />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/adminlist" element={<AdminList />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/adminevent" element={<EventPost />} />
      <Route path="/adminnormal" element={<NormalPost />} />
      <Route path="/adminlost" element={<LostPost />} />
      <Route path="/developers" element={<Developers />} />
    </Routes>
  );
};

export default Router;
