import { Box, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import HomeCategory from "./HomeCategory";
import HomeTalkList from "./HomeTalkList";
import HomeTapPanel from "./HomeTapPanel";
import HomeTogetherList from "./HomeTogetherList";

const Home = () => {
  const [category, setCategory] = useState("문화∙예술");
  const [talkList, setTalkList] = useState([]);
  const [togetherList, setTogetherList] = useState([]);

  const getAllTalkList = async () => {
    await axios
      .get("/getAllTalkList")
      .then((res) => {
        console.log(res.data);
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
      <Box mb={4} height={400} width="100%">
        <Carousel next={() => {}} prev={() => {}} animation="slide" duration={800} sx={{ height: "100%" }} indicators={false}>
          <Box height={400} width="100%" component="img" src="/images/background1.jpg" sx={{ cursor: "pointer" }}></Box>
          <Box height={400} width="100%" component="img" src="/images/background1.jpg" sx={{ cursor: "pointer" }}></Box>
          <Box height={400} width="100%" component="img" src="/images/background1.jpg" sx={{ cursor: "pointer" }}></Box>
        </Carousel>
      </Box>
      <Container>
        <Box flex={4}>
          <Box ml={4} mr={4}>
            <HomeTapPanel />
            <HomeCategory setCategory={setCategory} />
            <HomeTalkList category={category} talkList={talkList} />
            <HomeTogetherList category={category} togetherList={togetherList} />
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
