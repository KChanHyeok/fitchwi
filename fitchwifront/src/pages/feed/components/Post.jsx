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
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
          height="2%"
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
            <Avatar alt="Remy Sharp" />
            <Avatar alt="Travis Howard" />
            <Avatar alt="Cindy Baker" />
            <Avatar alt="Agnes Walker" />
            <Avatar alt="Trevor Henderson" />
            <Avatar alt="Trevor Henderson" />
            <Avatar alt="Trevor Henderson" />
            <Avatar alt="Trevor Henderson" />
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
              <CardMedia component="img" height="570px" alt="피드사진" />
            </Box>
            <Box flex={1} p={2}>
              <UserBox>
                <Avatar alt="Remy Sharp" sx={{ width: 30, height: 30 }} />
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
