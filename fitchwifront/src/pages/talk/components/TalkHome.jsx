import React from "react";
import { AssignmentTurnedIn, Category } from "@mui/icons-material";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import TogetherCategory from "../../together/components/togetherCategory";

const TalkHome = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container fixed>
      <Box flex={4}>
        <Box ml={4} mr={4}>
          <Box height={300}>
            <Carousel next={() => {}} prev={() => {}} animation="slide" duration={800} sx={{ height: "100%" }}>
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
            <Typography variant="h6">얘기해요</Typography>
            <Button variant="contained" endIcon={<Category />} onClick={() => setOpen(true)}>
              카테고리
            </Button>
          </Stack>
          <TogetherCategory open={open} setOpen={setOpen} />

          {/* 1번 카테고리 */}
          <Box height={500} mt={4}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">⚡️ 새로 열린 얘기해요</Typography>
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
    </Container>
  );
};

export default TalkHome;