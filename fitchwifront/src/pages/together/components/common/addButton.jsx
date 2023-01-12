import React from "react";
import {
    Fab,
    Tooltip,
  } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

  
const AddButton = () => {
  const location = useLocation()

  const swAlert = (contentText, icon ) => {
    Swal.fire({
      title: "알림",
      text: contentText,
      icon: icon,
      confirmButtonText: "확인",
      confirmButtonColor: "#ff0456",
    });
  };
  
  return (
    <>
      {location.pathname!=="/together/add" && <Tooltip
      title="Add"
      sx={{
        position: "fixed",
        bottom: 20,
        left: { xs: "calc(50% - 25px)", md: 30 },
      }}
      >
        {!sessionStorage.getItem("id") ? <Fab color="secondary" aria-label="add" component={Link} to="/login" onClick={()=>swAlert("로그인 후 이용가능합니다.","warning")}>
          <AddIcon />
        </Fab> : <Fab color="secondary" aria-label="add" component={Link} to="/together/add">
          <AddIcon />
        </Fab>}
      </Tooltip>}
    </>
    )
} 

export default AddButton;