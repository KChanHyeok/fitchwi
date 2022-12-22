import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../layout/Sidebar";
import "../styles/TalkInfo.scss";
import TalkOpMenu from "./TalkOpMenu";

const TalkInfo = () => {
    const [talkInfo, setTalkInfo] = useState({});

    useEffect(() => {
        const talk = 1671693635677;

        axios
            .get("/getTalk", { params: { talkCode: talk } })
            .then((res) => {
                setTalkInfo(res.data);
            })
            .catch((err) => console.log(err))
    })


    return (
        <>
            <Sidebar />
            <div className="talkInfoShow">
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
                        <span className="talkTitle"><b>얘기해요 모임명</b></span>
                        <span className="reportBtn">신고하기</span>
                        <p>이미지</p>
                    </div>
                    <p>멤버소개</p>
                    <p>방장</p>
                    <div>얘기해요 피드</div>
                </div>
            </div>


        </>
    )

}

export default TalkInfo;
