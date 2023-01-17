import { Avatar, AvatarGroup, Box, CircularProgress, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
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

  const mbti = sessionStorage.getItem("mbti");
  const getMemberList = useCallback(() => {
    axios.get("/getMemberList").then((response) => {
      getMember(response.data.filter((data) => data.memberMbti === mbti));
    });
  }, [mbti]);

  console.log(member);

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

  const [tagList, setTagList] = useState();

  return (
    <>
      {!member || !tagList ? (
        <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}>
          <Box position="fixed" width={300}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1, mt: 2 }}>
              {mbti !== null ? (
                <>
                  <Typography variant="h6" fontWeight={100}>
                    회원님을 위한 추천
                  </Typography>
                  <Typography fontWeight={100}>#{mbti}</Typography>
                </>
              ) : (
                <Typography variant="h6" fontWeight={100}>
                  로그인이 필요한 서비스입니다.
                </Typography>
              )}
            </Stack>
            <Box textAlign="center">
              <CircularProgress />
            </Box>
            <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
              최신 태그
            </Typography>
            <Box textAlign="center" mb={4}>
              <CircularProgress />
            </Box>
            <Typography variant="button" mb={4}>
              소개·도움말·홍보 센터·API·채용 정보·개인정보처리방침·약관·위치·언어
            </Typography>
            <br />
            <Typography variant="caption">© 2023 FITCHWI FROM ICIA ACADEMY</Typography>
          </Box>
        </Box>
      ) : (
        <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}>
          <Box position="fixed" width={300}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1, mt: 2 }}>
              {mbti !== null ? (
                <>
                  <Typography variant="h6" fontWeight={100}>
                    회원님을 위한 추천
                  </Typography>
                  <Typography fontWeight={100}>#{mbti}</Typography>
                </>
              ) : (
                <Typography variant="h6" fontWeight={100}>
                  로그인이 필요한 서비스입니다.
                </Typography>
              )}
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
                <ImageListItem
                  style={{ height: "100px" }}
                  onClick={() => nav(`/search/${item.tagContent}`)}
                  sx={{ cursor: "pointer" }}
                  key={item.tagCode}
                >
                  <img
                    src={`https://source.unsplash.com/featured/?tag,${item.tagCode}`}
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
              소개·도움말·홍보 센터·API·채용 정보·개인정보처리방침·약관·위치·언어
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
