import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
  // ImageList,
  // ImageListItem,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, /* useEffect,*/ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";

export default function MemberPage({ member, onLogout, pageOwner, feedList }) {
  //페이지 기본 데이터

  const nav = useNavigate();

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
  // console.log(feedList);
  const loginId = sessionStorage.getItem("id");

  let interestArr = [];
  if (memberInterest != null) {
    interestArr = memberInterest.split(" ");
  }

  //팔로우 관련
  const [followList, setFollowList] = useState({});
  const [followerList, setFollowerList] = useState({});
  const getFollowCount = useCallback(() => {
    axios.get("/getFollowList", { params: { pageOwner: pageOwner } }).then((res) => {
      setFollowList(() => res.data.follow);
      setFollowerList(() => res.data.follower);
    });
  }, [pageOwner]);

  useEffect(() => {
    for (let i = 0; i < followerList.length; i++) {
      if (followerList[0].memberEmail === loginId) {
        setIsFollow(true);
        console.log(followerList[0].memberEmail);
      }
    }
    console.log(followerList);
  }, [followerList, loginId]);
  const [isFollow, setIsFollow] = useState(false);

  const onFollow = useCallback(
    (isFollow) => {
      if (isFollow === false) {
        console.log(pageOwner.memberEmail);
        axios.get("/follow", { params: { loginId: loginId, pageOwner: pageOwner } }).then((res) => {
          console.log(res.data);
          alert(`${pageOwner}님을 팔로우했습니다.`);
          setIsFollow(!isFollow);
        });
      } else {
        axios
          .delete("/unfollow", {
            params: { loginId: loginId, pageOwner: pageOwner, isFollow: isFollow },
          })
          .then((res) => {
            console.log(res.data);
            alert(`${pageOwner}님 팔로우를 취소했습니다.`);
            setIsFollow(!isFollow);
          });
      }
    },
    [loginId, pageOwner]
  );

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

  useEffect(() => {
    getFollowCount();
  }, [getFollowCount]);

  // const [memberFeedList, setMemberFeedList] = useState([]);

  // useEffect(() => {
  //   setMemberFeedList(feedList);
  // }, [feedList]);

  // useEffect(() => {
  //   console.log(memberFeedList[0]);
  // }, [memberFeedList]);

  return (
    <Container style={{ width: 600 }} maxWidth="xl">
      <Box
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
                <Grid item xs={4}>
                  <Button
                    variant="text"
                    style={{ color: "black", fontSize: 15 }}
                    onClick={() => console.log("팔로워 목록 열기")}
                  >
                    팔로워 {followerList.length}
                  </Button>
                  <Button
                    variant="text"
                    style={{ color: "black", fontSize: 15 }}
                    onClick={() => console.log("팔로우 목록 열기")}
                  >
                    팔로우 {followList.length}
                  </Button>
                  {loginId === pageOwner ? null : (
                    <Checkbox
                      checked={isFollow}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      onClick={() => onFollow(isFollow)}
                    />
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Box sx={{ width: 500, height: 450 /*, overflowY: "scroll" */ }}>
            {/* {
              <ImageList variant="masonry" cols={3} gap={8}>
                {memberFeedList != null ? (
                  memberFeedList.map((feed, index) => (
                    <ImageListItem key={feed.ffList[index].feedFileCode}>
                      <img
                        src={`/images/${feed.ffList[0].feedFileSaveimg}`}
                        // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={memberFeedList.feedFileImg}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))
                ) : (
                  <Typography>작성한 피드가 없어요</Typography>
                )}
              </ImageList>
            } */}
          </Box>
        </Grid>

        {loginId === pageOwner ? (
          <Box component="form" sx={{ mt: 1 }}>
            {/* {member} */}
            <Link to="/updatemember" style={{ textDecoration: "none" }}>
              <Button sx={{ mr: 5, mt: 5, width: 100 }} variant="contained">
                정보수정
              </Button>
            </Link>

            <Button sx={{ mt: 5, width: 100 }} variant="contained" onClick={() => setConfirmOpen(() => true)}>
              탈퇴
            </Button>
            <Button sx={{ mt: 5, width: 100 }} variant="contained" onClick={onLogout}>
              로그아웃
            </Button>

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
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}
