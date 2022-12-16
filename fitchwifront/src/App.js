import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Feed from "./pages/feed";
import LoginMember from "./components/LoginMember";
import JoinMember from "./components/JoinMember";
import Talk from "./pages/talk";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/feed" element={<Feed />}></Route>
      <Route path="/login" element={<LoginMember />}></Route>
      <Route path="/join" element={<JoinMember />}></Route>
       <Route path="/talk" element={<Talk />}></Route>
    </Routes>
  );
}

export default App;
