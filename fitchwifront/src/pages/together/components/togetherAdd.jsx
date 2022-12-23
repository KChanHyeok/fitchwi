import {
  Avatar,
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Modal,
  Select,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const nowdate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();

const StyleModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const TogetherAdd = ({ data }) => {
  const [insertForm, setInsertForm] = useState({
    memberEmail: {
      memberEmail: sessionStorage.getItem("id"),
    },
    facilitiesCode: "",
    togetherOpenedDate: nowdate, // 함께해요 개설일 당일
    togetherTitle: "",
    togetherCategory: "",
    togetherPosition: "",
    togetherDate: "",
    togetherMax: 2,
    togetherContent: "",
    togetherRecruitStartDate: "", // 모집 시작일
    togetherRecruitEndDate: "", // 모집 마감일
    togetherType: "", //가입 유형
    togetherInquiry: "", // 함께해요 가입 질문
    togetherPrice: 0, // 함께해요장이 지정한 1인 참여금액
    togetherTagContent: "", //태그 내용
  });
  const formDate = new FormData();
  const [fileForm, setFileForm] = useState("");
  const imgEl = document.querySelector(".img_box");
  useEffect(() => {
    preview();

    return () => preview();
  });

  const preview = () => {
    if (!fileForm) return false;
    const render = new FileReader();

    render.onload = () => (imgEl.style.backgroundImage = `url(${render.result})`);
    render.readAsDataURL(fileForm[0]);
    console.log(render);
  };

  const onLoadFile = useCallback((event) => {
    const file = event.target.files;
    setFileForm(file);
  }, []);

  const sendTogether = (e) => {
    formDate.append("data", new Blob([JSON.stringify(insertForm)], { type: "application/json" }));
    formDate.append("uploadImage", fileForm[0]);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("/addTogether", formDate, config)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    alert("개설완료");
  };

  const [open, setOpen] = useState(false);

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

  const handleClose = () => {
    setOpen(false);
  };

  const imgBoxStyle = {
    marginTop: "20px",
    width: "300px",
    height: "200px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Add"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyleModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ mt: 5 }}
      >
        <Box width={800} height={700} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>
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
            onChange={handleChange}
            name="togetherTitle"
          />
          <TextField
            fullWidth
            label="모이는 일자"
            sx={{ mt: 3 }}
            type="date"
            id="fullWidth"
            onChange={handleChange}
            name="togetherDate"
            focused
            color="grey"
          />
          <TextField
            fullWidth
            label="최대참여인원"
            sx={{ mt: 3 }}
            type="number"
            id="fullWidth"
            onChange={handleChange}
            name="togetherMax"
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
          <TextField
            fullWidth
            label="모집신청 시작일을 입력헤주세요"
            sx={{ mt: 3 }}
            type="date"
            id="fullWidth"
            onChange={handleChange}
            name="togetherRecruitStartDate"
            focused
            color="grey"
          />
          <TextField
            fullWidth
            label="모집신청 마감일을 입력헤주세요"
            color="grey"
            sx={{ mt: 3 }}
            focused
            type="date"
            onChange={handleChange}
            name="togetherRecruitEndDate"
            id="fullWidth"
          />
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel>시설이용료</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={insertForm.facilitiesCode}
              name="facilitiesCode"
              onChange={handleChange}
              label="시설이용료"
            >
              <MenuItem value="" disabled sx={{ display: "none" }}>
                <em>-</em>
              </MenuItem>
              {data.map((data) => (
                <MenuItem value={data} key={data.facilitiesCode}>
                  {data.facilitiesName}
                  <br />
                  가격 : {data.facilitiesPrice}원<br />
                  담당자 : {data.facilitiesGrade}
                  <br />
                  연락처 : {data.facilitiesPhone}
                  <br />
                  위치 : {data.facilitiesPosition}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="모이는 장소의 주소"
            sx={{ mt: 3 }}
            id="fullWidth"
            onChange={handleChange}
            name="togetherPosition"
          />
          <TextField
            fullWidth
            label="1인당 참가비"
            type="number"
            sx={{ mt: 3 }}
            id="fullWidth"
            name="togetherPrice"
            onChange={handleChange}
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
            >
              <MenuItem value="선착순">선착순</MenuItem>
              <MenuItem value="승인제">승인제</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="모임대표사진"
            type="file"
            focused
            sx={{ mt: 3 }}
            id="fullWidth"
            color="grey"
            onChange={onLoadFile}
          />
          <div style={imgBoxStyle} className="img_box">
            <img src="" alt="" />
          </div>
          <TextField
            fullWidth
            label="유저 신청시 질문내용 작성(승인제)"
            sx={{ mt: 3 }}
            name="togetherInquiry"
            onChange={handleChange}
            id="fullWidth"
          />
          <TextField
            fullWidth
            label="모임 소개 말"
            sx={{ mt: 3 }}
            id="fullWidth"
            name="togetherContent"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="태그"
            sx={{ mt: 3 }}
            id="fullWidth"
            name="togetherTagContent"
            onChange={handleChange}
          />
          <Button onClick={sendTogether} variant={"contained"} sx={{ mt: 2, mr: 4 }}>
            개설하기
          </Button>
          <Button onClick={handleClose} variant={"contained"} sx={{ mt: 2 }}>
            취소
          </Button>
        </Box>
      </StyleModal>
    </>
  );
};

export default TogetherAdd;
