import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/TalkInfo.scss";
import TalkOpMenu from "../components/TalkOpMenu";
import { Stack } from "@mui/system";
import { Box } from "@mui/material";

const TalkInfo = () => {
    let { talkCode } = useParams();
    console.log(talkCode);

    const [talkInfo, setTalkInfo] = useState({});

    const getTalkInfo = () => {
        axios.get("/getTalk", { params: { talkCode: talkCode } })
            .then((res) => setTalkInfo(res.data));
    }
    console.log(talkInfo);

    useEffect(() => {
        getTalkInfo();
    }, []);





    return (
        <Stack
            flex={4} p={2}
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={2}
        >
            <Box>
                <span>mbti 취미&nbsp;</span>
                <span>{talkInfo.talkCategory}&nbsp;</span>
                <span>남은 자리 0/{talkInfo.talkMax}&nbsp;</span>
                <span>유형 - {talkInfo.talkType}</span>
                <div className="talkOpMenu">
                    <TalkOpMenu />
                    <p className="reportBtn">신고하기</p>
                </div>
            </Box>
            <h1>{talkInfo.talkTitle}</h1>

            <Box sx={{ maxWidth: 900 }}>
                {
                    talkInfo.talkSaveimg && (<Box
                        component="img"
                        sx={{ maxHeight: 400, textAlign: "center" }}
                        src={`/images/${talkInfo.talkSaveimg}`}
                        alt="green iguana"
                    ></Box>)
                }
            </Box>
            <h3>함께해요 소개</h3>
            <Box component="span">
                {talkInfo.togetherContent}
            </Box>
            <p>멤버소개</p>
            <p>방장</p>
            <div>얘기해요 피드</div>
        </Stack>

    )

}

export default TalkInfo;
