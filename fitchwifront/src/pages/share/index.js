import { Box, Stack } from "@mui/material";
import Feed from "./components/Feed";
import Rightbar from "./common/Rightbar";
import Sidebar from "../../layout/Sidebar";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import FeedArt from "./components/FeedArt";
import FeedCulture from "./components/FeedCulture";
import FeedExercise from "./components/FeedExercise";
import FeedFood from "./components/FeedFood";
import FeedTravel from "./components/FeedTravel";
import FeedGrowth from "./components/FeedGrowth";
import FeedGame from "./components/FeedGame";
import FeedOther from "./components/FeedOther";

function Feedindex() {
  const [feedList, setFeedList] = useState([]);
  const [profil, setProfil] = useState({});

  const getAllFeedList = async () => {
    await axios
      .get("/getAllFeedList")
      .then((response) => {
        setFeedList(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getMemberInfo = useCallback(() => {
    if (sessionStorage.getItem("id") != null) {
      axios.get("/getMemberInfo", { params: { userId: sessionStorage.getItem("id") } }).then((response) => {
        setProfil(response.data);
      });
    }
  }, []);

  useEffect(() => {
    getAllFeedList();
    getMemberInfo();
  }, [getMemberInfo]);

  return (
    <Box>
      <Stack direction="row" spacing={7} justifyContent="space-between">
        <Sidebar pageurl={"share"} />
        <Routes>
          <Route path="/*" element={<Feed feedList={feedList} memberInfo={profil} refreshFeed={getAllFeedList} />} />
          <Route path="culture" element={<FeedCulture feedList={feedList} memberInfo={profil} />} />
          <Route path="exercise" element={<FeedExercise feedList={feedList} memberInfo={profil} refreshFeed={getAllFeedList} />} />
          <Route path="food" element={<FeedFood feedList={feedList} memberInfo={profil} refreshFeed={getAllFeedList} />} />
          <Route path="travel" element={<FeedTravel feedList={feedList} memberInfo={profil} refreshFeed={getAllFeedList} />} />
          <Route path="growth" element={<FeedGrowth feedList={feedList} memberInfo={profil} refreshFeed={getAllFeedList} />} />
          <Route path="art" element={<FeedArt feedList={feedList} memberInfo={profil} refreshFeed={getAllFeedList} />} />
          <Route path="game" element={<FeedGame feedList={feedList} memberInfo={profil} refreshFeed={getAllFeedList} />} />
          <Route path="other" element={<FeedOther feedList={feedList} memberInfo={profil} refreshFeed={getAllFeedList} />} />
        </Routes>
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default Feedindex;
