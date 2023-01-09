import { Avatar, AvatarGroup, Box, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Rightbar = () => {
  const [member, getMember] = useState();
  const nav = useNavigate();

  const getMemberList = useCallback(() => {
    axios.get("/getMemberList").then((response) => {
      if (response.data.length > 9) {
        response.data.length = 7;
      }
      getMember(response.data);
    });
  }, []);

  useEffect(() => {
    getMemberList();
    getTagList();
  }, [getMemberList]);

  const getTagList = async () => {
    await axios
      .get("/getTagList")
      .then((response) => {
        if (response.data.length > 9) {
          response.data.length = 9;
        }
        setTagList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [tagList, setTagList] = useState([]);

  return (
    <>
      {!member ? (
        <Box>로딩중</Box>
      ) : (
        <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <Box position="fixed" width={300}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={100} mb={1} mt={2}>
                회원님을 위한 추천
              </Typography>
            </Stack>

            <AvatarGroup max={7}>
              {member.map((item) => (
                <Avatar
                  alt={item.memberNickName}
                  src={item.memberSaveimg}
                  key={item.memberEmail}
                  onClick={() => nav("/memberpage", { state: { memberId: item.memberEmail } })}
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </AvatarGroup>
            <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
              최신 태그
            </Typography>
            <ImageList cols={3} sx={{ mb: 5, width: "100%", height: 310 }}>
              {tagList.map((item) => (
                <ImageListItem style={{ height: "100px" }} onClick={() => nav(`/search/${item.tagContent}`)} sx={{ cursor: "pointer" }}>
                  <img
                    src={`https://source.unsplash.com/featured/?tag,${item.tagContent}`}
                    alt={item.tagCode}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <ImageListItemBar title={item.tagContent} sx={{ textAlign: "center", fontWeight: 100 }} />
                </ImageListItem>
              ))}
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
