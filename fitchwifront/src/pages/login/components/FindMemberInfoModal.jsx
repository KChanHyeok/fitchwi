import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Alert, Box, Grid } from "@mui/material";

import { useNavigate } from "react-router";
import axios from "axios";
//category : 함께해요-together / 얘기해요 - talk / 공유해요 - share / 회원 - memberpage / 댓글-comment
//target : togerther / talk / feed /각 키값  //  회원신고는 target="0"
//type : MenuItem으로 쓸거면 prop으로 MenuItem 전달 / 기본값은 버튼
export default function FindMemberInfoModal({ swAlert }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const find = () => {};

  const [checkPhone, setCheckPhone] = useState(false);
  const [memberPhone, setMemberPhone] = useState("");
  const [memberInfo, setMemberInfo] = useState({
    memberEmail: "",
    kindOfMember: "",
  });

  const [memberToChangePwd, setMemberToChangePwd] = useState({
    memberEmail: "",
    memberPwd: "",
  });

  const handlePhone = (e) => {
    setMemberPhone(e.target.value);
  };

  //휴대전화 인증 -> ok -> 아이디 알려주기 + 카카오인지 일반회원인지도 알려줘야함
  //카카오회원 -> 로그인화면에서 카카오로그인을 이용해주세요
  //일반회원 -> 비밀번호 새로 만들기
  //1. 휴대전화 인증
  //2. 아이디 알려주기
  //3. 비밀번호 찾기
  const Certification = (e) => {
    e.preventDefault();

    if (memberPhone === "") {
      return "연락처를 입력해주세요!";
    }

    const { IMP } = window;
    // IMP.init("imp51345423");

    IMP.init("imp10391932");

    const data = {
      merchant_uid: `mid_${new Date().getTime()}`,
      company: "아임포트",
      carrier: "",

      phone: memberPhone,
    };
    IMP.certification(data, callback);

    function callback(response) {
      // eslint-disable-next-line no-unused-vars
      const { success, merchant_uid, error_msg } = response;

      if (success) {
        setCheckPhone(true);

        axios.get("/getMemberByPhone", { params: { memberPhone: memberPhone } }).then((result) => {
          if (result.data[0] === "no data") {
            return;
          } else {
            if (result.data === "kakao") {
              setCheckPhone(true);
              const memberInfoObj = {
                kindOfMember: result.data[0],
                memberEmail: result.data[1],
              };
              setMemberInfo(memberInfoObj);
            } else {
              setCheckPhone(true);
              const memberInfoObj = {
                kindOfMember: result.data[0],
                memberEmail: result.data[1],
              };
              setMemberToChangePwd({ ...memberToChangePwd, memberEmail: result.data[1] });
              setMemberInfo(memberInfoObj);
            }
          }
        });
      } else {
        swAlert(`본인인증 실패: ${error_msg}`, "warning");
      }
    }
  };

  const [msg, setMsg] = useState("");

  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");

  const [isCorrectPwd, setIsCorrectPwd] = useState(null);

  useEffect(() => {
    if (pwd !== "" && (pwd.length < 8 || pwd.length > 20)) {
      setMsg("비밀번호를 8자 이상, 20자 이하로 설정해주세요.");
      setIsCorrectPwd(false);
    } else {
      if (checkPwd === "" && pwd !== "") {
        setMsg("비밀번호 확인을 진행해주세요.");
      } else if (checkPwd === pwd && pwd !== "") {
        setIsCorrectPwd(true);
        setMsg("비밀번호 확인이 완료됐습니다.");
        const memberObj = {
          ...memberToChangePwd,
          memberPwd: pwd,
        };
        setMemberToChangePwd(memberObj);
      } else if (checkPwd !== pwd) {
        setIsCorrectPwd(false);
        setMsg("입력하신 두 비밀번호가 서로 다릅니다.");
        const memberObj = {
          ...memberToChangePwd,
          memberPwd: pwd,
        };
        setMemberToChangePwd(memberObj);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pwd, checkPwd]);

  const updatePwd = () => {
    axios
      .put("/updatePwd", memberToChangePwd)
      .then((result) => {
        swAlert("비밀번호가 성공적으로 변경됐습니다.", "success", () => {
          handleClose();
          nav("/login");
        });
      })
      .catch((error) => console.log(error));
  };
  const handleClose = () => {
    setCheckPhone(false);
    setMemberPhone("");
    setMemberInfo({});
    setMemberToChangePwd({
      memberEmail: "",
      memberPwd: "",
    });
    setMemberToChangePwd({
      memberEmail: "",
      memberPwd: "",
    });

    setMsg("");
    setPwd("");
    setCheckPwd("");
    setIsCorrectPwd(null);

    setOpen(false);
  };

  return (
    <>
      <Button sx={{ color: "black" }} onClick={handleClickOpen}>
        계정 찾기
      </Button>

      <Dialog open={open} onClose={(e) => find(e)}>
        <DialogTitle>계정찾기</DialogTitle>
        {checkPhone === false ? (
          <Box component="form" onSubmit={(e) => Certification(e)}>
            <DialogContent>
              <DialogContentText fontSize={20} color="black">
                본인인증
              </DialogContentText>
              <DialogContentText color="black" mt={2}>
                회원님의 정보를 찾기에 앞서, 본인인증을 먼저 해주세요.
              </DialogContentText>

              <TextField
                mt={2}
                onChange={(e) => handlePhone(e)}
                name="reportDetailContent"
                autoFocus
                margin="dense"
                label="전화번호 입력"
                type="text"
                fullWidth
                value={memberPhone}
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소하기</Button>
              <Button type="submit">인증하기</Button>
            </DialogActions>
          </Box>
        ) : memberInfo.kindOfMember === "kakao" ? (
          //카카오일때
          <Box>
            <DialogContent>
              <DialogContentText fontSize={20} color="black">
                회원님께서는 카카오 계정을 사용중입니다.
              </DialogContentText>
              <DialogContentText color="black" mt={2}>
                회원님의 연락처로 조회한 Email은 {memberInfo.memberEmail} 입니다.
                <br /> 카카오 로그인을 진행해주세요
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>닫기</Button>
            </DialogActions>
          </Box>
        ) : //아닐때
        memberInfo.kindOfMember === "common" ? (
          <Box>
            <DialogContent>
              <DialogContentText fontSize={20} color="black">
                Email 확인
              </DialogContentText>
              <DialogContentText color="black" mt={2}>
                회원님의 연락처로 조회한 Email은 {memberInfo.memberEmail} 입니다.
                <br />
                비밀번호를 새로 지정할래요?
              </DialogContentText>
              <TextField
                mt={2}
                onChange={(e) => setPwd(e.target.value)}
                name="reportDetailContent"
                autoFocus
                margin="dense"
                label="새 비밀번호 입력"
                type="password"
                fullWidth
                value={pwd}
                inputProps={{ maxLength: 20 }}
                variant="standard"
              />
              <TextField
                mt={2}
                onChange={(e) => setCheckPwd(e.target.value)}
                name="reportDetailContent"
                margin="dense"
                label="새 비밀번호 확인"
                type="password"
                fullWidth
                inputProps={{ maxLength: 20 }}
                value={checkPwd}
                variant="standard"
              />

              <Grid item xs={12} sx={{ mb: 2 }}>
                {isCorrectPwd == null ? null : isCorrectPwd ? (
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소하기</Button>

              <Button disabled={!isCorrectPwd} onClick={() => updatePwd()}>
                비밀번호 변경
              </Button>
            </DialogActions>
          </Box>
        ) : (
          <Box>
            <DialogContent>
              <DialogContentText fontSize={20} color="black">
                인증하신 연락처로 가입된 회원 정보가 없습니다.
              </DialogContentText>
              <DialogContentText color="black" mt={2}>
                회원가입 페이지로 이동하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소하기</Button>
              <Button onClick={() => nav("/join")}>회원가입</Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </>
  );
}
