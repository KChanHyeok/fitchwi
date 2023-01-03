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

const TalkJoin = ({ children, talkInfo, talkJoinState, refreshTalkJoinList, talkJoinMember }) => {
    const nowdate = new Date().getFullYear() + "-"
        + (new Date().getMonth() + 1) + "-"
        + new Date().getDate();
    // const nav = useNavigate();

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
                setOpenModal(false);
                alert(res.data);
                refreshTalkJoinList();

            })
            .catch((error) => console.log(error));

    }

    //참여(가입) 탈퇴하기
    const deleteTalkJoinInfo = (e) => {
        e.preventDefault();
        axios.delete("/deleteTalkJoinInfo",
            {
                params: {
                    memberEmail: sessionStorage.getItem("id"),
                    talkCode: talkInfo.talkCode
                }
            })
            .then((res) => {
                if (talkJoinState === "대기") {
                    alert("신청 취소 완료");
                } else {
                    alert(res.data);
                }
                setOpenModal(false);
                refreshTalkJoinList();
            })
            .catch((error) => console.log(error));
    }

    //참여 모달창
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        console.log(talkJoinState);
    }, [talkJoinState])
    // console.log("talkJoin : " + talkJoinState);

    //최대인원 설정
    const isTalkMax = () => {
        if (1 + talkJoinMember.length === talkInfo.talkMax) {
            alert("최대인원 초과로 현재 참여가 불가능합니다.");
        } else {
            setOpenModal(true);
        }
    }

    return (
        <>
            {talkJoinState === "대기"
                ? <Button onClick={() => setOpenModal(true)}
                    color="primary" variant="contained"
                    className="talkSticky">신청 취소하기</Button>
                : talkJoinState === "가입중"
                    ? <Button onClick={() => setOpenModal(true)}
                        color="primary" variant="contained"
                        className="talkSticky">탈퇴하기</Button>
                    : <Button onClick={isTalkMax}
                        color="primary" variant="contained"
                        className="talkSticky">{children}</Button>
            }
            <StyleModal open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ mt: 5 }}>
                {talkJoinState === "대기"
                    ? <Box conponent="form" width={400} height={400} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>
                        <Typography variant="h6" color="gray" textAlign="center">
                            얘기해요 신청 취소
                            <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
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
                        <p>현재 승인 대기중인 상태입니다.<br /> 취소하시겠습니까?</p>
                        <Button type="submit" onClick={deleteTalkJoinInfo}>취소하기</Button>
                    </Box>
                    : talkJoinState === "가입중"
                        ? <Box conponent="form" width={400} height={400} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>
                            <Typography variant="h6" color="gray" textAlign="center">
                                얘기해요 탈퇴하기
                                <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
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
                            <p>정말로 모임을 탈퇴 하시겠습니까?</p>
                            <Button type="submit" onClick={deleteTalkJoinInfo}>탈퇴하기</Button>
                        </Box>
                        : <Box conponent="form" width={400} height={400} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>
                            <Typography variant="h6" color="gray" textAlign="center">
                                얘기해요 참여하기
                                <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
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
                            <p>{talkInfo.talkInquiry}</p>
                            <TextField fullWidth
                                label="답변"
                                name="talkJoinAnswer"
                                value={insertTalkJoin.talkJoinAnswer}
                                onChange={onChange} />
                            <Box>승인제일 경우 승인대기 상태로 방장의 승인을 기다려야 합니다.</Box>
                            <Button type="submit" onClick={onTalkJoin}>참여하기</Button>
                        </Box>
                }

            </StyleModal>
        </>
    )
}

export default TalkJoin;