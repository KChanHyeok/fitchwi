import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";

export default function UpdateMember({ member }) {
  const [memberToUpdate, setMemberToUpdate] = useState({});
  useEffect(() => {
    setMemberToUpdate(() => member);
  }, [member]);
  const {
    memberEmail,
    memberName,
    //memberInterest,
    memberSaveimg,
    memberMbti,
    memberNickname,
    memberAddr,
    // memberGender,
    // memberImg,
    // memberBirth,
    //  memberPhone,
  } = memberToUpdate;

  const onUpdate = () => {};

  const inputChange = useCallback(
    (e) => {
      setMemberToUpdate({ ...memberToUpdate, [e.target.name]: e.target.value });
    },
    [memberToUpdate]
  );

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
        <Typography component="h1" variant="h5">
          회원 정보 수정
        </Typography>
        {memberSaveimg && (
          <Avatar src={`/images/${memberSaveimg}`} sx={{ width: 100, height: 100 }} />
        )}
        <Box component="form" onSubmit={onUpdate} noValidate sx={{ mt: 1 }}>
          <TextField
            value={memberEmail || ""}
            margin="normal"
            required
            fullWidth
            label="이메일"
            name="email"
            focused={true}
          />

          <TextField
            value={memberName || ""}
            margin="normal"
            fullWidth
            focused={true}
            label="이름"
            name="memberName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="memberPwd"
            label="비밀번호"
            type="password"
            focused={true}
            onChange={(e) => inputChange(e)}
          />
          <TextField
            value={memberNickname || ""}
            margin="normal"
            focused={true}
            required
            fullWidth
            label="닉네임"
            name="memberNickname"
            onChange={(e) => inputChange(e)}
          />
          <TextField
            value={memberAddr || ""}
            margin="normal"
            required
            fullWidth
            label="주소"
            multiline
            name="memberGender"
            focused={true}
            onChange={(e) => inputChange(e)}
          />
          <TextField
            value={memberMbti || ""}
            margin="normal"
            required
            fullWidth
            label="MBTI"
            name="memberMbti"
            focused={true}
            onChange={(e) => inputChange(e)}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            수정하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
