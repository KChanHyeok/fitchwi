import { Box, Divider, Grid, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const nav = useNavigate();
  return (
    <Box borderTop={1} textAlign="center" p={2}>
      <Container>
        <Box flex={4}>
          <Box ml={4} mr={4} mt={1}>
            <Stack direction="row">
              <Typography mr={1} fontWeight={100} sx={{ cursor: "pointer" }} onClick={() => nav("/about")}>
                이용 가이드
              </Typography>
              <Divider style={{ background: "grey", borderBottomWidth: 0.5 }} orientation="vertical" flexItem />
              <Typography ml={1} mr={1} fontWeight={100}>
                채용
              </Typography>
              <Divider style={{ background: "grey", borderBottomWidth: 0.5 }} orientation="vertical" flexItem />
              <Typography ml={1} mr={1} fontWeight={100}>
                이용약관
              </Typography>
              <Divider style={{ background: "grey", borderBottomWidth: 0.5 }} orientation="vertical" flexItem />
              <Typography ml={1} fontWeight={100}>
                개인정보 처리방침
              </Typography>
            </Stack>
            <Divider style={{ background: "grey", borderBottomWidth: 0.5 }} sx={{ mt: 3 }} />
            <Grid container spacing={2} mt={1}>
              <Grid item xs={5}>
                <Box height={200} textAlign="left">
                  <Typography variant="h5">
                    <b>🐷 FITCHWI</b>
                  </Typography>
                  <Typography mt={1}>팀장 : 김수엽 | 개인정보 보호책임자 : 김수엽</Typography>
                  <Typography fontWeight={100}>주소 : 인천 미추홀구 매소홀로488번길 6-32 태승빌딩 5층</Typography>
                  <Typography fontWeight={100}>사업자등록번호 : 123-45-67890</Typography>
                  <Typography fontWeight={100}>통신판매업신고번호 : 제 2023-인천최강-3468</Typography>
                  <Typography fontWeight={100}>마케팅 제휴 문의 : thseokjin@naver.com</Typography>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Box height={200} textAlign="left">
                  <Typography variant="h5">고객센터</Typography>
                  <Typography variant="h5" mt={1} mb={1}>
                    📞 032-876-3332
                  </Typography>
                  <Typography fontWeight={100}>운영시간 : 평일 11:00 - 16:00 (매주 금요일 11:00 - 14:00)</Typography>
                  <Typography fontWeight={100}>점심시간 : 12:30 - 13:30</Typography>
                  <Typography fontWeight={100}>주말&공휴일 : 휴무</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
