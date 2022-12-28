import styled from "@emotion/styled";
import { Avatar, Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

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

const TalkJoin = ({ talkList, talkInfo }) => {
    const nowdate = new Date().getFullYear() + "-"
        + new Date().getMonth() + "-"
        + new Date().getDate();

    const [insertTalkJoin, setInsertTalkJoin] = useState({
        talkJoinDate: nowdate,
        talkJoinAnswer: "",
        talkCode: talkInfo,
        memberEmail: {
            memberEmail: sessionStorage.getItem("id")
        }
    });

    const [inquiryModal, setInquiryMoal] = useState(false);

    return (
        <>
            <Button>
                얘기해요 관리
            </Button>
            {talkList.length === 0 || !talkInfo ? <h1>로딩중</h1> :
                <StyleModal open={inquiryModal}
                    onClose={() => setInquiryMoal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ mt: 5 }}>

                    <Box conponent="form" width={400} height={400} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>

                        <Typography variant="h6" color="gray" textAlign="center">
                            얘기해요 참여하기
                            <button className="modalCloseBtn" onClick={() => setInquiryMoal(false)}>
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
                        <Box>
                            <h2 sx={{ mt: 3 }}>{talkInfo.talkTitle} 문의하기</h2><br />
                            <h4>문의사항을 입력해주세요</h4>
                            <p>함께해요 일정에 관련해 모임장에게 궁금한 점을 입력해주세요</p>
                            <TextField fullWidth
                                label="문의내용"
                                name="talkInquiry"
                                sx={{ mt: 3 }}
                                multiline
                                rows={3}
                            // onChange={onChange}
                            />
                        </Box>
                    </Box>
                </StyleModal>
            }
        </>
    )
}

export default TalkJoin;