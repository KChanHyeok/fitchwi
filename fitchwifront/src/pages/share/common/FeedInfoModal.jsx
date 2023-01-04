import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatOutlined, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Avatar, Button, ButtonGroup, CardMedia, Checkbox, Chip, Divider, Modal, styled, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import Comments from "./Comments";
import FeedLikeList from "./FeedLikeList";
import LongMenu from "./Longmenu";

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

const FeedInfoModal = ({
  feedInfo,
  memberInfo,
  refreshFeed,
  memberWriterInfo,
  feedContent,
  feedDate,
  feedCode,
  file,
  comment,
  like,
  tag,
}) => {
  const nav = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [tagList, setTagList] = useState([]);

  const [insertCommentForm, setInsertCommentForm] = useState({
    memberEmail: {
      memberEmail: sessionStorage.getItem("id"),
    },
    feedCode: feedCode,
    feedCommentContent: "",
  });

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
    }
  }, [tag, file, comment]);

  const toDay = new Date();
  const toDayD = toDay.getTime();

  let divide = 1000 * 60 * 60 * 24;
  let date = (toDayD - feedDate) / divide;
  let day = String(Math.floor(date));
  let hour = String(Math.floor((date - day) * 24));
  let minute = String(Math.floor(((date - day) * 24 - hour) * 60));
  let second = String(Math.floor((((date - day) * 24 - hour) * 60 - minute) * 60));
  return (
    <>
      <StyleModal open={!open} onClose={(e) => nav(-1)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                <LongMenu Modal={setOpen} refreshFeed={refreshFeed} flist={file} information={feedInfo} />
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
  );
};

export default FeedInfoModal;