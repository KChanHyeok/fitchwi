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
import Swal from "sweetalert2";

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

const Post = ({
  memberWriterInfo,
  memberInfo,
  feedContent,
  feedDate,
  feedCode,
  feedClassificationcode,
  file,
  comment,
  refreshFeed,
  like,
  tag,
  information,
}) => {
  const swAlert = (html, icon = "success", func) => {
    Swal.fire({
      title: "알림",
      html: html,
      icon: icon,
      confirmButtonText: "확인",
      confirmButtonColor: "#ff0456",
    }).then(func);
  };
  // 피드 작성시간
  const toDay = new Date();
  const toDayD = toDay.getTime();

  let divide = 1000 * 60 * 60 * 24;
  let date = (toDayD - feedDate) / divide;
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

  const [clist, setClist] = useState([]);

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

  const [talkInfo, setTalkInfo] = useState();

  const getTalkInfo = useCallback(() => {
    if (feedClassificationcode !== null) {
      axios.get("/getTalk", { params: { talkCode: feedClassificationcode } }).then((res) => {
        setTalkInfo(res.data);
      });
    }
  }, [feedClassificationcode]);

  const insertComment = () => {
    if (sessionStorage.getItem("id") === null) {
      swAlert("로그인 후 이용 가능합니다.", "warning", () => nav("/login"));
    } else {
      axios
        .post("/insertComment", insertCommentForm)
        .then((response) => {
          if (response.data === "ok") {
            setInsertCommentForm({
              memberEmail: {
                memberEmail: sessionStorage.getItem("id"),
              },
              feedCode: feedCode,
              feedCommentContent: "",
            });
            refreshFeed();
          } else {
            swAlert("등록 실패!", "warning");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const rendering = () => {
    const result = [];
    if (clist.length > 4) {
      for (let i = 0; i < 1; i++) {
        result.push(<Comments key={clist[i].feedCommentCode} data={clist[i]} refreshFeed={refreshFeed} />);
      }
    }
    return result;
  };

  const onLike = useCallback(
    (isLike) => {
      if (memberInfo.memberEmail === undefined) {
        swAlert("로그인 후 이용 가능합니다.", "warning", () => nav("/login"));
        return;
      }
      if (isLike === false) {
        axios.get("/likeFeed", { params: { feedCode: feedCode, memberInfo: memberInfo.memberEmail } }).then((res) => {
          setIsLike(!isLike);
          refreshFeed();
        });
      } else {
        axios
          .delete("/dLikeFeed", {
            params: { feedCode: feedCode, memberInfo: memberInfo.memberEmail, isLike: isLike },
          })
          .then((res) => {
            setIsLike(!isLike);
            refreshFeed();
          });
      }
    },
    [feedCode, memberInfo.memberEmail, nav, refreshFeed]
  );

  useEffect(() => {
    if (like !== undefined) {
      for (let i = 0; i < like.length; i++) {
        if (like[i].memberEmail.memberEmail === memberInfo.memberEmail) {
          setIsLike(true);
        }
      }
    }
  }, [like, memberInfo.memberEmail]);

  useEffect(() => {
    if (tag !== undefined && comment !== undefined && file !== undefined) {
      setTagList(tag.split(" "));
      setClist(comment);
      getTalkInfo();
    }
  }, [tag, file, comment, getTalkInfo]);

  return (
    <div>
      {file === undefined && comment === undefined && like === undefined ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress />
        </Backdrop>
      ) : (
        <>
          <Card sx={{ margin: 5, border: 1 }}>
            <CardHeader
              avatar={
                <Link to="/memberpage" state={{ memberId: memberWriterInfo.memberEmail }}>
                  <Avatar sx={{ bgcolor: "orange" }} aria-label="recipe" src={memberWriterInfo.memberSaveimg}></Avatar>
                </Link>
              }
              action={<LongMenu refreshFeed={refreshFeed} flist={file} information={information} />}
              title={<b>{memberWriterInfo.memberNickname}</b>}
              subheader={day > 1 ? day + "일 전" : hour > 1 ? hour + "시간 전" : minute > 1 ? minute + "분 전" : second + "초 전"}
            />
            <Divider style={{ background: "black", borderBottomWidth: 0.5 }} />
            {/* 피드 이미지 */}
            {file.length > 1 ? (
              <Carousel next={() => { }} prev={() => { }} autoPlay={false} animation="slide" duration={800} sx={{ height: "100%" }}>
                {file.map((item, i) => (
                  <CardMedia
                    key={item.feedCode}
                    component="img"
                    src={"/images/" + item.feedFileSaveimg}
                    alt={item.feedFileImg}
                  // sx={{ backgroundSize: "cover" }}
                  //  onDoubleClick={() => onLike(isLike)}
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
            <Divider style={{ background: "black", borderBottomWidth: 0.5 }} />
            {!talkInfo ? (
              <></>
            ) : (
              <>
                <Link to={`/talk/${talkInfo.talkCode}`} style={{ textDecoration: "none", color: "black" }}>
                  <Box display="flex" flexDirection="row" alignItems="center" border={1} m={2} borderRadius={2} height={100}>
                    <CardMedia
                      component="img"
                      sx={{ width: 100, height: 100, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
                      image={`/images/${talkInfo.talkSaveimg}`}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 300, height: 30, fontSize: 16 }}
                      >
                        {talkInfo.talkTitle}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 400, height: 30, fontSize: 14 }}
                      >
                        {talkInfo.talkContent}
                      </Typography>
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          alt={talkInfo.talkOpenCode.memberEmail.memberNickname}
                          src={talkInfo.talkOpenCode.memberEmail.memberSaveimg}
                          sx={{ width: 20, height: 20, mr: 1 }}
                        />
                        <Typography variant="subtitle1" mr={1} sx={{ fontSize: 12 }}>
                          {talkInfo.talkOpenCode.memberEmail.memberNickname}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Box>
                </Link>
              </>
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
                    <Typography sx={{ cursor: "pointer" }} variant="body6" color="grey" onClick={() => nav(`/search/${tag}`)} key={index}>
                      #{tag}
                    </Typography>
                  ))}
              </Stack>
              {clist.length >= 1 ? (
                clist.length > 4 ? (
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
                      <Comments key={clist.feedCommentCode} data={clist} refreshFeed={refreshFeed} />
                    ))}
                  </Box>
                )
              ) : (
                <Typography variant="body2" color="grey">
                  작성한 댓글이 없습니다.
                </Typography>
              )}
              <Divider style={{ background: "grey", borderBottomWidth: 0.5 }} sx={{ mt: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
                mt={1}
              >
                {!memberInfo.memberEmail ? (
                  <>
                    <Avatar sx={{ width: 30, height: 30, mr: 2 }} />
                  </>
                ) : (
                  <>
                    <Avatar alt={memberInfo.memberName} src={memberInfo.memberSaveimg} sx={{ width: 30, height: 30, mr: 2 }} />
                  </>
                )}

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
                  {insertCommentForm.feedCommentContent === "" ? (
                    <Button onClick={insertComment} disabled>
                      등록
                    </Button>
                  ) : (
                    <Button onClick={insertComment} sx={{ color: "black" }}>
                      등록
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* 공유해요 상세페이지 */}
          <StyleModal
            open={open}
            onClose={(e) => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box width={1200} height={700} bgcolor="white" p={3} borderRadius={2}>
              <Stack direction="row" spacing={3} justifyContent="space-between">
                <Box flex={2}>
                  {file.length > 1 ? (
                    <Carousel next={() => { }} prev={() => { }} autoPlay={false} animation="slide" duration={800} height={670}>
                      {file.map((item, i) => (
                        <CardMedia
                          key={item.feedCode}
                          component="img"
                          src={"/images/" + item.feedFileSaveimg}
                          alt={item.feedFileImg}
                          sx={{ height: 700 }}
                        />
                      ))}
                    </Carousel>
                  ) : (
                    <CardMedia
                      key={file[0].feedCode}
                      component="img"
                      height={700}
                      src={"/images/" + file[0].feedFileSaveimg}
                      alt={file[0].feedFileImg}
                    />
                  )}
                </Box>
                <Divider style={{ background: "black", borderBottomWidth: 0.5 }} orientation="vertical" flexItem />
                <Box flex={1} p={1}>
                  <UserBox display="flex" justifyContent="space-between" mb={1}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt={memberWriterInfo.memberName}
                        src={memberWriterInfo.memberSaveimg}
                        sx={{ width: 30, height: 30, mr: 1 }}
                      />
                      <Typography fontWeight={500} variant="span">
                        <b>{memberWriterInfo.memberNickname}</b> { }
                      </Typography>
                    </Box>
                    <LongMenu Modal={setOpen} refreshFeed={refreshFeed} flist={file} information={information} />
                  </UserBox>
                  <Divider style={{ background: "black", borderBottomWidth: 0.5 }} />
                  <Box mt={1} sx={{ overflowY: "scroll" }} height={140}>
                    <UserBox mb={2} sx={{ alignItems: "stretch" }}>
                      <Avatar alt={memberWriterInfo.memberName} src={memberWriterInfo.memberSaveimg} sx={{ width: 30, height: 30 }} />
                      <Typography sx={{ whiteSpace: "pre-wrap" }}>
                        <b>{memberWriterInfo.memberNickname}</b> {feedContent}
                      </Typography>
                    </UserBox>
                  </Box>
                  <Box height={120} mb={1}>
                    <Stack direction="row" gap={1} mb={1} alignItems="center">
                      {tagList &&
                        tagList.map((tag, index) => (
                          <Typography
                            variant="body6"
                            sx={{ cursor: "pointer" }}
                            color="grey"
                            onClick={() => nav(`/search/${tag}`)}
                            key={index}
                          >
                            #{tag}
                          </Typography>
                        ))}
                    </Stack>
                    {!talkInfo ? (
                      <></>
                    ) : (
                      <Link to={`/talk/${talkInfo.talkCode}`} style={{ textDecoration: "none", color: "black" }}>
                        <Box display="flex" flexDirection="row" alignItems="center" border={1} borderRadius={2} height={100}>
                          <CardMedia
                            component="img"
                            sx={{ width: 100, height: 100, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
                            image={`/images/${talkInfo.talkSaveimg}`}
                          />
                          <CardContent>
                            <Typography
                              variant="h6"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: 200,
                                height: 30,
                                fontSize: 16,
                              }}
                            >
                              {talkInfo.talkTitle}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: 200,
                                height: 30,
                                fontSize: 14,
                              }}
                            >
                              {talkInfo.talkContent}
                            </Typography>
                            <Box
                              sx={{
                                mt: 1,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Avatar
                                alt={talkInfo.talkOpenCode.memberEmail.memberNickname}
                                src={talkInfo.talkOpenCode.memberEmail.memberSaveimg}
                                sx={{ width: 20, height: 20, mr: 1 }}
                              />
                              <Typography variant="subtitle1" mr={1} sx={{ fontSize: 12 }}>
                                {talkInfo.talkOpenCode.memberEmail.memberNickname}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Box>
                      </Link>
                    )}
                  </Box>
                  <Box
                    height={110}
                    mt={2}
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
                          <Comments key={comment.feedCommentCode} data={comment} refreshFeed={refreshFeed} />
                        ))}
                      </>
                    ) : (
                      <Typography variant="body2" color="grey">
                        작성한 댓글이 없습니다.
                      </Typography>
                    )}
                  </Box>
                  <Divider style={{ background: "black", borderBottomWidth: 0.5 }} />
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
