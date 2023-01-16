import React from "react";
import { AssignmentTurnedIn, Category } from "@mui/icons-material";
import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Container, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link, useNavigate } from "react-router-dom";
import TogetherCategory from "../../together/components/togetherCategory";
import styled from "@emotion/styled";
import TalkMbti from "./TalkMbti";
import PeopleIcon from '@mui/icons-material/People';

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const TalkHome = ({ talkList }) => {
  const nav = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <>
      <Box height={400} width="100%">
        <Carousel next={() => { }} prev={() => { }} animation="slide" duration={800} sx={{ height: "100%" }} indicators={false} >
          <Box minHeight={300} minWidth={300} maxHeight={400} width="100%" height="100%" component="img" src="/images/TalkBanner1.png" sx={{ cursor: "pointer" }}></Box>
          <Box minHeight={300} minWidth={300} maxHeight={400} width="100%" height="100%" component="img" src="/images/TalkBanner2.png" sx={{ cursor: "pointer" }}></Box>
          <Box minHeight={300} minWidth={300} maxHeight={400} width="100%" height="100%" component="img" src="/images/TalkBanner3.png" sx={{ cursor: "pointer" }}></Box>
        </Carousel >
      </Box>
      {/* 광고 또는 얘기해요 홍보 영역 */}

      {/* 얘기해요 소개 페이지 */}
      <Container fixed={true}>
        <Box flex={4}>
          <Box ml={4} mr={4}>

            {/* mbti 추천 카테고리 */}
            <Box height={380} mt={4}>
              <Box
                sx={{
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    mt: 5,
                    mr: 10,
                    ml: 10,
                    height: 420,
                  },
                }}
              >
                <Paper elevation={3}>
                  <TalkMbti talkList={talkList} />
                </Paper>


              </Box>
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={10}>
              <Typography variant="h6"></Typography>
              <Button variant="contained" endIcon={<Category />} onClick={() => setOpen(true)}>
                카테고리
              </Button>
            </Stack>
            <TogetherCategory open={open} setOpen={setOpen} type={"talk"} />

            {/* 1번 카테고리 - 최신순 */}
            <Box height={500}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={3}>
                <Typography variant="h5">⚡️ 새로 열린 얘기해요</Typography>
                <Button onClick={() => nav("/talk/new")}>전체보기</Button>
              </Stack>
              <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
                {talkList.length === 0 && <Box
                  sx={{ width: "100%" }}
                  textAlign="center"
                  lineHeight="20"
                >
                  <CircularProgress sx={{ margin: "auto" }} />
                </Box>}
                {talkList.sort((a, b) => b.talkCode - a.talkCode).filter((data, index) => index < 3).map(data => (
                  <Card sx={{ mb: 3, width: 320, maxHeight: 400, textDecorationLine: "none" }}
                    key={data.talkCode}
                  >
                    <CardActionArea>
                      <Link to={`/talk/${data.talkCode}`} style={{ textDecorationLine: "none", color: "black" }}>
                        <CardMedia src={`/images/${data.talkSaveimg}`} component="img" width="200" height="200" alt="talkimg" />
                      </Link>
                      <CardContent>
                        <Link to={`/talk/${data.talkCode}`} style={{ textDecorationLine: "none", color: "black" }}>
                          <Typography
                            variant="h6"
                            sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
                          >{data.talkTitle}</Typography>
                          <Box>
                            <Chip
                              color="primary"
                              variant="outlined"
                              label={data.talkCategory}
                              size="small"
                              sx={{ mt: 1, fontSize: 12 }}
                            />
                            <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                              <b>{data.talkType}</b>
                            </Typography>
                            <Box style={{ float: "right" }}>
                              <AssignmentTurnedIn sx={{ color: "grey", mt: 1.5 }} fontSize="small" />
                            </Box>
                            <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                              <b>{data.talkMemberCount + 1}/{data.talkMax}명</b>&nbsp;&nbsp;
                            </Typography>
                            <Box style={{ float: "right" }}>
                              <PeopleIcon sx={{ color: "grey", mt: 1.2 }} />
                            </Box>
                          </Box>
                          <Typography
                            sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "pre-wrap", height: 25 }}
                          >
                            {data.talkContent}
                          </Typography>
                          <hr />
                        </Link>
                        <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between" alignItems="center">
                          <UserBox>
                            <Link to="/memberpage" state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}>
                              <Avatar
                                src={data.talkOpenCode.memberEmail.memberSaveimg}
                                sx={{ width: 40, height: 40 }}
                              />
                            </Link>
                            <Typography component={Link} to="/memberpage" state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}
                              style={{ fontSize: 13, textDecorationLine: "none", color: "black" }}>
                              {data.talkOpenCode.memberEmail.memberNickname}</Typography>
                            <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                            </Box>
                          </UserBox>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Stack>
            </Box>

            {/* 2번 카테고리 - 인원 가장 많은 순 */}
            <Box height={500} mt={10} mb={7}>
              <Box display="flex" alignItems="center">
                <Typography variant="h5">💬 시끌벅적한 얘기해요</Typography>
              </Box>
              <Typography variant="h6" color="grey">
                활발한 활동이 이루어지는 공간에서 같이 즐겨요~
              </Typography>
              <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
                {talkList.length === 0 && <Box
                  sx={{ width: "100%" }}
                  textAlign="center"
                  lineHeight="20"
                >
                  <CircularProgress sx={{ margin: "auto" }} />
                </Box>}
                {talkList.filter((data) => data.talkMemberCount + 1 < data.talkMax)
                  .sort((a, b) => b.talkMemberCount - a.talkMemberCount).filter((data, index) => index < 3).map(data => (
                    <Card sx={{ mb: 3, width: 320, maxHeight: 400, textDecorationLine: "none" }}
                      key={data.talkCode}
                    >
                      <CardActionArea>
                        <Link to={`/talk/${data.talkCode}`} style={{ textDecorationLine: "none", color: "black" }}>
                          <CardMedia src={`/images/${data.talkSaveimg}`} component="img" width="200" height="200" alt="talkimg" />
                        </Link>
                        <CardContent>
                          <Link to={`/talk/${data.talkCode}`} style={{ textDecorationLine: "none", color: "black" }}>
                            <Typography
                              variant="h6"
                              sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
                            >{data.talkTitle}</Typography>
                            <Box>
                              <Chip
                                color="primary"
                                variant="outlined"
                                label={data.talkCategory}
                                size="small"
                                sx={{ mt: 1, fontSize: 12 }}
                              />
                              <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                                <b>{data.talkType}</b>
                              </Typography>
                              <Box style={{ float: "right" }}>
                                <AssignmentTurnedIn sx={{ color: "grey", mt: 1.5 }} fontSize="small" />
                              </Box>
                              <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                                <b>{data.talkMemberCount + 1}/{data.talkMax}명</b>&nbsp;&nbsp;
                              </Typography>
                              <Box style={{ float: "right" }}>
                                <PeopleIcon sx={{ color: "grey", mt: 1.2 }} />
                              </Box>
                            </Box>
                            <Typography
                              sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "pre-wrap", height: 25 }}
                            >
                              {data.talkContent}
                            </Typography>
                            <hr />
                          </Link>
                          <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between" alignItems="center">
                            <UserBox>
                              <Link to="/memberpage" state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}>
                                <Avatar
                                  src={data.talkOpenCode.memberEmail.memberSaveimg}
                                  sx={{ width: 40, height: 40 }}
                                />
                              </Link>
                              <Typography component={Link} to="/memberpage" state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}
                                style={{ fontSize: 13, textDecorationLine: "none", color: "black" }}>
                                {data.talkOpenCode.memberEmail.memberNickname}</Typography>
                              <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                              </Box>
                            </UserBox>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
              </Stack>
            </Box>

            <Link>
              <Box height={300} mt={6} component="img" src="/images/TalkPost1.png"></Box>
            </Link>

            {/* 3번 카테고리 - 키워드 추천(일기, 독서) */}
            <Box height={500} mt={10}>
              <Box display="flex" alignItems="center">
                <Typography variant="h5">📖 나 들여다보기, 또다른 나를 발견하는 시간</Typography>
              </Box>
              <Typography variant="h6" color="grey">
                일기나 독서를 통해 자신을 돌아보는 시간을 가져요~
              </Typography>
              <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
                {talkList.length === 0 && <Box
                  sx={{ width: "100%" }}
                  textAlign="center"
                  lineHeight="20"
                >
                  <CircularProgress sx={{ margin: "auto" }} />
                </Box>}
                {talkList.filter((data) => data.talkMemberCount + 1 < data.talkMax)
                  .sort(() => 0.5 - Math.random()).filter(data => data.talkTitle.includes("일기") || data.talkTitle.includes("독서")
                    || data.talkContent.includes("일기") || data.talkContent.includes("독서"))
                  .filter((data, index) => index < 3).map(data => (
                    <Card sx={{ mb: 3, width: 320, maxHeight: 400, textDecorationLine: "none" }}
                      key={data.talkCode}
                    >
                      <CardActionArea>
                        <Link to={`/talk/${data.talkCode}`} style={{ textDecorationLine: "none", color: "black" }}>
                          <CardMedia src={`/images/${data.talkSaveimg}`} component="img" width="200" height="200" alt="talkimg" />
                        </Link>
                        <CardContent>
                          <Link to={`/talk/${data.talkCode}`} style={{ textDecorationLine: "none", color: "black" }}>
                            <Typography
                              variant="h6"
                              sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
                            >{data.talkTitle}</Typography>
                            <Box>
                              <Chip
                                color="primary"
                                variant="outlined"
                                label={data.talkCategory}
                                size="small"
                                sx={{ mt: 1, fontSize: 12 }}
                              />
                              <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                                <b>{data.talkType}</b>
                              </Typography>
                              <Box style={{ float: "right" }}>
                                <AssignmentTurnedIn sx={{ color: "grey", mt: 1.5 }} fontSize="small" />
                              </Box>
                              <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                                <b>{data.talkMemberCount + 1}/{data.talkMax}명</b>&nbsp;&nbsp;
                              </Typography>
                              <Box style={{ float: "right" }}>
                                <PeopleIcon sx={{ color: "grey", mt: 1.2 }} />
                              </Box>
                            </Box>
                            <Typography
                              sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "pre-wrap", height: 25 }}
                            >
                              {data.talkContent}
                            </Typography>
                            <hr />
                          </Link>
                          <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between" alignItems="center">
                            <UserBox>
                              <Link to="/memberpage" state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}>
                                <Avatar
                                  src={data.talkOpenCode.memberEmail.memberSaveimg}
                                  sx={{ width: 40, height: 40 }}
                                />
                              </Link>
                              <Typography component={Link} to="/memberpage" state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}
                                style={{ fontSize: 13, textDecorationLine: "none", color: "black" }}>
                                {data.talkOpenCode.memberEmail.memberNickname}</Typography>
                              <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                              </Box>
                            </UserBox>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
              </Stack>
            </Box>

            {/* 4번 카테고리 -키워드 추천(영화) */}
            <Box height={500} mt={10}>
              <Box display="flex" alignItems="center">
                <Typography variant="h5">🎬 접속, 영화 혼자 보는 사람들을 위한 모임</Typography>
              </Box>
              <Typography variant="h6" color="grey">
                영화를 추천하거나 후기를 공유하면서 즐겁게 감상해요~
              </Typography>
              <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
                {talkList.length === 0 && <Box
                  sx={{ width: "100%" }}
                  textAlign="center"
                  lineHeight="20"
                >
                  <CircularProgress sx={{ margin: "auto" }} />
                </Box>}
                {talkList.filter((data) => data.talkMemberCount + 1 < data.talkMax)
                  .sort(() => 0.5 - Math.random())
                  .filter(data => data.talkTitle.includes("영화") || data.talkContent.includes("영화"))
                  .filter((data, index) => index < 3).map(data => (
                    <Card sx={{ mb: 3, width: 320, maxHeight: 400, textDecorationLine: "none" }}
                      key={data.talkCode}
                    >
                      <CardActionArea>
                        <Link to={`/talk/${data.talkCode}`} style={{ textDecorationLine: "none", color: "black" }}>
                          <CardMedia src={`/images/${data.talkSaveimg}`} component="img" width="200" height="200" alt="talkimg" />
                        </Link>
                        <CardContent>
                          <Link to={`/talk/${data.talkCode}`} style={{ textDecorationLine: "none", color: "black" }}>
                            <Typography
                              variant="h6"
                              sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
                            >{data.talkTitle}</Typography>
                            <Box>
                              <Chip
                                color="primary"
                                variant="outlined"
                                label={data.talkCategory}
                                size="small"
                                sx={{ mt: 1, fontSize: 12 }}
                                style={{ cursor: "pointer" }}
                              />
                              <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                                <b>{data.talkType}</b>
                              </Typography>
                              <Box style={{ float: "right" }}>
                                <AssignmentTurnedIn sx={{ color: "grey", mt: 1.5 }} fontSize="small" />
                              </Box>
                              <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                                <b>{data.talkMemberCount + 1}/{data.talkMax}명</b>&nbsp;&nbsp;
                              </Typography>
                              <Box style={{ float: "right" }}>
                                <PeopleIcon sx={{ color: "grey", mt: 1.2 }} />
                              </Box>
                            </Box>
                            <Typography
                              sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "pre-wrap", height: 25 }}
                            >
                              {data.talkContent}
                            </Typography>
                            <hr />
                          </Link>
                          <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between" alignItems="center">
                            <UserBox>
                              <Link to="/memberpage" state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}>
                                <Avatar
                                  src={data.talkOpenCode.memberEmail.memberSaveimg}
                                  sx={{ width: 40, height: 40 }}
                                />
                              </Link>
                              <Typography component={Link} to="/memberpage" state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}
                                style={{ fontSize: 13, textDecorationLine: "none", color: "black" }}>
                                {data.talkOpenCode.memberEmail.memberNickname}</Typography>
                              <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                              </Box>
                            </UserBox>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
      <br />
    </>
  );
};

export default TalkHome;
