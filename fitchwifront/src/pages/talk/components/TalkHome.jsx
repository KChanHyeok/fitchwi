import React from "react";
import { AssignmentTurnedIn, Category } from "@mui/icons-material";
import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Divider, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import TogetherCategory from "../../together/components/togetherCategory";
import styled from "@emotion/styled";

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const TalkHome = ({ talkList }) => {

  const [open, setOpen] = useState(false);
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
          <Box height={520} mt={6}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">⚡️ 새로 열린 얘기해요</Typography>
              <Link to={"/talk/new"}
                style={{ marginLeft: 10, textDecoration: "none", color: "black" }}>
                더보기▶
              </Link>
            </Box><br />
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
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
                        sx={{ mt: 1, fontSize: 10 }}
                      />
                      <Typography
                        sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 165, height: 30 }}
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

          {/* 2번 카테고리 */}
          <Box height={500}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">💬 시끌벅적한 얘기해요</Typography>
            </Box>
            <Typography variant="h6" color="grey">
              이런저런 취향 나누며 친해져요~
            </Typography>
            <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between" mt={4}>
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
