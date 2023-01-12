import { Avatar, Button, Chip, CircularProgress, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeTalkList = ({ category, talkList, korCategory, type }) => {
  const nav = useNavigate();
  const [talkListByCategory, setTalkListCategory] = useState();

  useEffect(() => {
    try {
      if (type === "recent") {
        setTalkListCategory(talkList.filter((data) => data.talkCategory === korCategory));
      } else {
        setTalkListCategory(
          talkList.filter((data) => data.talkCategory === korCategory).sort((a, b) => b.talkMemberCount - a.talkMemberCount)
        );
      }
    } catch (e) {}
  }, [korCategory, talkList, type]);

  if (talkListByCategory !== undefined) {
    talkListByCategory.length = 3;
  }

  return (
    <>
      {talkListByCategory === undefined ? (
        <CircularProgress />
      ) : (
        <>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={10} mb={3}>
            {type === "recent" ? (
              <Typography variant="h5">💬 최신 얘기해요</Typography>
            ) : (
              <Typography variant="h5">🤖 추천 얘기해요</Typography>
            )}
            <Button onClick={() => nav(`/talk/category/${category}`)}>전체보기</Button>
          </Stack>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between">
            {talkListByCategory.map((item, index) =>
              index === 0 ? (
                <Box height={320} borderRadius={1} boxShadow={3} p={1} key={item.talkCode} sx={{ width: { xs: 370, sm: 300 } }}>
                  <Box
                    component="img"
                    src={`/images/${item.talkSaveimg}`}
                    height={230}
                    width="100%"
                    sx={{ cursor: "pointer" }}
                    onClick={() => nav(`/talk/${item.talkCode}`)}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={100}
                    mt={1}
                    color="black"
                    sx={{ cursor: "pointer" }}
                    onClick={() => nav(`/talk/${item.talkCode}`)}
                  >
                    {item.talkTitle}
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Chip
                      color="primary"
                      variant="outlined"
                      label={korCategory}
                      style={{
                        fontSize: 10,
                      }}
                    />
                    <Link to="/memberpage" state={{ memberId: item.talkOpenCode.memberEmail.memberEmail }}>
                      <Avatar src={item.talkOpenCode.memberEmail.memberSaveimg} sx={{ width: 40, height: 40 }} />
                    </Link>
                  </Stack>
                </Box>
              ) : (
                <Box
                  height={320}
                  borderRadius={1}
                  boxShadow={3}
                  p={1}
                  key={item.talkCode}
                  sx={{ width: { xs: 370, sm: 300 }, display: { xs: "none", sm: "block" } }}
                >
                  <Box
                    component="img"
                    src={`/images/${item.talkSaveimg}`}
                    height={230}
                    width="100%"
                    sx={{ cursor: "pointer" }}
                    onClick={() => nav(`/talk/${item.talkCode}`)}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={100}
                    mt={1}
                    color="black"
                    sx={{ cursor: "pointer" }}
                    onClick={() => nav(`/talk/${item.talkCode}`)}
                  >
                    {item.talkTitle}
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Chip
                      color="primary"
                      variant="outlined"
                      label={korCategory}
                      style={{
                        fontSize: 10,
                      }}
                    />
                    <Link to="/memberpage" state={{ memberId: item.talkOpenCode.memberEmail.memberEmail }}>
                      <Avatar src={item.talkOpenCode.memberEmail.memberSaveimg} sx={{ width: 40, height: 40 }} />
                    </Link>
                  </Stack>
                </Box>
              )
            )}
          </Stack>
        </>
      )}
    </>
  );
};

export default HomeTalkList;
