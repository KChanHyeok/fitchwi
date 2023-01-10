import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/TalkInfo.scss";
import TalkOpMenu from "../components/TalkOpMenu";
import { Stack } from "@mui/system";
import { Avatar, Box, Button, CardContent, CardMedia, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import TalkJoin from "./TalkJoin";
import Report from "../../../components/common/Report";
import axios from "axios";

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

const TalkInfo = ({ memberInfo, talkList, talkTagList, talkJoinList,
    refreshTalkTagList, refreshTalkList, refreshTalkJoinList }) => {

    let { talkPageCode } = useParams();
    const nav = useNavigate();
    const [talkInfo, setTalkInfo] = useState([]);
    const [talkTagInfo, setTalkTagInfo] = useState([]);
    const [talkJoinMember, setTalkJoinMember] = useState(null);

    useEffect(() => {
        try {
            setTalkInfo(talkList.filter(data => data.talkCode === (talkPageCode * 1))[0]);
            setTalkTagInfo(talkTagList.filter(data => data.talkCode.talkCode === (talkPageCode * 1))[0]);
            setTalkJoinMember(talkJoinList.filter
                (data => (data.talkCode.talkCode === (talkPageCode * 1)
                    && data.talkJoinState === "가입중")));
        } catch (e) {

        }
    }, [talkList, talkTagList, talkJoinList, talkPageCode]);

    //삭제하기
    const deleteTalk = useCallback(
        () => {
            axios.delete("/deleteTalk", { data: talkInfo })
                .then((res) => {
                    if (res.data === "ok") {
                        alert("얘기해요 삭제 완료");
                        nav("/talk");
                        refreshTalkList();
                    } else {
                        alert("삭제 불가");
                    }
                });
        }, [talkInfo, nav, refreshTalkList]
    );

    //삭제 모달 창
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const isDelete = () => {
        setOpenDeleteModal(true);
    };

    const modalClose = () => {
        setOpenDeleteModal(false);
    };

    //해당 얘기해요 피드 불러오기
    const [feedList, setFeedList] = useState([]);

    console.log(talkInfo);
    const getFeedListByTalk = useCallback(() => {
        if (talkInfo !== undefined) {
            if (talkInfo.talkCode !== undefined) {
                console.log(talkInfo.talkCode);
                axios
                    .get("/getFeedListByTalk", { params: { feedClassificationcode: talkInfo.talkCode } })
                    .then((res) => {
                        setFeedList(res.data);
                        console.log(res.data);
                    })
                    .catch((error) => console.log(error));
            }
        }
    }, [talkInfo])

    useEffect(() => {
        getFeedListByTalk();
    }, [getFeedListByTalk]);

    console.log(feedList);

    // const nicknameLength = talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname.length;

    return (
        <Stack
            flex={4} p={2}
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={2}
        >
            {talkList.length === 0 || !talkInfo || !talkTagInfo || !talkJoinMember
                ? <Box style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                    <CircularProgress sx={{ margin: "auto" }} />
                </Box>
                :
                <Box className="talkSection">
                    <Box className="talkDetailBox">
                        <Box className="talkTxtLine">
                            {/* <span className="talkSubHeader">mbti 취미&nbsp;</span> */}
                            <Chip
                                color="primary"
                                variant="outlined"
                                label={talkInfo.talkCategory}
                                size="small"
                                sx={{ fontSize: 13 }}
                            />
                            <span className="talkSubHeader">남은 자리 {1 + talkJoinMember.length}/{talkInfo.talkMax}&nbsp;</span>
                            <span className="talkSubHeader">유형 - {talkInfo.talkType}</span>
                            <Box className="talkMenu">
                                {talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberEmail === sessionStorage.getItem("id")
                                    ? (<TalkOpMenu talkPageCode={talkPageCode} talkInfo={talkInfo} talkTagInfo={talkTagInfo}
                                        talkJoinList={talkJoinList} talkJoinMember={talkJoinMember}
                                        refreshTalkTagList={refreshTalkTagList} refreshTalkList={refreshTalkList}
                                        refreshTalkJoinList={refreshTalkJoinList} />)
                                    : (<Report type="MenuItem"
                                        target={talkInfo.talkCode}
                                        targetMember={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberEmail}
                                        category="talk" />)}
                            </Box>
                        </Box>
                        <h1 className="talkTitle talkTxtLine">{talkInfo.talkTitle}</h1>
                        <Box sx={{ maxWidth: 900 }}>
                            {talkInfo.talkSaveimg && (<Box
                                component="img"
                                sx={{ maxWidth: 800, maxHeight: 400, textAlign: "center" }}
                                src={`/images/${talkInfo.talkSaveimg}`}
                                alt="talkimg"
                            ></Box>)}
                        </Box>
                        <h3 className="talkTxtLine">얘기해요 소개</h3>
                        <Typography>
                            {talkInfo.talkContent}
                        </Typography>
                        <Box>
                            <h4 className="talkTxtLine">방장<br /></h4>
                            <Link to="/memberpage" state={{ memberId: talkInfo.talkOpenCode.memberEmail.memberEmail }}
                                style={{ textDecoration: "none", color: "black", }}>
                                {talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname.length > 15
                                    ?
                                    <Chip sx={{ width: 320, height: 50, cursor: "pointer" }}
                                        avatar={<Avatar alt="img" style={{ width: 40, height: 40 }}
                                            src={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberSaveimg}
                                        />}
                                        label={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname + " 님"}
                                        style={{ fontSize: 15 }}
                                    />
                                    : talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname.length > 10
                                        ?
                                        <Chip sx={{ width: 240, height: 50, cursor: "pointer" }}
                                            avatar={<Avatar alt="img" style={{ width: 40, height: 40 }}
                                                src={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberSaveimg}
                                            />}
                                            label={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname + " 님"}
                                            style={{ fontSize: 15 }}
                                        />
                                        : talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname.length > 4
                                            ?
                                            <Chip sx={{ width: 190, height: 50, cursor: "pointer" }}
                                                avatar={<Avatar alt="img" style={{ width: 40, height: 40 }}
                                                    src={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberSaveimg}
                                                />}
                                                label={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname + " 님"}
                                                style={{ fontSize: 15 }}
                                            />
                                            :
                                            <Chip sx={{ width: 150, height: 50, cursor: "pointer" }}
                                                avatar={<Avatar alt="img" style={{ width: 40, height: 40 }}
                                                    src={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberSaveimg}
                                                />}
                                                label={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname + " 님"}
                                                style={{ fontSize: 15 }}
                                            />}


                                {/* <Chip sx={{ width: 170, height: 50, cursor: "pointer" }}
                                    avatar={<Avatar alt="img" style={{ width: 40, height: 40 }}
                                        src={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberSaveimg}
                                    />}
                                    label={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname + " 님"}
                                    style={{ fontSize: 15 }}
                                /> */}
                            </Link>
                        </Box>
                        <br />
                        <h4><b>참여중인 회원</b></h4><br />
                        {talkJoinMember.length === 0
                            ? <Box component="span">현재 참여중인 멤버가 없습니다</Box>
                            : talkJoinMember.map((data) =>
                                <UserBox key={data.talkJoinCode}>
                                    {!talkJoinMember
                                        ? <Box style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                        }}>
                                            <CircularProgress sx={{ margin: "auto" }} />
                                        </Box>
                                        : <Link to="/memberpage" state={{ memberId: data.memberEmail.memberEmail }}>
                                            <Avatar src={data.memberEmail.memberSaveimg} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                                        </Link>
                                    }
                                    {!talkJoinMember
                                        ? <Box style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                        }}>
                                            <CircularProgress sx={{ margin: "auto" }} />
                                        </Box>
                                        :
                                        <Link to="/memberpage" state={{ memberId: data.memberEmail.memberEmail }}
                                            style={{ textDecoration: "none", color: "black" }}>
                                            <Typography fontWeight={500} variant="span">
                                                {data.memberEmail.memberNickname} 님
                                            </Typography>
                                        </Link>
                                    }

                                </UserBox>)}
                        {!talkTagInfo
                            ? <Box style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                            }}>
                                <CircularProgress sx={{ margin: "auto" }} />
                            </Box>
                            : <Box>
                                <h4 className="talkTxtLine">태그</h4>
                                {talkTagInfo.talkTagContent}
                            </Box>}

                        <Box>
                        </Box>
                        <h4 className="talkTxtLine">얘기해요 피드</h4>
                        {feedList.length === 0 ? <Typography>아직 작성된 피드가 없습니다.</Typography>
                            : feedList.map((feed, index) => (
                                <>
                                    <Link to={`/share/${feed.feedCode}`} key={index} style={{ textDecoration: "none", color: "black" }}>
                                        <Box display="flex" flexDirection="row" alignItems="center" border={1} m={2} borderRadius={2} height={100}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100, height: 100, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
                                                image={`/images/${feed.ffList[0].feedFileSaveimg}`}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontSize: 16 }}>
                                                    {feed.feedContent}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary" sx={{ fontSize: 14 }}>
                                                    {talkInfo.feedTag}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        mt: 1,
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Avatar
                                                        alt={talkInfo.talkOpenCode.memberEmail.memberNickname}
                                                        src={talkInfo.talkOpenCode.memberEmail.memberSaveimg}
                                                        sx={{ width: 20, height: 20, mr: 1 }}
                                                    />
                                                    <Typography variant="subtitle1" mr={1} sx={{ fontSize: 12 }}>
                                                        {talkInfo.talkOpenCode.memberEmail.memberNickname}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Box>
                                    </Link>

                                </>
                            ))
                        }
                        <Box className="talkTxtLine">
                            {!talkJoinMember
                                ? <Box style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}>
                                    <CircularProgress sx={{ margin: "auto" }} />
                                </Box>
                                : talkList.filter((data) => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberEmail === sessionStorage.getItem("id")
                                    ? (<Button className="talkSticky" onClick={isDelete}>삭제하기</Button>)
                                    : talkJoinList.filter((data) => data.talkCode.talkCode === (talkPageCode * 1)
                                        && data.memberEmail.memberEmail === sessionStorage.getItem("id")).length === 0
                                        ? <TalkJoin memberInfo={memberInfo} talkInfo={talkInfo} refreshTalkJoinList={refreshTalkJoinList}
                                            talkJoinMember={talkJoinMember}>참여하기</TalkJoin>
                                        : (<TalkJoin memberInfo={memberInfo} talkInfo={talkInfo}
                                            talkJoinState={talkJoinList.filter((data) => data.talkCode.talkCode === (talkPageCode * 1)
                                                && data.memberEmail.memberEmail === sessionStorage.getItem("id"))[0].talkJoinState}
                                            refreshTalkJoinList={refreshTalkJoinList} />)}
                        </Box>
                        <div>
                            <Dialog
                                open={openDeleteModal}
                                onClose={modalClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"얘기해요 삭제하기"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {talkJoinMember.length >= 1
                                            && "현재 가입 중인 회원이 있습니다."}<br />
                                        정말로 삭제하시겠습니까?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={deleteTalk}>삭제</Button>
                                    <Button onClick={modalClose}>취소</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Box>
                </Box>
            }

        </Stack >
    )

}

export default TalkInfo;
