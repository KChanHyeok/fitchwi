import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
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
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import Report from "../../../components/common/Report";
import Swal from "sweetalert2";

const ITEM_HEIGHT = 48;
const StyleModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function LongMenu({ flist, refreshFeed, information }) {
  let formdata = new FormData();
  const [feedToUpdate, setFeedUpdate] = useState({});
  const { feedCategory, feedContent, feedClassificationcode, feedTag } = feedToUpdate;
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const Menuopen = Boolean(anchorEl);

  const handleChange = useCallback(
    (event) => {
      setFeedUpdate({ ...feedToUpdate, [event.target.name]: event.target.value });
    },
    [feedToUpdate]
  );

  const sendFeed = () => {
    formdata.append("data", new Blob([JSON.stringify(feedToUpdate)], { type: "application/json" }));
    axios
      .post("/updateFeed", formdata)
      .then((response) => {
        if (response.data === "ok") {
          // setOpen(false);
          swAlert("수정 성공!", "success", () => window.location.reload());
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

  const handleClose = () => {
    setOpen(false);
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
    Swal.fire({
      title: "정말로 삭제 하시겠습니까?",
      text: "삭제한 피드는 되돌릴 수 없습니다.",
      icon: "warning",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "확인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios.delete("/deleteFeed", { data: information }).then((response) => {
          if (response.data === "ok") {
            swAlert("삭제 성공!", "success", () => window.location.reload());
          } else {
            swAlert("삭제 실패", "error", () => window.location.reload());
          }
        });
      } else {
        swAlert("취소합니다.", "info", () => window.location.reload());
      }
    });
  };

  const [talkJoinList, setTalkJoinList] = useState([]);
  const [talkOpenedList, setTalkOpenedList] = useState([]);

  const getMemberTalk = useCallback(() => {
    if (sessionStorage.getItem("id") === null) {
      return;
    } else {
      axios.get("/getMemberTalk", { params: { memberEmail: sessionStorage.getItem("id") } }).then((res) => {
        const { talkJoinList, talkOpenedList } = res.data;
        setTalkJoinList(talkJoinList);
        setTalkOpenedList(talkOpenedList);
      });
    }
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
      feedTag: information.feedTag,
    });
    getMemberTalk();
  }, [information, getMemberTalk]);

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
          <MenuItem onClick={() => setOpen(true)}>수정하기</MenuItem>
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
          <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Button color="error" onClick={handleClose}>
              CANCEL
            </Button>
            <Typography variant="button" textAlign="center">
              공유해요 수정하기
            </Typography>
            <Button onClick={sendFeed} variant="contained">
              UPDATE
            </Button>
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
              {talkJoinList.length === 0 && talkOpenedList.length === 0 ? (
                <>
                  <TextField
                    fullWidth
                    value="참여중인 얘기해요가 없습니다"
                    id="outlined-multiline-static"
                    label="참여중인 얘기해요"
                    disabled
                  />
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
