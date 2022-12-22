import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";

export default function Mypage({ member, onLogout, pageOwner }) {
  const nav = useNavigate();
  const {
    memberEmail,
    memberName,
    memberBirth,
    memberAddr,
    memberGender,
    memberImg,
    memberInterest,
    memberMbti,
    memberNickname,
    memberPhone,
    memberSaveimg,
  } = member;
  const loginId = sessionStorage.getItem("id");
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
  console.log(memberEmail);
  console.log(pageOwner);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar src={`/images/${memberSaveimg}`} sx={{ width: 150, height: 150 }} />

        <Typography component="h1" variant="h5">
          {memberEmail}
        </Typography>
        <Typography component="h1" variant="h5">
          {memberName}
        </Typography>
        <Typography component="h1" variant="h5">
          {memberBirth}
        </Typography>
        <Typography component="h1" variant="h5">
          {memberAddr}
        </Typography>
        <Typography component="h1" variant="h5">
          {memberGender}
        </Typography>
        <Typography component="h1" variant="h5">
          {memberImg}
        </Typography>
        <Typography component="h1" variant="h5">
          {memberInterest}
        </Typography>
        <Typography component="h1" variant="h5">
          {memberMbti}
        </Typography>
        <Typography component="h1" variant="h5">
          {memberNickname}
        </Typography>
        <Typography component="h1" variant="h5">
          {memberPhone}
        </Typography>
        <Typography component="h1" variant="h5">
          {memberSaveimg}
        </Typography>

        {loginId === pageOwner ? (
          <Box component="form" sx={{ mt: 1 }}>
            {/* {member} */}
            <Link to="/updatemember" style={{ textDecoration: "none" }}>
              <Button sx={{ mr: 5, mt: 5, width: 100 }} variant="contained">
                정보수정
              </Button>
            </Link>

            <Button
              sx={{ mt: 5, width: 100 }}
              variant="contained"
              onClick={() => setConfirmOpen(() => true)}
            >
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
