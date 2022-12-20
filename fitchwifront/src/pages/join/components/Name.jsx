import React from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export default function Name({ onChange }) {
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
      />
      <br />
      <Link to="/join/nickname">
        <Button sx={{ mt: 5, width: 100 }} variant="contained">
          다음
        </Button>
      </Link>
    </div>
  );
}
