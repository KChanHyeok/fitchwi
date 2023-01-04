import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
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

import CheckPwdModal from "./CheckPwdModal";
import ConfirmDialog from "./ConfirmDialog";
import FollowMemberListModal from "./FollowMemberListModal";
import MemberTalk from "./MemberTalk";
import MemberTogether from "./MemberTogether";

export default function MemberPage({ member, onLogout, lstate }) {
  //페이지 기본 데이터
  const nav = useNavigate();
  const [feedList, setFeedList] = useState([]);
  const [talkJoinList, setTalkJoinList] = useState([]);
  const [togetherJoinList, setTogetherJoinList] = useState([]);

  //메뉴 선택 후 해당 정보 조회
  const [myMenu, setMyMenu] = useState("share");

  console.log(myMenu);
  const getMemberFeed = useCallback(() => {
    axios
      .get("/getMemberFeed", { params: { memberEmail: member.memberEmail } })
      .then((res) => setFeedList(res.data));
  }, [member]);

  const getMemberTalk = useCallback(() => {
    axios
      .get("/getTalkJoinListByMember", { params: { memberEmail: member.memberEmail } })
      .then((res) => {
        console.log(res.data);
        setTalkJoinList(res.data);
      });
  }, [member]);
  const getMemberTogether = useCallback(() => {
    axios
      .get("/getTogetherJoinListByMember", { params: { memberEmail: member.memberEmail } })
      .then((res) => {
        console.log(res.data);
        setTogetherJoinList(res.data);
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
    memberMbti,
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
        console.log(followerList[i].memberEmail);
      } else {
        setIsFollow(false);
      }
    }
    console.log(followerList);
  }, [followerList, logid]);

  const onFollow = useCallback(
    (isFollow) => {
      if (sessionStorage.getItem("id") == null) {
        alert("로그인 후 가능합니다.");
        return;
      }
      if (isFollow === false) {
        // console.log(pageOwner.memberEmail);
        axios.get("/follow", { params: { loginId: logid, pageOwner: memberEmail } }).then((res) => {
          console.log(res.data);
          alert(`${memberNickname}님을 팔로우했습니다.`);
          setIsFollow(true);
        });
      } else {
        axios
          .delete("/unfollow", {
            params: { loginId: logid, pageOwner: memberEmail, isFollow: isFollow },
          })
          .then((res) => {
            console.log(res.data);
            alert(`${memberNickname}님 팔로우를 취소했습니다.`);
            setIsFollow(false);
          });
      }
    },
    [logid, memberEmail, memberNickname]
  );
  //console.log(isFollow);

  useEffect(() => {
    getFollow();
  }, [getFollow, isFollow]);

  //회원 탈퇴
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deleteMemberInfo = useCallback(
    (member) => {
      axios.delete("/deleteMember", { data: member }).then((res) => {
        if (res.data === "ok") {
          sessionStorage.removeItem("id");
          alert("탈퇴 처리가 완료됐습니다.");
          onLogout();
          nav("/");
        } else {
          alert("회원 탈퇴 과정에 문제가 발생했습니다.");
        }
      });
    },
    [nav, onLogout]
  );

  const CenterListText = styled(ListItemText)({
    textAlign: "center",
    color: "black",
  });

  //회원 정보 수정
  const [openCheckPwd, setOpenCheckPwd] = React.useState(false);

  return (
    <Container component="main" maxWidth="xl">
      <Grid container justifyContent="center">
        <Grid item xs={2} sx={{ mt: 15 }}>
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
            <Box component="form" sx={{ mt: 50 }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton sx={{ justifyContent: "center" }}>
                    <CheckPwdModal
                      sx={{ width: "100%" }}
                      onClick={() => setOpenCheckPwd(() => true)}
                      openCheckPwd={openCheckPwd}
                      setOpenCheckPwd={setOpenCheckPwd}
                      member={member}
                      lstate={lstate}
                    >
                      정보수정
                    </CheckPwdModal>
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
                  {`${member.memberName}(${member.memberEmail})님께서 Fitchwi에서 활동한 내역 중,
            피드와 채팅 기록을 제외한 모든 내역이 삭제됩니다. 
            이에 동의하신다면 아래의 '탈퇴'버튼을 눌러주세요. `}
                </ConfirmDialog>
              </List>
            </Box>
          ) : null}
        </Grid>

        <Grid
          item
          xs={7}
          sx={{
            marginRight: 20,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card sx={{ width: "100%", minWidth: 600 }}>
            {memberSaveimg && (
              <CardHeader
                style={{
                  background: "linear-gradient(190deg,lightgray, white)",
                }}
                avatar={
                  <Avatar src={`/images/${memberSaveimg}`} sx={{ width: 100, height: 100 }} />
                }
                title={
                  <Typography sx={{ fontSize: 25 }}>
                    {" "}
                    {logid === memberEmail
                      ? `${memberNickname}(${memberName})`
                      : `${memberNickname}`}
                  </Typography>
                }
                subheader={
                  logid === memberEmail ? (
                    memberEmail
                  ) : (
                    <Report targetMember={member.memberEmail} category="memberpage" target="0" />
                  )
                }
              />
            )}
            <Divider sx={{ fontSize: 20, fontWeight: 5 }}>{memberMbti}</Divider>
            <CardContent sx={{ textAlign: "right" }}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={8}>
                  <div style={{ textAlign: "left" }}>
                    {interestArr &&
                      interestArr.map((interest, index) => (
                        <Chip
                          onClick={() => console.log("검색으로 이동")}
                          variant="outlined"
                          key={index}
                          label={interest}
                          style={{
                            fontSize: 10,
                            marginLeft: 5,
                            marginBottom: 5,
                            boxShadow: "0 3px 5px  lightgray",
                          }}
                        />
                      ))}
                  </div>
                </Grid>
                {followList !== undefined ? (
                  <Grid item xs={4}>
                    <FollowMemberListModal lstate={lstate} followList={followerList}>
                      팔로워 {followerList.length}
                    </FollowMemberListModal>

                    <FollowMemberListModal lstate={lstate} followList={followList}>
                      팔로우 {followList.length}
                    </FollowMemberListModal>

                    {logid === memberEmail ? null : (
                      <Checkbox
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
            <ImageList
              sx={{ width: "100%", overflowY: "scroll", height: "550px", mb: 8, mt: 0.5 }}
              cols={3}
              rowHeight={164}
            >
              {feedList !== undefined ? (
                feedList.map((feed, index) => (
                  <Link to={`/share/${feed.feedCode}`} key={index}>
                    <ImageListItem style={{ height: "275px" }}>
                      <img
                        src={`/images/${feed.ffList[0].feedFileSaveimg}`}
                        srcSet={`/images/${feed.ffList[0].feedFileSaveimg}`}
                        alt={feed.feedCode}
                        loading="lazy"
                        style={{
                          width: "100%",

                          height: "100%",
                        }}
                      />
                    </ImageListItem>
                  </Link>
                ))
              ) : (
                <Typography>작성한 피드가 없어요</Typography>
              )}
            </ImageList>
          ) : myMenu === "talk" && talkJoinList[0].talkCode !== undefined ? (
            <MemberTalk myMenu={myMenu} talkJoinList={talkJoinList} />
          ) : (
            togetherJoinList !== undefined && (
              //함께해요
              <MemberTogether myMenu={myMenu} togetherJoinList={togetherJoinList} />
            )
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
