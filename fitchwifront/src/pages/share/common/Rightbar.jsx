import { Avatar, AvatarGroup, Box, Button, ImageList, ImageListItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const Rightbar = () => {
  const [member, getMember] = useState();

  const getMemberList = useCallback(() => {
    axios.get("/getMemberList").then((response) => getMember(response.data));
  }, []);

  useEffect(() => {
    getMemberList();
  }, [getMemberList]);

  return (
    <>
      {!member ? (
        <Box>로딩중</Box>
      ) : (
        <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <Box position="fixed" width={300}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={100}>
                회원님을 위한 추천
              </Typography>
              <Button>모두 보기</Button>
            </Stack>
            <AvatarGroup max={7}>
              {member.map((item) => (
                <Avatar alt={item.memberNickName} src={`/images/${item.memberSaveimg}`} key={item.memberEmail} />
              ))}
            </AvatarGroup>
            <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
              인기 공유해요
            </Typography>
            <ImageList cols={3} rowHeight={100} gap={5} sx={{ mb: 5 }}>
              <ImageListItem>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Breakfast" />
              </ImageListItem>
              <ImageListItem>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Breakfast" />
              </ImageListItem>
              <ImageListItem>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Breakfast" />
              </ImageListItem>
              <ImageListItem>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Breakfast" />
              </ImageListItem>
              <ImageListItem>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Breakfast" />
              </ImageListItem>
              <ImageListItem>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Breakfast" />
              </ImageListItem>
              <ImageListItem>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Breakfast" />
              </ImageListItem>
              <ImageListItem>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Breakfast" />
              </ImageListItem>
              <ImageListItem>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Breakfast" />
              </ImageListItem>
            </ImageList>
            <Typography variant="button" mb={4}>
              소개∙도움말∙홍보 센터∙API∙채용 정보∙개인정보처리방침∙약관∙위치∙언어
            </Typography>
            <br />
            <Typography variant="caption">© 2023 FITCHWI FROM ICIA ACADEMY</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Rightbar;
