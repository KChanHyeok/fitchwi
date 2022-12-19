import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const Feed = () => {
  const [feeds, setFeeds] = useState({});
  useEffect(() => {
    getAllFeedList();
  }, []);

  const getAllFeedList = () => {
    axios
      .get("/getAllFeedList")
      .then((response) => {
        const list = response.data;
        if (list.length === 0) {
          console.log("피드가 존재하지 않습니다");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Box flex={4} p={2}>
      <Post />
    </Box>
  );
};

export default Feed;
