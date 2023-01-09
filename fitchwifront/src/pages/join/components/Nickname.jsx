import React, { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Nickname({ onChange, joinForm }) {
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (joinForm.memberNickname !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [joinForm.memberNickname]);
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h2" gutterBottom mb={10}>
        FITCHWI에서 사용하실 별명을 입력해주세요
      </Typography>
      <TextField
        onChange={onChange}
        name="memberNickname"
        label="별명"
        multiline
        variant="standard"
        InputProps={{ style: { fontSize: 40 } }}
        inputProps={{ maxLength: 10 }}
        value={joinForm.memberNickname}
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
