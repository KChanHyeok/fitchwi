import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

export default function CheckMangerPwdModal({ setIsManager, swAlert }) {
  const [open, setOpen] = useState(true);
  const nav = useNavigate();

  const [manager, setManager] = useState({
    managerId: "",
    managerPwd: "",
  });
  const handleClose = () => {
    setOpen(false);
    nav("/");
  };
  const submitManagerPwd = (e) => {
    e.preventDefault();

    axios
      .post("/managerLogin", manager)
      .then((result) => {
        switch (result.data) {
          case "ok":
            swAlert("관리자 확인이 완료됐습니다.");
            setIsManager(true);
            break;
          case "wrong pwd":
            swAlert("비밀번호 확인 후 다시 시도해주세요.");
            break;
          case "no data":
            swAlert("등록되지 않은 계정입니다.");
            break;
          case "fail":
            swAlert("로그인 과정에 문제가 발생했습니다.");
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));

    // setOpen(true);
  };

  const handleInput = (e) => {
    const managerInfo = {
      ...manager,
      [e.target.name]: e.target.value,
    };
    setManager(managerInfo);
  };

  return (
    <Dialog open={open} onClose={(e) => handleClose(e)}>
      <DialogTitle>FITCHWI 관리자 인증</DialogTitle>

      <Box component="form" onSubmit={submitManagerPwd}>
        <DialogContent>
          <DialogContentText color="black" fontSize={20}>
            관리자 확인을 위해, 아이디와 비밀번호를 입력해주세요.
          </DialogContentText>

          <TextField
            mt={2}
            value={manager.managerId}
            onChange={(e) => handleInput(e)}
            name="managerId"
            autoFocus
            margin="dense"
            label="관리자아이디"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            mt={2}
            value={manager.managerPwd}
            onChange={(e) => handleInput(e)}
            name="managerPwd"
            margin="dense"
            label="비밀번호"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소하기</Button>
          <Button type="submit">인증하기</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
