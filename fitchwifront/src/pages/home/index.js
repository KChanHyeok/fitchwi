import React from "react";
import Footer from "../../layout/Footer";
import Home from "./components/Home";

const HomeIndex = ({ lstate }) => {
  return (
    <>
      <Home lstate={lstate} />
      <Footer />
    </>
  );
};

export default HomeIndex;
