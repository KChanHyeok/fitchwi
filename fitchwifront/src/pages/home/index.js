import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../../layout/Footer";
import Home from "./components/Home";

const HomeIndex = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default HomeIndex;
