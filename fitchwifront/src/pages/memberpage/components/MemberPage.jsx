import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
  // ImageList,
  // ImageListItem,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, /* useEffect,*/ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Report from "../../../components/common/Report";

// import CheckPwdModal from "./CheckPwdModal";
import ConfirmDialog from "./ConfirmDialog";
import FollowMemberListModal from "./FollowMemberListModal";
import MemberFeed from "./MemberFeed";
import MemberTalk from "./MemberTalk";

import MemberTogether from "./MemberTogether";

export default function MemberPage({ member, onLogout, lstate, swAlert }) {
  //페이지 기본 데이터
  const nav = useNavigate();
  const [feedList, setFeedList] = useState([]);
  const [talkJoinList, setTalkJoinList] = useState([]);
  const [talkOpenedList, setTalkOpenedList] = useState([]);
  const [togetherOpenedList, setTogetherOpenedList] = useState([]);
  const [togetherJoinList, setTogetherJoinList] = useState([]);

  //메뉴 선택 후 해당 정보 조회
  const [myMenu, setMyMenu] = useState("share");

  const getMemberFeed = useCallback(() => {
    axios
      .get("/getMemberFeed", { params: { memberEmail: member.memberEmail } })
      .then((res) => setFeedList(res.data));
  }, [member]);

  const getMemberTalk = useCallback(() => {
    axios.get("/getMemberTalk", { params: { memberEmail: member.memberEmail } }).then((res) => {
      const { talkJoinList, talkOpenedList } = res.data;

      setTalkJoinList(talkJoinList);
      setTalkOpenedList(talkOpenedList);
    });
  }, [member]);
  const getMemberTogether = useCallback(() => {
    axios.get("/getMemberTogether", { params: { memberEmail: member.memberEmail } }).then((res) => {
      const { togetherJoinList, togetherOpenedList } = res.data;

      setTogetherJoinList(togetherJoinList);
      setTogetherOpenedList(togetherOpenedList);
    });
  }, [member]);

  useEffect(() => {
    if (member.memberEmail !== undefined) {
      switch (myMenu) {
        case "share":
          getMemberFeed();
          break;
        case "talk":
          getMemberTalk();
          break;
        case "together":
          getMemberTogether();
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member.memberEmail, myMenu]);

  const { logid } = lstate;
  const {
    memberEmail,
    memberName,
    memberInterest,
    memberSaveimg,
    // memberMbti,
    memberNickname,
    // memberAddr,
    // memberGender,
    // memberImg,
    // memberBirth,
    // memberPhone,
  } = member;

  let interestArr = [];
  if (memberInterest != null) {
    interestArr = memberInterest.split(" ");
  }

  //팔로우 관련
  const [followList, setFollowList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isFollow, setIsFollow] = useState(false);

  const getFollow = useCallback(() => {
    if (memberEmail !== undefined) {
      axios.get("/getFollowList", { params: { pageOwner: memberEmail } }).then((res) => {
        setFollowList(() => res.data.follow);
        setFollowerList(() => res.data.follower);
      });
    }
  }, [memberEmail]);

  useEffect(() => {
    for (let i = 0; i < followerList.length; i++) {
      if (followerList[i].memberEmail === logid) {
        setIsFollow(true);
      } else {
        setIsFollow(false);
      }
    }
  }, [followerList, logid]);

  const onFollow = useCallback(
    (isFollow) => {
      if (sessionStorage.getItem("id") == null) {
        swAlert("로그인이 필요한 서비스입니다..", "info");
        return;
      }
      if (isFollow === false) {
        axios.get("/follow", { params: { loginId: logid, pageOwner: memberEmail } }).then((res) => {
          swAlert(`${memberNickname}님을 팔로우했습니다.`);
          setIsFollow(true);
        });
      } else {
        axios
          .delete("/unfollow", {
            params: { loginId: logid, pageOwner: memberEmail, isFollow: isFollow },
          })
          .then((res) => {
            swAlert(`${memberNickname}님 팔로우를 취소했습니다.`);
            setIsFollow(false);
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [logid, memberEmail, memberNickname]
  );

  useEffect(() => {
    getFollow();
  }, [getFollow, isFollow]);

  //회원 탈퇴
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deleteMemberInfo = useCallback(
    (member) => {
      axios
        .delete("/deleteMember", { data: member })
        .then((res) => {
          // console.log(res.data);
          if (res.data === "ok") {
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("nickName");
            swAlert("탈퇴 처리가 완료됐습니다.", "success", () => {
              onLogout();
              nav("/");
            });
          } else if (res.data === "togetherExist") {
            swAlert("진행 예정인 함께해요가 있습니다. <br/>함께해요를 먼저 탈퇴해주세요.", "info");
          } else {
            swAlert("탈퇴처리에 문제가 발생했습니다. <br/> 잠시후 다시 시도해주세요.", "info");
          }
        })
        .catch((error) => console.log(error));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nav, onLogout]
  );

  const CenterListText = styled(ListItemText)({
    textAlign: "center",
    color: "black",
  });

  //회원 정보 수정
  // const [openCheckPwd, setOpenCheckPwd] = React.useState(false);

  const mbtiImageMap = new Map([
    ["ISFP", "/images/mbti/ISFP.png"],
    ["ISTJ", "/images/mbti/ISTJ.png"],
    ["ISFJ", "/images/mbti/ISFJ.png"],
    ["INFJ", "/images/mbti/INFJ.png"],
    ["INTJ", "/images/mbti/INTJ.png"],
    ["ISTP", "/images/mbti/ISTP.png"],
    ["INFP", "/images/mbti/INFP.png"],
    ["INTP", "/images/mbti/INTP.png"],
    ["ESTP", "/images/mbti/ESTP.png"],
    ["ESFP", "/images/mbti/ESFP.png"],
    ["ENFP", "/images/mbti/ENFP.png"],
    ["ENTP", "/images/mbti/ENTP.png"],
    ["ESTJ", "/images/mbti/ESTJ.png"],
    ["ESFJ", "/images/mbti/ESFJ.png"],
    ["ENFJ", "/images/mbti/ENFJ.png"],
    ["ENTJ", "/images/mbti/ENTJ.png"],
  ]);

  return (
    <Container
      component="main"
      sx={{ height: "100vh", display: "flex", mt: 3, justifyContent: "flex-start" }}
    >
      {memberSaveimg === undefined ||
      feedList === undefined ||
      followList === undefined ||
      togetherJoinList === undefined ? (
        <Box
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container flexWrap="nowrap" spacing={5} sx={{ minWidth: "630px" }}>
          <Grid item xs={2}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <CenterListText primary="공유해요" onClick={() => setMyMenu("share")} />
                </ListItemButton>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem disablePadding>
                <ListItemButton onClick={() => setMyMenu("talk")}>
                  <CenterListText primary="애기해요" />
                </ListItemButton>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem disablePadding>
                <ListItemButton onClick={() => setMyMenu("together")}>
                  <CenterListText primary="함께해요" />
                </ListItemButton>
              </ListItem>
              <Divider variant="middle" component="li" />
            </List>

            {logid === memberEmail ? (
              <Box component="form" sx={{ mt: 40 }}>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ justifyContent: "center" }}>
                      <Link to="/memberpage/updateMember" style={{ textDecoration: "none", color: "black" }}>
                        정보수정
                      </Link>
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="middle" component="li" />

                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={onLogout}>
                      <CenterListText primary="  로그아웃" />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="middle" component="li" />

                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={() => setConfirmOpen(() => true)}>
                      <CenterListText primary="탈퇴" />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="middle" component="li" />

                  <ConfirmDialog
                    title="Fitchwi 회원 탈퇴"
                    open={confirmOpen}
                    setOpen={setConfirmOpen}
                    onConfirm={() => deleteMemberInfo(member)}
                  >
                    {`${member.memberName}(${member.memberEmail})님께서 Fitchwi에서 활동한 모든 기록이 삭제됩니다.
                  단, 진행 예정이 함께해요에 참여중일 경우에는 탈퇴가 불가능하며, 함께해요 취소를 먼저 진행해주세요. 
                  이에 동의하신다면 아래의 '탈퇴'버튼을 눌러주세요. `}
                  </ConfirmDialog>
                </List>
              </Box>
            ) : null}
          </Grid>

          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card sx={{ width: "100%", minHeight: 112, maxHeight: 230 }}>
              <Box
                style={{
                  background: "#ff0456",
                }}
              >
                <CardHeader
                  style={{
                    backgroundImage: `url("${mbtiImageMap.get(member.memberMbti)}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "120px",
                    backgroundPosition: "right 2% bottom 10%",
                  }}
                  avatar={
                    // <Avatar src={`/images/${memberSaveimg}`} sx={{ width: 100, height: 100 }} />
                    <Avatar src={memberSaveimg} sx={{ width: 80, height: 80, backgroundColor: "white" }} />
                  }
                  title={
                    <>
                      {logid === memberEmail ? (
                        <div>
                          <Typography
                            variant="h5"
                            style={{
                              color: "#ffffff",
                              fontWeight: "600",
                              display: "inline-block",
                            }}
                          >
                            {memberNickname}
                          </Typography>
                          <Typography
                            variant="h6"
                            style={{
                              color: "#ffffff",
                              display: "inline-block",
                            }}
                          >
                            ({memberName})
                          </Typography>
                        </div>
                      ) : (
                        <Typography
                          variant="h5"
                          style={{
                            color: "#ffffff",
                            fontWeight: "600",
                            display: "inline-block",
                          }}
                        >
                          {" "}
                          {memberNickname}
                        </Typography>
                      )}
                    </>
                  }
                  subheader={
                    logid === memberEmail ? (
                      <Typography sx={{ color: "#ffffffd6", ml: 1 }}>{memberEmail}</Typography>
                    ) : (
                      <Report
                        targetMember={member.memberEmail}
                        category="memberpage"
                        target="0"
                        type="mypage"
                      />
                    )
                  }
                />
              </Box>

              <CardContent sx={{ textAlign: "right" }}>
                <Grid container>
                  <Grid item xs={8}>
                    <div style={{ textAlign: "left" }}>
                      {interestArr[0] !== ""
                        ? interestArr.map((interest, index) => (
                            <Chip
                              onClick={() => console.log("검색으로 이동")}
                              variant="outlined"
                              key={index}
                              label={interest}
                              style={{
                                fontSize: 13,
                                marginLeft: 5,
                                marginBottom: 5,
                                boxShadow: "0 3px 5px  lightgray",
                              }}
                            />
                          ))
                        : null}
                    </div>
                  </Grid>
                  {followList !== undefined ? (
                    <Grid item xs={3.8}>
                      <FollowMemberListModal lstate={lstate} followList={followerList}>
                        팔로워 {followerList.length}
                      </FollowMemberListModal>
                      <FollowMemberListModal lstate={lstate} followList={followList}>
                        팔로우 {followList.length}
                      </FollowMemberListModal>
                      {logid === memberEmail ? null : (
                        <Checkbox
                          sx={{ mr: -1 }}
                          checked={isFollow}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          onClick={() => onFollow(isFollow)}
                        />
                      )}
                    </Grid>
                  ) : null}
                </Grid>
              </CardContent>
            </Card>
            {myMenu === "share" ? (
              <Box sx={{ mt: 2, width: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  공유해요
                </Typography>
                {feedList !== undefined ? <MemberFeed feedList={feedList} /> : null}
              </Box>
            ) : myMenu === "talk" ? (
              <Box sx={{ mt: 2, width: "100%" }}>
                {" "}
                <Typography variant="h6" gutterBottom>
                  얘기해요
                </Typography>
                {talkJoinList !== undefined ? (
                  <MemberTalk
                    talkJoinList={talkJoinList}
                    talkOpenedList={talkOpenedList}
                    logid={logid}
                    memberEmail={memberEmail}
                  />
                ) : null}
              </Box>
            ) : (
              //함께해요
              <Box sx={{ mt: 2, width: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  함께해요
                </Typography>
                {togetherJoinList !== undefined ? (
                  <MemberTogether
                    logid={logid}
                    memberEmail={memberEmail}
                    togetherJoinList={togetherJoinList}
                    togetherOpenedList={togetherOpenedList}
                    swAlert={swAlert}
                  />
                ) : null}
              </Box>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
