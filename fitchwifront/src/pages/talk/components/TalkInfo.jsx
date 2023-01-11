import { useCallback, useEffect, useState } from "react";
import { Link, useHref, useNavigate, useParams } from "react-router-dom";
import "../styles/TalkInfo.scss";
import TalkOpMenu from "../components/TalkOpMenu";
import { css, Stack } from "@mui/system";
import { Avatar, Box, Button, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Modal, Slider, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import TalkJoin from "./TalkJoin";
import Report from "../../../components/common/Report";
import axios from "axios";

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

    // const marks =
    //     [{

    //         value: talkInfo.talkMax * 1,
    //         label: talkInfo.talkMax * 1,


    //     }]

    console.log(talkInfo)
    return (
        <Stack
            sx={{ width: 1000, height: 800, margin: "auto" }}
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
                            {/* <span className="talkSubHeader">mbti 취미&nbsp;</span> */}
                            <Chip
                                color="primary"
                                variant="outlined"
                                label={talkInfo.talkCategory}
                                size="small"
                                sx={{ fontSize: 13 }}
                            />
                            <Box>
                                <Typography variant="span" className="hrColumn">&nbsp;남은 자리 {1 + talkJoinMember.length}/{talkInfo.talkMax}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                <Typography variant="span" className="hrColumn">&nbsp;유형 - {talkInfo.talkType}</Typography>
                            </Box>
                            {/* {talkJoinMember.length === null ? <></>
                                : <Slider
                                    aria-label="Always visible"
                                    defaultValue={1 + talkJoinMember.length}
                                    min={1}
                                    // getAriaValueText={talkInfo.talkMax}
                                    max={talkInfo.talkMax}
                                    step={1}
                                    size="small"
                                    marks={marks}
                                    valueLabelDisplay="on"
                                    disabled
                                />} */}
                        </Box>
                        <Typography variant="h4" mt={2} fontWeight="bold">{talkInfo.talkTitle}</Typography>
                        <Box sx={{ mb: 10, maxWidth: 900 }}>
                            {talkInfo.talkSaveimg && (<Box
                                component="img"
                                sx={{ mt: 2, maxWidth: 800, maxHeight: 400, textAlign: "center" }}
                                src={`/images/${talkInfo.talkSaveimg}`}
                                alt="talkimg"
                            ></Box>)}
                        </Box>
                        <Box style={{ backgroundColor: "#fd5089", height: 50 }} id="talkToInfo" >
                            <Typography variant="span"><a href="#talkToInfo" className="subTopBar">얘기해요 소개</a></Typography>
                            <Typography variant="span"><a href="#toJoinMember" className="subTopBar">회원</a></Typography>
                            <Typography variant="span"><a href="#toTalkFeed" className="subTopBar">얘기해요 피드</a></Typography>
                        </Box>
                        <Typography variant="h6" mt={4} mb={1} fontWeight="bold" id="toJoinMember" className="hrColumn">&nbsp;얘기해요 소개</Typography>
                        <Typography mb={10} ml={2} mr={2}>
                            {talkInfo.talkContent}
                        </Typography>
                        <Box>
                            <Typography variant="h6" mb={1} fontWeight="bold" className="hrColumn">&nbsp;방장</Typography>
                            <Link to="/memberpage" state={{ memberId: talkInfo.talkOpenCode.memberEmail.memberEmail }}
                                style={{ textDecoration: "none", color: "black", }}>
                                {talkList.filter(data => data.talkCode === (talkPageCode * 1))[0].talkOpenCode.memberEmail.memberNickname.length > 15
                                    ?
                                    <Chip sx={{ ml: 1, width: 320, height: 50, cursor: "pointer" }}
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
                            </Link>
                        </Box>
                        <br />
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={10}>
                            <Typography variant="h6" mb={1} fontWeight="bold" className="hrColumn">&nbsp;참여중인 회원</Typography>
                            {talkJoinMember.length < 5 ? <></>
                                : <Button>전체보기</Button>}
                        </Stack>
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
                                <Typography variant="h6" mb={1} fontWeight="bold" mt={10} id="toTalkFeed" className="hrColumn">&nbsp;태그</Typography>
                                <Typography mb={10} ml={2} mr={2}>
                                    {talkTagInfo.talkTagContent}
                                </Typography>
                            </Box>}
                        <Box>
                        </Box>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={10} mb={1}>
                            <Typography variant="h6" fontWeight="bold" className="hrColumn">&nbsp;얘기해요 피드</Typography>
                            {feedList.length < 5 ? <></>
                                : <Button onClick={() => nav(`/talk/feed/${talkPageCode}`, { state: talkInfo })}>전체보기</Button>}
                        </Stack>
                        {feedList.length === 0 ? <Typography>아직 작성된 피드가 없습니다.</Typography>
                            : feedList.sort((a, b) => b.feedCode - a.feedCode).filter((data, index) => index < 4).map((feed, index) => (
                                <>
                                    <Link to={`/share/${feed.feedCode}`} key={index}
                                        style={{ textDecoration: "none", color: "black", float: "left" }}>
                                        <Box flexDirection="column" alignItems="center"
                                            boxShadow={2} mt={2} ml={1.5} borderRadius={2} width={200}>
                                            <CardActionArea >
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        width: 200, height: 200,
                                                        borderTopLeftRadius: 8, borderBottomLeftRadius: 8,
                                                        borderTopRightRadius: 8, borderBottomRightRadius: 8
                                                    }}
                                                    image={`/images/${feed.ffList[0].feedFileSaveimg}`}
                                                />
                                                <CardContent>
                                                    {feed.feedContent.length > 8
                                                        ? <Typography variant="h6">{feed.feedContent.substr(0, 8)}...
                                                            <Chip
                                                                color="primary"
                                                                variant="outlined"
                                                                label={feed.feedCategory}
                                                                size="small"
                                                                sx={{ mt: 0.5, float: "right", fontSize: 7, fontWeight: "normal" }}
                                                            />
                                                        </Typography>
                                                        : <Typography variant="h6">{feed.feedContent}
                                                            <Chip
                                                                color="primary"
                                                                variant="outlined"
                                                                label={feed.feedCategory}
                                                                size="small"
                                                                sx={{ mt: 0.5, float: "right", fontSize: 7, fontWeight: "normal" }}
                                                            />
                                                        </Typography>
                                                    }
                                                    <Box
                                                        sx={{
                                                            mt: 1,
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Avatar
                                                            alt={feed.memberEmail.memberNickname}
                                                            src={feed.memberEmail.memberSaveimg}
                                                            sx={{ width: 30, height: 30, mr: 1 }}
                                                        />
                                                        <Typography mr={1} sx={{ fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                            {feed.memberEmail.memberNickname}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </CardActionArea>
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
                                    ? (<Button onClick={isDelete} className="talkSticky">삭제하기</Button>)
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
