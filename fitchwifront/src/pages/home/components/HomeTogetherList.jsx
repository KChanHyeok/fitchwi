import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeTogetherList = ({ category, togetherList, korCategory, type }) => {
  const now = moment().endOf("day").fromNow();
  console.log(now);
  const [togetherListByCategory, setTogetherListCategory] = useState();
  const nav = useNavigate();

  useEffect(() => {
    try {
      if (type === "recent") {
        setTogetherListCategory(togetherList.filter((data) => data.togetherCategory === korCategory));
      } else {
        setTogetherListCategory(togetherList.filter((data) => data.togetherCategory === korCategory));
      }
    } catch (e) {}
  }, [korCategory, togetherList, type]);

  if (togetherListByCategory !== undefined) {
    togetherListByCategory.length = 4;
  }

  return (
    <>
      {togetherListByCategory === undefined ? (
        <CircularProgress />
      ) : (
        <>
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={10}>
            {type === "recent" ? (
              <Typography variant="h5">👾 최신 함께해요</Typography>
            ) : (
              <Typography variant="h5">🤡 추천 함께해요</Typography>
            )}
            <Button onClick={() => nav(`/together/category/${category}`)}>전체보기</Button>
          </Stack>
          <Stack direction="row" spacing={3} alignItems="flex-start" justifyContent="space-between" mt={1}>
            {togetherListByCategory.map((item, index) =>
              index === 0 ? (
                <Box key={item.togetherCode}>
                  <Link to={`/together/${item.togetherCode}`} style={{ textDecoration: "none" }}>
                    <Card sx={{ mb: 3, width: { xs: 380, sm: 250 }, height: 235 }}>
                      <CardActionArea>
                        <CardMedia component="img" width="200" height="150" alt="talkimg" src={`/images/${item.togetherSaveimg}`} />
                        <CardContent>
                          <Typography variant="h6" fontWeight={100}>
                            {item.togetherTitle}
                          </Typography>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="caption">{item.togetherDate}</Typography>
                            <Typography variant="button" fontWeight={100}>
                              {item.togetherPosition}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Box>
              ) : (
                <Box key={item.togetherCode}>
                  <Link to={`/together/${item.togetherCode}`} style={{ textDecoration: "none" }}>
                    <Card
                      sx={{ mb: 3, width: { xs: 380, sm: 250 }, height: 235, display: { xs: "none", sm: "block" } }}
                      key={item.togetherCode}
                    >
                      <CardActionArea>
                        <CardMedia component="img" width="200" height="150" alt="talkimg" src={`/images/${item.togetherSaveimg}`} />
                        <CardContent>
                          <Typography variant="h6" fontWeight={100}>
                            {item.togetherTitle}
                          </Typography>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="caption">{item.togetherDate}</Typography>
                            <Typography variant="button" fontWeight={100}>
                              {item.togetherPosition}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Box>
              )
            )}
          </Stack>
        </>
      )}
    </>
  );
};

export default HomeTogetherList;
