import styled from "@emotion/styled";
import { Category } from "@mui/icons-material";
import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import TogetherCategory from "./togetherCategory";

const TogetherHome = ({togetherList}) => {
  const [open, setOpen] = useState(false);


  const getMode = (array) => {
    const counts = array.reduce((pv, cv) => {
      pv[cv] = (pv[cv] || 0) + 1;
      return pv;
    }, {});

    const keys = Object.keys(counts);
    let mode = keys[0];
    keys.forEach((val, idx) => {
      if (counts[val] > counts[mode]) {
        mode = val;
      }
    });
    return mode;
  }


  return (
    <>
      <Box width="100%">
        <Carousel next={() => {}} prev={() => {}} animation="slide" duration={900} sx={{ height: "100%"}} indicators={false}>
          <Box minHeight={200} minWidth={300} width="100%" height="100%" maxHeight={350} component="img" src="/images/TogetherBanner1.png" sx={{ cursor: "pointer" }}></Box>
          <Box minHeight={200} minWidth={300} width="100%" height="100%" maxHeight={350} component="img" src="/images/TogetherBanner2.png" sx={{ cursor: "pointer" }}></Box>
          <Box minHeight={200} minWidth={300} width="100%" height="100%" maxHeight={350} component="img" src="/images/TogetherBanner3.png" sx={{ cursor: "pointer" }}></Box>
        </Carousel>
      </Box>
      <Box flex={4} p={2}>
        {/* 광고 또는 함께해요 홍보 영역 */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4}>
          <Typography variant="h6">함께해요 메인페이지</Typography>
          <Button variant="contained" endIcon={<Category />} onClick={() => setOpen(true)}>
            카테고리
          </Button>
        </Stack>
        <TogetherCategory open={open} setOpen={setOpen} type={"together"} />
        {/* 1번 카테고리 */}
        <Box height={300} mt={6}>
          <Typography variant="h6">함께해요 최근모집글</Typography>
          <Typography>#당일번개 #솔로환영 #볼링내기 #맛집투어 #인스타감성카페투어</Typography>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
            {togetherList.length === 0 ? (
            <Box
            sx={{width:"100%"}}
            textAlign="center"
            lineHeight="20"
            >
          <CircularProgress/>
        </Box>): togetherList.sort((a,b) => b.togetherCode - a.togetherCode).filter((data, index) =>data.togetherState!=="삭제신청중" && data.togetherState!=="결제완료").filter((data, index)=>index<4).map(data => (
              <Card sx={{ mb: 3, width: 300, maxHeight: 300, textDecorationLine:"none" }} key={data.togetherCode} component={Link} to={`/together/${data.togetherCode}`}>
              <CardActionArea>
                <CardMedia src={`/images/${data.togetherSaveimg}`} component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                    <Typography
                      variant="h6"
                      sx={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", width:165, height:30}}
                    >{data.togetherTitle}</Typography>
                    <Chip
                      color="primary"
                      variant="outlined"
                      label={ data.togetherCategory}
                      size="small"
                      sx={{fontSize:10}}
                    />
                    <Typography
                      sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 165, height: 30 }}
                    >
                      {data.togetherContent}
                    </Typography>
                    <hr/>
                </CardContent>
              </CardActionArea>
            </Card>
            ))}
          </Stack>
        </Box>

        {/* 2번 카테고리 */}
        <Box height={300} mt={6}>
          <Typography variant="h6">현재 가장많은 카테고리 [{getMode(togetherList.map(data=>(data.togetherCategory)))}]</Typography>
          <Typography> #공예 #성장 #요리 #즐겁다 #인스타감성카페투어</Typography>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
            {togetherList.length===0 ? (
            <Box
            sx={{width:"100%"}}
            textAlign="center"
            lineHeight="20"
            >
             <CircularProgress/>
            </Box>)
            : togetherList.filter(data=>(getMode(togetherList.map(data=>(data.togetherCategory)))===data.togetherCategory) && data.togetherState!=="삭제신청중" && data.togetherState!=="결제완료").filter((data, index) => index < 4).map(data => (
              <Card sx={{ mb: 3, width: 300, maxHeight: 300, textDecorationLine:"none" }} key={data.togetherCode} component={Link} to={`/together/${data.togetherCode}`}>
                <CardActionArea>
                  <CardMedia src={`/images/${data.togetherSaveimg}`} component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                    <Typography
                      variant="h6"
                      sx={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", width:165, height:30}}
                    >{data.togetherTitle}</Typography>
                    <Chip
                      color="primary"
                      variant="outlined"
                      label={ data.togetherCategory}
                      size="small"
                      sx={{fontSize:10}}
                    />
                    <Typography
                      sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 165, height: 30 }}
                    >
                      {data.togetherContent}
                    </Typography>
                    <hr/>
                </CardContent>
                </CardActionArea>
              </Card>
              )) 
            }
            
          </Stack>
        </Box>

        <Link>
          <Box mt={6} width="100%" height="100%" minHeight={200}  maxWidth={1500} component="img" src="/images/TogetherPost1.png"></Box>
        </Link>

        {/* 3번 카테고리
        <Box height={300} mt={6}>
          <Typography variant="h6">가장인기 있는 카테고리</Typography>
          <Typography > #당일번개 #솔로환영 #볼링내기 #맛집투어 #인스타감성카페투어</Typography>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Box>

        {/* 4번 카테고리 */}
        {/* <Box height={300} mt={6} mb={6}>
          <Typography variant="h6">혼자 있는 것을 힘들어하는 당신을 위한</Typography>
          <Typography> #당일번개 #솔로환영 #볼링내기 #맛집투어 #인스타감성카페투어</Typography>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }}>
              <CardActionArea>
                <CardMedia component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography variant="h5">함께해요 명</Typography>
                  <Typography variant="subtitle">함께해요 소개</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Box>  */}
      </Box>
    </>
  );
};

export default TogetherHome;
