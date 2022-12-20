import React /*, { useCallback, useState }*/ from "react";

import { Button, Checkbox, FormControlLabel, styled, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Interest({ joinForm, setJoinForm }) {
  const InterestBtn = styled(Button)({
    width: "150px",
    height: "150px",
    borderRadius: "100px",
    fontSize: "30px",
    marginLeft: "100px",
    marginRight: "100px",
    onClick: "onCheck",
  });

  // const onCheck = useCallback((e) => {
  //   console.log(e);
  //   setState(() => !state);
  //     const joinObj = {
  //       ...joinForm,
  //       memberInterest: joinForm.memberInterest,
  //     };
  //     if (e.target.checked === true) {
  //       joinForm.memberInterest.push(e.target.value);
  //     } else {
  //       joinForm.memberInterest.splice(joinForm.memberInterest.indexOf(e.target.value), 1);
  //     }
  //     setJoinForm(joinObj);
  //   },
  //   [joinForm, setJoinForm,state]
  // );
  // const onCheckComple = () => {
  //   const joinObj = {
  //     ...joinForm,
  //     memberInterest: joinForm.memberInterest.join(" "),
  //   };
  //   setJoinForm(joinObj);
  // };

  //const [state, setState] = useState(false);

  return (
    <div style={{ textAlign: "center", width: "1200px" }}>
      <Typography variant="h2" gutterBottom mb={10}>
        관심있는 건 뭐예요
      </Typography>
      <Typography variant="h5">잘 모르겠으면 클릭 !</Typography>

      <InterestBtn /*onClick={onCheck}*/>
        <FormControlLabel
          control={
            <Checkbox
              /* checked={state}*/
              name="memberInterest"
              value="문화∙예술"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          }
          label="문화∙예술"
        />
      </InterestBtn>

      <InterestBtn>
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label={`운동∙액티비티`}
        />
      </InterestBtn>

      <InterestBtn>
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label="요리∙음식"
        />
      </InterestBtn>

      <InterestBtn>
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label="여행"
        />
      </InterestBtn>

      <InterestBtn>
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label="성장∙자기계발"
        />
      </InterestBtn>

      <InterestBtn>
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label="공예∙수공예"
        />
      </InterestBtn>

      <InterestBtn>
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label="게임∙오락"
        />
      </InterestBtn>

      <InterestBtn>
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label="기타"
        />
      </InterestBtn>

      <br />
      <Link to="/join/mbti">
        <Button sx={{ mt: 5, width: 100 }} variant="contained" /*onClick={onCheckComple}*/>
          다음
        </Button>
      </Link>
    </div>
  );
}
