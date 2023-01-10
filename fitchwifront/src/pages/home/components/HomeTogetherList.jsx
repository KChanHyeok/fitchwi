import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeTogetherList = ({ category, togetherList, korCategory }) => {
  const [togetherListByCategory, setTogetherListCategory] = useState();
  const nav = useNavigate();

  useEffect(() => {
    try {
      setTogetherListCategory(togetherList.filter((data) => data.togetherCategory === korCategory));
    } catch (e) {}
  }, [korCategory, togetherList]);

  return (
    <>
      {togetherListByCategory === undefined ? (
        <Box>로딩중</Box>
      ) : (
        <>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={10}>
            <Box disabled></Box>
            <Button onClick={() => nav(`/together/category/${category}`)}>전체보기</Button>
          </Stack>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
            {togetherListByCategory.map((item) => (
              <Card sx={{ mb: 3, maxWidth: 200, maxHeight: 235 }} key={item.togetherCode}>
                <CardActionArea>
                  <CardMedia component="img" width="200" height="150" alt="talkimg" />
                  <CardContent>
                    <Typography variant="h5">{item.togetherTitle}</Typography>
                    <Typography variant="subtitle1">{item.togetherContent}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </>
      )}
    </>
  );
};

export default HomeTogetherList;
