import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Backdrop,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  Modal,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FavoriteBorder, Favorite, ChatOutlined } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/system";
import LongMenu from "../common/Longmenu";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Comments from "../common/Comments";
import FeedLikeList from "../common/FeedLikeList";

const StyleModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const Post = ({ memberWriterInfo, memberInfo, feedContent, feedDate, feedCode, file, comment, refreshFeed, like, tag, information }) => {
  // 피드 작성시간
  const toDay = new Date();
  const toDayD = toDay.getTime();

  let divide = 1000 * 60 * 60 * 24;
  let date = (toDayD - feedDate) / divide;
  const [loading, setLoading] = useState(true);
  let day = String(Math.floor(date));
  let hour = String(Math.floor((date - day) * 24));
  let minute = String(Math.floor(((date - day) * 24 - hour) * 60));
  let second = String(Math.floor((((date - day) * 24 - hour) * 60 - minute) * 60));

  const nav = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [tagList, setTagList] = useState([]);
  // 피드 댓글 입력 양식 구성
  const [insertCommentForm, setInsertCommentForm] = useState({
    memberEmail: {
      memberEmail: sessionStorage.getItem("id"),
    },
    feedCode: feedCode,
    feedCommentContent: "",
  });

  const [clist, setClist] = useState([
    {
      feedCode: "",
      feedCommentCode: "",
      feedCommentContent: "",
      feedCommentDate: "",
      image: "",
      memberEmail: {
        memberEmail: sessionStorage.getItem("id"),
        memberName: "",
        memberNickname: "",
        memberSaveimg: "",
      },
    },
  ]);

  const handleChange = useCallback(
    (event) => {
      const insertObj = {
        ...insertCommentForm,
        [event.target.name]: event.target.value,
      };
      setInsertCommentForm(insertObj);
    },
    [insertCommentForm]
  );

  const insertComment = () => {
    if (sessionStorage.getItem("id") === null) {
      alert("로그인이 필요한 서비스입니다.");
      nav("/login");
    } else {
      axios
        .post("/insertComment", insertCommentForm)
        .then((response) => {
          if (response.data === "ok") {
            alert("성공");
            setInsertCommentForm({
              memberEmail: {
                memberEmail: sessionStorage.getItem("id"),
              },
              feedCode: feedCode,
              feedCommentContent: "",
            });
            refreshFeed();
          } else {
            alert("실패");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const rendering = () => {
    const result = [];
    if (clist.length > 4) {
      for (let i = 0; i < 1; i++) {
        result.push(<Comments key={clist[i].feedCommentCode} data={clist[i]} />);
      }
    }
    return result;
  };

  const onLike = useCallback(
    (isLike) => {
      if (memberInfo.memberEmail === undefined) {
        alert("로그인이 필요한 서비스입니다.");
        return nav("/login");
      }
      if (isLike === false) {
        axios.get("/likeFeed", { params: { feedCode: feedCode, memberInfo: memberInfo.memberEmail } }).then((res) => {
          setIsLike(!isLike);
          refreshFeed();
        });
      } else {
        axios.delete("/dLikeFeed", { params: { feedCode: feedCode, memberInfo: memberInfo.memberEmail, isLike: isLike } }).then((res) => {
          setIsLike(!isLike);
          refreshFeed();
        });
      }
    },
    [feedCode, memberInfo.memberEmail, refreshFeed, nav]
  );

  useEffect(() => {
    if (comment.length > 0) {
      let FeedCommentList = [];
      for (let i = 0; i < comment.length; i++) {
        const FeedComment = {
          ...comment[i],
          image: "/images/" + comment[i].memberEmail.memberSaveimg,
        };
        FeedCommentList.push(FeedComment);
      }
      setClist(FeedCommentList);
    }
  }, [comment]);

  useEffect(() => {
    for (let i = 0; i < like.length; i++) {
      if (like[i].memberEmail.memberEmail === memberInfo.memberEmail) {
        setIsLike(true);
      }
    }
  }, [like, memberInfo.memberEmail]);

  useEffect(() => {
    setTagList(tag.split(" "));
    setLoading(false);
  }, [tag, file]);

  return (
    <div>
      {loading || file === undefined ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <Card sx={{ margin: 5, border: 1 }}>
            <CardHeader
              avatar={
                <Link to="/memberpage" state={{ memberId: memberWriterInfo.memberEmail }}>
                  <Avatar sx={{ bgcolor: "orange" }} aria-label="recipe" src={"/images/" + memberWriterInfo.memberSaveimg}></Avatar>
                </Link>
              }
              action={<LongMenu refreshFeed={refreshFeed} flist={file} information={information} />}
              title={<b>{memberWriterInfo.memberNickname}</b>}
              subheader={day > 1 ? day + "일 전" : hour > 1 ? hour + "시간 전" : minute > 1 ? minute + "분 전" : second + "초 전"}
            />
            {/* 피드 이미지 */}
            {file.length > 1 ? (
              <Carousel next={() => {}} prev={() => {}} autoPlay={false} animation="slide" duration={800} sx={{ height: "100%" }}>
                {file.map((item, i) => (
                  <CardMedia
                    key={item.feedCode}
                    component="img"
                    src={"/images/" + item.feedFileSaveimg}
                    alt={item.feedFileImg}
                    sx={{ backgroundSize: "cover" }}
                  />
                ))}
              </Carousel>
            ) : (
              <CardMedia
                key={file[0].feedCode}
                sx={{ cursor: "pointer" }}
                onClick={(e) => setOpen(true)}
                component="img"
                height="20%"
                src={"/images/" + file[0].feedFileSaveimg}
                alt={file[0].feedFileImg}
              />
            )}
            <CardContent>
              <Stack direction="row" gap={2} mb={1}>
                <Checkbox checked={isLike} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={() => onLike(isLike)} />
                <Checkbox checked={true} checkedIcon={<ChatOutlined color="disabled" />} onClick={(e) => setOpen(true)} />
              </Stack>
              {like.length === 0 ? null : <FeedLikeList flList={like}>좋아요 {like.length}개</FeedLikeList>}
              <Stack direction="row" gap={1} mt={1} mb={1} alignItems="center">
                <Link to="/memberpage" state={{ memberId: memberWriterInfo.memberEmail }} style={{ textDecoration: "none" }}>
                  <Typography variant="body1" color="text.primary" sx={{ cursor: "pointer" }}>
                    <b>{memberWriterInfo.memberNickname}</b>
                  </Typography>
                </Link>
                <Typography variant="body6">{feedContent.length > 20 ? `${feedContent.slice(0, 20)}...` : feedContent}</Typography>
              </Stack>
              <Stack direction="row" gap={1} mb={2} alignItems="center">
                {tagList &&
                  tagList.map((tag, index) => (
                    <Typography
                      sx={{ cursor: "pointer" }}
                      variant="body6"
                      color="grey"
                      onClick={() => console.log("검색으로 이동")}
                      key={index}
                    >
                      #{tag}
                    </Typography>
                  ))}
              </Stack>
              {comment.length >= 1 ? (
                comment.length > 4 ? (
                  <Box>
                    <Typography
                      variant="body2"
                      color="grey"
                      marginBottom={2}
                      onClick={(e) => setOpen(true)}
                      sx={{ cursor: "pointer", mt: 2 }}
                    >
                      댓글 {comment.length}개 모두 보기
                    </Typography>
                    {rendering()}
                  </Box>
                ) : (
                  <Box>
                    {clist.map((clist) => (
                      <Comments key={clist.feedCommentCode} data={clist} />
                    ))}
                  </Box>
                )
              ) : (
                <Typography variant="body2" color="grey" marginBottom={2}>
                  작성한 댓글이 없습니다.
                </Typography>
              )}
              <Divider sx={{ mt: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
                mt={1}
              >
                <Avatar alt={memberInfo.memberName} src={"/images/" + memberInfo.memberSaveimg} sx={{ width: 30, height: 30, mr: 2 }} />
                <TextField
                  id="input-with-sx"
                  name="feedCommentContent"
                  fullWidth
                  variant="standard"
                  placeholder="댓글 달기..."
                  value={insertCommentForm.feedCommentContent}
                  onChange={handleChange}
                />
                <Box>
                  <Button onClick={insertComment}>게시</Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <StyleModal
            open={open}
            onClose={(e) => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box width={1200} height={600} bgcolor="white" p={3} borderRadius={2}>
              <Stack direction="row" spacing={3} justifyContent="space-between">
                <Box flex={2}>
                  {file.length > 1 ? (
                    <Carousel next={() => {}} prev={() => {}} autoPlay={false} animation="slide" duration={800} height={570}>
                      {file.map((item, i) => (
                        <CardMedia
                          key={item.feedCode}
                          component="img"
                          src={"/images/" + memberWriterInfo.memberSaveimg}
                          alt={item.feedFileImg}
                        />
                      ))}
                    </Carousel>
                  ) : (
                    <CardMedia
                      key={file[0].feedCode}
                      component="img"
                      height={600}
                      src={"/images/" + file[0].feedFileSaveimg}
                      alt={file[0].feedFileImg}
                    />
                  )}
                </Box>
                <Box flex={1} p={1}>
                  <UserBox display="flex" justifyContent="space-between" mb={1}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt={memberWriterInfo.memberName}
                        src={"/images/" + memberWriterInfo.memberSaveimg}
                        sx={{ width: 30, height: 30, mr: 1 }}
                      />
                      <Typography fontWeight={500} variant="span">
                        <b>{memberWriterInfo.memberNickname}</b> {}
                      </Typography>
                    </Box>
                    <LongMenu Modal={setOpen} refreshFeed={refreshFeed} flist={file} information={information} />
                  </UserBox>
                  <Divider />
                  <Box mt={1}>
                    <UserBox mb={2}>
                      <Avatar
                        alt={memberWriterInfo.memberName}
                        src={"/images/" + memberWriterInfo.memberSaveimg}
                        sx={{ width: 30, height: 30 }}
                      />
                      <Typography fontWeight={500} variant="span">
                        <b>{memberWriterInfo.memberNickname}</b> {feedContent.length > 20 ? `${feedContent.slice(0, 20)}...` : feedContent}
                      </Typography>
                    </UserBox>
                  </Box>
                  <Box height={90} mb={1}>
                    <Stack direction="row" gap={1} mb={1} alignItems="center">
                      {tagList &&
                        tagList.map((tag, index) => (
                          <Typography variant="body6" color="grey" onClick={() => console.log("검색으로 이동")} key={index}>
                            #{tag}
                          </Typography>
                        ))}
                    </Stack>
                    <Box height={60} border={1}>
                      후기 영역
                    </Box>
                  </Box>
                  <Box
                    height={140}
                    mt={1}
                    mb={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      overflowY: "auto",
                    }}
                  >
                    {comment.length >= 1 ? (
                      <>
                        {comment.map((comment) => (
                          <Comments key={comment.feedCommentCode} data={comment} memberWriterInfo={memberWriterInfo} />
                        ))}
                      </>
                    ) : (
                      <Typography variant="body2" color="grey">
                        작성한 댓글이 없습니다.
                      </Typography>
                    )}
                  </Box>
                  <Divider />
                  <Stack direction="row" gap={1}>
                    <Checkbox
                      checked={isLike}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      onClick={() => onLike(isLike)}
                      sx={{ p: 0 }}
                    />
                    <Checkbox checked={true} checkedIcon={<ChatOutlined color="disabled" />} />
                  </Stack>
                  {like.length === 0 ? (
                    <Box visibility="hidden" height={24.5}>
                      좋아요 영역
                    </Box>
                  ) : (
                    <FeedLikeList flList={like}>좋아요 {like.length}개</FeedLikeList>
                  )}
                  <Typography color="grey" variant="body2" mb={1} mt={1}>
                    {day > 1 ? day + "일 전" : hour > 1 ? hour + "시간 전" : minute > 1 ? minute + "분 전" : second + "초 전"}
                  </Typography>
                  <Divider>
                    <Chip label="Comment" />
                  </Divider>
                  <TextField
                    sx={{ width: "100%", mb: 2, mt: 1 }}
                    id="standard-multiline-static"
                    multiline
                    rows={1}
                    value={insertCommentForm.feedCommentContent}
                    placeholder="댓글 달기..."
                    variant="standard"
                    onChange={handleChange}
                    name="feedCommentContent"
                  />

                  <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                    <Button onClick={insertComment}>댓글 등록</Button>
                  </ButtonGroup>
                </Box>
              </Stack>
            </Box>
          </StyleModal>
        </>
      )}
    </div>
  );
};

export default Post;
