import { Box, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import HomeCategory from "./HomeCategory";
import HomeTalkList from "./HomeTalkList";
import HomeTapPanel from "./HomeTapPanel";
import HomeTogetherList from "./HomeTogetherList";

const Home = () => {
  const nav = useNavigate();
  const [category, setCategory] = useState("culture");
  const [korCategory, setKorCategory] = useState("문화·예술");
  const [talkList, setTalkList] = useState([]);
  const [togetherList, setTogetherList] = useState([]);

  const getAllTalkList = async () => {
    await axios
      .get("/getAllTalkList")
      .then((res) => {
        setTalkList(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getAllTogetherList = async () => {
    await axios
      .get("/getAllTogetherList")
      .then((res) => {
        console.log(res.data);
        setTogetherList(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllTalkList();
    getAllTogetherList();
  }, []);

  return (
    <>
      <Box mb={5} height={400} width="100%">
        <Carousel next={() => {}} prev={() => {}} animation="slide" duration={800} sx={{ height: "100%" }} indicators={false}>
          <Box
            height={400}
            width="100%"
            component="img"
            src="/images/MainPage1.png"
            sx={{ cursor: "pointer" }}
            onClick={() => nav("/together")}
          ></Box>
          <Box
            height={400}
            width="100%"
            component="img"
            src="/images/MainPage3.png"
            sx={{ cursor: "pointer" }}
            onClick={() => nav("/talk")}
          ></Box>
          <Box
            height={400}
            width="100%"
            component="img"
            src="/images/MainPage2.png"
            sx={{ cursor: "pointer" }}
            onClick={() => nav("/share")}
          ></Box>
        </Carousel>
      </Box>
      <Container>
        <Box flex={4}>
          <Box ml={4} mr={4}>
            <HomeTapPanel />
            <Typography variant="h6" mb={1}>
              📕 카테고리
            </Typography>
            <HomeCategory setCategory={setCategory} setKorCategory={setKorCategory} />
            <HomeTalkList category={category} korCategory={korCategory} talkList={talkList} />
            <HomeTogetherList category={category} korCategory={korCategory} togetherList={togetherList} />
            <Box border={1} p={2} minHeight={200} mt={10} mb={10}>
              <Typography>내 지역주변의 함께해요</Typography>
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <Box sx={{ textAlign: "center" }} border={1} p={4} width={100} height={100}></Box>
                <Box sx={{ textAlign: "center" }} border={1} p={4} width={100} height={100}></Box>
                <Box sx={{ textAlign: "center" }} border={1} p={4} width={100} height={100}></Box>
                <Box sx={{ textAlign: "center" }} border={1} p={4} width={100} height={100}></Box>
                <Box sx={{ textAlign: "center" }} border={1} p={4} width={100} height={100}></Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
