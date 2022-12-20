import { Box } from "@mui/material";
import React from "react";
import Post from "./Post";

const Feed = ({ data }) => {
  return (
    <Box flex={4} p={2}>
      {data === {}
        ? "작성된 피드가 없습니다."
        : data.map((data) => (
            <Post
              key={data.feedCode}
              memberName={data.memberEmail.memberName}
              feedDate={data.feedDate}
              feedContent={data.feedContent}
            />
          ))}
    </Box>
  );
};

export default Feed;
