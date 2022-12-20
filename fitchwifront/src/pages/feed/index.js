import { Backdrop, Box, CircularProgress, Stack } from "@mui/material";
import FeedAdd from "./components/FeedAdd";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Sidebar from "../../layout/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function Feedindex({ lstate }) {
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
  const { logid } = lstate;

  return (
    <Box>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Stack direction="row" spacing={7} justifyContent="space-between">
          <Sidebar />
          <Feed data={feeds} />
          <Rightbar />
          <FeedAdd memberEmail={logid} refreshFeed={getAllFeedList} />
        </Stack>
      )}
    </Box>
  );
}

export default Feedindex;
