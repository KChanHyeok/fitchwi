import React, { useCallback } from "react";

import { Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Gender({ joinForm, setJoinForm }) {
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
        <b>{joinForm.memberNickname}</b>({joinForm.memberName})님은 여자? 남자? <br />
        알려주지 않아도 괜찮아요!<small>(*기타 선택)</small>
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
