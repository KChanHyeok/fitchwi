import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import FeedAdd from "../common/FeedAdd";
import Post from "./Post";

const FeedGame = ({ feedList, memberInfo, refreshFeed }) => {
  const [loading, setLoading] = useState(true);
  const [feedGame, setFeedGame] = useState();

  useEffect(() => {
    setFeedGame(feedList.filter((data) => data.feedCategory === "게임·오락"));
    setLoading(false);
  }, [feedList, memberInfo]);

  return (
    <>
      <Box flex={4} p={2}>
        {loading ? (
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : feedGame.length === 0 ? (
          <Typography textAlign="center" height={100} lineHeight={40}>
            😀 피드가 존재하지 않습니다 ⚠️ 피드를 작성해주세요!!
          </Typography>
        ) : (
          feedGame.map((data) => (
            <Post
              key={data.feedCode}
              tag={data.feedTag}
              information={data}
              memberWriterInfo={data.memberEmail}
              feedDate={data.feedDate}
              feedContent={data.feedContent}
              feedCode={data.feedCode}
              file={data.ffList}
              memberEmail={data.memberEmail.memberEmail} //post로 email 넘기려고 추가함
              comment={data.fcList}
              memberInfo={memberInfo}
              refreshFeed={refreshFeed}
              like={data.flList}
            />
          ))
        )}
        <FeedAdd memberInfo={memberInfo} refreshFeed={refreshFeed} />
      </Box>
    </>
  );
};

export default FeedGame;
