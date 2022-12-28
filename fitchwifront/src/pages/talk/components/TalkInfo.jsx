import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/TalkInfo.scss";
import TalkOpMenu from "../components/TalkOpMenu";
import { Stack } from "@mui/system";
import { Avatar, Box, Button, Modal, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import TalkJoin from "./TalkJoin";

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

const TalkInfo = ({ talkList }) => {

    let { talkPageCode } = useParams();
    const nav = useNavigate();
    const [talkInfo, setTalkInfo] = useState([]);

    // const getTalkInfo = () => {
    //     axios.get("/getTalk", { params: { talkCode: talkPageCode } })
    //         .then((res) => setTalkInfo(res.data));
    // }

    useEffect(() => {
        // getTalkInfo();
        setTalkInfo(talkList.filter(data => data.talkCode === (talkPageCode * 1))[0]);
    }, [talkList, talkPageCode]);

    const tlist = talkList.filter(data => data.talkCode === (talkPageCode * 1))[0];
    //문의하기 모달창
    const [inquiryModal, setInquiryMoal] = useState(false);

    const id = sessionStorage.getItem("id");
    //로그인 조건
    const isLogin = () => {
        if (id === null) {
            alert("로그인이 필요한 서비스입니다.");
            nav("/login");
        } else {
            setInquiryMoal(!inquiryModal);
        }
    }

    return (
        <Stack
            flex={4} p={2}
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={2}
        >
            {talkList.length === 0 || !talkInfo ? <h1>로딩중</h1> :
                <Box>
                    <Box>
                        <span>mbti 취미&nbsp;</span>
                        <span>{talkInfo.talkCategory}&nbsp;</span>
                        <span>남은 자리 0/{talkInfo.talkMax}&nbsp;</span>
                        <span>유형 - {talkInfo.talkType}</span>
                        <Box className="talkMenu">
                            {tlist.talkOpenCode.memberEmail.memberEmail === id
                                ? (<TalkOpMenu talkPageCode={talkPageCode} talkInfo={talkInfo} />)
                                : (<Button id="demo-customized-button"
                                    aria-haspopup="true"
                                    variant="contained"
                                    disableElevation
                                    onClick={isLogin}
                                >문의하기</Button>)}
                        </Box>
                    </Box>
                    <h1>{talkInfo.talkTitle}</h1>
                    <p className="reportBtn">신고하기</p>
                    <Box sx={{ maxWidth: 900 }}>
                        {talkInfo.talkSaveimg && (<Box
                            component="img"
                            sx={{ maxHeight: 400, textAlign: "center" }}
                            src={`/images/${talkInfo.talkSaveimg}`}
                            alt="green iguana"
                        ></Box>)}
                    </Box><h3>함께해요 소개</h3><Box component="span">
                        {talkInfo.talkContent}
                        <p>방장<br />
                            {tlist.talkOpenCode.memberEmail.memberName}</p>
                        <Avatar
                            src={`/images/${tlist.talkOpenCode.memberEmail.memberSaveimg}`}
                            sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <p>멤버소개</p>
                        <Box>
                        </Box>
                        <Box>
                        </Box>
                        <div>얘기해요 피드</div>
                        <div>dd</div>
                        <div>dd</div>
                        <div>dd</div>
                        <div>dd</div>
                        <div>dd</div>
                    </Box>
                    {tlist.talkOpenCode.memberEmail.memberEmail === id
                        ? (<TalkJoin />)
                        : (<Button className="talkSticky">참여하기</Button>)}
                </Box>
            }
            {talkList.length === 0 || !talkInfo ? <h1>로딩중</h1> :
                <StyleModal open={inquiryModal}
                    onClose={() => setInquiryMoal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ mt: 5 }}>

                    <Box conponent="form" width={400} height={400} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>

                        <Typography variant="h6" color="gray" textAlign="center">
                            얘기해요 문의하기
                            <button className="modalCloseBtn" onClick={() => setInquiryMoal(false)}>
                                ✖
                            </button>
                        </Typography>

                        <UserBox>
                            <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                            <Typography fontWeight={500} variant="span">
                                {id}
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
        </Stack>


    )

}

export default TalkInfo;
