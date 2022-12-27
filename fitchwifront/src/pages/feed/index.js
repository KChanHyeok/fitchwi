import { Backdrop, Box, CircularProgress, Stack } from "@mui/material";
import FeedAdd from "./components/FeedAdd";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Sidebar from "../../layout/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function Feedindex() {
  const id = sessionStorage.getItem("id");
  const [feeds, setFeeds] = useState([]);
  const [profil, setProfil] = useState({});

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllFeedList();
  }, []);

  useEffect(() => {
    if (id !== null) {
      axios
        .get("/getMemberInfo", { params: { userId: id } })
        .then((response) => {
          setProfil(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const getAllFeedList = () => {
    axios
      .get("/getAllFeedList")
      .then((response) => {
        setFeeds(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box>
      {loading ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Stack direction="row" spacing={7} justifyContent="space-between">
          <Sidebar />
          {feeds === [] ? <Feed /> : <Feed data={feeds} memberInfo={profil} refreshFeed={getAllFeedList} />}
          <Rightbar />
          <FeedAdd memberInfo={profil} refreshFeed={getAllFeedList} />
        </Stack>
      )}
    </Box>
  );
}

export default Feedindex;
