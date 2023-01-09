import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Share from "./pages/share";
import LoginMember from "./pages/login";
import JoinMember from "./pages/join";
import Talk from "./pages/talk";
import Header from "./layout/Header";
import Together from "./pages/together";
import MemberPage from "./pages/memberpage";
import Search from "./pages/search";
import About from "./pages/about";
import Manager from "./pages/manager";
import "react-calendar/dist/Calendar.css"; // css import
import "./pages/manager/components/facilities/CalendarApp.scss";
import ChannelService from "./components/common/ChannelService";
import KaKaoLoginRedirect from "./pages/login/components/KaKaoLoginRedirect";
import axios from "axios";

function App() {
  const nav = useNavigate();

  //로그인 상태 저장
  const [lstate, setLstate] = useState({
    logid: "",
    nickName: "",
    flink: "/login",
  });

  useEffect(() => {
    //세션에 저장된 로그인 아이디를 가져옴(로그인 상태 유지)
    const id = sessionStorage.getItem("id");
    const nickName = sessionStorage.getItem("nickName");
    ChannelService.boot({
      pluginKey: "261174a2-5819-4674-be05-d9bb582cd3b9",
      memberId: id,
      profile: {
        name: nickName,
        email: id,
      },
    });
    //console.log(mid);
    if (id !== null) {
      const newState = {
        logid: id,
        nickName: nickName,
        flink: "/memberpage",
      };
      setLstate(newState);
    }
  }, []);

  //로그인 성공 시 로그인 상태 변경 함수
  const sucLogin = useCallback((id, nickName) => {
    const newState = {
      logid: id,
      nickName: nickName,
      flink: "/memberpage",
    };
    setLstate(newState);
  }, []);

  //로그아웃함수
  const onLogout = () => {
    axios
      .post("/logout", { data: { id: lstate.logid } })
      .then((result) => console.log(result.data));
    alert("로그아웃");
    // const REST_API_KEY = "bad1b060092a0ed86a3dfe34c2fb99f9";
    // const REDIRECT_URI = "http://localhost:3000/";
    // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_URI}`;
    // window.location.href = KAKAO_AUTH_URL;

    const newState = {
      logid: "",
      flink: "/login",
    };
    setLstate(newState);
    //로그아웃 시 로그인 상태 및 페이지번호 삭제
    sessionStorage.removeItem("pageNum");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("nickName");
    sessionStorage.removeItem("classification");
    nav("/"); //첫페이지로 돌아감.
  };

  return (
    <>
      <Header lstate={lstate} onLogout={onLogout} />
      <Routes>
        <Route path="/*" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<LoginMember sucLogin={sucLogin} />}></Route>
        <Route path="/join/*" element={<JoinMember />}></Route>
        <Route path="/share/*" element={<Share />}></Route>
        <Route path="/talk/*" element={<Talk />}></Route>
        <Route path="/together/*" element={<Together />}></Route>
        <Route path="/search/*" element={<Search />}></Route>
        <Route
          path="/memberpage/*"
          element={<MemberPage onLogout={onLogout} lstate={lstate} />}
        ></Route>
        <Route path="/manager/*" element={<Manager />}></Route>
        <Route
          path="/login/kakao/callback"
          element={<KaKaoLoginRedirect sucLogin={sucLogin} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
