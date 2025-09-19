import React from "react";
import { Routes, Route } from "react-router-dom";

// 앞으로 만들 모든 페이지들을 여기서 import
import Map from "../pages/Map/Map";
import Timetable from "../pages/Timetable/Timetable";
import Home from "../pages/Home/Home";
import Board from "../pages/Board/Board";
import BoardDetail from "../pages/Board/BoardDetail";
import Event from "../pages/Event/Event";

import Admin from "../pages/Admin/Admin";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminMain from "../pages/Admin/AdminMain";
import NormalPost from "../pages/Admin/NormalPost";
import LostPost from "../pages/Admin/LostPost";
import BoothMain from "../pages/Admin/BoothMain";
import EventPost from "../pages/Admin/EventPost";

import Developers from "../pages/Developers/Developers";
import MapOld from "../pages/Map/MapOld";

import BoothDetail from "../pages/Map/DetailSections/BoothDetail";
import DrinkDetail from "../pages/Map/DetailSections/DrinkDetail";
import FoodTruckDetail from "../pages/Map/DetailSections/FoodTruckDetail";
import ToiletDetail from "../pages/Map/DetailSections/ToiletDetail";




const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
            <Route path="/mapold" element={<MapOld />} />

      <Route path="/timetable" element={<Timetable />} />
      <Route path="/board" element={<Board />} />
      <Route path="/board/:boardId" element={<BoardDetail />} />
      <Route path="/event" element={<Event />} />

      {/* 지도 상세페이지 라우트 추가 */}
      <Route path="/booth/:id" element={<BoothDetail />} />
      <Route path="/drink/:id" element={<DrinkDetail />} />
      <Route path="/foodtruck/:id" element={<FoodTruckDetail />} />
      <Route path="/toilet/:id" element={<ToiletDetail />} />


      <Route path="/admin" element={<Admin />} /> {/*미사용예정*/}
      {/*공통로그인*/}
      <Route path="/admin/login" element={<AdminLogin />} />
      {/*총학/축기단*/}
      <Route path="/admin/stuco" element={<AdminMain />} /> {/*메인(게시글)*/}
      <Route path="/admin/stuco/notice/normal" element={<NormalPost />} /> {/*일반공지 작성*/}
      <Route path="/admin/stuco/notice/lost" element={<LostPost />} /> {/*분실물 작성*/}
      {/*<Route path="/admin/stuco/notice/normal" element={<NormalPost mode="create" />} /> {/*일반공지 작성*/}
      {/*<Route path="/admin/stuco/notice/lost" element={<LostPost mode="create" />} /> {/*분실물 작성*/}
      <Route path="/board/:id" element={<BoardDetail />} /> {/*공지 상세*/}
      <Route path="/admin/stuco/notice/edit/:id" element={<NormalPost mode="edit" />} /> {/*일반공지 수정*/}
      <Route path="/admin/stuco/lost/edit/:id" element={<LostPost mode="edit" />} /> {/*분실물 수정*/}
      
      {/*부스관리자*/}
      <Route path="/admin/booth" element={<BoothMain />} /> {/*메인(게시글)*/}
      <Route path="/admin/booth/event" element={<EventPost />} /> {/*이벤트 작성*/}

      <Route path="/developers" element={<Developers />} /> 
    </Routes>
  );
};

export default Router;
