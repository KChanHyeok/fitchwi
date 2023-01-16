import React, { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Nickname({ onChange, joinForm, isValid, swAlert, location }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (isValid === false && location.state == null) {
      swAlert("비정상적인 접근입니다.<br/> 메인화면으로 이동합니다.", "warning", () => {
        nav("/");
      });
    }
  });

  useEffect(() => {
    if (joinForm.memberNickname !== undefined) {
      if (joinForm.memberNickname.length >= 2) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [joinForm.memberNickname]);
  return (
    <div style={{ textAlign: "center", transition: "all 1s" }}>
      <Typography variant="h3" gutterBottom>
        반가워요!
        <br />
      </Typography>
      <Typography variant="h4" gutterBottom>
        FITCHWI에서 사용하실 별명을 알려주세요.
      </Typography>
      <Typography variant="h6" mb={10}>
        *2자 이상 10자 이하로 정해주세요!
      </Typography>

      <TextField
        onChange={onChange}
        name="memberNickname"
        label="별명"
        multiline
        variant="standard"
        InputProps={{ style: { fontSize: 40 } }}
        inputProps={{ maxLength: 10 }}
        value={joinForm.memberNickname || ""}
      />
      <br />
      <Link to="/join/userimg" style={{ textDecoration: "none" }}>
        <Button sx={{ mt: 5, width: 100 }} variant="contained" disabled={isDisabled}>
          다음
        </Button>
      </Link>
    </div>
  );
}
