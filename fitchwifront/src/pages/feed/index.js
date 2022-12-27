import { Box, Stack } from "@mui/material";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Sidebar from "../../layout/Sidebar";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

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
        <Feed data={feedList} memberInfo={profil} refreshFeed={getAllFeedList} />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default Feedindex;
