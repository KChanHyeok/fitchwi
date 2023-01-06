import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Select,
  styled,
  TextField,
  Typography,
  Stack,
  Grid
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import React, { useCallback, useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";

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
  facilitiesManager: "" ,
  facilitiesName: "",
  facilitiesPhone: "",
  facilitiesPosition: "",
  facilitiesPrice: 0
}

const TogetherAdd = ({ data, refreshTogetherList }) => {

  const nav = useNavigate();
  const formDate = new FormData();
  const [fileForm, setFileForm] = useState("");
  const [firstDateOpen, setFirstDateOpen] = useState(true);
  const [secondDateOpen, setSecondDateOpen] = useState(true);
  
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
  
  useEffect(() => {
    preview();
    return () => preview();
  });
  
  const preview = () => {
    if (!fileForm) return false

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
    formDate.append("data", new Blob([JSON.stringify(insertForm)], { type: "application/json" }));
    formDate.append("uploadImage", fileForm[0]);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    axios.post("/addTogether",formDate, config)
    .then((res)=> {
      alert(res.data);
      nav("/together");
      refreshTogetherList(); 
    }).catch((error) => {
      console.log(error)
    })

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

  const imgBoxStyle = {
    marginTop: "20px",
    width: "300px",
    height: "200px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  // const disableDates = () => {
  //   const day = date.date();
  //       console.log(moment(bookedDays[0]).format("DD"));
  //       // for (let i = 0; i < bookedDays.length; i++) {
  //       // moment(bookedDays[i]).format("DD");
  //       // }
  //       for (let i = 0; i < bookedDays.length; i++) {
  //           if (day === moment(bookedDays[i]).format("DD") * 1) {
  //           return true;
  //           }
  //       }
  // }


  return (
    <Stack height={800} flex={7} p={3}>
      <Box bgcolor="white" sx={{ mb: 5 }} component="form" onSubmit={sendTogether}>
        <Typography variant="h6" color="gray" textAlign="center">
          함께해요 개설
        </Typography>
        <UserBox>
          <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
          <Typography fontWeight={500} variant="span">
            {sessionStorage.getItem("id")}
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
        <TextField
          fullWidth
          label="최대참여인원"
          sx={{ mt: 3 }}
          type="number"
          id="fullWidth"
          value={insertForm.togetherMax}
          onChange={handleChange}
          name="togetherMax"
          required
        />
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
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h5" sx={{mt:3}}>
              시설을 골라주세요
            </Typography>
            <List
              sx={{ width: '100%', maxWidth: 360, maxHeight:200, mt:3, border:"1px solid lightgray", borderRadius:1.2, overflowY:"auto" }}
              aria-label="contacts"
            >
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{
                  setInsertForm({
                    ...insertForm,
                    facilitiesCode:facilities,
                    togetherPosition:facilities.facilitiesPosition
                  })
                }}>
                  <ListItemText inset primary="이용안함" />
                </ListItemButton>
              </ListItem>
              {data.filter(data=>data.facilitiesCode!==0).map(data=>(
                <ListItem disablePadding key={data.facilitiesCode}>
                <ListItemButton onClick={()=> {
                  setInsertForm({
                    ...insertForm,
                    facilitiesCode:data,
                    togetherPosition:data.facilitiesPosition
                  })
                }}>
                  <ListItemText inset primary={`${data.facilitiesName}  -  ${data.facilitiesPosition}`} />
                </ListItemButton>
              </ListItem>
              ))}
              
            </List>
          </Grid>
          <Grid item xs>
            <Box component="div" sx={{ mt:10 ,height:200}}>
                {insertForm.facilitiesCode.facilitiesCode===0 ? <Typography variant="h6" component="div">시설 이용안함</Typography> :
                <Typography variant="h6" component="div">
                  시설명 : {insertForm.facilitiesCode.facilitiesName}<br/>
                  시설 위치 : {insertForm.facilitiesCode.facilitiesPosition}<br/>
                  시설 1인 이용료 : {insertForm.facilitiesCode.facilitiesPrice}원<br/>
                  시설 등급 : {insertForm.facilitiesCode.facilitiesGrade}<br/>
                  시설담당자 : {insertForm.facilitiesCode.facilitiesManager}<br/>
                  시설담당자연락처 : {insertForm.facilitiesCode.facilitiesPhone}
                </Typography> 
                }
            </Box>
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="모이는 장소의 주소"
          sx={{ mt: 3 }}
          id="fullWidth"
          value={insertForm.togetherPosition}
          onChange={handleChange}
          name="togetherPosition"
          required
        />
        <Grid container direction="row"  spacing={6}>
            <Grid xs={2} sm={2} md={4} item>
              <TextField
                label="모이는 일자"
                sx={{ mt: 3 }}
                type="text"
                value={insertForm.togetherDate}
                focused
                fullWidth
                color="grey"
                required
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  label="모이는 일자"
                  disablePast
                  value={insertForm.togetherDate}
                  onChange={(e)=>{
                    setInsertForm({
                      ...insertForm,
                      togetherDate: moment(e.$d).format("YYYY-MM-DD"),
                      togetherRecruitStartDate: "",
                      togetherRecruitEndDate:""
                    });
                    setFirstDateOpen(false)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={2} sm={4} md={4} item>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                displayStaticWrapperAs="desktop"
                label="모집신청 시작일"
                disablePast
                value={insertForm.togetherRecruitStartDate}
                maxDate={moment(insertForm.togetherDate).subtract(1,"days").format()}
                onChange={(e)=>{
                  setInsertForm({
                    ...insertForm,
                    togetherRecruitStartDate: moment(e.$d).format("YYYY-MM-DD"),
                    togetherRecruitEndDate:""
                  });
                  setSecondDateOpen(false)
                }}
                disabled={firstDateOpen}
                renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={2} sm={4} md={4} item>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                displayStaticWrapperAs="desktop"
                label="모집신청 마감일"
                disablePast
                value={insertForm.togetherRecruitEndDate}
                minDate={insertForm.togetherRecruitStartDate}
                maxDate={moment(insertForm.togetherDate).subtract(1, "days").format()}
                // shouldDisableDate={ }
                onChange={(e)=>{
                  setInsertForm({
                    ...insertForm,
                    togetherRecruitEndDate:moment(e.$d).format("YYYY-MM-DD")
                  });
                }}
                disabled={secondDateOpen}
                renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
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
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Box sx={{marginTop: "20px", width: "300px", height: "200px", textAlign:"center",lineHeight:5, border:"1px dashed grey"}}>
              <Typography variant="h5" sx={{mt:3}}>대표사진을 넣어주세요</Typography>
              <Button variant="contained" component="label" size="large">
                Upload
                <TextField
                  label="모임대표사진"
                  type="file"
                  accept="image/*"
                  focused
                  sx={{ mt: 3, display:"none"}}
                  color="grey"
                  onChange={onLoadFile}
                  required
                />
              </Button>
            </Box>
          </Grid>
          <Grid item xs>
            <Box style={imgBoxStyle} className="img_box">
            </Box>
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="유저 신청시 질문내용 작성(승인제)"
          sx={{ mt: 3 }}
          name="togetherInquiry"
          value={insertForm.togetherInquiry}
          onChange={handleChange}
          id="fullWidth"
        />
        <TextField
          fullWidth
          label="모임 소개 말"
          sx={{ mt: 3}}
          value={insertForm.togetherContent}
          name="togetherContent"
          multiline
          rows={4}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="태그"
          sx={{ mt: 3 }}
          name="togetherTagContent"
          onChange={handleChange}
          required
          value={insertForm.togetherTagContent}
        />
        
        <Button type="submit" variant={"contained"} sx={{ mt: 2, mr: 4 }}>개설하기</Button>
        <Button href="/together" type="submit" variant={"contained"} sx={{ mt: 2 }}>
          취소
        </Button>
      </Box>
    </Stack>
  );
};

export default TogetherAdd;
