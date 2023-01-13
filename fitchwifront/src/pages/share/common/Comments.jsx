import { Clear } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Comments = ({ data, refreshFeed }) => {
  const swAlert = (html, icon = "success", func) => {
    Swal.fire({
      title: "알림",
      html: html,
      icon: icon,
      confirmButtonText: "확인",
      confirmButtonColor: "#ff0456",
    }).then(func);
  };

  const deleteComment = () => {
    Swal.fire({
      title: "정말로 삭제 하시겠습니까?",
      text: "삭제한 댓글은 되돌릴 수 없습니다.",
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
        axios.delete("/deleteComment", { data: data }).then((response) => {
          if (response.data === "ok") {
            swAlert("삭제 성공!", "success", () => refreshFeed());
          } else {
            swAlert("삭제 실패", "error", () => refreshFeed());
          }
        });
      } else {
        swAlert("취소합니다.", "info", () => refreshFeed());
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      mt={2}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/memberpage" state={{ memberId: data.memberEmail.memberEmail }}>
          <Avatar alt={data.memberEmail.memberName} src={data.memberEmail.memberSaveimg} sx={{ width: 30, height: 30, mr: 1 }} />
        </Link>
        <Typography variant="span" color="text.secondary">
          <b>{data.memberEmail.memberNickname}</b> {data.feedCommentContent}
        </Typography>
      </Box>
      {sessionStorage.getItem("id") === data.memberEmail.memberEmail ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ cursor: "pointer" }} onClick={deleteComment}>
            <Clear sx={{ fontWeight: 100 }} />
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Comments;
