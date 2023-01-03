import { ChatOutlined, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Avatar, Button, ButtonGroup, CardMedia, Checkbox, Chip, Divider, Modal, styled, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate, useParams } from "react-router-dom";
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

const FeedInfo = ({ memberInfo, refreshFeed }) => {
  let { feedCode } = useParams();

  const nav = useNavigate();
  const [feedInfo, setFeedInfo] = useState();
  const [isLike, setIsLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [tagList, setTagList] = useState([]);
  // 피드 댓글 입력 양식 구성
  const [insertCommentForm, setInsertCommentForm] = useState({
    memberEmail: {
      memberEmail: sessionStorage.getItem("id"),
    },
    feedCode: feedInfo.feedCode,
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
              feedCode: feedInfo.feedCode,
              feedCommentContent: "",
            });
            window.location.reload();
            // refreshFeed();
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
        axios.get("/likeFeed", { params: { feedCode: feedInfo.feedCode, memberInfo: memberInfo.memberEmail } }).then((res) => {
          setIsLike(!isLike);
          window.location.reload();
          // refreshFeed();
        });
      } else {
        axios
          .delete("/dLikeFeed", { params: { feedCode: feedInfo.feedCode, memberInfo: memberInfo.memberEmail, isLike: isLike } })
          .then((res) => {
            setIsLike(!isLike);
            window.location.reload();
            // refreshFeed();
          });
      }
    },
    [feedInfo, memberInfo.memberEmail, nav]
  );

  useEffect(() => {
    if (feedInfo.flList !== undefined) {
      for (let i = 0; i < feedInfo.flList.length; i++) {
        if (feedInfo.flList[i].memberEmail.memberEmail === memberInfo.memberEmail) {
          setIsLike(true);
        }
      }
    }
  }, [feedInfo, memberInfo.memberEmail]);

  useEffect(() => {
    if (feedInfo.feedTag !== undefined && feedInfo.flList !== undefined && feedInfo.ffList !== undefined) {
      setTagList(feedInfo.feedTag.split(" "));
      setClist(feedInfo.flList);
    }
  }, [feedInfo]);

  const getFeedInfo = useCallback(() => {
    axios
      .get("/getFeedInfo", {
        params: {
          feedCode: feedCode,
        },
      })
      .then((response) => {
        console.log(response.data);
        setFeedInfo(response.data);
      });
  }, [feedCode]);

  useEffect(() => {
    getFeedInfo();
  }, [getFeedInfo]);

  const toDay = new Date();
  const toDayD = toDay.getTime();

  let divide = 1000 * 60 * 60 * 24;
  let date = (toDayD - feedInfo.feedDate) / divide;
  let day = String(Math.floor(date));
  let hour = String(Math.floor((date - day) * 24));
  let minute = String(Math.floor(((date - day) * 24 - hour) * 60));
  let second = String(Math.floor((((date - day) * 24 - hour) * 60 - minute) * 60));

  return (
    <StyleModal
      open={true}
      // onClose={(e) => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box width={1200} height={600} bgcolor="white" p={3} borderRadius={2}>
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <Box flex={2}>
            {feedInfo.ffList.length > 1 ? (
              <Carousel next={() => {}} prev={() => {}} autoPlay={false} animation="slide" duration={800} height={570}>
                {feedInfo.ffList.map((item, i) => (
                  <CardMedia key={item.feedCode} component="img" src={"/images/" + feedInfo.memberSaveimg} alt={item.feedFileImg} />
                ))}
              </Carousel>
            ) : (
              <CardMedia
                key={feedInfo.ffList[0].feedCode}
                component="img"
                height={600}
                src={"/images/" + feedInfo.ffList[0].feedFileSaveimg}
                alt={feedInfo.ffList[0].feedFileImg}
              />
            )}
          </Box>
          <Box flex={1} p={1}>
            <UserBox display="flex" justifyContent="space-between" mb={1}>
              <Box display="flex" alignItems="center">
                <Avatar alt={feedInfo.memberName} src={"/images/" + feedInfo.memberSaveimg} sx={{ width: 30, height: 30, mr: 1 }} />
                <Typography fontWeight={500} variant="span">
                  <b>{feedInfo.memberNickname}</b> {}
                </Typography>
              </Box>
              <LongMenu Modal={setOpen} refreshFeed={refreshFeed} flist={feedInfo.ffList} information={feedInfo} />
            </UserBox>
            <Divider />
            <Box mt={1}>
              <UserBox mb={2}>
                <Avatar alt={feedInfo.memberName} src={"/images/" + feedInfo.memberSaveimg} sx={{ width: 30, height: 30 }} />
                <Typography fontWeight={500} variant="span">
                  <b>{feedInfo.memberNickname}</b>{" "}
                  {feedInfo.feedContent.length > 20 ? `${feedInfo.feedContent.slice(0, 20)}...` : feedInfo.feedContent}
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
              {feedInfo.fcList.length >= 1 ? (
                <>
                  {feedInfo.fcList.map((comment) => (
                    <Comments key={comment.feedCommentCode} data={comment} memberWriterInfo={feedInfo.memberEmail} />
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
            {feedInfo.flList.length === 0 ? (
              <Box visibility="hidden" height={24.5}>
                좋아요 영역
              </Box>
            ) : (
              <FeedLikeList flList={feedInfo.flList}>좋아요 {feedInfo.flList.length}개</FeedLikeList>
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
  );
};

export default FeedInfo;
