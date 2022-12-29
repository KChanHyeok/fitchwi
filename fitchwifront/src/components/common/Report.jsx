import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

export default function Report() {
  const [open, setOpen] = useState(false);
  const [contents, setContents] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeclration = () => {
    setOpen(false);
    console.log(contents);
    alert("신고가 접수되었습니다.");
    setContents("");
  };
  const handleInput = (event) => {
    setContents(event.currentTarget.value);
  };
  return (
    <>
      <MenuItem onClick={handleClickOpen}>신고하기</MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>신고하기</DialogTitle>
        <DialogContent>
          <DialogContentText color="red" fontSize={20}>
            신고 사유를 선택해주세요
          </DialogContentText>
          <DialogContentText color="black" mt={2}>
            회원님의 소중한 의견은 🍑FITCHWI를 더욱 안전하고 신뢰할 수 있도록 만드는데
            <br />큰 도움이 됩니다 😀
          </DialogContentText>
          <TextField
            mt={2}
            value={contents}
            onChange={handleInput}
            autoFocus
            margin="dense"
            id="name"
            label="신고 사유를 간략하게 입력해주세요(선택)"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소하기</Button>
          <Button onClick={handleDeclration}>신고하기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
