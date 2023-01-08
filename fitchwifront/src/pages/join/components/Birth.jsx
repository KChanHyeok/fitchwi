import React, { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Birth({ onChange, joinForm }) {
  console.log(joinForm.memberBirth);
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
      <Typography variant="h2" gutterBottom mb={10}>
        태어나신 연도를 입력해주세요
      </Typography>
      {/* <TextField
        id="standard-multiline-flexible"
        label="연도"
        multiline
        maxRows={4}
        variant="standard"
        InputProps={{ style: { fontSize: 40 } }}
        inputProps={{ maxLength: 10 }}
      /> */}
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
