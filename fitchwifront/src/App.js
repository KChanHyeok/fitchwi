import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Feed from "./pages/feed";
import LoginMember from "./pages/login";
import JoinMember from "./pages/join";
import Talk from "./pages/talk";
import Header from "./layout/Header";
import Together from "./pages/together";
import MemberPage from "./pages/memberpage";
import TalkInfo from "./pages/talk/components/TalkInfo";

function App() {
  const nav = useNavigate();

  //로그인 상태 저장
  const [lstate, setLstate] = useState({
    logid: "",
    flink: "/login",
  });

  useEffect(() => {
    //세션에 저장된 로그인 아이디를 가져옴(로그인 상태 유지)
    const id = sessionStorage.getItem("id");
    //console.log(mid);
    if (id !== null) {
      const newState = {
        logid: id,
        flink: "/memberpage",
      };
      setLstate(newState);
    }
  }, []);

  //로그인 성공 시 로그인 상태 변경 함수
  const sucLogin = useCallback((id) => {
    const newState = {
      logid: id,
      flink: "/memberpage",
    };
    setLstate(newState);
  }, []);

  //로그아웃함수
  const onLogout = () => {
    alert("로그아웃");
    const newState = {
      logid: "",
      flink: "/login",
    };
    setLstate(newState);
    //로그아웃 시 로그인 상태 및 페이지번호 삭제
    sessionStorage.removeItem("id");
    nav("/"); //첫페이지로 돌아감.
  };
  return (
    <>
      <Header lstate={lstate} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<LoginMember sucLogin={sucLogin} />}
        ></Route>
        <Route path="/join/*" element={<JoinMember />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/talk/*" element={<Talk />}></Route>
        <Route path="/talkInfo" element={<TalkInfo />}></Route>
        <Route path="/together/*" element={<Together />}></Route>
        <Route
          path="/memberpage"
          element={<MemberPage onLogout={onLogout} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
