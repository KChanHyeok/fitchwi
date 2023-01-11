import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TalkList from "./TalkList";

const TalkNew = ({ talkList }) => {
    return (
        <Container fixed>
            <Box sx={{ ml: 5 }} flex={4} p={2}>
                <h2 style={{ marginTop: 5, color: "grey" }}>새로 열린 얘기해요</h2>
                <br />
                {talkList.length === 0 ? <Typography textAlign="center"
                    height={100} lineHeight={40}>현재 진행중인 얘기해요 없음
                </Typography> : talkList.map((data) => (
                    <TalkList talkList={data} key={data.talkCode} />
                ))}
            </Box>
        </Container>
    )
}

export default TalkNew;