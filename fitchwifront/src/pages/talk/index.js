import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import TalkInfo from "./components/TalkInfo";
import TalkMain from "./components/TalkMain";
import TalkOpened from "./components/TalkOpened";

function Home() {
    const id = sessionStorage.getItem("id");
    console.log(id);

    const [talkList, setTalkList] = useState([]);

    useEffect(() => {
        getAllTalkList();
    }, []);

    const getAllTalkList = () => {
        axios.get("/getAllTalkList").then((res) => {
            setTalkList(res.data)
        }).catch((error) => console.log(error))
    }

    return (
        <>
        <Stack direction="row" spacing={7} justifyContent="space-between">
            <Sidebar pageurl={"talk"} />
            <Routes>
                <Route path="/*" element={<TalkMain talkList={talkList} />} />
                <Route path="/:talkCode" element={<TalkInfo />} />
            </Routes>
            
            <TalkOpened memberEmail={id} refreshTalkList={getAllTalkList} />
        </Stack>
        </>
    );
}

export default Home;