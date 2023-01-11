import React from "react";
import { AssignmentTurnedIn, Category } from "@mui/icons-material";
import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Container, Divider, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link, useNavigate } from "react-router-dom";
import TogetherCategory from "../../together/components/togetherCategory";
import styled from "@emotion/styled";

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const TalkHome = ({ talkList, talkJoinList }) => {
  const nav = useNavigate();

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
          <Box height={380} mt={4} border={1}>
            <Typography variant="h6">취향 저격 얘기해요</Typography>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" mt={2}>
              <Box border={1} width={500} height={300}></Box>
              <Box border={1} width={500} height={300}></Box>
            </Box>
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={5}>
            <Typography variant="h6">얘기해요 둘러보기</Typography>
            <Button variant="contained" endIcon={<Category />} onClick={() => setOpen(true)}>
              카테고리
            </Button>
          </Stack>
          <TogetherCategory open={open} setOpen={setOpen} type={"talk"} />
          {/* 1번 카테고리 */}
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
                  component={Link} to={`/talk/${data.talkCode}`}>
                  <CardActionArea>
                    <CardMedia src={`/images/${data.talkSaveimg}`} component="img" width="200" height="200" alt="talkimg" />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
                      >{data.talkTitle}</Typography>
                      <Chip
                        color="primary"
                        variant="outlined"
                        label={data.talkCategory}
                        size="small"
                        sx={{ mt: 1, fontSize: 12 }}
                      />
                      <Typography
                        sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
                      >
                        {data.talkContent}
                      </Typography>
                      <hr />
                      <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between" alignItems="center">
                        <UserBox>
                          <Link to="/memberpage" state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}>
                            <Avatar
                              src={data.talkOpenCode.memberEmail.memberSaveimg}
                              sx={{ width: 40, height: 40 }}
                            />
                          </Link>
                          <Typography style={{ fontSize: 13 }}>{data.talkOpenCode.memberEmail.memberNickname}</Typography>
                          <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                          </Box>
                        </UserBox>
                      </Stack>
                      <Typography color="textSecondary" variant="caption" sx={{ mt: 0.3, mb: 1, mr: 1 }} style={{ float: "right" }}>
                        {data.talkType}
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

          {/* 2번 카테고리 - 피드가 가장 많은 순 */}
          <Box height={500} mt={10}>
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
              {/* {talkList.filter(data => (getMode(talkJoinList.map(data => (data.talkJoinCode))) === data.talkJoinCode)).filter((data, index) => index < 4 && data.talkJoinState === "가입중").map(data => (
                <Card sx={{ mb: 3, width: 300, maxHeight: 500, textDecorationLine: "none" }}
                  key={data.talkCode}
                  component={Link} to={`/talk/${data.talkCode}`}>
                  <CardActionArea>
                    <CardMedia src={`/images/${data.talkSaveimg}`} component="img" width="200" height="200" alt="talkimg" />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
                      >{data.talkTitle}</Typography>
                      <Chip
                        color="primary"
                        variant="outlined"
                        label={data.talkCategory}
                        size="small"
                        sx={{ mt: 1, fontSize: 12 }}
                      />
                      <Typography
                        sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
                      >
                        {data.talkContent}
                      </Typography>
                      <hr />
                      <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between" alignItems="center">
                        <UserBox>
                          <Link to="/memberpage" state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}>
                            <Avatar
                              src={data.talkOpenCode.memberEmail.memberSaveimg}
                              sx={{ width: 40, height: 40 }}
                            />
                          </Link>
                          <Typography style={{ fontSize: 13 }}>{data.talkOpenCode.memberEmail.memberNickname}</Typography>
                          <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                          </Box>
                        </UserBox>
                      </Stack>
                      <Typography color="textSecondary" variant="caption" sx={{ mt: 0.3, mb: 1, mr: 1 }} style={{ float: "right" }}>
                        {data.talkType}
                      </Typography>
                      <Box style={{ float: "right" }}>
                        <AssignmentTurnedIn />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))} */}



            </Stack>
          </Box>

          <Link>
            <Box height={300} mt={6} component="img" src="/images/TalkPost1.png"></Box>
          </Link>

          {/* 3번 카테고리 */}
          <Box height={500} mt={8}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">📖 나 들여다보기, 또다른 나를 발견하는 시간</Typography>
            </Box>
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
              <Box width={300} height={400}>
                <Box component="img" src="/images/1672969842779.jpeg" height={200} width="100%" />
                <Typography variant="body1" mt={1}>
                  얘기해요 타이틀
                </Typography>
                <Typography variant="subtitle2" mt={3}>
                  얘기해요 소개글
                </Typography>
                <Divider sx={{ mt: 3, mb: 3 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>작성자 사진 + 이름</Typography>
                  <Box display="flex" alignItems="center">
                    <AssignmentTurnedIn />
                    <Typography color="textSecondary" variant="caption" mr={1}>
                      얘기해요 타입
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box width={300} height={400}>
                <Box component="img" src="/images/1672969842779.jpeg" height={200} width="100%" />
                <Typography variant="body1" mt={1}>
                  얘기해요 타이틀
                </Typography>
                <Typography variant="subtitle2" mt={3}>
                  얘기해요 소개글
                </Typography>
                <Divider sx={{ mt: 3, mb: 3 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>작성자 사진 + 이름</Typography>
                  <Box display="flex" alignItems="center">
                    <AssignmentTurnedIn />
                    <Typography color="textSecondary" variant="caption" mr={1}>
                      얘기해요 타입
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box width={300} height={400}>
                <Box component="img" src="/images/1672969842779.jpeg" height={200} width="100%" />
                <Typography variant="body1" mt={1}>
                  얘기해요 타이틀
                </Typography>
                <Typography variant="subtitle2" mt={3}>
                  얘기해요 소개글
                </Typography>
                <Divider sx={{ mt: 3, mb: 3 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>작성자 사진 + 이름</Typography>
                  <Box display="flex" alignItems="center">
                    <AssignmentTurnedIn />
                    <Typography color="textSecondary" variant="caption" mr={1}>
                      얘기해요 타입
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box width={300} height={400}>
                <Box component="img" src="/images/1672969842779.jpeg" height={200} width="100%" />
                <Typography variant="body1" mt={1}>
                  얘기해요 타이틀
                </Typography>
                <Typography variant="subtitle2" mt={3}>
                  얘기해요 소개글
                </Typography>
                <Divider sx={{ mt: 3, mb: 3 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>작성자 사진 + 이름</Typography>
                  <Box display="flex" alignItems="center">
                    <AssignmentTurnedIn />
                    <Typography color="textSecondary" variant="caption" mr={1}>
                      얘기해요 타입
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>

          {/* 4번 카테고리 */}
          <Box height={500} mb={6}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">🎬 접속, 영화 혼자 보는 사람들을 위한 모임</Typography>
            </Box>
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
              <Box width={300} height={400}>
                <Box component="img" src="/images/1672969842779.jpeg" height={200} width="100%" />
                <Typography variant="body1" mt={1}>
                  얘기해요 타이틀
                </Typography>
                <Typography variant="subtitle2" mt={3}>
                  얘기해요 소개글
                </Typography>
                <Divider sx={{ mt: 3, mb: 3 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>작성자 사진 + 이름</Typography>
                  <Box display="flex" alignItems="center">
                    <AssignmentTurnedIn />
                    <Typography color="textSecondary" variant="caption" mr={1}>
                      얘기해요 타입
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box width={300} height={400}>
                <Box component="img" src="/images/1672969842779.jpeg" height={200} width="100%" />
                <Typography variant="body1" mt={1}>
                  얘기해요 타이틀
                </Typography>
                <Typography variant="subtitle2" mt={3}>
                  얘기해요 소개글
                </Typography>
                <Divider sx={{ mt: 3, mb: 3 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>작성자 사진 + 이름</Typography>
                  <Box display="flex" alignItems="center">
                    <AssignmentTurnedIn />
                    <Typography color="textSecondary" variant="caption" mr={1}>
                      얘기해요 타입
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box width={300} height={400}>
                <Box component="img" src="/images/1672969842779.jpeg" height={200} width="100%" />
                <Typography variant="body1" mt={1}>
                  얘기해요 타이틀
                </Typography>
                <Typography variant="subtitle2" mt={3}>
                  얘기해요 소개글
                </Typography>
                <Divider sx={{ mt: 3, mb: 3 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>작성자 사진 + 이름</Typography>
                  <Box display="flex" alignItems="center">
                    <AssignmentTurnedIn />
                    <Typography color="textSecondary" variant="caption" mr={1}>
                      얘기해요 타입
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box width={300} height={400}>
                <Box component="img" src="/images/1672969842779.jpeg" height={200} width="100%" />
                <Typography variant="body1" mt={1}>
                  얘기해요 타이틀
                </Typography>
                <Typography variant="subtitle2" mt={3}>
                  얘기해요 소개글
                </Typography>
                <Divider sx={{ mt: 3, mb: 3 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>작성자 사진 + 이름</Typography>
                  <Box display="flex" alignItems="center">
                    <AssignmentTurnedIn />
                    <Typography color="textSecondary" variant="caption" mr={1}>
                      얘기해요 타입
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container >
  );
};

export default TalkHome;
