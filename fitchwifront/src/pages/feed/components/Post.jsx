import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Modal,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import {
  Favorite,
  FavoriteBorder,
  EmojiEmotions,
  Image,
  VideoCameraBack,
  PersonAdd,
  AccountCircle,
} from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/system";
import LongMenu from "./Longmenu";
import axios from "axios";

const StyleModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Post = ({ memberInfo, feedContent, feedDate, feedCode, file }) => {
  const toDay = new Date();
  const toDayD = toDay.getTime();

  let divide = 1000 * 60 * 60 * 24;
  let date = (toDayD - feedDate) / divide;

  let day = String(Math.floor(date)).padStart(2, 0);
  let hour = String(Math.floor((date - day) * 24)).padStart(2, 0);
  let minute = String(Math.floor(((date - day) * 24 - hour) * 60)).padStart(
    2,
    0
  );

  const [open, setOpen] = useState(false);
  const [flist, setFlist] = useState([
    {
      feedFileCode: "",
      feedCode: "",
      feedFileImg: "Nothing",
      feedFileSaveimg: "",
      image: "",
    },
  ]);

  useEffect(() => {
    if (file.length > 0) {
      let FeedFileList = [];
      for (let i = 0; i < file.length; i++) {
        const FeedFile = {
          ...file[i],
          image: "images/" + file[i].feedFileSaveimg,
        };
        FeedFileList.push(FeedFile);
      }
      setFlist(FeedFileList);
    }
  }, [file]);

  const [insertCommentForm, setInsertCommentForm] = useState({
    memberEmail: {
      memberEmail: memberInfo.memberEmail,
    },
    feedCode: { feedCode },
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
    if (insertCommentForm.feedCommentContent !== null) {
      axios
        .post("/insertComment", insertCommentForm)
        .then((response) => {
          if (response.data === "ok") {
            alert("성공");
          } else {
            alert("실패");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <Card sx={{ margin: 5, border: 1 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "orange" }}
              aria-label="recipe"
              src={"images/" + memberInfo.memberSaveimg}
            ></Avatar>
          }
          action={<LongMenu />}
          title={<b>{memberInfo.memberNickname}</b>}
          subheader={
            day > 1
              ? day + "일 전"
              : hour > 1
              ? hour + "시간 전"
              : minute + "분전"
          }
        />
        {/* 피드 이미지 */}
        {flist.length > 1 ? (
          <Carousel
            next={() => {}}
            prev={() => {}}
            autoPlay={false}
            animation="slide"
            duration={800}
            sx={{ height: "100%" }}
          >
            {flist.map((item, i) => (
              <CardMedia
                key={item.feedCode}
                component="img"
                src={item.image}
                alt={item.feedFileImg}
              />
            ))}
          </Carousel>
        ) : (
          <CardMedia
            key={flist[0].feedCode}
            sx={{ cursor: "pointer" }}
            onClick={(e) => setOpen(true)}
            component="img"
            height="20%"
            src={flist[0].image}
            alt={flist[0].feedFileImg}
          />
        )}
        <CardContent>
          <Typography
            variant="h6"
            color="text.primary"
            onClick={(e) => setOpen(true)}
            sx={{ cursor: "pointer" }}
          >
            {feedContent}
          </Typography>
          <Typography variant="body2" color="skyblue" marginBottom={2}>
            #해쉬 태그 #해쉬 태그 #해쉬 태그 #해쉬 태그
          </Typography>
          {/* <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              />
            </IconButton>
            <AvatarGroup max={6}>
              <Avatar alt="Remy Sharp" />
              <Avatar alt="Travis Howard" />
              <Avatar alt="Cindy Baker" />
              <Avatar alt="Agnes Walker" />
              <Avatar alt="Trevor Henderson" />
              <Avatar alt="Trevor Henderson" />
              <Avatar alt="Trevor Henderson" />
              <Avatar alt="Trevor Henderson" />
            </AvatarGroup>
          </CardActions> */}
          <Typography variant="body2" color="text.secondary">
            댓글작성자 : 댓글내용
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
            mt={2}
          >
            <Avatar
              alt={memberInfo.memberName}
              src={"images/" + memberInfo.memberSaveimg}
              sx={{ width: 30, height: 30, mr: 2 }}
            />
            <TextField
              id="input-with-sx"
              name="feedCommentContent"
              fullWidth
              variant="standard"
              placeholder="댓글 달기..."
              onChange={handleChange}
            />
            <Box>
              <Button onClick={insertComment}>게시</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* 피드 상세보기 모달 */}
      <StyleModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={1200} height={600} bgcolor="white" p={3} borderRadius={2}>
          <Stack direction="row" spacing={3} justifyContent="space-between">
            <Box flex={2}>
              {flist.length > 1 ? (
                <Carousel
                  next={() => {}}
                  prev={() => {}}
                  autoPlay={false}
                  animation="slide"
                  duration={800}
                  height="570px"
                >
                  {flist.map((item, i) => (
                    <CardMedia
                      key={item.feedCode}
                      component="img"
                      src={item.image}
                      alt={item.feedFileImg}
                    />
                  ))}
                </Carousel>
              ) : (
                <CardMedia
                  key={flist[0].feedCode}
                  component="img"
                  height="570px"
                  src={flist[0].image}
                  alt={flist[0].feedFileImg}
                />
              )}
            </Box>
            <Box flex={1} p={1}>
              <UserBox>
                <Avatar
                  alt={memberInfo.memberName}
                  src={"images/" + memberInfo.memberSaveimg}
                  sx={{ width: 30, height: 30 }}
                />
                <Typography fontWeight={500} variant="span">
                  {memberInfo.memberName}
                </Typography>
              </UserBox>
              <Typography fontWeight={500} variant="span">
                {feedContent}
              </Typography>
              <Stack direction="row" gap={1} mt={2} mb={3}>
                <EmojiEmotions color="primary" />
                <Image color="secondary" />
                <VideoCameraBack color="success" />
                <PersonAdd color="error" />
              </Stack>
              <TextField
                sx={{ width: "100%", mb: 2 }}
                id="standard-multiline-static"
                multiline
                rows={1}
                placeholder="댓글 달기..."
                variant="standard"
              />

              <ButtonGroup
                fullWidth
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button>댓글 등록</Button>
              </ButtonGroup>
            </Box>
          </Stack>
        </Box>
      </StyleModal>
    </div>
  );
};

export default Post;
