import React, { useCallback, useEffect, /*useEffect,*/ useMemo, useState } from "react";

import { Button, Checkbox, FormControlLabel, styled, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

export default function Interest({ joinForm, setJoinForm, isValid, swAlert }) {
  const nav = useNavigate();
  useEffect(() => {
    if (isValid === false) {
      swAlert("비정상적인 접근입니다.<br/> 메인화면으로 이동합니다.", "warning", () => {
        nav("/");
      });
    }
  });

  const InterestCheckBox = styled(Checkbox)({
    width: "100px",
    height: "100px",
    borderRadius: "50px",
    fontSize: "30px",
    marginLeft: "100px",
    marginRight: "100px",
    onClick: "onCheck",
    marginBottom: "10px",
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const [checked, setChecked] = useState({
    culture: false,
    activity: false,
    food: false,
    travel: false,
    grownup: false,
    making: false,
    game: false,
    etc: false,
  });

  const handleClick = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const interestArr = useMemo(() => [], []);

  useEffect(() => {
    if (joinForm.memberInterest.length !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [joinForm.memberInterest, checked]);
  const onCheck = useCallback(
    (e) => {
      if (e.target.checked === true) {
        interestArr.push(e.target.value);
      } else {
        interestArr.splice(interestArr.indexOf(e.target.value), 1);
      }
      const joinObj = {
        ...joinForm,
        memberInterest: interestArr,
      };
      setJoinForm(joinObj);
    },
    [joinForm, setJoinForm, interestArr]
  );

  const onCheckComple = () => {
    let interest = interestArr.join(" ");
    const joinObj = {
      ...joinForm,
      memberInterest: interest,
    };
    setJoinForm(joinObj);
  };

  return (
    <div style={{ textAlign: "center", width: "1200px" }}>
      <Typography variant="h4" gutterBottom>
        <b>{joinForm.memberNickname}</b>님은 어떤 분야에 관심이 있나요? <br />
      </Typography>
      <Typography variant="h6" gutterBottom mb={5}>
        (*FITCHWI에서 제공하는 각종 서비스 추천에 활용됩니다.)
      </Typography>

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.culture}
            onClick={handleClick}
            onChange={onCheck}
            name="culture"
            value="문화·예술"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>문화·예술</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.activity}
            onClick={handleClick}
            onChange={onCheck}
            name="activity"
            value="운동·액티비티"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>운동·액티비티</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.food}
            onClick={handleClick}
            onChange={onCheck}
            name="food"
            value="요리·음식"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>요리·음식</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.travel}
            onClick={handleClick}
            onChange={onCheck}
            name="travel"
            value="여행"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>여행</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.grownup}
            onClick={handleClick}
            onChange={onCheck}
            name="grownup"
            value="성장·자기계발"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>성장·자기계발</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.making}
            onClick={handleClick}
            onChange={onCheck}
            name="making"
            value="공예·수공예"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>공예·수공예</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.game}
            onClick={handleClick}
            onChange={onCheck}
            name="game"
            value="게임·오락"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>게임·오락</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.etc}
            onClick={handleClick}
            onChange={onCheck}
            name="etc"
            value="기타"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>기타</Typography>}
        labelPlacement="bottom"
      />

      <br />
      <Box onClick={onCheckComple}>
        <Link to="/join/mbti" style={{ textDecoration: "none" }}>
          <Button sx={{ mt: 5, width: 100 }} variant="contained" disabled={isDisabled}>
            다음
          </Button>
        </Link>
      </Box>
    </div>
  );
}
