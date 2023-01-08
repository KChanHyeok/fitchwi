import React, { useCallback, useEffect, useState } from "react";

import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import Postcode from "./Postcode";

export default function UserInfo({ onChange, joinForm, setJoinForm, isKakao }) {
  const [msg, setMsg] = useState("");

  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");

  const [checkedId, setCheckedId] = useState(null);
  const [checkedPhone, setCheckedPhone] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [correctPwd, setCorrectPwd] = useState(null);
  useEffect(() => {
    console.log(checkedId);
    console.log(checkedPhone);
    console.log(correctPwd);
    console.log(isKakao);
    if (isKakao === true && joinForm.memberAddr !== "" && checkedPhone === joinForm.memberPhone) {
      setDisabled(false);
    } else {
      if (
        correctPwd === true && //비번같음
        checkedId === joinForm.memberEmail
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [joinForm, checkedId, checkedPhone, correctPwd, isKakao]);

  useEffect(() => {
    if (checkPwd === "" && pwd !== "") {
      setMsg("비밀번호 확인을 진행해주세요.");
    } else if (checkPwd === pwd && pwd !== "") {
      setCorrectPwd(true);
      setMsg("비밀번호 확인이 완료됐습니다.");
      const joinObj = {
        ...joinForm,
        memberPwd: pwd,
      };
      setJoinForm(joinObj);
    } else if (checkPwd !== pwd) {
      setCorrectPwd(false);
      setMsg("입력하신 두 비밀번호가 서로 다릅니다.");
      const joinObj = {
        ...joinForm,
        memberPwd: "",
      };
      setJoinForm(joinObj);
    }
  }, [pwd, checkPwd]);

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
          setCheckedId(joinForm.memberEmail);
          alert("사용 가능한 Email 입니다.");
        } else {
          setCheckedId("");
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

  const Certification = () => {
    if (joinForm.memberPhone === "") {
      return alert("연락처를 입력해주세요!");
    }
    const { IMP } = window;
    // IMP.init("imp51345423");
    // 본인인증은 다날과 계약을 진행해야 서비스 제공이 가능해서 본인 가맹점 식별코드로는 테스트가 불가능함!

    // 그래서 아임포트에서 본인인증 테스트가 가능한 계정을 제공해줌!
    IMP.init("imp10391932");

    // 회원가입 할 때 입력한 정보로 채워줄지 아니면 공백으로 처리할 지는 고민해봐야 할듯
    const data = {
      merchant_uid: `mid_${new Date().getTime()}`,
      company: "아임포트",
      carrier: "",
      //name: joinForm.memberName,
      phone: joinForm.memberPhone,
    };
    IMP.certification(data, callback);

    function callback(response) {
      const { success, merchant_uid, error_msg } = response;
      console.log(response);
      if (success) {
        setCheckedPhone(joinForm.memberPhone);
        //    setDisabled(false);
        alert("본인인증 성공");
        //   console.log(response);
        //  console.log(merchant_uid);
      } else {
        alert(`본인인증 실패: ${error_msg}`);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", width: 400 }}>
      <Typography variant="h2" gutterBottom mb={10}>
        더 알려주세요
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            required
            disabled={isKakao}
            onChange={onChange}
            name="memberEmail"
            value={joinForm.memberEmail}
            sx={{ mb: 1, width: "100%" }}
            label="Email"
            type="email"
            variant="standard"
            InputProps={{ style: { fontSize: 20 } }}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>

        {isKakao === true ? null : (
          <>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                style={{ width: "100%" }}
                sx={{ mb: 1 }}
                onClick={onCheckId}
              >
                중복확인
              </Button>{" "}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={(e) => setPwd(() => e.target.value)}
                name="memberPwd"
                sx={{ mb: 5, width: "100%" }}
                type="password"
                value={pwd}
                label="비밀번호"
                variant="standard"
                InputProps={{ style: { fontSize: 20 } }}
                inputProps={{ maxLength: 30 }}
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                required
                onChange={(e) => setCheckPwd(() => e.target.value)}
                sx={{ mb: 3, width: "100%" }}
                type="password"
                label="비밀번호 확인"
                variant="standard"
                value={checkPwd}
                InputProps={{ style: { fontSize: 20 } }}
                inputProps={{ maxLength: 30 }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              {correctPwd == null ? null : correctPwd ? (
                <Alert
                  severity="info"
                  sx={{
                    width: "94%",
                  }}
                >
                  {msg}
                </Alert>
              ) : (
                <Alert
                  severity="error"
                  sx={{
                    width: "94%",
                  }}
                >
                  {msg}
                </Alert>
              )}
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <TextField
            required
            onChange={onChange}
            name="memberAddr"
            sx={{ mb: 1, width: "100%" }}
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
            required
            onChange={onChange}
            name="memberPhone"
            sx={{ width: "100%" }}
            label="연락처"
            variant="standard"
            value={joinForm.memberPhone}
            size="small"
            InputProps={{ style: { fontSize: 20 } }}
            inputProps={{ maxLength: 16 }}
          />
        </Grid>
        <Grid item xs={12} mt={1}>
          <Button variant="outlined" style={{ width: "100%" }} onClick={Certification}>
            본인인증
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" sx={{ mt: 5, width: "100%" }} variant="contained" disabled={disabled}>
          회원가입
        </Button>
      </Grid>
    </div>
  );
}
