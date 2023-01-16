import React, { useState } from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Name({ onChange, joinForm, isKakao, isValid, swAlert, location }) {
  const nav = useNavigate();
  useEffect(() => {
    if (isValid === false && location.state == null) {
      swAlert("비정상적인 접근입니다.<br/> 메인화면으로 이동합니다.", "warning", () => {
        nav("/");
      });
    }
  });

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (joinForm.memberName.length >= 2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [joinForm.memberName]);
  return (
    <div style={{ textAlign: "center" }}>
      {isKakao === true ? (
        <Typography variant="h4" gutterBottom mb={10}>
          <b>{joinForm.memberNickname}</b>님의 이름(본명)도 알고싶어요!
        </Typography>
      ) : (
        <Typography variant="h4" gutterBottom mb={10}>
          <b>{joinForm.memberNickname}</b>님의 이름도 알고싶어요!
        </Typography>
      )}

      <TextField
        name="memberName"
        label="이름"
        multiline
        maxRows={4}
        variant="standard"
        InputProps={{ style: { fontSize: 40 } }}
        inputProps={{ maxLength: 10 }}
        onChange={onChange}
        value={joinForm.memberName}
      />
      <br />
      <Link to="/join/gender" style={{ textDecoration: "none" }}>
        <Button sx={{ mt: 5, width: 100 }} variant="contained" disabled={isDisabled}>
          다음
        </Button>
      </Link>
    </div>
  );
}
