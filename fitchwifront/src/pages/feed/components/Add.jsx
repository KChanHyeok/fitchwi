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
import React, { useState } from "react";

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
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const handleChange = (event) => {
    setReason(event.target.value);
  };

  const handleChange2 = (event) => {
    setCategory(event.target.value);
  };

  const handleChange3 = (event) => {
    setTags(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeclration = () => {
    if (category === "" || tags === "" || contents === "" || reason === "") {
      return alert("공백 없이 입력하세요.");
    }

    const feedInfo = {
      feedcode: `${new Date().getTime()}`,
      memberEmail: "kilehide@naver.com",
      category: category,
      tags: tags,
      contents: contents,
      reason: reason,
      date: `${new Date().getTime()}`,
      feedImg: "원래이미지이름",
      feedSaveImg: "저장된이미지이름",
    };

    setOpen(false);
    console.log(feedInfo);
    alert("피드가 작성되었습니다.");
  };
  const handleInput = (event) => {
    setContents(event.currentTarget.value);
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
      >
        <Box width={800} height={600} bgcolor="white" p={3} borderRadius={5}>
          <Typography variant="h6" color="gray" textAlign="center">
            피드 작성
          </Typography>
          <UserBox>
            <Avatar alt="Remy Sharp" sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">
              작성자 이름
            </Typography>
          </UserBox>
          <hr />
          <FormControl sx={{ mt: 2, minWidth: 100, minHeight: 100 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              후기
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={reason}
              onChange={handleChange}
              autoWidth
              label="목록"
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
              value={category}
              onChange={handleChange2}
              autoWidth
              label="목록"
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

          <FormControl sx={{ mt: 2, minWidth: 300, minHeight: 100 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              태그
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={tags}
              onChange={handleChange3}
              autoWidth
              label="태그"
            >
              <MenuItem value="영화">#영화</MenuItem>
              <MenuItem value="전시회">#전시회</MenuItem>
              <MenuItem value="사진전">#사진전</MenuItem>
            </Select>
          </FormControl>

          <TextField
            value={contents}
            onChange={handleInput}
            autoFocus
            margin="dense"
            id="name"
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
            <Button onClick={handleDeclration}>작성하기</Button>
          </ButtonGroup>
        </Box>
      </StyleModal>
    </>
  );
};

export default Add;
