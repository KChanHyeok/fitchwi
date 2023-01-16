import styled from "@emotion/styled";
import { Category } from "@mui/icons-material";
import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link, useNavigate } from "react-router-dom";
import TogetherCategory from "./togetherCategory";
import { AssignmentTurnedIn } from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People';
import moment from "moment";


const TogetherHome = ({togetherList, togetherTagList}) => {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();


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
      <Box height={400} width="100%">
        <Carousel next={() => {}} prev={() => {}} animation="slide" duration={800} sx={{height: "100%"}}>
          <Box minHeight={300} minWidth={300} width="100%" height="100%" component="img" maxHeight={400} src="/images/TogetherBanner1.png" sx={{ cursor: "pointer" }}></Box>
          <Box minHeight={300} minWidth={300} width="100%" height="100%" component="img" maxHeight={400} src="/images/TogetherBanner2.png" sx={{ cursor: "pointer" }}></Box>
          <Box minHeight={300} minWidth={300} width="100%" height="100%" component="img" maxHeight={400} src="/images/TogetherBanner3.png" sx={{ cursor: "pointer" }}></Box>
        </Carousel>
      </Box>
      <Container>
        <Box flex={4} p={2}>
          {/* 광고 또는 함께해요 홍보 영역 */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" >
            <Typography variant="h6"></Typography>
            <Button variant="contained" endIcon={<Category />} onClick={() => setOpen(true)}>
              카테고리
            </Button>
          </Stack>
          <TogetherCategory togetherTagList={togetherTagList} open={open} setOpen={setOpen} type={"together"} />
          {/* 1번 카테고리 */}
          <Box height={300}>
            <Typography variant="h6">📢함께해요 최근모집글</Typography>
            <Typography>#당일번개 #솔로환영 #볼링내기 #맛집투어 #인스타감성카페투어</Typography>
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1} >
              {togetherList.length === 0 ? (
              <Box
              sx={{width:"100%"}}
              textAlign="center"
              lineHeight="20"
              >
            <CircularProgress/>
          </Box>): togetherList.sort((a,b) => b.togetherCode - a.togetherCode).filter((data, index) =>data.togetherState!=="삭제신청중" && data.togetherState!=="결제완료").filter((data, index)=>index<4).map(data => (
                <Card sx={{ mb: 3, width: 300, maxHeight: 340, textDecorationLine:"none" }} key={data.togetherCode} component={Link} to={`/together/${data.togetherCode}`}>
                <CardActionArea>
                  <CardMedia src={`/images/${data.togetherSaveimg}`} component="img" width="200" height="150" alt="talkimg" />
                <CardContent>
                  <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", width:165, height:30}}
                      >{data.togetherTitle}</Typography>
                  <Box>
                        <Chip
                          color="primary"
                          variant="outlined"
                          label={ data.togetherCategory}
                          size="small"
                          sx={{fontSize:10, mt:1}}
                        />
                        <Typography color="textSecondary" variant="caption" sx={{mt: 1.8 }} style={{ float: "right" }}>
                          <b>{data.togetherType}</b>
                        </Typography>
                        <Box style={{ float: "right" }}>
                          <AssignmentTurnedIn sx={{ color: "grey", mt: 1.5}} fontSize="small" />
                        </Box>
                        <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                          <b>{data.togetherMemberCount + 1}/{data.togetherMax}</b>
                        </Typography >
                        <Box style={{ float: "right" }}>
                          <PeopleIcon sx={{ color: "grey", mt: 1.2}} />
                        </Box>
                      </Box>
                      <Typography
                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 165, height: 30, mt:1}}
                      >
                        {data.togetherContent}
                      </Typography>
                  <hr />
                  <Box sx={{mt:1}}>
                    <Typography variant="caption" color="textSecondary">
                      <b>1인당 부담금 </b>{(data.togetherPrice + data.togetherOpenedCode.facilitiesCode.facilitiesPrice) === 0 ? "무료" : (data.togetherPrice + data.togetherOpenedCode.facilitiesCode.facilitiesPrice) +" 원"}<br />
                      <b>모이는 일자 </b>{data.togetherDate}<br/>
                      <b>모집 기간 </b>{data.togetherRecruitStartDate} ~ {data.togetherRecruitEndDate}
                    </Typography>
                  </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
              ))}
            </Stack>
          </Box>
          {/* 2번 카테고리 */}
          <Box height={300} mt={15}>
            <Typography variant="h6">오픈 예정 모임</Typography>
            <Typography > #당일번개 #솔로환영 #볼링내기 #맛집투어 #인스타감성카페투어</Typography>
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
              {togetherList.length === 0 ? (
              <Box
              sx={{width:"100%"}}
              textAlign="center"
              lineHeight="20"
              >
            <CircularProgress/>
          </Box>): togetherList.filter(data=>data.togetherRecruitStartDate>moment().format("YYYY-MM-DD")).filter((data, index) =>data.togetherState!=="삭제신청중" && data.togetherState!=="결제완료").filter((data, index)=>index<4).map(data => (
                <Card sx={{ mb: 3, width: 300, maxHeight: 340, textDecorationLine:"none" }} key={data.togetherCode} component={Link} to={`/together/${data.togetherCode}`}>
                <CardActionArea>
                  <CardMedia src={`/images/${data.togetherSaveimg}`} component="img" width="200" height="150" alt="talkimg"/>
                <CardContent>
                  <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", width:165, height:30}}
                      >{data.togetherTitle}</Typography>
                  <Box>
                        <Chip
                          onClick={()=> nav()}
                          color="primary"
                          variant="outlined"
                          label={ data.togetherCategory}
                          size="small"
                          sx={{fontSize:10, mt:1}}
                        />
                        <Typography color="textSecondary" variant="caption" sx={{mt: 1.8 }} style={{ float: "right" }}>
                          <b>{data.togetherType}</b>
                        </Typography>
                        <Box style={{ float: "right" }}>
                          <AssignmentTurnedIn sx={{ color: "grey", mt: 1.5}} fontSize="small" />
                        </Box>
                        <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                          <b>{data.togetherMemberCount + 1}/{data.togetherMax}</b>
                        </Typography >
                        <Box style={{ float: "right" }}>
                          <PeopleIcon sx={{ color: "grey", mt: 1.2}} />
                        </Box>
                      </Box>
                      <Typography
                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 165, height: 30, mt:1}}
                      >
                        {data.togetherContent}
                      </Typography>
                  <hr />
                  <Box sx={{mt:1}}>
                    <Typography variant="caption" color="textSecondary">
                      <b>1인당 부담금 </b>{(data.togetherPrice + data.togetherOpenedCode.facilitiesCode.facilitiesPrice) === 0 ? "무료" : (data.togetherPrice + data.togetherOpenedCode.facilitiesCode.facilitiesPrice)+" 원"}<br />
                      <b>모이는 일자 </b>{data.togetherDate}<br/>
                      <b>모집 기간 </b>{data.togetherRecruitStartDate} ~ {data.togetherRecruitEndDate}
                    </Typography>
                  </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
              ))}
            </Stack>
          </Box>

          <Link>
            <Box mt={17} width="100%" height="100%" minHeight={200}  maxWidth={1500} component="img" src="/images/TogetherPost1.png"></Box>
          </Link>

          {/* 3번 카테고리 */}
          <Box height={300} mt={2}>
            <Typography variant="h6">🥇현재 가장많은 카테고리 [{getMode(togetherList.map(data=>(data.togetherCategory)))}]</Typography>
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
                <Card sx={{ mb: 3, width: 300, maxHeight: 340, textDecorationLine:"none" }} key={data.togetherCode} component={Link} to={`/together/${data.togetherCode}`}>
                  <CardActionArea>
                    <CardMedia src={`/images/${data.togetherSaveimg}`} component="img" width="200" height="150" alt="talkimg" />
                  <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", width:165, height:30}}
                      >{data.togetherTitle}</Typography>
                      <Box>
                        
                         <Chip
                          color="primary"
                          variant="outlined"
                          label={ data.togetherCategory}
                          size="small"
                          sx={{fontSize:10, mt:1}}
                        />
                        <Typography color="textSecondary" variant="caption" sx={{mt: 1.8 }} style={{ float: "right" }}>
                          <b>{data.togetherType}</b>
                        </Typography>
                        <Box style={{ float: "right" }}>
                          <AssignmentTurnedIn sx={{ color: "grey", mt: 1.5}} fontSize="small" />
                        </Box>
                        <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                          <b>{data.togetherMemberCount + 1}/{data.togetherMax}</b>
                        </Typography >
                        <Box style={{ float: "right" }}>
                          <PeopleIcon sx={{ color: "grey", mt: 1.2}} />
                        </Box>
                      </Box>
                      <Typography
                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 165, height: 30, mt:1}}
                      >
                        {data.togetherContent}
                      </Typography>
                      <hr />
                      <Box sx={{mt:1}}>
                      <Typography variant="caption" color="textSecondary">
                        <b>1인당 부담금 </b>{(data.togetherPrice + data.togetherOpenedCode.facilitiesCode.facilitiesPrice) === 0 ? "무료" : (data.togetherPrice + data.togetherOpenedCode.facilitiesCode.facilitiesPrice) +" 원"}<br />
                        <b>모이는 일자 </b>{data.togetherDate}<br/>
                        <b>모집 기간 </b>{data.togetherRecruitStartDate} ~ {data.togetherRecruitEndDate}
                      </Typography>
                  </Box>
                  </CardContent>
                  </CardActionArea>
                </Card>
                )) 
              }
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
      </Container>
    </>
  );
};

export default TogetherHome;
