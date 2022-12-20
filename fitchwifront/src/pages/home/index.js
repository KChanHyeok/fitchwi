import { Container, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

const Home = () => {
  return (
    <Container>
      <Box border={1} height={300}>
        <Typography textAlign="center" lineHeight={20}>
          메인 영역
        </Typography>
      </Box>
      <Box p={2} ml={10} mr={10} mt={5}>
        <Stack direction="row" spacing={4} justifyContent="space-between">
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
        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-between"
          sx={{ mt: 10 }}
        >
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
        <Box border={1} p={4} mt={10} minHeight={200}>
          <Typography>내 지역주변의 함께해요</Typography>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Box sx={{ textAlign: "center" }} border={1} p={4}></Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
