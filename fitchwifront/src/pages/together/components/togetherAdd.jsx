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
import React, { useCallback, /*useEffect,*/ useState } from "react";
// import axios from "axios";

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

const Add = () => {
  // let formdata = new FormData();

  // const [fileForm, setFileForm] = useState("");
  // const [openForm, setOpenForm] = useState({})
  const [insertForm, setInsertForm] = useState({
    
  });

  // useEffect(() => {
  //   preview();

  //   return () => preview();
  // });

  // const preview = () => {
  //   if (!fileForm) return false;
  //   const imgEl = document.querySelector(".img_box");
  //   const render = new FileReader();

  //   render.onload = () =>
  //     (imgEl.style.backgroundImage = `url(${render.result})`);
  //   render.readAsDataURL(fileForm[0]);
  //   console.log(render);
  // };

  // const onLoadFile = useCallback((event) => {
  //   const file = event.target.files;
  //   setFileForm(file);
  // }, []);

  const sendTogether = (e) => {
  //   formdata.append(
  //     "data",
  //     new Blob([JSON.stringify(insertForm)], { type: "application/json" })
  //   );
  //   formdata.append("uploadImage", fileForm[0]);

    // const config = {
    //   headers: { "Content-Type": "multipart/form-data" },
    // };
  };

  const [open, setOpen] = useState(false);

  const handleChange = useCallback(
    (event) => {
      const insertObj = {
        ...insertForm,
        [event.target.name]: event.target.value,
      };
      setInsertForm(insertObj);
      console.log(insertForm);
    },
    [insertForm]
  );

  const handleClose = () => {
    setOpen(false);
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
        sx={{mt:5}}
      >
        <Box width={800} height={700} bgcolor="white" p={3} borderRadius={5} sx={{mt:5, overflowY:"auto" }} >
        <Typography variant="h6" color="gray" textAlign="center">
          함께해요 개설
        </Typography>
        <UserBox>
          <Avatar alt={'profil.memberImg'} sx={{ width: 30, height: 30 }} />
          <Typography fontWeight={500} variant="span">
            {sessionStorage.getItem('id')}
          </Typography>
        </UserBox>
        <hr />
        <TextField fullWidth label="모임명" sx={{mt:3}} id="fullWidth" />
        <TextField fullWidth label="모이는 일자" sx={{mt:3}} type="date" id="fullWidth" focused color="grey"/>
        <TextField fullWidth label="최대참여인원" sx={{mt:3}} type="number" id="fullWidth" />
        <FormControl sx={{ mt: 2}} fullWidth>
            <InputLabel>
              모임카테고리선정
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={insertForm.feedClassificationcode}
              name="feedClassificationcode"
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
        <TextField fullWidth label="모집신청 마감일을 입력헤주세요" color="grey" sx={{mt:3}} focused type="date" id="fullWidth" />
        <TextField fullWidth label="모이는 장소의 주소" sx={{mt:3}} id="fullWidth" />
        <TextField fullWidth label="시설 이용료" sx={{mt:3}} id="fullWidth" />
        <TextField fullWidth label="참가비" type="number" sx={{mt:3}} id="fullWidth" />
        <FormControl sx={{ mt: 2}} fullWidth>
            <InputLabel>
              가입유형
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={insertForm.feedClassificationcode}
              name="feedClassificationcode"
              onChange={handleChange}
              label="가입유형"
            >
              <MenuItem value="선착순">선착순</MenuItem>
              <MenuItem value="승인제">승인제</MenuItem>
            </Select>
          </FormControl>
        <TextField fullWidth label="모임대표사진" type="file" focused sx={{mt:3}} id="fullWidth" color="grey" />
        <TextField fullWidth label="유저 신청시 질문내용 작성(승인제)" sx={{mt:3}} id="fullWidth" />
        <TextField fullWidth label="모임 소개 말" sx={{mt:3}} id="fullWidth" />
        <TextField fullWidth label="태그" sx={{mt:3}} id="fullWidth" />
        <Button onClick={sendTogether} variant={"contained"} sx={{mt:2,mr:4}}>개설하기</Button>
        <Button onClick={handleClose} variant={"contained"} sx={{mt:2}}>취소</Button>
        </Box>
      </StyleModal>
    </>
  );
};

export default Add;
