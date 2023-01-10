import { Button, Chip, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeTalkList = ({ category, talkList, korCategory }) => {
  const nav = useNavigate();
  const [talkListByCategory, setTalkListCategory] = useState();

  useEffect(() => {
    try {
      setTalkListCategory(talkList.filter((data) => data.talkCategory === korCategory));
    } catch (e) {}
  }, [korCategory, talkList]);

  return (
    <>
      {talkListByCategory === undefined ? (
        <Box>로딩중</Box>
      ) : (
        <>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={10} mb={3}>
            <Typography variant="h5">📌 {korCategory}</Typography>
            <Button onClick={() => nav(`/talk/category/${category}`)}>전체보기</Button>
          </Stack>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between">
            {talkListByCategory.map((item) => (
              <Box width={300} height={280} key={item.talkCode} border={1}>
                <Box component="img" src={`/images/${item.talkSaveimg}`} height={200} width="100%" />
                <Chip
                  color="primary"
                  variant="outlined"
                  label={category}
                  style={{
                    fontSize: 10,
                    marginBottom: 5,
                    marginTop: 4,
                  }}
                />
                <Typography variant="h6">{item.talkTitle}</Typography>
              </Box>
            ))}
          </Stack>
        </>
      )}
    </>
  );
};

export default HomeTalkList;
