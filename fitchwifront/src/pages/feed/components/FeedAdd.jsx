import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
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
import { useNavigate } from "react-router-dom";

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

const imgEl = document.querySelector(".img_box");

const FeedAdd = ({ memberEmail, refreshFeed }) => {
  console.log(memberEmail);
  let formdata = new FormData();
  const nav = useNavigate();

  const [fileForm, setFileForm] = useState("");
  const [open, setOpen] = useState(false);
  const [profil, setProfil] = useState({});
  const [insertForm, setInsertForm] = useState({
    memberEmail: {
      memberEmail: memberEmail,
    },
    feedCategory: "",
    feedContent: "",
    feedClassificationcode: "",
    feedDate: `${new Date().getTime()}`,
  });

  useEffect(() => {
    preview();

    return () => preview();
  });

  useEffect(() => {
    if (memberEmail !== null) {
      axios
        .get("/getMemberInfo", { params: { userId: memberEmail } })
        .then((response) => {
          setProfil(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [memberEmail]);

  const preview = () => {
    if (!fileForm) return false;
    const render = new FileReader();

    render.onload = () =>
      (imgEl.style.backgroundImage = `url(${render.result})`);
    render.readAsDataURL(fileForm[0]);
  };

  const onLoadFile = useCallback((event) => {
    const files = event.target.files;
    setFileForm(files);
    console.log(files);
  }, []);

  const sendFeed = (event) => {
    formdata.append(
      "data",
      new Blob([JSON.stringify(insertForm)], { type: "application/json" })
    );

    for (let i = 0; i < fileForm.length; i++) {
      formdata.append("uploadImage", fileForm[i]);
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("/insertfeed", formdata, config)
      .then((response) => {
        if (response.data === "ok") {
          setOpen(false);
          alert("성공");
          refreshFeed();
        } else {
          alert("실패");
        }
      })
      .catch((error) => console.log(error));
  };

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

  const insertfeed = () => {
    if (memberEmail === null) {
      alert("로그인이 필요한 서비스입니다.");
      nav("/login");
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <Tooltip
        onClick={insertfeed}
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
      >
        <Box width={800} height={600} bgcolor="white" p={3} borderRadius={5}>
          <Typography variant="h6" color="gray" textAlign="center">
            피드 작성
          </Typography>
          <UserBox>
            <Avatar alt={profil.memberImg} sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">
              {profil.memberName}
            </Typography>
          </UserBox>
          <hr />
          <FormControl sx={{ mt: 2, minWidth: 200, minHeight: 100 }}>
            <InputLabel id="demo-simple-select-autowidth-label" margin="dense">
              함께해요 후기 리스트
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={insertForm.feedClassificationcode}
              name="feedClassificationcode"
              onChange={handleChange}
              label="함께해요 후기 리스트"
            >
              <MenuItem value="">
                <em>선택</em>
              </MenuItem>
              <MenuItem value="함께해요 1의 코드">함께해요 1</MenuItem>
              <MenuItem value="함께해요 2의 코드">함께해요 2</MenuItem>
              <MenuItem value="함께해요 3의 코드">함께해요 3</MenuItem>
            </Select>
          </FormControl>

          <br />

          <FormControl sx={{ mt: 2, minWidth: 300, minHeight: 100 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              주제
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={insertForm.feedCategory}
              name="feedCategory"
              onChange={handleChange}
              label="주제"
            >
              <MenuItem value="">
                <em>선택</em>
              </MenuItem>
              <MenuItem value="문화">문화</MenuItem>
              <MenuItem value="스포츠">스포츠</MenuItem>
              <MenuItem value="자기개발">자기계발</MenuItem>
            </Select>
          </FormControl>

          <br />
          <div>
            프로필 이미지 :{" "}
            <input type="file" name="feedImg" onChange={onLoadFile} multiple />
            <div className="img_box" style={{ height: 100 }}>
              <img src="" alt="" />
            </div>
          </div>
          <TextField
            value={insertForm.feedContent}
            onChange={handleChange}
            autoFocus
            margin="dense"
            name="feedContent"
            label="피드 내용을 입력하세요(2000자 이내)"
            type="text"
            fullWidth
            variant="standard"
          />
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleClose} sx={{ width: "100px" }}>
              취소하기
            </Button>
            <Button onClick={sendFeed}>작성하기</Button>
          </ButtonGroup>
        </Box>
      </StyleModal>
    </>
  );
};

export default FeedAdd;
