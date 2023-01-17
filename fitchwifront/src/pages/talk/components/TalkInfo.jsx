import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/TalkInfo.scss";
import TalkOpMenu from "../components/TalkOpMenu";
import { Stack } from "@mui/system";
import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, Typography } from "@mui/material";
import styled from "@emotion/styled";
import TalkJoin from "./TalkJoin";
import Report from "../../../components/common/Report";
import axios from "axios";
import { AssignmentTurnedIn } from "@mui/icons-material";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import PeopleIcon from '@mui/icons-material/People';
import Swal from "sweetalert2";

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

    //가입회원 관리 모달창
    const [openJoinMemberList, setOpenJoinMemberList] = useState(false);

    const joinMemberManagement = () => {
        refreshTalkJoinList();
        setOpenJoinMemberList(true);
    }

    //삭제하기
    const deleteTalk = useCallback(
        () => {
            axios.delete("/deleteTalk", { data: talkInfo })
                .then((res) => {
                    if (res.data === "ok") {
                        swAlert("얘기해요가 삭제되었습니다.", "success");
                        nav("/talk");
                        refreshTalkList();
                    } else {
                        swAlert("얘기해요 삭제가 불가능합니다.", "error");
                    }
                });
        }, [talkInfo, nav, refreshTalkList]
    );

    const swAlert = (contentText, icon) => {
        Swal.fire({
            title: "알림",
            text: contentText,
            icon: icon,
            confirmButtonText: "확인",
            confirmButtonColor: "#ff0456",
        });
    };

    //삭제 모달 창
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const isDelete = () => {
        setOpenDeleteModal(true);
    };

    const modalClose = () => {
        setOpenJoinMemberList(false);
        setOpenDeleteModal(false);
    };

    //해당 얘기해요 피드 불러오기
    const [feedList, setFeedList] = useState([]);

    const getFeedListByTalk = useCallback(() => {
        if (talkInfo !== undefined) {
            if (talkInfo.talkCode !== undefined) {
                axios
                    .get("/getFeedListByTalk", { params: { feedClassificationcode: talkInfo.talkCode } })
                    .then((res) => {
                        setFeedList(res.data);
                    })
                    .catch((error) => console.log(error));
            }
        }
    }, [talkInfo])

    useEffect(() => {
        getFeedListByTalk();
    }, [getFeedListByTalk]);

    let talkTagArr = [];
    if (talkTagInfo !== undefined) {
        if (talkTagInfo.talkTagContent != null) {
            talkTagArr = talkTagInfo.talkTagContent.split(" ");
        }
    }

    return (
        <>
            <Stack
                sx={{ height: 800, margin: "auto" }}
                flex={4} pt={2}
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
                                <Box className="talkMenu">
                                    {talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberEmail === sessionStorage.getItem("id")
                                        ? (<TalkOpMenu talkPageCode={talkPageCode} talkInfo={talkInfo} talkTagInfo={talkTagInfo}
                                            talkJoinList={talkJoinList} talkJoinMember={talkJoinMember}
                                            refreshTalkTagList={refreshTalkTagList} refreshTalkList={refreshTalkList}
                                            refreshTalkJoinList={refreshTalkJoinList} />)
                                        : (
                                            <Box className="reportBtn">
                                                <Report type="MenuItem"
                                                    target={talkInfo.talkCode}
                                                    targetMember={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberEmail}
                                                    category="talk" />
                                            </Box>)}
                                </Box>
                                <Typography variant="span" sx={{ fontSize: 30, backgroundColor: "#ff0456", color: "white", borderRadius: 5 }}>
                                    &nbsp;&nbsp;{talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberMbti} 추천 모임&nbsp;&nbsp;
                                </Typography>
                                <br />
                                <Box>
                                    <Box>
                                        <Chip
                                            color="primary"
                                            variant="outlined"
                                            label={talkInfo.talkCategory}
                                            size="small"
                                            sx={{ fontSize: 13, mt: 1.5, mr: 1 }}
                                            style={{ float: "left", backgroundColor: "white", color: "#ff0456", border: "1px solid #ff0456" }}
                                        /></Box>
                                    <Box style={{ float: "left" }}>
                                        <PeopleIcon sx={{ color: "grey", mt: 1.2, fontSize: 30 }} />
                                    </Box>
                                    <Typography color="textSecondary" sx={{ mt: 1.8 }} style={{ float: "left" }}>
                                        <b>{talkInfo.talkMemberCount + 1}/{talkInfo.talkMax}명</b>&nbsp;&nbsp;
                                    </Typography>
                                    <Box style={{ float: "left" }}>
                                        <AssignmentTurnedIn sx={{ color: "grey", mt: 1.7 }} />
                                    </Box>
                                    <Typography color="textSecondary" sx={{ mt: 1.8 }} style={{ float: "left" }}>
                                        <b>{talkInfo.talkType}</b>
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="h4" mt={8} fontWeight="bold">{talkInfo.talkTitle}</Typography>
                            <Box sx={{ mb: 5, maxWidth: 900, textAlign: "center" }}>
                                {talkInfo.talkSaveimg && (<Box
                                    component="img"
                                    sx={{ mt: 4, width: 700 }}
                                    src={`/images/${talkInfo.talkSaveimg}`}
                                    alt="talkimg"
                                ></Box>)}
                            </Box>
                            <Box mb={12} id="toInfo" />
                            <Box style={{ backgroundColor: "#fd5089", height: 50 }} id="talkToInfo" >
                                <Typography variant="span"><a href="#toInfo" className="subTopBar">얘기해요 소개</a></Typography>
                                <Typography variant="span"><a href="#toJoinMember" className="subTopBar">회원</a></Typography>
                                <Typography variant="span"><a href="#toTalkFeed" className="subTopBar">얘기해요 피드</a></Typography>
                            </Box>
                            <Box width={888}>
                                <Box>
                                    <Typography variant="h6" mt={4} mb={1} fontWeight="bold" className="hrColumn">&nbsp;얘기해요 소개</Typography>
                                    <Typography mb={5} ml={2} mr={2} sx={{ whiteSpace: "pre-wrap" }}>
                                        {talkInfo.talkContent}
                                    </Typography>
                                    {!talkTagInfo
                                        ? <Box style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                        }}>
                                            <CircularProgress sx={{ margin: "auto" }} />
                                        </Box>
                                        : <Box id="toJoinMember">
                                            {talkTagArr[0] !== ""
                                                ? talkTagArr.map((talkTag, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        key={index}
                                                        label={"#" + talkTag}
                                                        style={{
                                                            fontSize: 13,
                                                            marginLeft: 5,
                                                            marginBottom: 40,
                                                            boxShadow: "0 3px 5px  lightgray",
                                                        }}
                                                    />
                                                ))
                                                : null}
                                        </Box>}
                                    <Box>
                                        <Typography variant="h6" mb={1} fontWeight="bold" className="hrColumn">&nbsp;방장</Typography>
                                        <Link to="/memberpage" state={{ memberId: talkInfo.talkOpenCode.memberEmail.memberEmail }}
                                            style={{ textDecoration: "none", color: "black", }}>
                                            {talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname.length >= 10
                                                ?
                                                <Chip sx={{ width: 250, height: 50, cursor: "pointer" }}
                                                    avatar={<Avatar alt="img" style={{ width: 40, height: 40 }}
                                                        src={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberSaveimg}
                                                    />}
                                                    label={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname + " 님"}
                                                    style={{ fontSize: 15 }}
                                                />
                                                : talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname.length > 5
                                                    ?
                                                    <Chip sx={{ width: 230, height: 50, cursor: "pointer" }}
                                                        avatar={<Avatar alt="img" style={{ width: 40, height: 40 }}
                                                            src={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberSaveimg}
                                                        />}
                                                        label={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname + " 님"}
                                                        style={{ fontSize: 15 }}
                                                    />
                                                    :
                                                    <Chip sx={{ width: 180, height: 50, cursor: "pointer" }}
                                                        avatar={<Avatar alt="img" style={{ width: 40, height: 40 }}
                                                            src={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberSaveimg}
                                                        />}
                                                        label={talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname + " 님"}
                                                        style={{ fontSize: 15 }}
                                                    />}
                                        </Link>
                                    </Box>
                                    <br />
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" mt={7}>
                                        <Typography variant="h6" mb={1} fontWeight="bold" className="hrColumn">&nbsp;참여중인 회원</Typography>
                                        <Button onClick={joinMemberManagement}>전체보기</Button>
                                    </Stack>
                                    {talkJoinMember.length === 0
                                        ? <Box component="span">현재 참여 중인 회원이 없습니다.</Box>
                                        : talkJoinMember.sort((a, b) => b.talkJoinCode - a.talkJoinCode).filter((data, index) => index < 4).map((data) =>
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
                                                        <Avatar src={data.memberEmail.memberSaveimg} alt={"profil.memberImg"}
                                                            sx={{ ml: 1, width: 40, height: 40 }} />
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
                                                        <Chip
                                                            color="primary"
                                                            label={data.memberEmail.memberMbti}
                                                            size="small"
                                                            sx={{ mt: 0.5, fontSize: 13, width: 50, cursor: "pointer" }}
                                                        />
                                                        <Typography fontWeight={500}>
                                                            {data.memberEmail.memberNickname} 님
                                                        </Typography>
                                                    </Link>
                                                }
                                                </UserBox>)}
                                    <Box>
                                    </Box>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" mt={10} mb={1} id="toTalkFeed">
                                        <Typography variant="h6" fontWeight="bold" className="hrColumn">&nbsp;{talkInfo.talkTitle} 피드</Typography>
                                        {feedList.length < 4 ? <></>
                                            : <Button onClick={() => nav(`/talk/feed/${talkPageCode}`, { state: talkInfo })}>전체보기</Button>}
                                    </Stack>
                                    {feedList.length === 0 ? <Typography>아직 작성된 피드가 없습니다.</Typography>
                                        : feedList.sort((a, b) => b.feedCode - a.feedCode).filter((data, index) => index < 3).map(feed => (

                                            <Box key={feed.feedCode}>
                                                <Card sx={{ mb: 3, mr: 2, width: 280, maxHeight: 400, textDecorationLine: "none", float: "left" }}
                                                >
                                                    <Link to={`/share/${feed.feedCode}`}
                                                        style={{ textDecoration: "none", color: "black", float: "left" }}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                                component="img"
                                                                sx={{
                                                                    width: 280, height: 200,
                                                                    borderTopLeftRadius: 8, borderBottomLeftRadius: 8,
                                                                    borderTopRightRadius: 8, borderBottomRightRadius: 8
                                                                }}
                                                                image={`/images/${feed.ffList[0].feedFileSaveimg}`}
                                                            />
                                                            <CardContent>
                                                                <Chip
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    label={feed.feedCategory}
                                                                    size="small"
                                                                    sx={{ mt: 0.5, float: "right", fontSize: 7, fontWeight: "normal" }}
                                                                />
                                                                <Avatar
                                                                    alt={feed.memberEmail.memberNickname}
                                                                    src={feed.memberEmail.memberSaveimg}
                                                                    sx={{ width: 30, height: 30, mr: 1, float: "left" }}
                                                                />
                                                                <Typography mr={1} sx={{ mt: 1, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                                    {feed.memberEmail.memberNickname}
                                                                </Typography>
                                                                <br />
                                                                <Typography variant="h6"
                                                                    sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "pre-wrap", height: 90 }}>
                                                                    {feed.feedContent}
                                                                </Typography>
                                                                <Box
                                                                    sx={{
                                                                        mt: 1,
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                    }}
                                                                >
                                                                </Box>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Link>
                                                </Card>
                                            </Box>
                                        ))
                                    }
                                </Box>
                                <br />
                                <br />
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
                                        ? (<Button onClick={isDelete} className="talkSticky">삭제하기</Button>)
                                        : talkJoinList.filter((data) => data.talkCode.talkCode === (talkPageCode * 1)
                                            && data.memberEmail.memberEmail === sessionStorage.getItem("id")).length === 0
                                            ? <TalkJoin memberInfo={memberInfo} talkInfo={talkInfo} refreshTalkList={refreshTalkList} refreshTalkJoinList={refreshTalkJoinList}
                                                talkJoinMember={talkJoinMember}>참여하기</TalkJoin>
                                            : (<TalkJoin memberInfo={memberInfo} talkInfo={talkInfo}
                                                talkJoinState={talkJoinList.filter((data) => data.talkCode.talkCode === (talkPageCode * 1)
                                                    && data.memberEmail.memberEmail === sessionStorage.getItem("id"))[0].talkJoinState}
                                                refreshTalkList={refreshTalkList}
                                                refreshTalkJoinList={refreshTalkJoinList} />)}
                            </Box>
                            <div>
                                <Dialog
                                    open={openJoinMemberList}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title" className="memberListBox">
                                        {"얘기해요 참여자"}
                                        <button className="modalCloseBtn" onClick={modalClose}>
                                            ✖
                                        </button>
                                    </DialogTitle>
                                    <hr />
                                    <DialogContent
                                        style={{
                                            height: 250,
                                            overflowY: "scroll",
                                            overflowX: "hidden",
                                        }}>
                                        {!talkJoinMember
                                            ? <Box style={{
                                                position: "absolute",
                                                left: "50%",
                                                top: "50%",
                                                transform: "translate(-50%, -50%)",
                                            }}>
                                                <CircularProgress sx={{ margin: "auto" }} />
                                            </Box>
                                            : talkJoinMember.length === 0
                                                ? <Typography>현재 참여 중인 회원이 없습니다.</Typography>
                                                : talkJoinMember.map((data) =>
                                                    <UserBox key={data.talkJoinCode}>
                                                        <Link to="/memberpage" state={{ memberId: data.memberEmail.memberEmail }}>
                                                            <Avatar src={data.memberEmail.memberSaveimg} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                                                        </Link>
                                                        <Chip
                                                            color="primary"
                                                            label={data.memberEmail.memberMbti}
                                                            size="small"
                                                            sx={{ mt: 0.5, fontSize: 13, width: 50, cursor: "pointer" }}
                                                        />
                                                        <Typography fontWeight={500} width={150} variant="span">
                                                            <b>{data.memberEmail.memberNickname}님</b>
                                                        </Typography>
                                                    </UserBox>
                                                )}
                                    </DialogContent>
                                </Dialog>
                            </div>
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
        </>
    )

}

export default TalkInfo;
