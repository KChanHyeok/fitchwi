import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";

const Home = () => {
  return (
    <>
      <Container>
        <Box flex={4} p={2}>
          <Box p={2} ml={10} mr={10} mt={5}>
            <Box border={1} mb={4}>
              <Carousel next={() => {}} prev={() => {}} animation="slide" duration={800} sx={{ height: "100%" }} indicators={false}>
                <Box component="img" src="/images/MainPageBanner1.png" height={400} width={1000} />
                <div style={{ backgroundColor: "pink", width: 1000, height: 400 }}></div>
              </Carousel>
            </Box>
            <Stack direction="row" spacing={3} justifyContent="space-between">
              {/* 카테고리 데이터 불러와서 map 형식으로 뿌리게 수정 필요 */}
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미
              </Box>
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미
              </Box>
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미
              </Box>
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미
              </Box>
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미
              </Box>
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미
              </Box>
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미
              </Box>
            </Stack>
            <Stack direction="row" spacing={3} justifyContent="space-between" sx={{ mt: 10 }}>
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미 카테고리 얘기해요
              </Box>
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미 카테고리 얘기해요
              </Box>
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미 카테고리 얘기해요
              </Box>
              <Box sx={{ textAlign: "center" }} border={1} p={4}>
                취미 카테고리 얘기해요
              </Box>
            </Stack>
            <Grid container mt={10} minHeight={100}>
              <Grid item xs={8} border={1} p={2} textAlign="center" lineHeight={5}>
                <Box>가장 인기있는 함께해요</Box>
              </Grid>
              <Grid item xs={4} border={1} p={2} textAlign="center" lineHeight={5}>
                <Box>최근 게시된 함께해요</Box>
              </Grid>
            </Grid>
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
