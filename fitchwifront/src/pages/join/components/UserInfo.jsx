import React, { useCallback, useEffect, useState } from "react";

import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import Postcode from "./Postcode";

export default function UserInfo({ onChange, joinForm, setJoinForm }) {
  const [msg, setMsg] = useState("");
  const [formPwd, setFormPwd] = useState("");
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
          setDisabled(false);
          alert("사용 가능한 Email 입니다.");
        } else {
          setDisabled(true);
          alert("사용할 수 없는 Email 입니다.");
        }
      });
    //console.log(typeof joinForm.memberEmail);
  };

  const insertAddr = useCallback(
    (addr) => {
      const joinObj = {
        ...joinForm,
        memberAddr: addr,
      };
      setJoinForm(joinObj);
    },
    [joinForm, setJoinForm]
  );

  return (
    <div style={{ textAlign: "center", width: 500 }}>
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
            InputProps={{ style: { fontSize: 20 } }}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            style={{ width: "60%" }}
            sx={{ mb: 1 }}
            onClick={onCheckId}
          >
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
            InputProps={{ style: { fontSize: 20 } }}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <TextField
            onChange={onCheckPwd}
            sx={{ mb: 5 }}
            type="password"
            label="비밀번호 확인"
            variant="standard"
            InputProps={{ style: { fontSize: 20 } }}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item xs={12}>
          {correctPwd == null ? null : correctPwd ? (
            <Alert
              severity="info"
              sx={{
                width: "50%",
                margin: "auto",
              }}
            >
              {msg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              sx={{
                width: "50%",
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
            sx={{ mb: 1 }}
            label="주소"
            value={joinForm.memberAddr}
            multiline
            variant="standard"
            InputProps={{ style: { fontSize: 20 } }}
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Postcode insertAddr={insertAddr} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={onChange}
            name="memberPhone"
            label="연락처"
            variant="standard"
            size="small"
            InputProps={{ style: { fontSize: 20 } }}
            inputProps={{ maxLength: 16 }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12}>
        <Button type="submit" sx={{ mt: 5, width: "60%" }} variant="contained" disabled={disabled}>
          회원가입
        </Button>
      </Grid>
    </div>
  );
}
