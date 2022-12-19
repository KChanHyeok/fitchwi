import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllFeedList();
  }, []);

  const getAllFeedList = () => {
    axios
      .get("/getAllFeedList")
      .then((response) => {
        if (response.data.length === 0) {
          console.log("피드가 존재하지 않습니다");
        }
        setFeeds(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  console.log(feeds);
  return (
    <Box flex={4} p={2}>
      {loading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <Box>
          {feeds.map((feed) => (
            <Post
              key={feed.feedCode}
              memberName={feed.memberEmail.memberName}
              feedContent={feed.feedContent}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Feed;
