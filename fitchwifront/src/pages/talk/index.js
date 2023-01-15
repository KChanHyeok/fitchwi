import { Fab, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import TalkInfo from "./components/TalkInfo";
import TalkOpened from "./components/TalkOpened";
import TalkUpdate from "./components/TalkUpdate";
import { Add as AddIcon } from "@mui/icons-material";
import TalkHome from "./components/TalkHome";

import Footer from "../../layout/Footer";

import TalkNew from "./components/TalkNew";
import TalkCategoryList from "./components/TalkCategoryList";
import TalkFeedList from "./components/TalkFeedList";


function Home() {
  const id = sessionStorage.getItem("id");
  const nav = useNavigate();
  const location = useLocation();

  const [talkList, setTalkList] = useState([]);
  const [talkTagList, setTalkTagList] = useState([]);
  const [talkJoinList, setTalkJoinList] = useState([]);
  const [profil, setProfil] = useState({});

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

  const getMemberInfo = useCallback(() => {
    if (sessionStorage.getItem("id") != null) {
      axios.get("/getMemberInfo", { params: { userId: sessionStorage.getItem("id") } }).then((response) => {
        setProfil(response.data);
      });
    }
  }, []);
  
  useEffect(() => {
    getAllTalkList();
    getAllTalkTagList();
    getTalkJoinList();
    getMemberInfo();
  }, [getMemberInfo]);

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
          <Route path="/*" element={<TalkHome talkList={talkList} />} />
          <Route path="/new" element={<TalkNew talkList={talkList} />} />
          <Route path="/category/:talkCategoryText" element={<TalkCategoryList talkList={talkList} />} />
          <Route
            path="/:talkPageCode"
            element={
              <TalkInfo
              memberInfo={profil}
              talkList={talkList}
              talkTagList={talkTagList}
              talkJoinList={talkJoinList}
              refreshTalkList={getAllTalkList}
              refreshTalkTagList={getAllTalkTagList}
              refreshTalkJoinList={getTalkJoinList}
              />
            }
          />
          <Route path="/feed/:talkPageCode" element={<TalkFeedList />} />
          <Route path="opened" element={<TalkOpened memberEmail={id} memberInfo={profil} refreshTalkTagList={getAllTalkTagList} refreshTalkList={getAllTalkList} />} />
          <Route
            path="update"
            element={<TalkUpdate memberEmail={id}  memberInfo={profil} refreshTalkList={getAllTalkList} refreshTalkTagList={getAllTalkTagList} />}
          />
        </Routes>
      </Stack>
      {/* <Footer /> */}
    </>
  );
}

export default Home;
