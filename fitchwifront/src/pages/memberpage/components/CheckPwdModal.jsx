import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, ListItemButton, ListItemText, Typography } from "@mui/material";
import axios from "axios";

export default function CheckPwdModal({ children, openCheckPwd, setOpenCheckPwd, member }) {
  //회원 정보 수정

  const [memberToCheck, setMemberToCheck] = React.useState({
    memberEmail: sessionStorage.getItem("id"),
    memberPwd: "",
  });
  const { memberEmail, memberPwd } = memberToCheck;

  const onChange = (e) => {
    console.log(memberToCheck);
    setMemberToCheck({ ...memberToCheck, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpenCheckPwd(false);
  };
  const onUpdateMember = (e) => {
    e.preventDefault();

    if (memberPwd === "") {
      alert("비밀번호를 입력하세요.");
    }
    axios.post("/checkPwd", memberToCheck).then((result) => {
      if (result.data === "ok") {
        console.log(result.data);
        alert("확인완료");
        window.location.href = "/memberpage/updateMember";
      } else {
        console.log(result.data);
        alert("비밀번호가 다릅니다.");
      }
    });
    console.log(memberToCheck);
  };
  return (
    <div>
      <ListItemButton component="a" onClick={() => setOpenCheckPwd(() => true)}>
        <ListItemText primary={children} />
      </ListItemButton>

      <Dialog open={openCheckPwd} onClose={handleClose}>
        <DialogTitle>회원정보 수정</DialogTitle>
        <DialogContent>
          <DialogContentText>계정확인을 위해, 비밀번호를 입력해주세요.</DialogContentText>
          <Box component="form" onSubmit={onUpdateMember} noValidate sx={{ mt: 1 }}>
            <Typography>{memberEmail}</Typography>
            <TextField
              value={memberPwd}
              name="memberPwd"
              autoFocus
              margin="dense"
              label="비밀번호"
              type="password"
              fullWidth
              variant="standard"
              onChange={(e) => onChange(e)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소하기</Button>
          <Button type="submit" onClick={onUpdateMember}>
            수정하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
