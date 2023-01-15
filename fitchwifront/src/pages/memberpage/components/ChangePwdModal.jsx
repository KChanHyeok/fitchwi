import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function ChangePwdModal({ children, openChangePwd, setOpenChangePwd, lstate, swAlert }) {
  //회원 정보 수정

  const [memberToCheck, setMemberToCheck] = React.useState({
    memberEmail: lstate.logid,
    memberPwd: "",
  });
  const [memberToChange, setMemberToChange] = React.useState({
    memberEmail: lstate.logid,
    memberPwd: "",
  });

  const handleClose = () => {
    setOpenChangePwd(false);
  };
  const [currentPwd, setCurrentPwd] = useState("");

  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");

  const [correctPwd, setCorrectPwd] = useState(null);

  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (currentPwd === "") {
      setMsg("기존 비밀번호를 입력해주세요.");

      setCorrectPwd(false);
    } else {
      const memberToCheckObj = {
        ...memberToCheck,
        memberPwd: currentPwd,
      };
      setMemberToCheck(memberToCheckObj);
      if (pwd !== "" && (pwd.length < 8 || pwd.length > 20)) {
        setMsg("새 비밀번호를 8자 이상, 20자 이하로 설정해주세요.");
        setCorrectPwd(false);
      } else {
        if (checkPwd === "" && pwd !== "") {
          setMsg("새 비밀번호의 확인을 진행해주세요.");
          setCorrectPwd(false);
        } else if (checkPwd === pwd && pwd !== "" && currentPwd !== "") {
          setCorrectPwd(true);
          setMsg("새 비밀번호 확인이 완료됐습니다.");
          const memberToChangeObj = {
            ...memberToChange,
            memberPwd: pwd,
          };
          setMemberToChange(memberToChangeObj);
        } else if (checkPwd !== pwd) {
          setCorrectPwd(false);
          setMsg("입력하신 새 비밀번호가 서로 다릅니다.");
          const memberToChangeObj = {
            ...memberToChange,
            memberPwd: "",
          };
          setMemberToChange(memberToChangeObj);
          const memberToCheckObj = {
            ...memberToCheck,
            memberPwd: "",
          };
          setMemberToCheck(memberToCheckObj);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pwd, checkPwd, currentPwd]);

  const onChangePwd = (e) => {
    e.preventDefault();
    axios
      .post("/checkPwd", memberToCheck)
      .then((result) => {
        if (result.data === "ok") {
          axios.put("/updatePwd", memberToChange).then((result) => {
            if (result.data === "ok") {
              swAlert("비밀번호 변경이 완료됐습니다.");
              handleClose(true);
              setCheckPwd("");
              setCorrectPwd(null);
              setPwd("");
              setCurrentPwd("");
            } else if (result.data === "same") {
              swAlert("기존 비밀번호와 동일합니다.", "info");
              handleClose(true);
              setCheckPwd("");
              setCorrectPwd(null);
              setPwd("");
              setCurrentPwd("");
            }
          });
        } else {
          swAlert("기존 비밀번호를 다시한번 확인하세요.", "warning");
          handleClose(true);
          setCheckPwd("");
          setCorrectPwd(null);
          setPwd("");
          setCurrentPwd("");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Button variant="outlined" onClick={() => setOpenChangePwd(() => true)} sx={{ width: "100%" }}>
        <Typography>{children}</Typography>
      </Button>

      <Dialog open={openChangePwd} onClose={handleClose}>
        <DialogTitle>회원정보 수정</DialogTitle>
        <DialogContent>
          <DialogContentText>계정확인을 위해, 비밀번호를 입력해주세요.</DialogContentText>
          <Box component="form" onSubmit={onChangePwd} noValidate sx={{ mt: 1 }}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={(e) => setCurrentPwd(() => e.target.value)}
                  name="memberPwd"
                  sx={{ mb: 5, width: "100%" }}
                  type="password"
                  value={currentPwd}
                  label="기존 비밀번호"
                  variant="standard"
                  InputProps={{ style: { fontSize: 20 } }}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={(e) => setPwd(() => e.target.value)}
                  name="memberPwd"
                  sx={{ mb: 5, width: "100%" }}
                  type="password"
                  value={pwd}
                  label="새 비밀번호"
                  variant="standard"
                  InputProps={{ style: { fontSize: 20 } }}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={(e) => setCheckPwd(() => e.target.value)}
                  sx={{ mb: 3, width: "100%" }}
                  type="password"
                  label="새 비밀번호 확인"
                  variant="standard"
                  value={checkPwd}
                  InputProps={{ style: { fontSize: 20 } }}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                {currentPwd === "" ? (
                  <Alert
                    severity="error"
                    sx={{
                      width: "94%",
                    }}
                  >
                    {msg}
                  </Alert>
                ) : correctPwd ? (
                  <Alert
                    severity="info"
                    sx={{
                      width: "94%",
                    }}
                  >
                    {msg}
                  </Alert>
                ) : (
                  <Alert
                    severity="error"
                    sx={{
                      width: "94%",
                    }}
                  >
                    {msg}
                  </Alert>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose(true);
              setCheckPwd("");
              setCorrectPwd(null);
              setPwd("");
              setCurrentPwd("");
            }}
          >
            취소하기
          </Button>
          <Button type="submit" onClick={onChangePwd} disabled={!correctPwd}>
            수정하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
