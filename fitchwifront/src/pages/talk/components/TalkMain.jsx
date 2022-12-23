import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import TalkList from "./TalkList";

const TalkMain = () => {
    return (
        <Box flex={4} p={2}>
            <h1>얘기해요 메인페이지</h1>
            <Link style={{ textDecoration: "none" }} to={"/talkInfo"}>
                내가 개설한 얘기해요
            </Link>
            <TalkList />
        </Box>
    )
}

export default TalkMain;