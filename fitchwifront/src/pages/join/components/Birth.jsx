import React, { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Birth({ onChange, joinForm, isValid, swAlert }) {
  const nav = useNavigate();
  useEffect(() => {
    if (isValid === false) {
      swAlert("비정상적인 접근입니다.<br/> 메인화면으로 이동합니다.", "warning", () => {
        nav("/");
      });
    }
  });

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (joinForm.memberBirth !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [joinForm.memberBirth]);
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4" gutterBottom mb={10}>
        생일! 생일도 알려주세요!
      </Typography>

      <TextField
        onChange={onChange}
        name="memberBirth"
        type="date"
        id="standard-multiline-flexible"
        maxRows={4}
        variant="standard"
        InputProps={{ style: { fontSize: 30 } }}
        inputProps={{ maxLength: 10 }}
      />
      <br />
      <Link to="/join/interest" style={{ textDecoration: "none" }}>
        <Button sx={{ mt: 5, width: 100 }} variant="contained" disabled={isDisabled}>
          다음
        </Button>
      </Link>
    </div>
  );
}
