import React, { useEffect, useState } from "react";
import TogetherMain from "./components/togetherMain";
import { Box } from "@mui/material";
import TogetherAdd from "./components/togetherAdd";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import TogetherArt from "./components/togetherArt";
import TogetherInfo from "./components/togetherInfo";
import AddButton from "./components/common/addButton";
import TogetherHome from "./components/togetherHome";
import Footer from "../../layout/Footer";

const Together = () => {
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [togetherList, setTogetherList] = useState([]);
  const [togetherJoinList, setTogetherJoinList] = useState([]);

  useEffect(() => {
    getAllFacilitiesList();
    getAllTogetherList();
    getAllTogetherJoinList();
  }, []);

  const getAllFacilitiesList = async () => {
    await axios
      .get("/getAllFacilitiesList")
      .then((res) => {
        setFacilitiesList(res.data);
      })
      .catch((error) => console.log(error));
  };
  const getAllTogetherList = async () => {
    await axios
      .get("/getAllTogetherList")
      .then((res) => {
        setTogetherList(res.data);
      })
      .catch((error) => console.log(error));
  };
  const getAllTogetherJoinList = async () => {
    await axios
      .get("/getAllTogetherJoinList")
      .then((res) => {
        setTogetherJoinList(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box>
      <AddButton />
      <Routes>
        <Route path="/*" element={<TogetherHome />} />
        <Route path="main" element={<TogetherMain refreshTogetherList={getAllTogetherList} togetherList={togetherList} />} />
        <Route path="art" element={<TogetherArt />} />
        <Route
          path="/:togetherPageCode"
          element={
            <TogetherInfo
              refreshTogetherJoinList={getAllTogetherJoinList}
              togetherJoinList={togetherJoinList}
              togetherList={togetherList}
            />
          }
        />
        <Route path="add" element={<TogetherAdd data={facilitiesList} refreshTogetherList={getAllTogetherList} />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default Together;
