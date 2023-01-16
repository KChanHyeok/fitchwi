import React, { useCallback, useEffect } from "react";

import { Button, styled, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Gender({ joinForm, setJoinForm, isValid, swAlert }) {
  const nav = useNavigate();
  useEffect(() => {
    if (isValid === false) {
      swAlert("비정상적인 접근입니다.<br/> 메인화면으로 이동합니다.", "warning", () => {
        nav("/");
      });
    }
  });

  const GenderBtn = styled(Button)({
    width: "150px",
    height: "150px",
    borderRadius: "100px",
    fontSize: "30px",
    marginLeft: "100px",
    marginRight: "100px",
  });

  const onClick = useCallback(
    (e) => {
      const joinObj = {
        ...joinForm,
        [e.target.name]: e.target.value,
      };
      setJoinForm(joinObj);
    },
    [joinForm, setJoinForm]
  );

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4" gutterBottom mb={10}>
        <b>{joinForm.memberNickname}</b>({joinForm.memberName})님의 성별도 알려주세요!
      </Typography>
      <br />
      <Link to="/join/birth" style={{ textDecoration: "none" }}>
        <GenderBtn variant="outlined" onClick={onClick} name="memberGender" value="남">
          남성
        </GenderBtn>
        <GenderBtn variant="outlined" onClick={onClick} name="memberGender" value="여">
          여성
        </GenderBtn>
        <GenderBtn variant="outlined" onClick={onClick} name="memberGender" value="기타">
          기타
        </GenderBtn>
      </Link>
    </div>
  );
}
