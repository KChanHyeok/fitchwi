import React, { useEffect } from "react";
import { AssignmentTurnedIn, Category } from "@mui/icons-material";
import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link, useNavigate } from "react-router-dom";
import TogetherCategory from "../../together/components/togetherCategory";
import styled from "@emotion/styled";
import TalkMbti from "./TalkMbti";

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const TalkHome = ({ talkList, refreshTalkList }) => {
  const nav = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    refreshTalkList();
  }, []);

  return (
    <Container fixed>
      <Box flex={4}>
        <Box ml={4} mr={4}>
          <Box height={300}>
            <Carousel next={() => { }} prev={() => { }} animation="slide" duration={800} sx={{ height: "100%" }}>
              <Box height={300} width={1088} component="img" src="/images/TalkBanner1.png" sx={{ cursor: "pointer" }}></Box>
              <Box height={300} width={1088} component="img" src="/images/TalkBanner2.png" sx={{ cursor: "pointer" }}></Box>
              <Box height={300} width={1088} component="img" src="/images/TalkBanner3.png" sx={{ cursor: "pointer" }}></Box>
            </Carousel>
          </Box>
          {/* 광고 또는 얘기해요 홍보 영역 */}

          {/* 얘기해요 소개 페이지 */}
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
                <br />
                <Typography variant="h6" textAlign="center" color="#ff0456">
                  <b>{sessionStorage.getItem("mbti")} 취향 저격 얘기해요</b></Typography>
                <br />
                <TalkMbti talkList={talkList} />
              </Paper>


            </Box>
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={13}>
            <Typography variant="h6">얘기해요 둘러보기</Typography>
            <Button variant="contained" endIcon={<Category />} onClick={() => setOpen(true)}>
              카테고리
            </Button>
          </Stack>
          <TogetherCategory open={open} setOpen={setOpen} type={"talk"} />
          {/* 1번 카테고리 - 최신순 */}
          <Box height={520}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={10} mb={3}>
              <Typography variant="h5">⚡️ 새로 열린 얘기해요</Typography>
              <Button onClick={() => nav("/talk/new")}>전체보기</Button>
            </Stack>
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
              {talkList.length === 0 && <Box style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}>
                <CircularProgress sx={{ margin: "auto" }} />
              </Box>}
              {talkList.sort((a, b) => b.talkCode - a.talkCode).filter((data, index) => index < 4).map(data => (
                <Card sx={{ mb: 3, width: 300, maxHeight: 500, textDecorationLine: "none" }}
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
                        </Box>
                        <Typography
                          sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
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
                      <Typography color="textSecondary" variant="caption" sx={{ mt: 0.3, mb: 1, mr: 1 }} style={{ float: "right" }}>
                        {data.talkMemberCount + 1}/{data.talkMax}명 {data.talkType}
                      </Typography>
                      <Box style={{ float: "right" }}>
                        <AssignmentTurnedIn />
                      </Box>
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
              이런저런 취향 나누며 친해져요~
            </Typography>
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
              {talkList.length === 0 && <Box style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}>
                <CircularProgress sx={{ margin: "auto" }} />
              </Box>}
              {talkList.filter((data) => data.talkMemberCount + 1 < data.talkMax)
                .sort((a, b) => b.talkMemberCount - a.talkMemberCount).filter((data, index) => index < 4).map(data => (
                  <Card sx={{ mb: 3, width: 300, maxHeight: 500, textDecorationLine: "none" }}
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
                          </Box>
                          <Typography
                            sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
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
                        <Typography color="textSecondary" variant="caption" sx={{ mt: 0.3, mb: 1, mr: 1 }} style={{ float: "right" }}>
                          {data.talkMemberCount + 1}/{data.talkMax}명 {data.talkType}
                        </Typography>
                        <Box style={{ float: "right" }}>
                          <AssignmentTurnedIn />
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
            </Stack>
          </Box>

          <Link>
            <Box height={300} mt={6} component="img" src="/images/TalkPost1.png"></Box>
          </Link>

          {/* 3번 카테고리 */}
          <Box height={500} mt={10}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">📖 나 들여다보기, 또다른 나를 발견하는 시간</Typography>
            </Box>
            <Typography variant="h6" color="grey">
              이런저런 취향 나누며 친해져요~
            </Typography>
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
              {talkList.length === 0 && <Box style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}>
                <CircularProgress sx={{ margin: "auto" }} />
              </Box>}
              {talkList.filter((data) => data.talkMemberCount + 1 < data.talkMax)
                .sort((a, b) => b.talkCode - a.talkCode).filter(data => data.talkTitle.includes("피드"))
                .filter((data, index) => index < 4).map(data => (
                  <Card sx={{ mb: 3, width: 300, maxHeight: 500, textDecorationLine: "none" }}
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
                          </Box>
                          <Typography
                            sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
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
                        <Typography color="textSecondary" variant="caption" sx={{ mt: 0.3, mb: 1, mr: 1 }} style={{ float: "right" }}>
                          {data.talkMemberCount + 1}/{data.talkMax}명 {data.talkType}
                        </Typography>
                        <Box style={{ float: "right" }}>
                          <AssignmentTurnedIn />
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
            </Stack>
          </Box>

          {/* 4번 카테고리 */}
          <Box height={500} mt={10}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">🎬 접속, 영화 혼자 보는 사람들을 위한 모임</Typography>
            </Box>
            <Typography variant="h6" color="grey">
              이런저런 취향 나누며 친해져요~
            </Typography>
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
              {talkList.length === 0 && <Box style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}>
                <CircularProgress sx={{ margin: "auto" }} />
              </Box>}
              {talkList.filter((data) => data.talkMemberCount + 1 < data.talkMax)
                .sort((a, b) => b.talkCode - a.talkCode).filter(data => data.talkTitle.includes("영화"))
                .filter((data, index) => index < 4).map(data => (
                  <Card sx={{ mb: 3, width: 300, maxHeight: 500, textDecorationLine: "none" }}
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
                          </Box>
                          <Typography
                            sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
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
                        <Typography color="textSecondary" variant="caption" sx={{ mt: 0.3, mb: 1, mr: 1 }} style={{ float: "right" }}>
                          {data.talkMemberCount + 1}/{data.talkMax}명 {data.talkType}
                        </Typography>
                        <Box style={{ float: "right" }}>
                          <AssignmentTurnedIn />
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container >
  );
};

export default TalkHome;
