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
      <Typography variant="h2" gutterBottom mb={10}>
        성별은요?
      </Typography>
      <br />
      <Link to="/join/birth" style={{ textDecoration: "none" }}>
        <GenderBtn variant="contained" onClick={onClick} name="memberGender" value="남">
          남성
        </GenderBtn>
        <GenderBtn variant="contained" onClick={onClick} name="memberGender" value="여">
          여성
        </GenderBtn>
        <GenderBtn variant="contained" onClick={onClick} name="memberGender" value="기타">
          기타
        </GenderBtn>
      </Link>
    </div>
  );
}
