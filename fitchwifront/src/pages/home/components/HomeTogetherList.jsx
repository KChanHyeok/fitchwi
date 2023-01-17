import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeTogetherList = ({ category, togetherList, korCategory, type }) => {
  const [togetherListByCategory, setTogetherListCategory] = useState();
  const nav = useNavigate();

  useEffect(() => {
    try {
      if (type === "recent") {
        setTogetherListCategory(togetherList.filter((data) => data.togetherCategory === korCategory));
      } else {
        setTogetherListCategory(
          togetherList.filter((data) => data.togetherCategory === korCategory).sort((a, b) => a.togetherPrice - b.togetherPrice)
        );
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
          <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={10} mb={3}>
            {type === "recent" ? (
              <Typography variant="h5">👾 최신 함께해요</Typography>
            ) : (
              <Typography variant="h5">🤡 추천 함께해요</Typography>
            )}
            <Button onClick={() => nav(`/together/category/${category}`)}>전체보기</Button>
          </Stack>
          <Grid container spacing={2} display="flex" alignItems="center">
            {togetherListByCategory.sort((a,b) => b.togetherCode - a.togetherCode).map((item, index) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                <Box key={item.togetherCode}>
                  <Link to={`/together/${item.togetherCode}`} style={{ textDecoration: "none" }}>
                    <Card sx={{ mb: 3, height: 235 }}>
                      <CardActionArea>
                        <CardMedia component="img" width="200" height="150" alt="talkimg" src={`/images/${item.togetherSaveimg}`} />
                        <CardContent>
                          <Typography
                            variant="h6"
                            fontWeight={100}
                            sx={{
                              fontSize: { xs: 14, sm: 14, md: 20 },
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              width: 200,
                              height: 30,
                            }}
                          >
                            {item.togetherTitle}
                          </Typography>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="caption">{item.togetherDate}</Typography>
                            <Typography variant="button">
                              {item.togetherPosition.length > 10 ? `${item.togetherPosition.slice(0, 10)}...` : item.togetherPosition}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default HomeTogetherList;
