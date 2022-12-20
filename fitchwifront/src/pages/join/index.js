import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import Name from "./components/Name";
import Nickname from "./components/Nickname";
import UserImg from "./components/UserImg";
import Gender from "./components/Gender";
import Birth from "./components/Birth";
import Interest from "./components/Interest";
import Mbti from "./components/Mbti";
import UserInfo from "./components/UserInfo";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

const JoinIndex = () => {
  let formData = new FormData();
  const nav = useNavigate();
  const [fileForm, setFileForm] = useState("");

  const [joinForm, setJoinForm] = useState({
    memberEmail: "",
    memberPwd: "",
    memberName: "",
    memberNickname: "",
    memberGender: "",
    memberPhone: "",
    memberAddr: "",
    memberBirth: "",
    memberMbti: "",
    memberInterest: [],
  });

  const onChange = useCallback(
    (e) => {
      const joinObj = {
        ...joinForm,
        [e.target.name]: e.target.value,
      };
      setJoinForm(joinObj);
    },
    [joinForm]
  );

  console.log(joinForm);

  const sendJoin = (e) => {
    e.preventDefault();
    console.log(joinForm.memberInterest);
    formData.append("data", new Blob([JSON.stringify(joinForm)], { type: "application/json" }));
    formData.append("uploadImage", fileForm[0]);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("/joinmember", formData, config)
      .then((res) => {
        if (res.data === "ok") {
          alert("성공");
          nav("/");
        } else {
          alert("실패");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      component="form"
      onSubmit={sendJoin}
      //onSubmit={sendTest}
    >
      <Routes>
        <Route path="/" element={<Name onChange={onChange} />}></Route>
        <Route path="/nickname" element={<Nickname onChange={onChange} />}></Route>
        <Route
          path="/userimg"
          element={<UserImg fileForm={fileForm} setFileForm={setFileForm} />}
        ></Route>
        <Route
          path="/gender"
          element={<Gender joinForm={joinForm} setJoinForm={setJoinForm} />}
        ></Route>
        <Route path="/birth" element={<Birth onChange={onChange} />}></Route>
        <Route
          path="/interest"
          element={<Interest joinForm={joinForm} setJoinForm={setJoinForm} />}
        ></Route>
        <Route
          path="/mbti"
          element={<Mbti joinForm={joinForm} setJoinForm={setJoinForm} />}
        ></Route>
        <Route
          path="/userinfo"
          element={<UserInfo joinForm={joinForm} onChange={onChange} />}
        ></Route>
      </Routes>
    </Box>
  );
};

export default JoinIndex;
