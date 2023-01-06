import { Box, Container, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Box sx={{ overflowY: "scroll" }}>
      <Box height={500} component="img" src="/images/about.png" width="100%" />
      <Container fixed>
        <Box flex={4}>
          <Box ml={4} mr={4}>
            {/* 광고 또는 얘기해요 홍보 영역 */}

            <Box textAlign="center" mt={10}>
              <Typography variant="h4">같은 취미를 가진 자기들을 위한</Typography>
              <Typography variant="h5">대화, 공간을 나누는 커뮤니티</Typography>
              <Typography variant="body1">
                FITCHWI는 모임을 주최하고 이끌어갈 호스트를 중심으로 취향이 맞는 사람들을 연결해요. 연결된 사람들은 가정집, 작업실, 동네가게
                등 모임이 진행되는 공간에 모여 공통된 관심사로 대화하며 취향을 나눠요.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
