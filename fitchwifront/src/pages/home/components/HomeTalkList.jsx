import { Avatar, Button, Chip, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeTalkList = ({ category, talkList, korCategory }) => {
  const nav = useNavigate();
  const [talkListByCategory, setTalkListCategory] = useState();

  useEffect(() => {
    try {
      setTalkListCategory(talkList.filter((data) => data.talkCategory === korCategory));
    } catch (e) {}
  }, [korCategory, talkList]);

  if (talkListByCategory !== undefined) {
    talkListByCategory.length = 3;
  }
  return (
    <>
      {talkListByCategory === undefined ? (
        <Box>로딩중</Box>
      ) : (
        <>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={10} mb={3}>
            <Typography variant="h5">💬 추천 얘기해요</Typography>
            <Button onClick={() => nav(`/talk/category/${category}`)}>전체보기</Button>
          </Stack>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between">
            {talkListByCategory.map((item) => (
              <Link to={`/talk/${item.talkCode}`} style={{ textDecoration: "none" }} key={item.talkCode}>
                <Box width={300} height={320} borderRadius={1} boxShadow={3} p={1}>
                  <Box component="img" src={`/images/${item.talkSaveimg}`} height={230} width="100%" />
                  <Typography variant="h6" fontWeight={100} mt={1} color="black">
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
              </Link>
            ))}
          </Stack>
        </>
      )}
    </>
  );
};

export default HomeTalkList;
