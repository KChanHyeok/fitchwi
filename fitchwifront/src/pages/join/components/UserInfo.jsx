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
  function sample6_execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ""; // 주소 변수
        var extraAddr = ""; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
          // 조합된 참고항목을 해당 필드에 넣는다.
          document.getElementById("sample6_extraAddress").value = extraAddr;
        } else {
          document.getElementById("sample6_extraAddress").value = "";
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById("sample6_postcode").value = data.zonecode;
        document.getElementById("sample6_address").value = addr;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("sample6_detailAddress").focus();
      },
    }).open();
  }
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
      <input type="text" id="sample6_postcode" placeholder="우편번호" />
      <input type="button" onclick={sample6_execDaumPostcode} value="우편번호 찾기" />
      <br />
      <input type="text" id="sample6_address" placeholder="주소">
        <br />
        <input type="text" id="sample6_detailAddress" placeholder="상세주소" />
        <input type="text" id="sample6_extraAddress" placeholder="참고항목" />
      </input>
    </div>
  );
}
