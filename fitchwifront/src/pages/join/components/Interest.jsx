import React, { useCallback, useState } from "react";

import { Button, Checkbox, FormControlLabel, styled, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Interest({ joinForm, setJoinForm }) {
  const InterestCheckBox = styled(Checkbox)({
    width: "150px",
    height: "150px",
    borderRadius: "100px",
    fontSize: "30px",
    marginLeft: "100px",
    marginRight: "100px",
    onClick: "onCheck",
  });

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

  const handleChange = (e) => {
    console.log(e.target.checked);
    setChecked({ ...checked, [e.target.name]: e.target.checked });
    console.log(e.target.name);
  };

  const onCheck = useCallback(
    (e) => {
      console.log(e.target.checked);

      const joinObj = {
        ...joinForm,
        memberInterest: joinForm.memberInterest,
      };
      if (e.target.checked === true) {
        joinForm.memberInterest.push(e.target.value);
      } else {
        joinForm.memberInterest.splice(joinForm.memberInterest.indexOf(e.target.value), 1);
      }
      setJoinForm(joinObj);
      console.log(joinForm.memberInterest);
    },
    [joinForm, setJoinForm]
  );

  const onCheckComple = () => {
    const joinObj = {
      ...joinForm,
      memberInterest: joinForm.memberInterest.join(" "),
    };
    setJoinForm(joinObj);
    console.log(setJoinForm);
  };

  return (
    <div style={{ textAlign: "center", width: "1200px" }}>
      <Typography variant="h2" gutterBottom mb={10}>
        관심있는 건 뭐예요
      </Typography>
      <Typography variant="h5">잘 모르겠으면 클릭 !</Typography>

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.culture}
            onClick={handleChange}
            onChange={onCheck}
            name="culture"
            value="문화∙예술"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>문화∙예술</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.activity}
            onClick={handleChange}
            onChange={onCheck}
            name="activity"
            value="운동∙액티비티"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>운동∙액티비티</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.food}
            onClick={handleChange}
            onChange={onCheck}
            name="food"
            value="요리∙음식"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>요리∙음식</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.travel}
            onClick={handleChange}
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
            onClick={handleChange}
            onChange={onCheck}
            name="grownup"
            value="성장∙자기계발"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>성장∙자기계발</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.making}
            onClick={handleChange}
            onChange={onCheck}
            name="making"
            value="공예∙수공예"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>공예∙수공예</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.game}
            onClick={handleChange}
            onChange={onCheck}
            name="game"
            value="게임∙오락"
            icon={<FavoriteBorder sx={{ fontSize: 50 }} />}
            checkedIcon={<Favorite sx={{ fontSize: 50 }} />}
          />
        }
        label={<Typography style={{ position: "relative", top: -30 }}>게임∙오락</Typography>}
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <InterestCheckBox
            checked={checked.etc}
            onClick={handleChange}
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

      <Button sx={{ mt: 5, width: 100 }} variant="contained" onClick={onCheckComple}>
        <Link to="/join/mbti" style={{ textDecoration: "none" }}>
          다음
        </Link>
      </Button>
    </div>
  );
}
