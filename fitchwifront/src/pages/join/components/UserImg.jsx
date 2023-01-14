import React, { useState } from "react";

import { Avatar, Box, Button, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserImg({ setFileForm, joinForm }) {
  const [file, setFile] = useState("");

  const imageLoad = (event) => {
    if (event.target.files.length !== 0) {
      setFileForm(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setFile("");
      setFileForm("");
    }
  };
  return (
    <Box style={{ textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        ' <b>{joinForm.memberNickname}</b>'님이시군요!
        <br />
        <b>{joinForm.memberNickname}</b>님을 표현할 수 있는 이미지를 선택해주세요.
      </Typography>
      <Typography variant="h6" gutterBottom mb={5}>
        *미등록시 기본 이미지로 등록됩니다.
      </Typography>
      <Avatar src={file !== "" ? file : ""} sx={{ width: 250, height: 250, m: "auto", mb: 4 }} />
      <Button variant="outlined" sx={{ pl: 5 }}>
        <FormControlLabel
          control={
            <TextField
              onChange={imageLoad}
              type="file"
              label="사진"
              variant="standard"
              style={{ display: "none" }}
              inputProps={{ accept: "image/*" }}
            />
          }
          label="등록하기"
        />
      </Button>
      <br />{" "}
      <Link to="/join/name" style={{ textDecoration: "none" }}>
        <Button sx={{ mt: 5, width: 100 }} variant="contained" style={{ textDecoration: "none" }}>
          다음
        </Button>
      </Link>
    </Box>
  );
}
