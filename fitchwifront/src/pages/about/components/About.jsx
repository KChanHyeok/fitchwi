import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const nav = useNavigate();
  return (
    <Box mb={4}>
      <Box height={400} component="img" src="/images/About1.png" width="100%" />
      <Container fixed>
        <Box flex={4}>
          <Box>
            {/* 광고 또는 얘기해요 홍보 영역 */}
            <Box textAlign="center" mt={10}>
              <Typography variant="h4">
                같은 취미를 가진 자기들을 위한
                <br />
                대화, 공간을 나누는 커뮤니티
              </Typography>
              <Typography variant="h6" mt={2} color="grey" fontWeight={100}>
                <b>😀FITCHWI</b>는 모임을 주최하고 이끌어갈 호스트를 중심으로
                <br />
                취향이 맞는 사람들을 연결해요. 연결된 사람들은 가정집, 작업실, 동네가게 등<br />
                모임이 진행되는 공간에 모여 공통된 관심사로 대화하며 취향을 나눠요.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box height={500} width="100%" sx={{ backgroundColor: "pink" }} mt={5}>
        <Grid container spacing={2} display="flex" p={3} alignItems="center" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
          <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize={30} fontWeight={100} mb={2} sx={{ display: { xs: "none", sm: "block" } }}>
              👥 함께하고
            </Typography>
            <Avatar
              src={"/images/MainPage1.png"}
              sx={{ width: { xs: 130, sm: 180, md: 250, lg: 300 }, height: { xs: 130, sm: 180, md: 250, lg: 300 } }}
            />
            <Typography fontSize={18} fontWeight={100} sx={{ display: { xs: "none", sm: "block" } }} mt={2}>
              똑같은 일상을 다채롭게 만들어 줄 취향 모임
            </Typography>
          </Grid>
          <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize={18} fontWeight={100} sx={{ display: { xs: "none", sm: "block" } }} mb={2}>
              언제나 어디서나 관심사로 연결되기
            </Typography>
            <Avatar
              src={"/images/MainPage2.png"}
              sx={{ width: { xs: 130, sm: 180, md: 250, lg: 300 }, height: { xs: 130, sm: 180, md: 250, lg: 300 } }}
            />
            <Typography fontSize={30} fontWeight={100} mt={2} sx={{ display: { xs: "none", sm: "block" } }}>
              💬 얘기하고
            </Typography>
          </Grid>
          <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize={30} fontWeight={100} mb={2} sx={{ display: { xs: "none", sm: "block" } }}>
              🤝 공유해요
            </Typography>
            <Avatar
              src={"/images/MainPage3.png"}
              sx={{ width: { xs: 130, sm: 180, md: 250, lg: 300 }, height: { xs: 130, sm: 180, md: 250, lg: 300 } }}
            />
            <Typography fontSize={18} fontWeight={100} sx={{ display: { xs: "none", sm: "block" } }} mt={2}>
              비슷한 관심사를 가진 멤버들의 취향 피드 구독하기
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4">모든 공간이</Typography>
        <Typography variant="h4" mt={2}>
          취향으로 모이는 커뮤니티가 되도록
        </Typography>
      </Box>
      <Box height={300} width="100%" sx={{ backgroundColor: "beige" }} textAlign="center" mt={5}>
        <Typography variant="h4" p={11} fontWeight={100}>
          취향 나누러 가볼까요?
          <br />
          <Button variant="contained" onClick={() => nav("/")} sx={{ backgroundColor: "orange", borderRadius: 5, mt: 4 }} size="large">
            Fitchwi 둘러보기
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
