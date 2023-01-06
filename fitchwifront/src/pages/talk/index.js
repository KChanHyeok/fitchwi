import { Fab, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";

import TalkInfo from "./components/TalkInfo";
import TalkMain from "./components/TalkMain";
import TalkOpened from "./components/TalkOpened";
import TalkUpdate from "./components/TalkUpdate";
import { Add as AddIcon } from "@mui/icons-material";
import TalkHome from "./components/TalkHome";

function Home() {
  const id = sessionStorage.getItem("id");
  const nav = useNavigate();
  const location = useLocation();

  const [talkList, setTalkList] = useState([]);
  const [talkTagList, setTalkTagList] = useState([]);
  const [talkJoinList, setTalkJoinList] = useState([]);

  useEffect(() => {
    getAllTalkList();
    getAllTalkTagList();
    getTalkJoinList();
  }, []);

  const getAllTalkList = async () => {
    await axios
      .get("/getAllTalkList")
      .then((res) => {
        setTalkList(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getAllTalkTagList = async () => {
    await axios
      .get("/getAllTalkTagList")
      .then((res) => {
        setTalkTagList(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getTalkJoinList = async () => {
    await axios
      .get("/getTalkJoinList")
      .then((res) => {
        setTalkJoinList(res.data);
      })
      .catch((error) => console.log(error));
  };

  //로그인 했을 때만 개설 가능하게 처리
  const isLogin = () => {
    if (sessionStorage.getItem("id") === null) {
      alert("로그인이 필요한 서비스입니다.");
      nav("/login");
    } else {
      nav("/talk/opened");
    }
  };

  return (
    <>
      {location.pathname !== "/talk/opened" && (
        <Tooltip
          onClick={isLogin}
          title="Add"
          sx={{
            position: "fixed",
            bottom: 20,
            marginLeft: 7,
            left: { xs: "calc(50% - 25px)", md: 30 },
          }}
        >
          <Fab color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      <Stack>
        <Routes>
          <Route path="/*" element={<TalkHome />} />
          <Route path="/main" element={<TalkMain talkList={talkList} />} />
          <Route
            path="/:talkPageCode"
            element={
              <TalkInfo
                talkList={talkList}
                talkTagList={talkTagList}
                talkJoinList={talkJoinList}
                refreshTalkList={getAllTalkList}
                refreshTalkTagList={getAllTalkTagList}
                refreshTalkJoinList={getTalkJoinList}
              />
            }
          />
          <Route path="opened" element={<TalkOpened memberEmail={id} refreshTalkList={getAllTalkList} />} />
          <Route
            path="update"
            element={<TalkUpdate memberEmail={id} refreshTalkList={getAllTalkList} refreshTalkTagList={getAllTalkTagList} />}
          />
        </Routes>
      </Stack>
    </>
  );
}

export default Home;
