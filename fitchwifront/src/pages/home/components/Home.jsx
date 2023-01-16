import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import HomeBestMember from "./HomeBestMember";
import HomeCategory from "./HomeCategory";
import HomeTalkList from "./HomeTalkList";
import HomeTapPanel from "./HomeTapPanel";
import HomeTogetherList from "./HomeTogetherList";

const Home = ({ lstate }) => {
  const { mbti } = lstate;
  const nav = useNavigate();
  const [category, setCategory] = useState("exercise");
  const [korCategory, setKorCategory] = useState("운동·액티비티");
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
      <Box mb={5} width="100%" sx={{ height: { xs: 250, sm: 250, md: 300, lg: 400 } }}>
        <Carousel next={() => {}} prev={() => {}} animation="slide" duration={800} sx={{ height: "100%" }} indicators={false}>
          <Box
            // height={400}
            width="100%"
            component="img"
            src="/images/MainPage1.png"
            sx={{ cursor: "pointer" }}
            onClick={() => nav("/together")}
          ></Box>
          <Box
            // height={400}
            width="100%"
            component="img"
            src="/images/MainPage3.png"
            sx={{ cursor: "pointer" }}
            onClick={() => nav("/talk")}
          ></Box>
          <Box
            // height={400}
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
            <HomeTapPanel mbti={mbti} />
            <Typography variant="h6" mb={1}>
              📕 카테고리 ❯ {korCategory}
            </Typography>
            <HomeCategory setCategory={setCategory} setKorCategory={setKorCategory} />
            <HomeTalkList category={category} korCategory={korCategory} talkList={talkList} type={"recent"} />
            <HomeTogetherList category={category} korCategory={korCategory} togetherList={togetherList} type={"recent"} />
            <Box height={300} mt={6} component="img" src="/images/TalkPost1.png" width="100%" />
            <HomeTalkList category={category} korCategory={korCategory} talkList={talkList} type={"popular"} />
            <HomeTogetherList category={category} korCategory={korCategory} togetherList={togetherList} type={"popular"} />
            <Typography variant="h6" mt={4}>
              🏆 이 달의 회원
            </Typography>
            <HomeBestMember />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
