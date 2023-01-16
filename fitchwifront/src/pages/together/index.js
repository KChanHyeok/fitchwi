import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TogetherAdd from "./components/togetherAdd";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import TogetherInfo from "./components/togetherInfo";
import AddButton from "./components/common/addButton";
import TogetherHome from "./components/togetherHome";
import TogetherCategoryList from "./components/togetherCategoryList";


const Together = () => {
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [togetherList, setTogetherList] = useState([]);
  const [togetherJoinList, setTogetherJoinList] = useState([]);
  const [togetherTagList, setTogetherTagList] = useState([]);

  useEffect(() => {
    getAllFacilitiesList();
    getAllTogetherList();
    getAllTogetherJoinList();
    getAllTogetherTagList();
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
  const getAllTogetherTagList = async () => {
    await axios
      .get("/getAllTogetherTag")
      .then((res) => {
        setTogetherTagList(res.data);
      })
  };

  return (
    <Box>
      <AddButton />
      <Routes>
        <Route
          path="/*"
          element={
            <TogetherHome
              togetherList={togetherList} togetherTagList={togetherTagList} />} />
        <Route
          path="/category/:togetherCategoryText"
          element={
            <TogetherCategoryList
              togetherList={togetherList} />} />
        <Route
          path="/:togetherPageCode"
          element={
            <TogetherInfo
              refreshTogetherJoinList={getAllTogetherJoinList}
              refreshTogetherList={getAllTogetherList}
              refreshTogetherTagList={getAllTogetherTagList}
              togetherJoinList={togetherJoinList}
              togetherList={togetherList}
              togetherTagList={togetherTagList}
            />
          }
        />
        <Route path="add" element={<TogetherAdd facilitieList={facilitiesList} refreshTogetherList={getAllTogetherList} refreshTogetherTagList={getAllTogetherTagList} />} />
      </Routes>
    </Box>
  );
};

export default Together;
