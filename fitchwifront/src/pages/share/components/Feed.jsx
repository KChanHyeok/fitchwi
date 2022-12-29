import { Box, Typography, Backdrop, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import FeedAdd from "../common/FeedAdd";
import Post from "./Post";

const Feed = ({ feedList, memberInfo, refreshFeed }) => {
  const [loading, setLoading] = useState(true);
  const [feedCategory, setFeedCategory] = useState();

  useEffect(() => {
    setFeedCategory(feedList);
  }, [feedList, memberInfo]);

  useEffect(() => {
    if (feedCategory !== undefined) {
      if (feedCategory.length !== 0) {
        setLoading(false);
      }
    }
  }, [feedCategory]);

  return (
    <>
      <Box flex={4} p={2}>
        {!feedCategory ? (
          <Typography textAlign="center" height={100} lineHeight={40}>
            😀 피드가 존재하지 않습니다 ⚠️ 피드를 작성해주세요!!
          </Typography>
        ) : loading ? (
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          feedCategory.map((data) => (
            <Post
              key={data.feedCode}
              feedInfo={data}
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

export default Feed;
