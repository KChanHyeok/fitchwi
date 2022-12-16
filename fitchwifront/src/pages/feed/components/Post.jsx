import React, { useState } from "react";
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
  MoreVert,
  Favorite,
  FavoriteBorder,
  EmojiEmotions,
  Image,
  VideoCameraBack,
  PersonAdd,
} from "@mui/icons-material";
import { Box } from "@mui/system";

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

const Post = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Card sx={{ margin: 5 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "orange" }} aria-label="recipe">
              S
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title="작성자"
          subheader="작성일시"
        />
        {/* 피드 이미지 */}
        <CardMedia
          onClick={(e) => setOpen(true)}
          component="img"
          height="2%"
          image="/img/EDD9CA7F-4356-412E-B142-6B82C04CEBDA_1_105_c.jpeg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h6" color="text.primary">
            피드 내용
          </Typography>
          <Typography variant="body2" color="skyblue" marginBottom={2}>
            #해쉬 태그 #해쉬 태그 #해쉬 태그 #해쉬 태그
          </Typography>
          <Typography variant="body2" color="text.secondary">
            댓글작성자 : 댓글내용
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
          <AvatarGroup max={6}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </CardActions>
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
            <Box flex={2} p={2}>
              <CardMedia
                component="img"
                height="570px"
                image="/img/EDD9CA7F-4356-412E-B142-6B82C04CEBDA_1_105_c.jpeg"
                alt="피드사진"
              />
            </Box>
            <Box flex={1} p={2}>
              <UserBox>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 30, height: 30 }}
                />
                <Typography fontWeight={500} variant="span">
                  석진
                </Typography>
              </UserBox>
              <Typography fontWeight={500} variant="span">
                피드내용
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
                <Button>게시</Button>
              </ButtonGroup>
            </Box>
          </Stack>
        </Box>
      </StyleModal>
    </div>
  );
};

export default Post;
