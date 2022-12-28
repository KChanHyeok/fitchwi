// import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useRef, /*useMemo,*/ useState } from "react";
import { useNavigate } from "react-router-dom";
import Postcode from "../../join/components/Postcode";
export default function UpdateMember({ member }) {
  const [memberToUpdate, setMemberToUpdate] = useState({});
  useEffect(() => {
    setMemberToUpdate(member);
  }, [member]);

  const {
    memberEmail,
    memberName,
    memberInterest,
    memberSaveimg,
    memberMbti,
    memberNickname,
    memberAddr,
    memberGender,
    // memberImg,
    memberBirth,
    memberPhone,
  } = memberToUpdate;

  let formData = new FormData();
  const nav = useNavigate();
  const [fileForm, setFileForm] = useState("");

  const onUpdate = (e) => {
    e.preventDefault();

    formData.append(
      "data",
      new Blob([JSON.stringify(memberToUpdate)], { type: "application/json" })
    );
    formData.append("uploadImage", fileForm);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("/updateMemberInfo", formData, config)
      .then((res) => {
        if (res.data === "ok") {
          alert("성공");
          nav("/");
        } else {
          alert("실패");
        }
      })
      .catch((error) => console.log(error));
    console.log(memberToUpdate);
  };

  const inputChange = useCallback(
    (e) => {
      setMemberToUpdate({ ...memberToUpdate, [e.target.name]: e.target.value });
    },
    [memberToUpdate]
  );
  useEffect(() => {
    console.log(memberToUpdate);
  }, [memberToUpdate]);
  //비밀번호 확인
  const [correctPwd, setCorrectPwd] = useState(null);
  const [formPwd, setFormPwd] = useState("");
  const [msg, setMsg] = useState("");
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
    setFormPwd(memberToUpdate.memberPwd);
    return () => onCheckPwd;
  }, [memberToUpdate.memberPwd, onCheckPwd]);

  //mbti 처리
  const [userMbTi, setUserMbti] = useState();
  const options = [
    "ISFP",
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];
  useEffect(() => {
    setMemberToUpdate({
      ...memberToUpdate,
      memberMbti: userMbTi,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMbTi]);
  //주소처리
  const insertAddr = useCallback(
    (addr) => {
      const updateData = {
        ...memberToUpdate,
        memberAddr: addr,
      };
      setMemberToUpdate(updateData);
    },
    [memberToUpdate, setMemberToUpdate]
  );
  const interArray = useRef([]);
  //관심사 처리
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

  useEffect(() => {
    if (typeof memberInterest == "string") {
      interArray.current = memberInterest.split(" ");
      const temporaryChecked = {
        culture: false,
        activity: false,
        food: false,
        travel: false,
        grownup: false,
        making: false,
        game: false,
        etc: false,
      };

      interArray.current.forEach((e) => {
        switch (e) {
          case "문화∙예술":
            temporaryChecked.culture = true;
            break;
          case "운동∙액티비티":
            temporaryChecked.activity = true;
            break;
          case "요리∙음식":
            temporaryChecked.food = true;
            break;
          case "여행":
            temporaryChecked.travel = true;
            break;
          case "성장∙자기계발":
            temporaryChecked.grownup = true;
            break;
          case "공예∙수공예":
            temporaryChecked.making = true;
            break;
          case "게임∙오락":
            temporaryChecked.game = true;
            break;
          case "기타":
            temporaryChecked.etc = true;
            break;

          default:
            break;
        }
      });
      console.log(memberToUpdate);
      setChecked(temporaryChecked);
    }
  }, [memberInterest, checked, memberToUpdate]);

  useEffect(() => {
    setMemberToUpdate({ ...memberToUpdate, memberInterest: interArray.current });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interArray.current]);

  const handleChange = (e) => {
    console.log(e.target.checked);
    setChecked({ ...checked, [e.target.name]: e.target.checked });
    console.log(e.target.name);
  };

  const interestArr = useMemo(() => memberInterest, [memberInterest]);
  console.log(interestArr);
  const onCheck = useCallback(
    (e) => {
      if (e.target.checked === true) {
        interestArr.push(e.target.value);
      } else {
        interestArr.splice(interestArr.indexOf(e.target.value), 1);
      }
      const memberToUpdateObj = {
        ...memberToUpdate,
        memberInterest: interestArr,
      };
      setMemberToUpdate(memberToUpdateObj);
      console.log(memberToUpdate.memberInterest);
    },
    [memberToUpdate, setMemberToUpdate, interestArr]
  );

  //이미지 변경
  const [file, setFile] = useState("");

  const fileHandler = (event) => {
    if (event.target.files.length !== 0) {
      setFileForm(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setFile("");
      setFileForm("");
    }
  };
  const onCheckComple = () => {
    let interest = interestArr.join(" ");
    console.log(interest);

    setMemberToUpdate({ ...memberToUpdate, memberInterest: interest });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          회원 정보 수정
        </Typography>
        {memberSaveimg && (
          <Box>
            <Avatar
              src={file ? file : `/images/${memberSaveimg}`}
              sx={{ width: 100, height: 100 }}
            />
            {/* <Avatar src={`/images/${memberSaveimg}`} sx={{ width: 100, height: 100 }} /> */}
            <Button variant="outlined" sx={{ pl: 5 }}>
              <FormControlLabel
                control={
                  <TextField
                    onChange={fileHandler}
                    type="file"
                    label="사진"
                    variant="standard"
                    style={{ display: "none" }}
                  />
                }
                label="프로필 수정하기"
              />
            </Button>{" "}
          </Box>
        )}
        <Box component="form" onSubmit={(e) => onUpdate(e)} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={12}>
              <TextField
                value={memberEmail || ""}
                margin="normal"
                required
                fullWidth
                label="이메일(변경불가)"
                name="email"
                focused={true}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                name="memberPwd"
                label="비밀번호 변경 시 입력"
                type="password"
                variant="standard"
                focused={true}
                onChange={(e) => inputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                label="비밀번호 확인"
                type="password"
                variant="standard"
                focused={true}
                onChange={onCheckPwd}
              />
            </Grid>
            <Grid item xs={12}>
              {correctPwd == null ? null : correctPwd ? (
                <Alert
                  severity="info"
                  sx={{
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  {msg}
                </Alert>
              ) : (
                <Alert
                  severity="error"
                  sx={{
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  {msg}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                value={memberNickname || ""}
                margin="normal"
                focused={true}
                required
                fullWidth
                label="닉네임"
                name="memberNickname"
                variant="standard"
                onChange={(e) => inputChange(e)}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={12}>
              <TextField
                value={memberName || ""}
                margin="normal"
                fullWidth
                focused={true}
                label="이름(변경불가)"
                name="memberName"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">성별</FormLabel>
                <RadioGroup
                  // onChange={(e) => inputChange(e)}
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="memberGender"
                  value={memberGender || ""}
                  onChange={(e) => inputChange(e)}
                >
                  <FormControlLabel value="남" control={<Radio />} label="남성" />
                  <FormControlLabel value="여" control={<Radio />} label="여성" />
                  <FormControlLabel value="기타" control={<Radio />} label="기타" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">{memberMbti}</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={userMbTi || ""}
                  onChange={(e) => setUserMbti(e.target.value)}
                  input={<OutlinedInput variant="standard" label="Name" />}
                >
                  {options.map((mbti, index) => (
                    <MenuItem key={index} value={mbti}>
                      {mbti}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                value={memberBirth || ""}
                type="date"
                margin="normal"
                required
                fullWidth
                label="생일"
                name="memberBirth"
                variant="standard"
                focused={true}
                onChange={(e) => inputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                value={memberPhone || ""}
                margin="normal"
                required
                fullWidth
                label="연락처"
                multiline
                name="memberPhone"
                variant="standard"
                focused={true}
                onChange={(e) => inputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                value={memberAddr || ""}
                margin="normal"
                required
                fullWidth
                label="주소"
                multiline
                name="memberAddr"
                variant="standard"
                focused={true}
                onChange={(e) => inputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Postcode insertAddr={insertAddr} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.culture}
                    onClick={handleChange}
                    onChange={onCheck}
                    name="culture"
                    value="문화∙예술"
                    icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                    checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                  />
                }
                label={<Typography style={{ position: "relative" }}>문화∙예술</Typography>}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.activity}
                    onClick={handleChange}
                    onChange={onCheck}
                    name="activity"
                    value="운동∙액티비티"
                    icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                    checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                  />
                }
                label={<Typography style={{ position: "relative" }}>운동∙액티비티</Typography>}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.food}
                    onClick={handleChange}
                    onChange={onCheck}
                    name="food"
                    value="요리∙음식"
                    icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                    checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                  />
                }
                label={<Typography style={{ position: "relative" }}>요리∙음식</Typography>}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.travel}
                    onClick={handleChange}
                    onChange={onCheck}
                    name="travel"
                    value="여행"
                    icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                    checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                  />
                }
                label={<Typography style={{ position: "relative" }}>여행</Typography>}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.grownup}
                    onClick={handleChange}
                    onChange={onCheck}
                    name="grownup"
                    value="성장∙자기계발"
                    icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                    checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                  />
                }
                label={<Typography style={{ position: "relative" }}>성장∙자기계발</Typography>}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.making}
                    onClick={handleChange}
                    onChange={onCheck}
                    name="making"
                    value="공예∙수공예"
                    icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                    checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                  />
                }
                label={<Typography style={{ position: "relative" }}>공예∙수공예</Typography>}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.game}
                    onClick={handleChange}
                    onChange={onCheck}
                    name="game"
                    value="게임∙오락"
                    icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                    checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                  />
                }
                label={<Typography style={{ position: "relative" }}>게임∙오락</Typography>}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.etc}
                    onClick={handleChange}
                    onChange={onCheck}
                    name="etc"
                    value="기타"
                    icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                    checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                  />
                }
                label={<Typography style={{ position: "relative" }}>기타</Typography>}
              />
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            수정하기
          </Button>
          <Button onClick={onCheckComple}> 테스트</Button>
        </Box>
      </Box>
    </Container>
  );
}
