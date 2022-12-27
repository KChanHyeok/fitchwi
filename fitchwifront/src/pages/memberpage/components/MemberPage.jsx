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
  ImageListItemBar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  styled,
  Typography,
  // ImageList,
  // ImageListItem,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, /* useEffect,*/ useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckPwdModal from "./CheckPwdModal";
import ConfirmDialog from "./ConfirmDialog";
import FollowMemberListModal from "./FollowMemberListModal";

export default function MemberPage({ member, onLogout, pageOwner }) {
  //페이지 기본 데이터
  const nav = useNavigate();
  const [feedList, setFeedList] = useState([]);
  const getAllFeedList = useCallback(() => {
    axios.post("/getMemberFeed", member).then((res) => setFeedList(res.data));
  }, [member]);

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

  const loginId = sessionStorage.getItem("id");

  let interestArr = [];
  if (memberInterest != null) {
    interestArr = memberInterest.split(" ");
  }

  useEffect(() => {
    if (member !== undefined) {
      getAllFeedList();
    }
  }, [member, getAllFeedList]);

  //팔로우 관련
  const [followList, setFollowList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const getFollow = useCallback(() => {
    axios.get("/getFollowList", { params: { pageOwner: pageOwner } }).then((res) => {
      setFollowList(() => res.data.follow);
      setFollowerList(() => res.data.follower);
    });
  }, [pageOwner]);

  useEffect(() => {
    for (let i = 0; i < followerList.length; i++) {
      if (followerList[i].memberEmail === loginId) {
        setIsFollow(true);
        console.log(followerList[i].memberEmail);
      } else {
        setIsFollow(false);
      }
    }
    console.log(followerList);
  }, [followerList, loginId]);

  const onFollow = useCallback(
    (isFollow) => {
      if (sessionStorage.getItem("id") == null) {
        alert("로그인 후 가능합니다.");
        return;
      }
      if (isFollow === false) {
        console.log(pageOwner.memberEmail);
        axios.get("/follow", { params: { loginId: loginId, pageOwner: pageOwner } }).then((res) => {
          console.log(res.data);
          alert(`${pageOwner}님을 팔로우했습니다.`);
          setIsFollow(true);
        });
      } else {
        axios
          .delete("/unfollow", {
            params: { loginId: loginId, pageOwner: pageOwner, isFollow: isFollow },
          })
          .then((res) => {
            console.log(res.data);
            alert(`${pageOwner}님 팔로우를 취소했습니다.`);
            setIsFollow(false);
          });
      }
    },
    [loginId, pageOwner]
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
    <Container style={{ width: 1200 }} maxWidth="xl">
      <Grid container>
        <Grid item xs={2} sx={{ mt: 10 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <CenterListText primary="피드" />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <CenterListText primary="애기해요" />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <CenterListText primary="함께해요" />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" component="li" />
          </List>

          {loginId === pageOwner ? (
            <Box component="form" sx={{ mt: 30 }}>
              <List>
                <ListItem disablePadding sx={{ justifyContent: "space-around" }}>
                  <CheckPwdModal
                    onClick={() => setOpenCheckPwd(() => true)}
                    openCheckPwd={openCheckPwd}
                    setOpenCheckPwd={setOpenCheckPwd}
                    member={member}
                  >
                    정보수정
                  </CheckPwdModal>
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
          xs={9}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container sx={{ alignItems: "center" }}>
            <Card sx={{ maxWidth: 800, minWidth: 600 }}>
              {memberSaveimg && (
                <CardHeader
                  style={{ background: "linear-gradient(190deg,lightgray, white)" }}
                  avatar={
                    <Avatar src={`/images/${memberSaveimg}`} sx={{ width: 100, height: 100 }} />
                  }
                  title={
                    <Typography sx={{ fontSize: 25 }}>
                      {" "}
                      {loginId === pageOwner
                        ? memberNickname == null
                          ? `${memberName}`
                          : `${memberNickname}(${memberName})`
                        : memberNickname == null
                        ? `${memberName}`
                        : `${memberNickname}`}
                    </Typography>
                  }
                  subheader={loginId === pageOwner ? memberEmail : null}
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
                  {followList && (
                    <Grid item xs={4}>
                      <FollowMemberListModal followList={followerList}>
                        팔로워 {followerList.length}
                      </FollowMemberListModal>

                      <FollowMemberListModal followList={followList}>
                        팔로우 {followList.length}
                      </FollowMemberListModal>

                      {loginId === pageOwner ? null : (
                        <Checkbox
                          checked={isFollow}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          onClick={() => onFollow(isFollow)}
                        />
                      )}
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
            <Box sx={{ mt: 5, width: 600, height: 400, overflowY: "scroll" }}>
              {
                <ImageList variant="masonry" cols={3} gap={10}>
                  {feedList !== null ? (
                    feedList.map((feed, index) =>
                      feed.ffList.length !== 0 ? (
                        <ImageListItem key={feed.ffList[0].feedFileCode}>
                          <img
                            src={`/images/${feed.ffList[0].feedFileSaveimg}?w=248&fit=crop&auto=format`}
                            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={feed.ffList[0].feedFileImg}
                            loading="lazy"
                          />
                          <ImageListItemBar
                            title={feed.feedContent}
                            subtitle={feed.feedDate}
                            position="below"
                          />
                        </ImageListItem>
                      ) : (
                        <ImageListItem key={index}>
                          <Paper variant="outlined" style={{ width: 161, height: 215 }} />
                          <ImageListItemBar
                            title={feed.feedContent}
                            subtitle={feed.feedDate}
                            position="below"
                          />
                        </ImageListItem>
                      )
                    )
                  ) : (
                    <Typography>작성한 피드가 없어요</Typography>
                  )}
                </ImageList>
              }
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
