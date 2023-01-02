import { Fab, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import TalkInfo from "./components/TalkInfo";
import TalkMain from "./components/TalkMain";
import TalkOpened from "./components/TalkOpened";
import { Add as AddIcon } from "@mui/icons-material";

function Home() {
    const id = sessionStorage.getItem("id");
    const nav = useNavigate();

    const [talkList, setTalkList] = useState([]);
    const [talkJoinList, setTalkJoinList] = useState([]);

    useEffect(() => {
        getAllTalkList();
        getTalkJoinList();
    }, []);

    const getAllTalkList = async () => {
        await axios.get("/getAllTalkList")
        .then((res) => {
            setTalkList(res.data);
        })
        .catch((error) => console.log(error));
    }

    const getTalkJoinList = async () => {
        await axios.get("/getTalkJoinList")
        .then((res) => {
            setTalkJoinList(res.data);
        })
        .catch((error) => console.log(error));
    }
    
    //로그인 했을 때만 개설 가능하게 처리
    const isLogin = () => {
        if (sessionStorage.getItem("id") === null) {
            alert("로그인이 필요한 서비스입니다.");
            nav("/login");
        } else {
            nav("/talk/opened");
        }
    }

    return (
        <>
        <Tooltip
        onClick={isLogin} title="Add"
        sx={{
            position: "fixed",
            bottom: 20,
            marginLeft: 7,
            left: { xs: "calc(50% - 25px)", md: 30 },}}>
                <Fab color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
        </Tooltip>
        <Stack direction="row" spacing={7} justifyContent="space-between">
            <Sidebar pageurl={"talk"} />
            <Routes>
                <Route path="/*" element={<TalkMain talkList={talkList} />} />
                <Route path="/:talkPageCode"
                element={<TalkInfo
                    refreshTalkJoinInfo={getTalkJoinList}
                    talkList={talkList} talkJoinList={talkJoinList} />} />
                    <Route path="opened"
                    element={<TalkOpened  memberEmail={id} refreshTalkList={getAllTalkList}/>} />
            </Routes>           
        </Stack>
        </>
    );
}

export default Home;