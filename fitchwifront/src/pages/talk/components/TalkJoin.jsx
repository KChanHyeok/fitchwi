import styled from "@emotion/styled";
import { Avatar, Button, CircularProgress, DialogActions, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

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

const TalkJoin = ({ children, memberInfo, talkInfo, talkJoinState, refreshTalkJoinList, talkJoinMember }) => {


    const nav = useNavigate();
    const nowdate = new Date().getFullYear() + "-"
        + ((new Date().getMonth() + 1) < 9 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-"
        + (new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate());

    //버튼 여러번 클릭 막기
    const [load, setLoad] = useState(false);

    const [insertTalkJoin, setInsertTalkJoin] = useState({
        memberEmail: {
            memberEmail: sessionStorage.getItem("id"),
        },
        talkJoinDate: nowdate,
        talkJoinAnswer: "",
        talkCode: talkInfo,
    });

    const onChange = useCallback((e) => {
        const inputTo = {
            ...insertTalkJoin,
            talkCode: talkInfo,
            [e.target.name]: e.target.value,
        };
        setInsertTalkJoin(inputTo);
    }, [insertTalkJoin, talkInfo]);

    //작성 내용 전송 함수
    const onTalkJoin = (e) => {
        console.log(insertTalkJoin);
        e.preventDefault();
        setLoad(true);
        axios
            .post("/insertTalkJoinInfo", insertTalkJoin)
            .then((res) => {
                setOpenModal(false);
                setLoad(false);
                alert(res.data);
                refreshTalkJoinList();
            })
            .catch((error) => console.log(error));
    };

    //참여(가입) 탈퇴하기
    const deleteTalkJoinInfo = (e) => {
        e.preventDefault();
        setLoad(true);
        axios
            .delete("/deleteTalkJoinInfo", {
                params: {
                    memberEmail: sessionStorage.getItem("id"),
                    talkCode: talkInfo.talkCode,
                },
            })
            .then((res) => {
                if (talkJoinState === "대기") {
                    setLoad(false);
                    alert("신청 취소 완료");
                } else {
                    alert(res.data);
                }
                setOpenModal(false);
                refreshTalkJoinList();
            })
            .catch((error) => console.log(error));
    };

    //참여 모달창
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        console.log(talkJoinState);
    }, [talkJoinState]);

    //로그인 조건 / 최대 인원 설정
    const isLogin = () => {
        if (sessionStorage.getItem("id") === null) {
            alert("로그인이 필요한 서비스입니다.");
            nav("/login");
        } else {
            setOpenModal(true);
        }
    }

    return (

        <>
            {talkJoinState === "대기" ? (
                <Button onClick={() => setOpenModal(true)} color="primary" variant="contained" className="talkSticky">
                    신청 취소하기
                </Button>
            ) : talkJoinState === "거절" ? (
                <Button color="primary" variant="contained" className="talkSticky" disabled>
                    거절됨
                </Button>
            ) : talkJoinState === "강제탈퇴" ? (
                <Button color="primary" variant="contained" className="talkSticky" disabled>
                    가입 불가능
                </Button>
            ) : talkJoinState === "가입중" ? (
                <Button onClick={() => setOpenModal(true)} color="primary" variant="contained" className="talkSticky">
                    탈퇴하기
                </Button>
            ) : (
                <Button onClick={isLogin} color="primary" variant="contained" className="talkSticky">
                    {children}
                </Button>
            )}
            {load ?
                <Box style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                    <CircularProgress sx={{ margin: "auto" }} />
                </Box>
                :
                <div>
                    <StyleModal open={openModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={{ mt: 5 }}>
                        {talkJoinState === "대기" ? (
                            <Box conponent="form" width={300} height={200} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>
                                <Typography variant="h6" color="gray" textAlign="center">
                                    얘기해요 신청 취소
                                    <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
                                        ✖
                                    </button>
                                </Typography>

                                <UserBox>
                                    <Avatar alt={"profil.memberImg"} src={memberInfo.memberSaveimg}
                                        sx={{ width: 30, height: 30 }} />
                                    <Typography fontWeight={500} variant="span">
                                        {memberInfo.memberNickname}
                                    </Typography>
                                </UserBox>
                                <hr /><br />
                                <p>
                                    현재 승인 대기중인 상태입니다.
                                    <br /> 취소하시겠습니까?
                                </p>
                                <Button sx={{ mt: 2, float: "right" }} type="submit" onClick={deleteTalkJoinInfo}>
                                    취소하기
                                </Button>
                            </Box>
                        ) : talkJoinState === "가입중" ? (
                            <Box conponent="form" width={300} height={190} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>
                                <Typography variant="h6" color="gray" textAlign="center">
                                    얘기해요 탈퇴하기
                                    <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
                                        ✖
                                    </button>
                                </Typography>
                                <UserBox>
                                    <Avatar alt={"profil.memberImg"} src={memberInfo.memberSaveimg}
                                        sx={{ width: 30, height: 30 }} />
                                    <Typography fontWeight={500} variant="span">
                                        {memberInfo.memberNickname}
                                    </Typography>
                                </UserBox>
                                <hr /><br />
                                <p>정말 모임을 탈퇴 하시겠습니까?</p>
                                <Button sx={{ mt: 2, float: "right" }} type="submit" onClick={deleteTalkJoinInfo}>
                                    탈퇴하기
                                </Button>
                            </Box>
                        ) : talkInfo.talkType === "승인제"
                            ? (<Box Box conponent="form" width={400} height={400} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>
                                <Typography variant="h6" color="gray" textAlign="center">
                                    얘기해요 참여하기
                                    <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
                                        ✖
                                    </button>
                                </Typography>
                                <UserBox>
                                    <Avatar alt={"profil.memberImg"} src={memberInfo.memberSaveimg}
                                        sx={{ width: 30, height: 30 }} />
                                    <Typography fontWeight={500} variant="span">
                                        {memberInfo.memberNickname}
                                    </Typography>
                                </UserBox>
                                <hr /><br />
                                <Box><h2>{talkInfo.talkTitle}</h2></Box>
                                <Box sx={{ mt: 2 }}><b>가입질문</b>
                                    <Typography sx={{ mt: 1 }}>{talkInfo.talkInquiry}</Typography>
                                    <TextField sx={{ mt: 1 }} fullWidth
                                        label="답변" name="talkJoinAnswer" value={insertTalkJoin.talkJoinAnswer} onChange={onChange} />
                                    <Box sx={{ mt: 1 }}>승인제의 경우 승인대기 상태로 방장의 승인을 기다려야 합니다.</Box>
                                </Box>
                                <Button sx={{ mt: 3, float: "right" }} type="submit" onClick={onTalkJoin}>
                                    참여하기
                                </Button>
                            </Box>
                            )
                            :
                            (<Box Box conponent="form" width={400} height={300} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>
                                <Typography variant="h6" color="gray" textAlign="center">
                                    얘기해요 참여하기
                                    <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
                                        ✖
                                    </button>
                                </Typography>
                                <UserBox>
                                    <Avatar alt={"profil.memberImg"} src={memberInfo.memberSaveimg}
                                        sx={{ width: 30, height: 30 }} />
                                    <Typography fontWeight={500} variant="span">
                                        {memberInfo.memberNickname}
                                    </Typography>
                                </UserBox>
                                <hr /><br />
                                <Box><h2>{talkInfo.talkTitle}</h2></Box>
                                <Typography sx={{ mt: 3 }}><Box>선착순의 경우 바로 참여가능합니다.</Box></Typography>
                                <Button sx={{ mt: 3, float: "right" }} type="submit" onClick={onTalkJoin}>
                                    참여하기
                                </Button>
                            </Box>
                            )}
                    </StyleModal>
                </div>
            }
        </>
    );
};


export default TalkJoin;
