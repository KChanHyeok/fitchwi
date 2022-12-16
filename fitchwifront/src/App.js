import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Feed from "./pages/feed";
import Talk from "./pages/talk";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/talk" element={<Talk />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
