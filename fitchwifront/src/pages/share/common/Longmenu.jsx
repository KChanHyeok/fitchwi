import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  Modal,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import Report from "../../../components/common/Report";

const ITEM_HEIGHT = 48;
const StyleModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function LongMenu({ flist, refreshFeed, information }) {
  const [feedToUpdate, setFeedUpdate] = useState({});
  const { feedCategory, feedContent, feedClassificationcode, feedTag } = feedToUpdate;
  let formdata = new FormData();
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tagForm, setTagForm] = useState([]);
  const [open, setOpen] = useState(false);
  const Menuopen = Boolean(anchorEl);
  const [state, setState] = useState(false);

  const handleChange = useCallback(
    (event) => {
      setFeedUpdate({ ...feedToUpdate, [event.target.name]: event.target.value });
    },
    [feedToUpdate]
  );

  const saveFeed = () => {
    console.log(feedToUpdate);
    const updateObj = {
      ...feedToUpdate,
      feedTag: tagForm.join(" "),
    };
    setFeedUpdate(updateObj);
    setState(true);
  };

  const sendFeed = () => {
    formdata.append("data", new Blob([JSON.stringify(feedToUpdate)], { type: "application/json" }));

    axios
      .post("/updateFeed", formdata)
      .then((response) => {
        if (response.data === "ok") {
          setOpen(false);
          alert("성공");
          setTagForm([]);
          setFeedUpdate({});
          window.location.reload();
        } else {
          alert("실패");
        }
      })
      .catch((error) => console.log(error));
  };

  const MenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const MenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    if (sessionStorage.getItem("id") === null) {
      alert("로그인이 필요한 서비스입니다.");
      nav("/login");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setState(false);
    setTagForm([]);
    setFeedUpdate({
      feedCode: information.feedCode,
      memberEmail: {
        memberEmail: information.memberEmail.memberEmail,
      },
      feedCategory: information.feedCategory,
      feedContent: information.feedContent,
      feedClassificationcode: information.feedClassificationcode,
      feedDate: information.feedDate,
      feedTag: [],
    });
  };

  const deleteFeed = () => {
    if (window.confirm("해당 피드를 삭제하시겠습니까?")) {
      axios.delete("/deleteFeed", { data: information }).then((response) => {
        if (response.data === "ok") {
          alert("삭제 완료");
          refreshFeed();
        } else {
          alert("실패");
        }
      });
    } else {
      alert("취소합니다.");
    }
  };

  const [talkJoinList, setTalkJoinList] = useState([]);
  const [talkOpenedList, setTalkOpenedList] = useState([]);

  const getMemberTalk = useCallback(() => {
    axios.get("/getMemberTalk", { params: { memberEmail: sessionStorage.getItem("id") } }).then((res) => {
      const { talkJoinList, talkOpenedList } = res.data;
      console.log(res.data);
      setTalkJoinList(talkJoinList);
      setTalkOpenedList(talkOpenedList);
    });
  }, []);

  useEffect(() => {
    setFeedUpdate({
      feedCode: information.feedCode,
      memberEmail: {
        memberEmail: information.memberEmail.memberEmail,
      },
      feedCategory: information.feedCategory,
      feedContent: information.feedContent,
      feedClassificationcode: information.feedClassificationcode,
      feedDate: information.feedDate,
      feedTag: information.feedTag.split(" "),
    });
    getMemberTalk();
  }, [information, getMemberTalk]);

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={Menuopen ? "long-menu" : undefined}
        aria-expanded={Menuopen ? "true" : undefined}
        aria-haspopup="true"
        onClick={MenuClick}
      >
        <MoreVertIcon />
      </IconButton>
      {sessionStorage.getItem("id") === information.memberEmail.memberEmail ? (
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={Menuopen}
          onClose={MenuClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "10ch",
            },
          }}
        >
          <MenuItem onClick={handleOpen}>수정하기</MenuItem>
          <MenuItem onClick={deleteFeed}>삭제하기</MenuItem>
        </Menu>
      ) : (
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={Menuopen}
          onClose={MenuClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "10ch",
            },
          }}
        >
          <Report type="MenuItem" target={information.feedCode} targetMember={information.memberEmail.memberEmail} category="share" />
        </Menu>
      )}
      <StyleModal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box width={850} height={500} bgcolor="white" p={3} borderRadius={5} sx={{ display: "flex", flexDirection: "column" }}>
          <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Button color="error" onClick={handleClose}>
              CANCEL
            </Button>
            <Typography variant="button" textAlign="center">
              공유해요 수정하기
            </Typography>
            <ButtonGroup>
              <Button color="success" onClick={saveFeed}>
                SAVE
              </Button>
              {state === false ? <Button disabled>UPDATE</Button> : <Button onClick={sendFeed}>UPDATE</Button>}
            </ButtonGroup>
          </Stack>
          <Divider />
          <Stack direction="row" gap={2} mb={2} p={1}>
            {flist.length > 1 ? (
              <Box>
                <Carousel
                  next={() => {}}
                  prev={() => {}}
                  autoPlay={false}
                  indicators={false}
                  animation="slide"
                  duration={800}
                  sx={{ height: "100%", width: 500 }}
                >
                  {flist.map((item, i) => (
                    <CardMedia
                      key={item.feedCode}
                      component="img"
                      src={"/images/" + item.feedFileSaveimg}
                      alt={item.feedFileImg}
                      height={420}
                    />
                  ))}
                </Carousel>
              </Box>
            ) : (
              <Box
                key={flist[0].feedCode}
                component="img"
                height={420}
                width={420}
                src={"/images/" + flist[0].feedFileSaveimg}
                alt={flist[0].feedFileImg}
              />
            )}
            <Divider orientation="vertical" flexItem variant="middle" />
            <Box sx={{ width: 380, height: 400 }} mt={1}>
              {talkJoinList === 0 || talkOpenedList === 0 ? (
                <>
                  <Box textAlign="right">
                    <Button variant="text" color="success" onClick={() => nav("/talk")} sx={{ p: 0 }}>
                      🔍 얘기해요 구경하기
                    </Button>
                  </Box>
                  <FormControl fullWidth disabled>
                    <InputLabel id="demo-simple-select-autowidth-label" margin="dense">
                      참여중인 얘기해요가 없습니다.
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={feedClassificationcode || ""}
                      label="참여중인 얘기해요"
                    >
                      <MenuItem value=""></MenuItem>
                    </Select>
                  </FormControl>
                </>
              ) : (
                <>
                  <FormControl fullWidth disabled>
                    <InputLabel id="demo-simple-select-autowidth-label" margin="dense">
                      얘기해요 리스트
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={feedClassificationcode}
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
              <br />
              <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel>피드 카테고리</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={feedCategory || ""}
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
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                value={feedTag}
                id="outlined-multiline-static"
                label="피드 태그"
                name="feedTag"
                disabled
              />
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                value={feedContent || ""}
                id="outlined-multiline-static"
                onChange={handleChange}
                label="피드 내용"
                multiline
                rows={7}
                name="feedContent"
              />
            </Box>
          </Stack>
        </Box>
      </StyleModal>
    </div>
  );
}
