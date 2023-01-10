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
import FeedInfo from "./common/FeedInfo";

function Feedindex() {
  // const [feedList, setFeedList] = useState([]);
  const [profil, setProfil] = useState({});

  // const getAllFeedList = async () => {
  //   await axios
  //     .get("/getAllFeedList")
  //     .then((response) => {
  //       setFeedList(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const getMemberInfo = useCallback(() => {
    if (sessionStorage.getItem("id") != null) {
      axios.get("/getMemberInfo", { params: { userId: sessionStorage.getItem("id") } }).then((response) => {
        setProfil(response.data);
      });
    }
  }, []);

  useEffect(() => {
    // getAllFeedList();
    getMemberInfo();
  }, [getMemberInfo]);

  return (
    <Box>
      <Stack direction="row" spacing={7} justifyContent="space-between">
        <Sidebar pageurl={"share"} />
        <Routes>
          <Route path="/*" element={<Feed memberInfo={profil} />} />
          <Route path="culture" element={<FeedCulture memberInfo={profil} />} />
          <Route path="exercise" element={<FeedExercise memberInfo={profil} />} />
          <Route path="food" element={<FeedFood memberInfo={profil} />} />
          <Route path="travel" element={<FeedTravel memberInfo={profil} />} />
          <Route path="growth" element={<FeedGrowth memberInfo={profil} />} />
          <Route path="art" element={<FeedArt memberInfo={profil} />} />
          <Route path="game" element={<FeedGame memberInfo={profil} />} />
          <Route path="other" element={<FeedOther memberInfo={profil} />} />
          <Route path="/:feedCode" element={<FeedInfo memberInfo={profil} />} />
        </Routes>
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default Feedindex;
