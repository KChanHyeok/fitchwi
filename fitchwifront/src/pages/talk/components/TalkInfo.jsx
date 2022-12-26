import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/TalkInfo.scss";
import TalkOpMenu from "../components/TalkOpMenu";
import { Stack } from "@mui/system";

const TalkInfo = () => {
    let { talkCode } = useParams();
    console.log(talkCode);

    const [talkInfo, setTalkInfo] = useState({});

    const getTalkInfo = () => {
        axios.get("/getTalk", { params: { talkCode: talkCode } })
            .then((res) => setTalkInfo(res.data));
    }

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
            <div className="talkDetail">
                <div>
                    <div className="header">
                        <span>mbti 취미</span>
                        <span>{talkInfo.talkCategory}</span>
                        <span>남은 자리 0/{talkInfo.talkMax}</span>
                        <div className="talkOpMenu">
                            <TalkOpMenu />
                        </div>
                    </div>
                    <div className="section">
                        <div>
                            <span className="talkTitle"><b>{talkInfo.talkTitle}</b></span>
                            <span className="reportBtn">신고하기</span>
                            {/* <img src={`/images/${talkInfo.talkSaveImg}`}></img> */}
                        </div>
                        <p>멤버소개</p>
                        <p>방장</p>
                        <div>얘기해요 피드</div>
                    </div>
                </div>
            </div>
        </Stack>

    )

}

export default TalkInfo;
