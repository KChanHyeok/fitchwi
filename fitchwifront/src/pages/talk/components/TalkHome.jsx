import React from "react";
import { AssignmentTurnedIn, Category } from "@mui/icons-material";
import { Avatar, Button, CircularProgress, Container, Divider, Stack, Typography } from "@mui/material";
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

  // console.log(talkList[0].talkOpenCode.memberEmail.memberNickname)

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
          <Box height={500} mt={4}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">⚡️ 새로 열린 얘기해요</Typography>
              <Link to={"/talk/new"}
                style={{ marginLeft: 10, textDecoration: "none", color: "black" }}>더보기▶</Link>
            </Box>
            {talkList.length === 0
              ? <Box sx={{ display: "flex" }}>
                <CircularProgress sx={{ margin: "auto" }} />
              </Box>
              : !talkList[0] || !talkList[1] || !talkList[2] || !talkList[3]
                ? <Box width={300} height={400}>
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
                :
                <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
                  <Box width={300} height={400}>
                    <Box component="img" src={`/images/${talkList[0].talkSaveimg}`} height={200} width="100%" />
                    <Link to={`/talk/${talkList[0].talkCode}`}
                      style={{ textDecoration: "none", color: "black" }}>
                      {talkList[0].talkTitle.length === 0 ?
                        <p>얘기해요 타이틀</p>
                        : talkList[0].talkTitle.length > 9
                          ? <Typography variant="body1" mt={1}>
                            {talkList[0].talkTitle.substr(0, 6)}...
                          </Typography>
                          : <Typography variant="body1" mt={1}>
                            {talkList[0].talkTitle}
                          </Typography>}
                    </Link>
                    {talkList[0].talkContent.length === 0 ?
                      <p>얘기해요 소개글</p>
                      : talkList[0].talkContent.length > 9
                        ? <Typography variant="subtitle2" mt={3} sx={{ color: "gray" }}>
                          {talkList[0].talkContent.substr(0, 9)}...
                        </Typography>
                        : <Typography variant="subtitle2" mt={3} sx={{ color: "gray" }}>
                          {talkList[0].talkContent}
                        </Typography>}
                    <Divider sx={{ mt: 3, mb: 3 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <UserBox>
                        <Link to="/memberpage" state={{ memberId: talkList[0].talkOpenCode.memberEmail.memberEmail }}>
                          <Avatar
                            src={`/images/${talkList[0].talkOpenCode.memberEmail.memberSaveimg}`}
                            sx={{ width: 40, height: 40 }}
                          />
                        </Link>
                        <Typography style={{ fontSize: 13 }}>{talkList[0].talkOpenCode.memberEmail.memberNickname}</Typography>
                        <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                          <AssignmentTurnedIn />
                          <Typography color="textSecondary" variant="caption" mr={1}>
                            {talkList[0].talkType}
                          </Typography>
                        </Box>
                      </UserBox>
                    </Stack>
                  </Box>
                  <Box width={300} height={400}>
                    <Box component="img" src={`/images/${talkList[1].talkSaveimg}`} height={200} width="100%" />
                    <Link to={`/talk/${talkList[1].talkCode}`}
                      style={{ textDecoration: "none", color: "black" }}>
                      {talkList[1].talkTitle.length === 0 ?
                        <p>얘기해요 타이틀</p>
                        :
                        talkList[1].talkTitle.length > 9
                          ? <Typography variant="body1" mt={1}>
                            {talkList[1].talkTitle.substr(0, 6)}...
                          </Typography>
                          : <Typography variant="body1" mt={1}>
                            {talkList[1].talkTitle}
                          </Typography>}
                    </Link>
                    {talkList[1].talkContent.length === 0 ?
                      <p>얘기해요 소개글</p>
                      : talkList[1].talkContent.length > 9
                        ? <Typography variant="subtitle2" mt={3} sx={{ color: "gray" }}>
                          {talkList[1].talkContent.substr(0, 9)}...
                        </Typography>
                        : <Typography variant="subtitle2" mt={3} sx={{ color: "gray" }}>
                          {talkList[1].talkContent}
                        </Typography>}
                    <Divider sx={{ mt: 3, mb: 3 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <UserBox>
                        <Link to="/memberpage" state={{ memberId: talkList[1].talkOpenCode.memberEmail.memberEmail }}>
                          <Avatar
                            src={`/images/${talkList[1].talkOpenCode.memberEmail.memberSaveimg}`}
                            sx={{ width: 40, height: 40 }}
                          />
                        </Link>
                        <Typography style={{ fontSize: 13 }}>{talkList[1].talkOpenCode.memberEmail.memberNickname}</Typography>
                        <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                          <AssignmentTurnedIn />
                          <Typography color="textSecondary" variant="caption" mr={1}>
                            {talkList[1].talkType}
                          </Typography>
                        </Box>
                      </UserBox>
                    </Stack>
                  </Box>
                  <Box width={300} height={400}>
                    <Box component="img" src={`/images/${talkList[2].talkSaveimg}`} height={200} width="100%" />
                    <Link to={`/talk/${talkList[2].talkCode}`}
                      style={{ textDecoration: "none", color: "black" }}>
                      {talkList[2].talkTitle.length === 0 ?
                        <p>얘기해요 타이틀</p>
                        :
                        talkList[2].talkTitle.length > 9
                          ? <Typography variant="body1" mt={1}>
                            {talkList[2].talkTitle.substr(0, 6)}...
                          </Typography>
                          : <Typography variant="body1" mt={1}>
                            {talkList[2].talkTitle}
                          </Typography>}
                    </Link>
                    {talkList[2].talkContent.length === 0 ?
                      <p>얘기해요 소개글</p>
                      : talkList[2].talkContent.length > 9
                        ? <Typography variant="subtitle2" mt={3} sx={{ color: "gray" }}>
                          {talkList[2].talkContent.substr(0, 9)}...
                        </Typography>
                        : <Typography variant="subtitle2" mt={3} sx={{ color: "gray" }}>
                          {talkList[2].talkContent}
                        </Typography>}
                    <Divider sx={{ mt: 3, mb: 3 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <UserBox>
                        <Link to="/memberpage" state={{ memberId: talkList[2].talkOpenCode.memberEmail.memberEmail }}>
                          <Avatar
                            src={`/images/${talkList[2].talkOpenCode.memberEmail.memberSaveimg}`}
                            sx={{ width: 40, height: 40 }}
                          />
                        </Link>
                        <Typography style={{ fontSize: 13 }}>{talkList[2].talkOpenCode.memberEmail.memberNickname}</Typography>
                        <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                          <AssignmentTurnedIn />
                          <Typography color="textSecondary" variant="caption" mr={1}>
                            {talkList[2].talkType}
                          </Typography>
                        </Box>
                      </UserBox>
                    </Stack>
                  </Box>
                  <Box width={300} height={400}>
                    <Box component="img" ssrc={`/images/${talkList[3].talkSaveimg}`} height={200} width="100%" />
                    <Link to={`/talk/${talkList[3].talkCode}`}
                      style={{ textDecoration: "none", color: "black" }}>
                      {talkList[3].talkTitle.length === 0 ?
                        <p>얘기해요 타이틀</p>
                        :
                        talkList[3].talkTitle.length > 9
                          ? <Typography variant="body1" mt={1}>
                            {talkList[3].talkTitle.substr(0, 6)}...
                          </Typography>
                          : <Typography variant="body1" mt={1}>
                            {talkList[3].talkTitle}
                          </Typography>}
                    </Link>
                    {talkList[3].talkContent.length === 0 ?
                      <p>얘기해요 소개글</p>
                      : talkList[3].talkContent.length > 9
                        ? <Typography variant="subtitle2" mt={3} sx={{ color: "gray" }}>
                          {talkList[3].talkContent.substr(0, 9)}...
                        </Typography>
                        : <Typography variant="subtitle2" mt={3} sx={{ color: "gray" }}>
                          {talkList[3].talkContent}
                        </Typography>}
                    <Divider sx={{ mt: 3, mb: 3 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <UserBox>
                        <Link to="/memberpage" state={{ memberId: talkList[3].talkOpenCode.memberEmail.memberEmail }}>
                          <Avatar
                            src={`/images/${talkList[3].talkOpenCode.memberEmail.memberSaveimg}`}
                            sx={{ width: 40, height: 40 }}
                          />
                        </Link>
                        <Typography style={{ fontSize: 13 }}>{talkList[3].talkOpenCode.memberEmail.memberNickname}</Typography>
                        <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                          <AssignmentTurnedIn />
                          <Typography color="textSecondary" variant="caption" mr={1}>
                            {talkList[3].talkType}
                          </Typography>
                        </Box>
                      </UserBox>
                    </Stack>
                  </Box>
                </Stack>


            }
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
