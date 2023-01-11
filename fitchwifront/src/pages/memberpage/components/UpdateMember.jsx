// import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Avatar,
  Button,
  ButtonGroup,
  Checkbox,
  CircularProgress,
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Postcode from "../../join/components/Postcode";
import ChangePwdModal from "./ChangePwdModal";
export default function UpdateMember({ member, lstate, sucLogin }) {
  const [memberToUpdate, setMemberToUpdate] = useState({});
  const [openChangePwd, setOpenChangePwd] = React.useState(false);
  useEffect(() => {
    setMemberToUpdate({ ...member });
  }, [member]);

  console.log(memberToUpdate);
  const {
    memberEmail,
    memberName,
    memberInterest,
    memberSaveimg,
    memberMbti,
    memberNickname,
    memberAddr,
    memberGender,
    //memberImg,
    memberBirth,
    memberPhone,
  } = memberToUpdate;

  let formData = new FormData();
  const nav = useNavigate();
  const [fileForm, setFileForm] = useState("");

  const onUpdate = (e) => {
    e.preventDefault();
    if (memberToUpdate.memberPhone !== checkedPhone || originalPhone !== memberToUpdate.memberPhone) {
      alert("연락처를 변경하셨습니다. 본인인증을 먼저 해주세요.");
      return;
    }
    formData.append("data", new Blob([JSON.stringify(memberToUpdate)], { type: "application/json" }));
    formData.append("uploadImage", fileForm);
    console.log(memberToUpdate);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("/updateMemberInfo", formData, config)
      .then((res) => {
        console.log(typeof sucLogin);
        if (res.data !== null) {
          sucLogin(res.data.memberEmail, res.data.memberNickname, res.data.memberSaveimg);
          sessionStorage.setItem("id", res.data.memberEmail);
          sessionStorage.setItem("nickName", res.data.memberNickname);
          sessionStorage.setItem("mbti", res.data.memberMbti);
          sessionStorage.setItem("profileImg", res.data.memberSaveimg);
          alert("성공");
          nav("/");
        } else {
          alert("실패");
        }
      })
      .catch((error) => console.log(error));
    // console.log(memberToUpdate);
  };

  const inputChange = useCallback(
    (e) => {
      //   console.log("inputChange");
      //  console.log(memberToUpdate);
      setMemberToUpdate({ ...memberToUpdate, [e.target.name]: e.target.value });
      //   console.log(memberToUpdate);
      //  console.log("inputChange");
    },
    [memberToUpdate]
  );
  useEffect(() => {
    //   console.log(memberToUpdate);
  }, [memberToUpdate]);

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
  let interestArray = useMemo(() => memberInterest, [memberInterest]);
  const [isMemberInterest, setIsMemberInterest] = useState(false);
  useEffect(() => {
    if (memberInterest) {
      setIsMemberInterest(true);
    }
  }, [memberInterest]);

  useEffect(() => {
    // console.log("check type");
    if (typeof memberInterest == "string") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      interestArray = memberInterest.split(" ");
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

      interestArray.forEach((e) => {
        switch (e) {
          case "문화·예술":
            temporaryChecked.culture = true;
            break;
          case "운동·액티비티":
            temporaryChecked.activity = true;
            break;
          case "요리·음식":
            temporaryChecked.food = true;
            break;
          case "여행":
            temporaryChecked.travel = true;
            break;
          case "성장·자기계발":
            temporaryChecked.grownup = true;
            break;
          case "공예·수공예":
            temporaryChecked.making = true;
            break;
          case "게임·오락":
            temporaryChecked.game = true;
            break;
          case "기타":
            temporaryChecked.etc = true;
            break;

          default:
            break;
        }
      });

      setChecked(temporaryChecked);
    }
  }, [isMemberInterest]);

  const onClickInterest = (e) => {
    //  console.log("setChecked");
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const [selectedInterest, setSelectedInterest] = useState([]);

  useEffect(() => {
    // if (checked) {
    //  console.log(" setSelectedInterest(selectedValue);");
    // console.log(checked);
    let arrKeys = Object.keys(checked);
    let arrValues = Object.values(checked);
    let selectedIndex = [];
    let selectedValue = [];
    let index = arrValues.indexOf(true);
    while (index !== -1) {
      selectedIndex.push(index);
      index = arrValues.indexOf(true, index + 1);
    }
    selectedIndex.forEach((v) => {
      selectedValue.push(arrKeys[v]);
    });
    //  console.log(selectedValue);
    setSelectedInterest(selectedValue);
    // }
  }, [checked]);

  // console.log("render");

  useEffect(() => {
    //  console.log("selectedInterest.forEach((e");
    let stringInterest = "";
    selectedInterest.forEach((e) => {
      switch (e) {
        case "culture":
          stringInterest += "문화·예술 ";
          break;
        case "activity":
          stringInterest += "운동·액티비티 ";
          break;
        case "food":
          stringInterest += "요리·음식 ";
          break;
        case "travel":
          stringInterest += "여행 ";
          break;
        case "grownup":
          stringInterest += "성장·자기계발 ";
          break;
        case "making":
          stringInterest += "공예·수공예 ";
          break;
        case "game":
          stringInterest += "게임·오락 ";
          break;
        case "etc":
          stringInterest += "기타 ";
          break;

        default:
          break;
      }
    });
    setMemberToUpdate({ ...memberToUpdate, memberInterest: stringInterest.slice(0, -1) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInterest]);

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
      setFile();
      setFileForm("");
    }
  };
  const clearImg = () => {
    //  console.log(file);

    setMemberToUpdate({ ...memberToUpdate, memberImg: "" });
    setFile("/images/DefaultProfileImageSystemName.jpg");
    //  console.log(file);
  };

  const handlePhoneNumber = (e) => {
    const regex = /^[0-9]{0,13}$/;
    if (regex.test(e.target.value)) {
      setMemberToUpdate({ ...memberToUpdate, memberPhone: e.target.value });
    }
  };

  const [checkedPhone, setCheckedPhone] = useState(member.memberPhone);
  // eslint-disable-next-line no-unused-vars
  const [originalPhone, setOriginalPhone] = useState(member.memberPhone);

  const Certification = () => {
    // console.log(joinForm.memberPhone);
    if (memberToUpdate.memberPhone === "") {
      return alert("연락처를 입력해주세요!");
    } else if (memberToUpdate.memberPhone === originalPhone) {
      return alert("기존 연락처와 동일합니다.");
    }
    axios
      .post("/checkPhone", memberToUpdate.memberPhone, {
        headers: { "Content-Type": "test/plain" },
      })
      .then((result) => {
        //     console.log(result.data);
        if (result.data === "fail") {
          alert("이미 등록된 전화번호입니다.");
        } else {
          const { IMP } = window;

          IMP.init("imp10391932");

          const data = {
            merchant_uid: `mid_${new Date().getTime()}`,
            company: "아임포트",
            carrier: "",
            phone: memberToUpdate.memberPhone,
          };
          IMP.certification(data, callback);

          function callback(response) {
            // eslint-disable-next-line no-unused-vars
            const { success, merchant_uid, error_msg } = response;
            //      console.log(response);
            if (success) {
              setCheckedPhone(memberToUpdate.memberPhone);
              //    setDisabled(false);
              alert("본인인증 성공");
              //   console.log(response);
              //  console.log(merchant_uid);
            } else {
              alert(`본인인증 실패: ${error_msg}`);
            }
          }
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          //alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          회원 정보 수정
        </Typography>
        {memberSaveimg === undefined ? (
          <Box
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box>
              <Avatar
                src={file !== "" ? file : memberSaveimg}
                sx={{ width: 150, height: 150, m: "auto", mb: 3, mt: 3 }}
              />
              <ButtonGroup>
                <Button variant="outlined" sx={{ pl: 5 }}>
                  <FormControlLabel
                    control={
                      <TextField
                        onChange={fileHandler}
                        type="file"
                        label="사진"
                        variant="standard"
                        style={{ display: "none" }}
                        inputProps={{ accept: "image/*" }}
                      />
                    }
                    label="프로필 수정하기"
                  />
                </Button>
                <Button variant="outlined" onClick={() => clearImg()}>
                  기본이미지 사용
                </Button>
              </ButtonGroup>
            </Box>

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
                {sessionStorage.getItem("classification") !== "k" ? (
                  <Grid item xs={12}>
                    <ChangePwdModal
                      onClick={() => setOpenChangePwd(() => true)}
                      openChangePwd={openChangePwd}
                      setOpenChangePwd={setOpenChangePwd}
                      // member={member}
                      lstate={lstate}
                    >
                      {" "}
                      비밀번호 수정
                    </ChangePwdModal>
                  </Grid>
                ) : null}
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
                <Grid item xs={12} sm={8}>
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
                    onChange={(e) => handlePhoneNumber(e)}
                  />
                </Grid>{" "}
                <Grid item xs={12} sm={4}>
                  <Button variant="outlined" style={{ width: "100%" }} onClick={Certification}>
                    본인인증
                  </Button>
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
                        onChange={(e) => onClickInterest(e)}
                        name="culture"
                        value="문화·예술"
                        icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                        checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                      />
                    }
                    label={<Typography style={{ position: "relative" }}>문화·예술</Typography>}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked.activity}
                        onChange={(e) => onClickInterest(e)}
                        name="activity"
                        value="운동·액티비티"
                        icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                        checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                      />
                    }
                    label={<Typography style={{ position: "relative" }}>운동·액티비티</Typography>}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked.food}
                        onChange={(e) => onClickInterest(e)}
                        name="food"
                        value="요리·음식"
                        icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                        checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                      />
                    }
                    label={<Typography style={{ position: "relative" }}>요리·음식</Typography>}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked.travel}
                        onChange={(e) => onClickInterest(e)}
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
                        onChange={(e) => onClickInterest(e)}
                        name="grownup"
                        value="성장·자기계발"
                        icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                        checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                      />
                    }
                    label={<Typography style={{ position: "relative" }}>성장·자기계발</Typography>}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked.making}
                        onChange={(e) => onClickInterest(e)}
                        name="making"
                        value="공예·수공예"
                        icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                        checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                      />
                    }
                    label={<Typography style={{ position: "relative" }}>공예·수공예</Typography>}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked.game}
                        onChange={(e) => onClickInterest(e)}
                        name="game"
                        value="게임·오락"
                        icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                        checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                      />
                    }
                    label={<Typography style={{ position: "relative" }}>게임·오락</Typography>}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked.etc}
                        onChange={(e) => onClickInterest(e)}
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
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
