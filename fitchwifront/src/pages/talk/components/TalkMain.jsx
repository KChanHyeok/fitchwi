import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TalkList from "./TalkList";

const TalkMain = ({ talkList }) => {
    return (
        <Box flex={4} p={2}>
            <h1>얘기해요 메인페이지</h1>
            {talkList.length === 0 ? <Typography textAlign="center"
                height={100} lineHeight={40}>현재 진행중인 얘기해요 없음
            </Typography> : talkList.map((data) => (
                <TalkList talkList={data} key={data.talkCode} />
            ))}
        </Box>
    )
}

export default TalkMain;