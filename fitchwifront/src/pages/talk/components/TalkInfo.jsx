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

const TalkInfo = ({ talkList, talkJoinList, refreshTalkJoinList }) => {

    let { talkPageCode } = useParams();
    const nav = useNavigate();
    const [talkInfo, setTalkInfo] = useState([]);
    const [talkJoinMember, setTalkJoinMember] = useState(null);

    // const getTalkInfo = () => {
    //     axios.get("/getTalk", { params: { talkCode: talkPageCode } })
    //         .then((res) => setTalkInfo(res.data));
    // }

    useEffect(() => {
        // getTalkInfo();
        setTalkInfo(talkList.filter(data => data.talkCode === (talkPageCode * 1))[0]);
        setTalkJoinMember(talkJoinList.filter
            (data => (data.talkCode.talkCode === (talkPageCode * 1)
                && data.talkJoinState === "가입중")));
    }, [talkList, talkJoinList, talkPageCode]);

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
            {talkList.length === 0 || !talkInfo || !talkJoinMember ? <h1>로딩중</h1> :
                <Box>
                    <Box>
                        <span>mbti 취미&nbsp;</span>
                        <span>{talkInfo.talkCategory}&nbsp;</span>
                        <span>남은 자리 {1 + talkJoinMember.length}/{talkInfo.talkMax}&nbsp;</span>
                        <span>유형 - {talkInfo.talkType}</span>
                        <Box className="talkMenu">
                            {talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberEmail === id
                                ? (<TalkOpMenu talkPageCode={talkPageCode} talkInfo={talkInfo} />)
                                : (<Button id="demo-customized-button"
                                    aria-haspopup="true"
                                    color="primary"
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
                            alt="talkimg"
                        ></Box>)}
                    </Box><h3>얘기해요 소개</h3><Box component="span">
                        {talkInfo.talkContent}
                        <h4>방장<br />
                            {talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberName}</h4>
                        <Avatar
                            src={`/images/${talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberSaveimg}`}
                            sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <h4>참여중인 회원</h4>
                        {talkJoinMember.length === 0
                            ? <Box component="span">현재 참여중인 멤버가 없습니다</Box>
                            : talkJoinMember.map((data) =>
                                <UserBox key={data.talkJoinCode}>
                                    <Avatar src={`/images/${data.memberEmail.memberSaveimg}`} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                                    <Typography fontWeight={500} variant="span">
                                        {!data.memberEmail.memberNickname ? data.memberEmail.memberName : data.memberEmail.memberNickname}님
                                    </Typography>
                                </UserBox>)}
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
                        <div>dd</div>
                        <div>dd</div>
                        <div>dd</div>
                    </Box>
                    {!talkJoinMember
                        ? <h2>로딩중</h2>
                        : talkList.filter((data) => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberEmail === sessionStorage.getItem("id")
                            ? (<Button className="talkSticky">삭제하기</Button>)
                            : talkJoinList.filter((data) => data.talkCode.talkCode === (talkPageCode * 1)
                                && data.memberEmail.memberEmail === sessionStorage.getItem("id")).length === 0
                                ? <TalkJoin talkInfo={talkInfo} refreshTalkJoinList={refreshTalkJoinList}>참여하기</TalkJoin>
                                : (<TalkJoin talkInfo={talkInfo}
                                    talkJoinState={talkJoinList.filter((data) => data.talkCode.talkCode === (talkPageCode * 1)
                                        && data.memberEmail.memberEmail === sessionStorage.getItem("id"))[0].talkJoinState}
                                    refreshTalkJoinList={refreshTalkJoinList} />)}
                </Box>
            }
            {!talkInfo ? <h1>로딩중</h1> :
                <StyleModal open={inquiryModal}
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
