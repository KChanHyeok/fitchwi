import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import MultipleSelectChip from "./MultipleSelectChip";
import "./FeedAdd.scss";

const StyleModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FeedAdd = ({ memberInfo, refreshFeed }) => {
  let formdata = new FormData();
  const nav = useNavigate();
  const [state, setState] = useState(false);
  const [fileForm, setFileForm] = useState("");
  const [open, setOpen] = useState(false);
  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const [tagForm, setTagForm] = useState([]);
  const [insertForm, setInsertForm] = useState({
    memberEmail: {
      memberEmail: sessionStorage.getItem("id"),
    },
    feedCategory: "",
    feedContent: "",
    feedClassificationcode: "",
    feedDate: `${new Date().getTime()}`,
    feedTag: [],
  });

  useEffect(() => {
    preview();
    return () => preview();
  }, [fileForm]);

  const preview = useCallback(
    (e) => {
      if (!fileForm) return false;

      if (fileForm.length === 1) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const previewImage = document.querySelector(".preview-image");
          previewImage.src = e.target.result;
        };

        reader.readAsDataURL(fileForm[0]);
      } else if (fileForm.length > 1) {
        const multipleContainer = document.getElementById("multiple-container");
        const fileArr = Array.from(fileForm);
        const $colDiv1 = document.createElement("div");
        const $colDiv2 = document.createElement("div");
        $colDiv1.classList.add("column");
        $colDiv2.classList.add("column");
        fileArr.forEach((file, index) => {
          const reader = new FileReader();
          const $imgDiv = document.createElement("div");
          const $img = document.createElement("img");
          $img.classList.add("image");
          const $label = document.createElement("label");
          $label.classList.add("image-label");
          $label.textContent = file.name;
          $imgDiv.appendChild($img);
          $imgDiv.appendChild($label);
          reader.onload = (e) => {
            $img.src = e.target.result;
            $imgDiv.style.width = "200px";
            $imgDiv.style.height = "200px";
          };

          if (index % 2 === 0) {
            $colDiv1.appendChild($imgDiv);
          } else {
            $colDiv2.appendChild($imgDiv);
          }

          reader.readAsDataURL(file);
        });
        multipleContainer.appendChild($colDiv1);
        multipleContainer.appendChild($colDiv2);
      }
    },
    [fileForm]
  );

  const onLoadFile = useCallback((event) => {
    const files = event.target.files;
    setFileForm(files);
  }, []);

  const saveFeed = () => {
    const tagObj = {
      ...insertForm,
      feedTag: tagForm.join(" "),
    };
    setInsertForm(tagObj);
    setState(true);
    setSnackbarOpen(true);
  };

  const sendFeed = () => {
    formdata.append("data", new Blob([JSON.stringify(insertForm)], { type: "application/json" }));

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
          setFileForm("");
          setTagForm([]);
          setInsertForm({});
        } else {
          alert("실패");
        }
      })
      .catch((error) => console.log(error));
  };

  const reset = () => {
    setFileForm("");
    setTagForm([]);
    setInsertForm({
      memberEmail: {
        memberEmail: sessionStorage.getItem("id"),
      },
      feedCategory: "",
      feedContent: "",
      feedClassificationcode: "",
      feedDate: `${new Date().getTime()}`,
      feedTag: [],
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

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const snackBarClose = () => {
    setSnackbarOpen(false);
  };

  const insertfeed = () => {
    if (sessionStorage.getItem("id") === null) {
      alert("로그인이 필요한 서비스입니다.");
      nav("/login");
    } else {
      setOpen(true);
    }
  };
  const imageInput = useRef();
  const onClickImageInput = () => {
    imageInput.current.click();
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
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={850}
          height={500}
          bgcolor="white"
          p={3}
          borderRadius={5}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <ButtonGroup>
              <Button color="error" onClick={handleClose}>
                CANCEL
              </Button>
              <Button color="secondary" onClick={reset}>
                RESET
              </Button>
            </ButtonGroup>
            <Typography variant="h5" textAlign="center">
              피드 작성
            </Typography>
            <ButtonGroup>
              <Button color="success" onClick={saveFeed}>
                SAVE
              </Button>
              <Snackbar open={SnackbarOpen} autoHideDuration={6000} onClose={snackBarClose}>
                <Alert onClose={snackBarClose} severity="success" sx={{ width: "100%" }}>
                  피드 저장 완료!
                </Alert>
              </Snackbar>
              {state === false ? (
                <Button onClick={sendFeed} disabled>
                  UPLOAD
                </Button>
              ) : (
                <Button onClick={sendFeed}>UPLOAD</Button>
              )}
            </ButtonGroup>
          </Stack>
          <Divider />
          <Stack direction="row" gap={2} mb={2} p={1}>
            <Box mt={1}>
              {fileForm.length === 0 ? (
                <>
                  <Button variant="outlined" onClick={onClickImageInput} sx={{ width: 400, height: 400 }}>
                    <AddIcon />
                  </Button>
                  <input
                    type="file"
                    name="feedImg"
                    onChange={onLoadFile}
                    multiple
                    ref={imageInput}
                    style={{ display: "none" }}
                  />
                </>
              ) : fileForm.length > 1 ? (
                <div id="multiple-container"></div>
              ) : (
                <div onClick={onClickImageInput}>
                  <img
                    className="preview-image"
                    src="https://dummyimage.com/500x500/ffffff/000000.png&text=preview+image"
                    alt=""
                    style={{ backgroundSize: "cover", width: 400, height: 400 }}
                  />
                  <input
                    type="file"
                    name="feedImg"
                    onChange={onLoadFile}
                    multiple
                    ref={imageInput}
                    style={{ display: "none" }}
                  />
                </div>
              )}
            </Box>
            <Divider orientation="vertical" flexItem variant="middle" />
            <Box sx={{ width: 440, height: 400 }} mt={1}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label" margin="dense">
                  참여한 함께해요
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={insertForm.feedClassificationcode}
                  name="feedClassificationcode"
                  onChange={handleChange}
                  label="함께해요 리스트"
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
              <FormControl sx={{ mt: 1 }} fullWidth>
                <InputLabel>피드 카테고리</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={insertForm.feedCategory}
                  name="feedCategory"
                  onChange={handleChange}
                  label="피드 카테고리"
                >
                  <MenuItem value="">
                    <em>선택</em>
                  </MenuItem>
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
              <MultipleSelectChip
                insertForm={insertForm}
                setInsertForm={setInsertForm}
                tagForm={tagForm}
                setTagForm={setTagForm}
              />
              <TextField
                sx={{ mt: 1 }}
                fullWidth
                value={insertForm.feedContent}
                id="outlined-multiline-static"
                onChange={handleChange}
                label="피드 내용"
                multiline
                rows={4}
                name="feedContent"
              />
            </Box>
          </Stack>
        </Box>
      </StyleModal>
    </>
  );
};

export default FeedAdd;
