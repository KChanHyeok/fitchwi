import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Fab,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add as AddIcon, AddPhotoAlternate } from "@mui/icons-material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import "../styles/FeedAdd.scss";
import Swal from "sweetalert2";
import FeedTag from "./FeedTag";

const StyleModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FeedAdd = ({ refreshFeed }) => {
  let formdata = new FormData();
  const nav = useNavigate();
  const [fileForm, setFileForm] = useState("");
  const [open, setOpen] = useState(false);
  const [talkJoinList, setTalkJoinList] = useState([]);
  const [talkOpenedList, setTalkOpenedList] = useState([]);
  const [tagForm, setTagForm] = useState([]);
  const imageInput = useRef();
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

  const handleOpen = () => {
    if (sessionStorage.getItem("id") === null) {
      swAlert("로그인 후 이용 가능합니다.", "warning", () => nav("/login"));
    } else {
      setOpen(true);
    }
  };

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
          $imgDiv.setAttribute("style", "display:flex");
          const $img = document.createElement("img");
          $img.classList.add("image");
          $imgDiv.appendChild($img);
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
    if (files.length > 4) {
      swAlert("사진은 4장까지만 등록 가능합니다!", "warning");
      return;
    }
    setFileForm(files);
  }, []);

  const saveFeed = () => {
    var TagArr = [];
    for (var i = 0; i < tagForm.length; i++) {
      TagArr.push(tagForm[i].tagContent);
    }
    const tagObj = {
      ...insertForm,
      feedTag: TagArr.join(" "),
    };
    setInsertForm(tagObj);
  };

  const sendFeed = (e) => {
    e.preventDefault();
    if (insertForm.feedCategory === "") {
      swAlert("카테고리를 선택하세요!", "error");
      return;
    } else if (insertForm.feedContent === "") {
      swAlert("내용을 입력하세요!", "error");
      return;
    } else if (insertForm.feedTag.length === 0) {
      swAlert("태그를 선택하세요!", "error");
      return;
    } else if (fileForm.length === 0) {
      swAlert("이미지를 추기하세요!", "error");
      return;
    }

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
          swAlert("등록 성공!", "success", () => window.location.reload());
        } else {
          swAlert("등록 실패!", "error");
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
    reset();
    setOpen(false);
  };

  const onClickImageInput = () => {
    imageInput.current.click();
  };

  const getMemberTalk = useCallback(() => {
    if (sessionStorage.getItem("id") === null) {
      return;
    } else {
      axios.get("/getMemberTalk", { params: { memberEmail: sessionStorage.getItem("id") } }).then((res) => {
        const { talkJoinList, talkOpenedList } = res.data;
        setTalkJoinList(talkJoinList.filter((item) => item.talkJoinState === "가입중"));
        setTalkOpenedList(talkOpenedList);
      });
    }
  }, []);

  useEffect(() => {
    preview();
    getMemberTalk();
  }, [preview, getMemberTalk]);

  const swAlert = (html, icon = "success", func) => {
    Swal.fire({
      title: "알림",
      html: html,
      icon: icon,
      confirmButtonText: "확인",
      confirmButtonColor: "#ff0456",
    }).then(func);
  };

  return (
    <>
      <Tooltip
        onClick={handleOpen}
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
      <StyleModal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          component="form"
          onSubmit={sendFeed}
          width={850}
          height={500}
          bgcolor="white"
          p={3}
          borderRadius={5}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <ButtonGroup>
              <Button color="error" onClick={handleClose}>
                CANCEL
              </Button>
              <Button onClick={reset} sx={{ color: "pink" }}>
                RESET
              </Button>
            </ButtonGroup>
            <Typography variant="button" textAlign="center" fontSize={30}>
              공유하기
            </Typography>
            <Button type="submit" onClick={saveFeed} variant="contained">
              UPLOAD
            </Button>
          </Stack>
          <Divider />
          <Stack direction="row" gap={2} mb={2} p={1}>
            <Box mt={1}>
              {fileForm.length === 0 ? (
                <>
                  <Button variant="outlined" onClick={onClickImageInput} sx={{ width: 400, height: 400 }}>
                    <Typography variant="body6" color="grey" fontWeight={100}>
                      * 이미지는 최대 4장까지만 등록할 수 있습니다
                    </Typography>
                    <AddPhotoAlternate />
                  </Button>
                  <input
                    type="file"
                    name="feedImg"
                    onChange={onLoadFile}
                    multiple
                    ref={imageInput}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </>
              ) : fileForm.length > 1 ? (
                <div id="multiple-container"></div>
              ) : (
                <div>
                  <img
                    className="preview-image"
                    src="https://dummyimage.com/500x500/ffffff/000000.png&text=preview+image"
                    alt=""
                    style={{ backgroundSize: "cover", width: 400, height: 400 }}
                  />
                  <input type="file" name="feedImg" onChange={onLoadFile} multiple ref={imageInput} style={{ display: "none" }} />
                </div>
              )}
            </Box>
            <Divider orientation="vertical" flexItem variant="middle" />
            <Box sx={{ width: 440, height: 400 }}>
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
              <br />
              <FormControl sx={{ mt: 2, mb: 2 }} fullWidth>
                <InputLabel>카테고리</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={insertForm.feedCategory}
                  name="feedCategory"
                  onChange={handleChange}
                  label="카테고리"
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
              <FeedTag insertForm={insertForm} setInsertForm={setInsertForm} tagForm={tagForm} setTagForm={setTagForm} />
              {talkJoinList.length === 0 && talkOpenedList.length === 0 ? (
                <>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      disabled
                      sx={{ mt: 1 }}
                      defaultValue="참여중인 얘기해요가 없습니다."
                      id="outlined-adornment-weight"
                      endAdornment={
                        <InputAdornment position="end">
                          <Button variant="text" color="success" onClick={() => nav("/talk")} sx={{ p: 0 }}>
                            🔍 얘기해요 구경하기
                          </Button>
                        </InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl>
                </>
              ) : (
                <>
                  <Box textAlign="right">
                    <Typography variant="caption">☑️ 운영중 ✔️ 참여중</Typography>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label" margin="dense">
                      얘기해요 리스트
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={insertForm.feedClassificationcode}
                      name="feedClassificationcode"
                      onChange={handleChange}
                      label="얘기해요 리스트"
                    >
                      <MenuItem value={""}>선택</MenuItem>
                      {talkJoinList.map((item, index) => (
                        <MenuItem key={index} value={item.talkCode.talkCode}>
                          ✔️ {item.talkCode.talkTitle}
                        </MenuItem>
                      ))}
                      {talkOpenedList.map((item, index) => (
                        <MenuItem key={index} value={item.talkCode}>
                          ☑️ {item.talkTitle}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
            </Box>
          </Stack>
        </Box>
      </StyleModal>
    </>
  );
};

export default FeedAdd;
