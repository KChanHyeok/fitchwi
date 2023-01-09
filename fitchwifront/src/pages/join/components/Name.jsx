import React, { useState } from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export default function Name({ onChange, joinForm }) {
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (joinForm.memberName !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [joinForm.memberName]);
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h2" gutterBottom mb={10}>
        당신의 이름을 알려주세요.
      </Typography>
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
