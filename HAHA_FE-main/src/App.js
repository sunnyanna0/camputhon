import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // 추가된 부분
import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home/home.js"; // 경로 수정
import Calendar from "./pages/calendar/calendar.js";
import Search from "./pages/search/search.js";
import Community from "./pages/community/community.js";
import Profile from "./pages/profile/profile.js";
import List from "./pages/list/list.js";
import Nav from "./components/nav/nav.js";
import Login from "./pages/login/login.js";
import Signup from "./pages/signup/signup.js";
import Description from "./pages/description/description.js";
import ProfileUpdate from "./pages/profileUpdate/profileUpdate.js";
import ChallengeDetail from "./pages/challengeDetail/challengeDetail.js"; // 경로 수정

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/search" element={<Search />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/list" element={<List />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/description" element={<Description />} />
          <Route path="/profileUpdate" element={<ProfileUpdate />} />
          <Route
            path="/challengeDetail/:challengeId"
            element={<ChallengeDetail />}
          />{" "}
          경로 수정
        </Routes>
      </div>
    </Router>
  );
}

export default App;
