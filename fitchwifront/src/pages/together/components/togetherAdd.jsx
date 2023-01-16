import { Avatar, Box, FormControl, InputLabel, MenuItem, Button, Select, styled, TextField, Typography, Stack, Grid, Paper, Chip, InputAdornment } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useCallback, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import { useDaumPostcodePopup } from "react-daum-postcode";
import MapIcon from "@mui/icons-material/Map";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import CircularProgress from '@mui/material/CircularProgress';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Swal from "sweetalert2";

const nowdate = moment().format("YYYY-MM-DD");

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const facilities = {
  facilitiesCode: 0,
  facilitiesGrade: "",
  facilitiesManager: "",
  facilitiesName: "",
  facilitiesPhone: "",
  facilitiesPosition: "",
  facilitiesPrice: 0,
};

const TogetherAdd = ({ facilitieList, refreshTogetherList }) => {
  const nav = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formDate = new FormData();
  const [fileForm, setFileForm] = useState("");
  const [firstDateOpen, setFirstDateOpen] = useState(true);
  const [secondDateOpen, setSecondDateOpen] = useState(true);
  const [load, setLoad] = useState(false);
  const [noday, setNoday] = useState([])

  const imgEl = document.querySelector(".img_box");

  const [insertForm, setInsertForm] = useState({
    memberEmail: {
      memberEmail: sessionStorage.getItem("id"),
    },
    facilitiesCode: facilities,
    togetherOpenedDate: nowdate, // 함께해요 개설일 당일
    togetherTitle: "",
    togetherCategory: "",
    togetherPosition: "",
    togetherDate: "",
    togetherMax: 0,
    togetherContent: "",
    togetherRecruitStartDate: "", // 모집 시작일
    togetherRecruitEndDate: "", // 모집 마감일
    togetherType: "", //가입 유형
    togetherInquiry: "", // 함께해요 가입 질문
    togetherPrice: 0, // 함께해요장이 지정한 1인 참여금액
    togetherTagContent: "", //태그 내용
  }); 

  const imgBoxStyle = {
    marginTop: "20px",
    width: "300px",
    height: "200px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const getMemberInfo = useCallback(
    (id) => {
      axios
        .get("/getMemberInfo", { params: { userId: id } })
        .then((res) =>
          setInsertForm({
            ...insertForm,
            memberEmail: res.data,
          })
        )
        .catch((error) => console.log(error));
    },
    [insertForm]
  );

  useEffect(() => {
    preview();
    if (!insertForm.memberEmail.memberSaveimg) {
      getMemberInfo(sessionStorage.getItem("id"));
    }
    return () => preview();
  });

  const getNodayList = useCallback(
    (facilitiesCode) => {
      axios.get("/getNodayList", { params: { facilitiesCode: facilitiesCode } }).then((res) => {
        setNoday(res.data)
      }).catch((error)=> setNoday([]));
    },[])
  


  const preview = () => {
    if (fileForm.length === 0) {
      return false;
    }

    const render = new FileReader();

    render.readAsDataURL(fileForm[0]);
    render.onload = () => (imgEl.style.backgroundImage = `url(${render.result})`);
  };

  const onLoadFile = useCallback((event) => {
    const file = event.target.files;
    setFileForm(file);
  }, []);

  const sendTogether = (e) => {
    e.preventDefault();
    setLoad(true)
    if (insertForm.togetherMax < 2) {
      setLoad(false)
      return swAlert("최소 2명 이상이여야 합니다.", "warning")
    }
      
    formDate.append("data", new Blob([JSON.stringify(insertForm)], { type: "application/json" }));
    formDate.append("uploadImage", fileForm[0]);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    axios
      .post("/addTogether", formDate, config)
      .then((res) => {
        setLoad(false)
        swAlert(res.data,"success");
        nav("/together");
        refreshTogetherList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = useCallback(
    (event) => {
      const insertObj = {
        ...insertForm,
        [event.target.name]: event.target.value,
      };
      setInsertForm(insertObj);
    },
    [insertForm]
  );

  


  const disableDates = (date) => {
    const day = moment(date.$d).format("YYYY-MM-DD")
        for (let i = 0; i < noday.length; i++) {
            if (day === moment(noday[i]).format("YYYY-MM-DD")) {
            return true;
            }
        }
  }
  
  const open = useDaumPostcodePopup(
    "http://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );


  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setInsertForm({
      ...insertForm,
      togetherPosition: fullAddress,
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };



  // 태그 추가

  const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
  }));
  const [chipData, setChipData] = React.useState([]);
  const [count, setCount] = useState(0);
  const addTag = useCallback(
    (e) => {
      setCount(count+1);
      const chipObj = {
        key : count,
        label : insertForm.togetherTagContent
      }
      setChipData(chipData.concat(chipObj))
      setInsertForm({...insertForm,
        togetherTagContent:""
      })
    },[chipData, count, insertForm])

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const saveClick = () => {
    setInsertForm({
      ...insertForm,
      togetherTagContent:chipData.map(data=>data.label).join(" ")
    })
  }

  const swAlert = (contentText, icon ) => {
    Swal.fire({
      title: "알림",
      text: contentText,
      icon: icon,
      confirmButtonText: "확인",
      confirmButtonColor: "#ff0456",
    });
  };


  return (
    <Stack sx={{ width: 1000, height: 800, margin: "auto" }} flex={7} p={3}>
      {load ? 
      <Box>
        <CircularProgress/>
      </Box>
      :<Box bgcolor="white" sx={{ mb: 5 }} component="form" onSubmit={sendTogether}>
        <Typography variant="h6" color="gray" textAlign="center">
          함께해요 개설
        </Typography>
        <UserBox>
          {insertForm.memberEmail.memberSaveimg && (
            <Avatar src={`${insertForm.memberEmail.memberSaveimg}`} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
          )}

          <Typography fontWeight={500} variant="span">
            {sessionStorage.getItem("nickName")}
          </Typography>
        </UserBox>
        <hr />
        <TextField
          fullWidth
          label="모임명"
          sx={{ mt: 3 }}
          id="fullWidth"
          value={insertForm.togetherTitle}
          onChange={handleChange}
          name="togetherTitle"
          required
        />
        <TextField fullWidth label="최대참여인원" sx={{ mt: 3 }} type="number" minRows={2} onChange={handleChange} name="togetherMax" required />
        <FormControl sx={{ mt: 2 }} fullWidth>
          <InputLabel>모임카테고리선정</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={insertForm.togetherCategory}
            name="togetherCategory"
            onChange={handleChange}
            label="모임카테고리선정"
            required
          >
            <MenuItem value="문화·예술">문화·예술</MenuItem>
            <MenuItem value="운동·액티비티">운동·액티비티</MenuItem>
            <MenuItem value="요리·음식">요리·음식</MenuItem>
            <MenuItem value="여행">여행</MenuItem>
            <MenuItem value="성장·자기계발">성장·자기계발</MenuItem>
            <MenuItem value="공예·수공예">공예·수공예</MenuItem>
            <MenuItem value="게임·오락">게임·오락</MenuItem>
            <MenuItem value="기타">기타</MenuItem>
          </Select>
        </FormControl>

        {/* 시설 내역과 정보 제공 */}
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h5" sx={{ mt: 3 }}>
              시설을 골라주세요
            </Typography>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                maxHeight: 180,
                mt: 3,
                border: "1px solid lightgray",
                borderRadius: 1.2,
                overflowY: "auto",
              }}
              aria-label="contacts"
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setInsertForm({
                      ...insertForm,
                      facilitiesCode: facilities,
                      togetherPosition: facilities.facilitiesPosition,
                    });
                    getNodayList(facilitieList.facilitiesCode);
                  }}
                >
                  <ListItemText inset primary="이용안함" />
                </ListItemButton>
              </ListItem>

              {facilitieList.filter(data=>data.facilitiesCode!==0).map(data=>(
                <ListItem disablePadding key={data.facilitiesCode}>
                <ListItemButton onClick={()=> {
                  setInsertForm({
                    ...insertForm,
                    facilitiesCode:data,
                    togetherPosition:data.facilitiesPosition
                  });
                  getNodayList(data.facilitiesCode);
                }}>
                  <ListItemText inset primary={`${data.facilitiesName}`} />
                </ListItemButton>
              </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs>
            <Box component="div" sx={{ mt: 10, height: 230 }}>
              {insertForm.facilitiesCode.facilitiesCode === 0 ? (
                <Typography variant="h6" component="div">
                  시설 이용안함
                </Typography>
              ) : (
                <Typography variant="h6" component="div">
                  <ApartmentIcon />
                  시설명 : {insertForm.facilitiesCode.facilitiesName}
                  <br />
                  <MapIcon />
                  시설 위치 : {insertForm.facilitiesCode.facilitiesPosition}
                  <br />
                  <AttachMoneyIcon />
                  시설 1인 이용료 : {insertForm.facilitiesCode.facilitiesPrice}원
                  <br />
                  <SentimentSatisfiedAltRoundedIcon />
                  시설 등급 : {insertForm.facilitiesCode.facilitiesGrade}
                  <br />
                  <FaceRoundedIcon />
                  시설담당자 : {insertForm.facilitiesCode.facilitiesManager}
                  <br />
                  <AddIcCallRoundedIcon />
                  시설담당자연락처 : {insertForm.facilitiesCode.facilitiesPhone}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* 주소 입력 란 */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            fullWidth
            label="모이는 장소의 주소"
            id="fullWidth"
            value={insertForm.togetherPosition}
            onChange={handleChange}
            name="togetherPosition"
            required
          />
          <Button variant="outlined" onClick={handleClick} style={{ width: "40%", lineHeight: 3 }}>
            주소 검색
          </Button>
        </Stack>

        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
              <TextField label="모이는 일자" sx={{ mt:3 }} value={insertForm.togetherDate} focused fullWidth color="grey" required />
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                label="모이는 일자"
                disablePast
                shouldDisableDate={disableDates}
                value={insertForm.togetherDate}
                onChange={(e) => {
                  setInsertForm({
                    ...insertForm,
                    togetherDate: moment(e.$d).format("YYYY-MM-DD"),
                    togetherRecruitStartDate: "",
                    togetherRecruitEndDate: "",
                  });
                  setFirstDateOpen(false);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="모집신청 시작일을 입력헤주세요"
                sx={{ mt: 3 }}
                type="text"
                value={insertForm.togetherRecruitStartDate}
                onChange={handleChange}
                name="togetherRecruitStartDate"
                focused
                required
                color="grey"
              />
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                label="모집신청 시작일"
                disablePast
                value={insertForm.togetherRecruitStartDate}
                maxDate={moment(insertForm.togetherDate).subtract(1, "days").format()}
                onChange={(e) => {
                  setInsertForm({
                    ...insertForm,
                    togetherRecruitStartDate: moment(e.$d).format("YYYY-MM-DD"),
                    togetherRecruitEndDate: "",
                  });
                  setSecondDateOpen(false);
                }}
                disabled={firstDateOpen}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="모집신청 마감일을 입력헤주세요"
                color="grey"
                sx={{ mt: 3 }}
                focused
                type="text"
                name="togetherRecruitEndDate"
                value={insertForm.togetherRecruitEndDate}
                required
              />
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                label="모집신청 마감일"
                disablePast
                value={insertForm.togetherRecruitEndDate}
                minDate={insertForm.togetherRecruitStartDate}
                maxDate={moment(insertForm.togetherDate).subtract(1, "days").format()}
                // shouldDisableDate={ }
                onChange={(e) => {
                  setInsertForm({
                    ...insertForm,
                    togetherRecruitEndDate: moment(e.$d).format("YYYY-MM-DD"),
                  });
                }}
                disabled={secondDateOpen}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </LocalizationProvider>
        </Stack>

        <TextField
          fullWidth
          label="1인당 참가비(0원입력시 무료로 진행)"
          type="number"
          sx={{ mt: 3 }}
          id="fullWidth"
          value={insertForm.togetherPrice}
          name="togetherPrice"
          onChange={handleChange}
          required
        />
        <FormControl sx={{ mt: 2 }} fullWidth>
          <InputLabel>가입유형</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={insertForm.togetherType}
            name="togetherType"
            onChange={handleChange}
            label="가입유형"
            required
          >
            <MenuItem value="선착순">선착순</MenuItem>
            <MenuItem value="승인제">승인제</MenuItem>
          </Select>
          </FormControl>
          
        {insertForm.togetherType==="선착순" ? null:<TextField
          fullWidth
          label="유저 신청시 질문내용 작성(승인제)"
          sx={{ mt: 3 }}
          name="togetherInquiry"
          value={insertForm.togetherInquiry}
          onChange={handleChange}
          id="fullWidth"
          />}
        <Stack>
          <Box style={imgBoxStyle} className="img_box"></Box>
          <Typography variant="h7" sx={{ mt: 3 }}>
            대표사진을 넣어주세요
            <Button sx={{ ml: 4 }} variant="contained" component="label" size="large">
              Upload
              <input
                label="모임대표사진"
                type="file"
                hidden
                sx={{ mt: 3 }}
                color="grey"
                onChange={onLoadFile}
                required
                accept="image/*"
              />
            </Button>
          </Typography>
        </Stack>
        <TextField
          fullWidth
          label="모임 소개 말"
          sx={{ mt: 3 }}
          value={insertForm.togetherContent}
          name="togetherContent"
          multiline
          rows={4}
          onChange={handleChange}
          required
        />
          <Stack
            direction="row"
            sx={{ mt: 3, height: 55 }}
            spacing={3}
          >
          <TextField
            fullWidth
            label="태그"
            name="togetherTagContent"
            onChange={handleChange}
            value={insertForm.togetherTagContent}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" >
                  {chipData.map((data) => {
              let icon;
              if (data.label === 'React') {
                icon = <TagFacesIcon />;
              }
              return (
                <ListItem key={data.key} style={{listStyle:"none"}}>
                  <Chip
                    icon={icon}
                    label={data.label}
                    onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                  />
                </ListItem>
              );
            })}
                </InputAdornment>
              ),
            }}
            />
          <Button variant={"contained"} onClick={addTag}>추가</Button>
          </Stack>
          <Typography sx={{mt:3, float:"right"}}>
            <Button type="submit" onClick={saveClick} variant={"contained"} sx={{ mt: 2, mr: 4, mb: 4 }}>
              개설하기
            </Button>
            <Button href="/together" type="submit" variant={"contained"} sx={{ mt: 2, mb: 4 }}>
              취소
            </Button>
          </Typography>
      </Box>}
    </Stack>
  );
};

export default TogetherAdd;
