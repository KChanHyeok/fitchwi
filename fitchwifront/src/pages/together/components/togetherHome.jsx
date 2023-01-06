import { Category } from "@mui/icons-material";
import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import TogetherCategory from "./togetherCategory";

const TogetherHome = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container fixed>
      <Box height={300} ml={4} mr={4}>
        <Carousel next={() => {}} prev={() => {}} animation="slide" duration={800} sx={{ height: "100%" }}>
          <Box height={300} width={1088} component="img" src="/images/TogetherBanner1.png" sx={{ cursor: "pointer" }}></Box>
          <Box height={300} width={1088} component="img" src="/images/TogetherBanner2.png" sx={{ cursor: "pointer" }}></Box>
          <Box height={300} width={1088} component="img" src="/images/TogetherBanner3.png" sx={{ cursor: "pointer" }}></Box>
        </Carousel>
      </Box>
      <Box flex={4} p={4}>
        {/* 광고 또는 함께해요 홍보 영역 */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4}>
          <Typography variant="h6">함께해요 메인페이지</Typography>
          <Button variant="contained" endIcon={<Category />} onClick={() => setOpen(true)}>
            카테고리
          </Button>
        </Stack>
        <TogetherCategory open={open} setOpen={setOpen} />
        {/* 1번 카테고리 */}
        <Box height={300} mt={6}>
          <Typography variant="h6">오늘모임 HOT 키워드</Typography>
          <Typography variant="body1">#당일번개 #솔로환영 #볼링내기 #맛집투어 #인스타감성카페투어</Typography>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Box>

        {/* 2번 카테고리 */}
        <Box height={300} mt={6}>
          <Typography variant="h6">혼자 있는 것을 힘들어하는 당신을 위한</Typography>
          <Typography variant="body1"> #당일번개 #솔로환영 #볼링내기 #맛집투어 #인스타감성카페투어</Typography>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Box>

        <Link>
          <Box height={300} mt={6} width={1088} component="img" src="/images/TogetherPost1.png"></Box>
        </Link>

        {/* 3번 카테고리 */}
        <Box height={300} mt={6}>
          <Typography variant="h6">혼자 있는 것을 힘들어하는 당신을 위한</Typography>
          <Typography variant="body1"> #당일번개 #솔로환영 #볼링내기 #맛집투어 #인스타감성카페투어</Typography>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Box>

        {/* 4번 카테고리 */}
        <Box height={300} mt={6} mb={6}>
          <Typography variant="h6">혼자 있는 것을 힘들어하는 당신을 위한</Typography>
          <Typography variant="body1"> #당일번개 #솔로환영 #볼링내기 #맛집투어 #인스타감성카페투어</Typography>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle1">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default TogetherHome;
