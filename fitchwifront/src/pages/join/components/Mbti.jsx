import * as React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Mbti({ joinForm, setJoinForm }) {
  const [ei, setEi] = React.useState("");
  const [ns, setNs] = React.useState("");
  const [tf, setTf] = React.useState("");
  const [jp, setJp] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleChange = (event, nextValue) => {
    switch (nextValue) {
      case "E":
      case "I":
        setEi(nextValue);
        break;
      case "N":
      case "S":
        setNs(nextValue);

        break;
      case "T":
      case "F":
        setTf(nextValue);
        break;

      case "J":
      case "P":
        setJp(nextValue);
        break;

      default:
        break;
    }
  };
  // console.log(ei + ns + tf + jp);

  const MbtiToggleBtn = styled(ToggleButton)({
    height: "100px",
    width: "150px",
    fontSize: "40px",
  });

  const userMbti = ei + ns + tf + jp;
  React.useEffect(() => {
    if (userMbti.length === 4) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userMbti]);
  const onMemberMbti = React.useCallback(
    (e) => {
      const joinObj = {
        ...joinForm,
        memberMbti: userMbti,
      };
      setJoinForm(joinObj);
    },
    [joinForm, setJoinForm, userMbti]
  );

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h2" gutterBottom>
        MBTI를 입력해주세요
      </Typography>
      <Typography variant="h4" mb={10}>
        (*선택사항)
      </Typography>
      <ToggleButtonGroup orientation="vertical" value={ei} exclusive onChange={handleChange}>
        <MbtiToggleBtn value="E">E</MbtiToggleBtn>
        <MbtiToggleBtn value="I">I</MbtiToggleBtn>
      </ToggleButtonGroup>

      <ToggleButtonGroup orientation="vertical" value={ns} exclusive onChange={handleChange}>
        <MbtiToggleBtn value="N">N</MbtiToggleBtn>
        <MbtiToggleBtn value="S">S</MbtiToggleBtn>
      </ToggleButtonGroup>

      <ToggleButtonGroup orientation="vertical" value={tf} exclusive onChange={handleChange}>
        <MbtiToggleBtn value="T">T</MbtiToggleBtn>
        <MbtiToggleBtn value="F">F</MbtiToggleBtn>
      </ToggleButtonGroup>

      <ToggleButtonGroup orientation="vertical" value={jp} exclusive onChange={handleChange}>
        <MbtiToggleBtn value="J">J</MbtiToggleBtn>
        <MbtiToggleBtn value="P">P</MbtiToggleBtn>
      </ToggleButtonGroup>
      <br />
      <Link to="/join/UserInfo" style={{ textDecoration: "none" }}>
        <Button
          sx={{ mt: 5, width: 100 }}
          variant="contained"
          onClick={onMemberMbti}
          disabled={isDisabled}
        >
          다음
        </Button>
      </Link>
    </div>
  );
}
