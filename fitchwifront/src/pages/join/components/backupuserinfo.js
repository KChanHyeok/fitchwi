import React, { useCallback, useEffect, useState } from "react";

import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function UserInfo({ onChange, joinForm }) {
  const [msg, setMsg] = useState("");
  const [formPwd, setFormPwd] = useState("");
  console.log(joinForm.memberPwd);

  const onCheckPwd = useCallback(
    (e) => {
      let checkPwd = e.target.value;
      console.log(checkPwd);

      if (checkPwd === "") {
        setMsg("미입력");
      } else if (checkPwd === formPwd) {
        setCorrectPwd(true);
        setMsg("비밀번호 확인이 완료됐습니다.");
      } else {
        setCorrectPwd(false);
        setMsg("올바른 비밀번호를 입력해주세요");
      }
    },
    [formPwd]
  );

  useEffect(() => {
    setFormPwd(joinForm.memberPwd);
    return () => onCheckPwd;
  }, [joinForm.memberPwd, onCheckPwd]);

  const [disabled, setDisabled] = useState(true);
  const [correctPwd, setCorrectPwd] = useState(null);

  const onCheckId = (e) => {
    e.preventDefault();
    if (joinForm.memberEmail === "") {
      alert("사용하실 Email을 입력해주세요.");
      return;
    }
    axios
      .get("/checkduplicatesmemberId", { params: { userId: joinForm.memberEmail } })
      .then((res) => {
        if (res.data === "ok") {
          setDisabled(!disabled);
          alert("사용 가능한 Email 입니다.");
        } else {
          alert("사용할 수 없는 Email 입니다.");
        }
      });
    //console.log(typeof joinForm.memberEmail);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h2" gutterBottom mb={10}>
        더 알려주세요
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            onChange={onChange}
            name="memberEmail"
            sx={{ mb: 1 }}
            label="Email"
            type="email"
            variant="standard"
            InputProps={{ style: { fontSize: 30 } }}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" style={{ width: "22%" }} sx={{ mb: 1 }} onClick={onCheckId}>
            중복확인
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={onChange}
            name="memberPwd"
            sx={{ mb: 5 }}
            type="password"
            label="비밀번호"
            variant="standard"
            InputProps={{ style: { fontSize: 30 } }}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <TextField
            onChange={onCheckPwd}
            name="memberPwd"
            sx={{ mb: 5 }}
            type="password"
            label="비밀번호 확인"
            variant="standard"
            InputProps={{ style: { fontSize: 30 } }}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item xs={12}>
          {correctPwd == null ? null : correctPwd ? (
            <Alert
              severity="info"
              sx={{
                width: "22%",
                margin: "auto",
              }}
            >
              {msg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              sx={{
                width: "22%",
                margin: "auto",
              }}
            >
              {msg}
            </Alert>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={onChange}
            name="memberAddr"
            sx={{ mb: 5 }}
            label="주소"
            variant="standard"
            InputProps={{ style: { fontSize: 30 } }}
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={onChange}
            name="memberPhone"
            label="연락처"
            variant="standard"
            InputProps={{ style: { fontSize: 30 } }}
            inputProps={{ maxLength: 16 }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12}>
        <Button type="submit" sx={{ mt: 5, width: 100 }} variant="contained">
          회원가입
        </Button>
      </Grid>
    </div>
  );
}
