import React from "react";
import { Routes, Route } from "react-router-dom";

// 앞으로 만들 모든 페이지들을 여기서 import
import Map from "../pages/Map/Map";
import Timetable from "../pages/Timetable/Timetable";
import Home from "../pages/Home/Home";
import Board from "../pages/Board/Board";
import Event from "../pages/Event/Event";
import Admin from "../pages/Admin/Admin";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/board" element={<Board />} />
      <Route path="/event" element={<Event />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default Router;
