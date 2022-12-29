import styled from "@emotion/styled";
import { Avatar, Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "../styles/TalkInfo.scss";

const StyleModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

const TalkJoin = ({ children, talkInfo, talkJoinState, refreshTalkJoinList }) => {
    const nowdate = new Date().getFullYear() + "-"
        + new Date().getMonth() + "-"
        + new Date().getDate();

    const [insertTalkJoin, setInsertTalkJoin] = useState({
        memberEmail: {
            memberEmail: sessionStorage.getItem("id")
        },
        talkJoinDate: nowdate,
        talkJoinAnswer: "",
        talkCode: talkInfo,

    });

    const onChange = useCallback(
        (e) => {
            const inputTo = {
                ...insertTalkJoin,
                talkCode: talkInfo,
                [e.target.name]: e.target.value,
            };
            setInsertTalkJoin(inputTo);
        }, []);

    //작성 내용 전송 함수
    const onTalkJoin = (e) => {
        console.log(insertTalkJoin);
        e.preventDefault();
        axios.post("/insertTalkJoinInfo", insertTalkJoin)
            .then((res) => {
                setJoinModal(false);
                alert("참여신청 완료");
                refreshTalkJoinList();

            })
            .catch((error) => console.log(error));

    }

    //참여 모달창
    const [JoinModal, setJoinModal] = useState(false);
    useEffect(() => {
        console.log(talkJoinState);
    }, [talkJoinState])
    console.log("talkJoin : " + talkJoinState);

    return (
        <>
            {talkJoinState === "가입중"
                ? <Button>취소하기</Button> : <Button>{children}</Button>
                // <Button onClick={() => setJoinModal(true)} className="talkSticky">
                //     참여하기
                // </Button>
            }
            <StyleModal open={JoinModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ mt: 5 }}>

                <Box conponent="form" width={400} height={400} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>

                    <Typography variant="h6" color="gray" textAlign="center">
                        얘기해요 참여하기
                        <button className="modalCloseBtn" onClick={() => setJoinModal(false)}>
                            ✖
                        </button>
                    </Typography>

                    <UserBox>
                        <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant="span">
                            {sessionStorage.getItem("id")}
                        </Typography>
                    </UserBox>
                    <hr />
                    <Box>{talkInfo.talkTitle}</Box>
                    <Box>가입질문</Box>
                    <TextField fullWidth
                        label="답변"
                        name="talkJoinAnswer"
                        value={insertTalkJoin.talkJoinAnswer}
                        onChange={onChange} />
                    <Box>승인제일 경우 승인대기 상태로 방장의 승인을 기다려야 합니다.</Box>
                    <Button type="submit" onClick={onTalkJoin}>참여하기</Button>
                </Box>
            </StyleModal>
        </>
    )
}

export default TalkJoin;