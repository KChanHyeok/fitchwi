import React from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Nickname({ onChange }) {
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
      />
      <br />
      <Link to="/join/userimg">
        {" "}
        <Button sx={{ mt: 5, width: 100 }} variant="contained">
          다음
        </Button>
      </Link>
    </div>
  );
}
