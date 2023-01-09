import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const nav = useNavigate();
  return (
    <Box mb={4}>
      <Box height={500} component="img" src="/images/about.png" width="100%" />
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
              <Typography variant="h6" mt={2} color="grey">
                🍑FITCHWI는 모임을 주최하고 이끌어갈 호스트를 중심으로
                <br />
                취향이 맞는 사람들을 연결해요. 연결된 사람들은 가정집, 작업실, 동네가게 등<br />
                모임이 진행되는 공간에 모여 공통된 관심사로 대화하며 취향을 나눠요.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box height={300} width="100%" sx={{ backgroundColor: "pink" }} mt={5} />
      <Box textAlign="center" mt={5}>
        <Typography variant="h4">모든 공간이</Typography>
        <Typography variant="h4" mt={2}>
          취향으로 모이는 커뮤니티가 되도록
        </Typography>
      </Box>
      <Box height={300} width="100%" sx={{ backgroundColor: "beige" }} textAlign="center" mt={5}>
        <Typography variant="h4" p={11}>
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
