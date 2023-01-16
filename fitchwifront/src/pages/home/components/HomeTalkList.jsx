import { Avatar, Button, Chip, CircularProgress, Grid, Typography } from "@mui/material";
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
    talkListByCategory.length = 4;
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
          <Grid container spacing={2} display="flex" alignItems="center">
            {talkListByCategory.map((item, index) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                <Box borderRadius={1} boxShadow={3} p={1} key={item.talkCode} sx={{ height: { xs: 240, sm: 320 } }}>
                  <Box
                    component="img"
                    src={`/images/${item.talkSaveimg}`}
                    // height={230}
                    width="100%"
                    sx={{ cursor: "pointer", height: { xs: 150, sm: 230 } }}
                    onClick={() => nav(`/talk/${item.talkCode}`)}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={100}
                    mt={1}
                    color="black"
                    sx={{
                      cursor: "pointer",
                      fontSize: { xs: 14, sm: 14, md: 20 },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: 200,
                      height: 30,
                    }}
                    onClick={() => nav(`/talk/${item.talkCode}`)}
                  >
                    {item.talkTitle}
                  </Typography>
                  {/* <Grid container spacing={2} display="flex" alignItems="center"> */}
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
                  {/* </Grid> */}
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default HomeTalkList;
