import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import moment from "moment/moment";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
//category : 함께해요-together / 얘기해요 - talk / 공유해요 - share / 회원 - memberpage / 댓글-comment
//target : togerther / talk / feed /각 키값  //  회원신고는 target="0"
//type : MenuItem으로 쓸거면 prop으로 MenuItem 전달 / 기본값은 버튼
export default function Report({ targetMember, target, category, type }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const [reportDetail, setReportDetail] = useState([
    {
      memberEmail: {
        memberEmail: sessionStorage.getItem("id"),
      }, //신고자
      reportDetailContent: "",
      reportDetailDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
  ]);

  const [reportForm, setReportForm] = useState({
    memberEmail: {
      memberEmail: targetMember, //피신고자
    },
    reportCategory: category,
    reportTarget: target,
    reportDetailList: reportDetail,
  });

  const [isReported, setIsReported] = useState(false);

  const okAlert = (titleText, alertText) => {
    Swal.fire({
      title: titleText,
      text: alertText,
      icon: "success",
      confirmButtonText: "확인",
      confirmButtonColor: "#ff0456",
    });
  };

  const handleClickOpen = () => {
    if (reportDetail[0].memberEmail.memberEmail == null) {
      okAlert("신고하기", "로그인 후 이용 가능합니다.");
      nav("/login");
      return;
    }
    axios
      .get("/checkReported", {
        params: {
          user: reportForm.reportDetailList[0].memberEmail.memberEmail,
          target: target,
          targetMember: targetMember,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "reported") {
          setIsReported(true);
          setOpen(true);
        } else if (res.data === "ok") {
          setOpen(true);
        } else {
          alert("서버 문제 발생");
        }
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeclration = (e) => {
    e.preventDefault();
    console.log(reportForm);
    axios.post("/report", reportForm).then((result) => {
      alert(result.data);
    });

    setOpen(false);
    console.log(reportForm);
    // alert("신고가 접수되었습니다.");
  };
  console.log(reportDetail[0]);
  const handleInput = useCallback(
    (e) => {
      const reportDetailObj = {
        ...reportDetail[0],
        reportDetailContent: e.target.value,
      };
      console.log(reportDetailObj);
      setReportDetail([reportDetailObj]);
    },
    [reportDetail]
  );
  useEffect(() => {
    const reportFormObj = {
      ...reportForm,
      reportDetailList: reportDetail,
    };
    console.log(reportFormObj);
    setReportForm(reportFormObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportDetail]);

  return (
    <>
      {type === "MenuItem" ? (
        <MenuItem onClick={handleClickOpen}>신고하기</MenuItem>
      ) : type === "mypage" ? (
        <Button onClick={handleClickOpen} size="small" sx={{ color: "#fff" }}>
          신고하기
        </Button>
      ) : (
        <Button onClick={handleClickOpen}>신고하기</Button>
      )}

      <Dialog open={open} onClose={(e) => handleClose(e)}>
        <DialogTitle>신고하기</DialogTitle>
        {isReported === false ? (
          <Box component="form" onSubmit={handleDeclration}>
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
                value={reportDetail[0].reportDetailContent}
                onChange={(e) => handleInput(e)}
                name="reportDetailContent"
                autoFocus
                margin="dense"
                label="신고 사유를 간략하게 입력해주세요(선택)"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소하기</Button>
              <Button type="submit">신고하기</Button>
            </DialogActions>
          </Box>
        ) : (
          <Box>
            {" "}
            <DialogContent>
              <DialogContentText color="red" fontSize={20}>
                이미 신고한 대상입니다.
              </DialogContentText>
              <DialogContentText color="black" mt={2}>
                회원님의 소중한 의견을 주셔서 감사합니다. 빠른 시일 내, 신고내역을 검토한 뒤 적절한 조치를
                취하도록 하겠습니다.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>뒤로가기</Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </>
  );
}
