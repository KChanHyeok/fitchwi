import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Name from "./components/Name";
import Nickname from "./components/Nickname";
import UserImg from "./components/UserImg";
import Gender from "./components/Gender";
import Birth from "./components/Birth";
import Interest from "./components/Interest";
import Mbti from "./components/Mbti";
import UserInfo from "./components/UserInfo";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const JoinIndex = () => {
  let formData = new FormData();
  const nav = useNavigate();
  const [fileForm, setFileForm] = useState("");
  const [isKakao, setIsKakao] = useState(false);
  const location = useLocation();

  const [joinForm, setJoinForm] = useState({
    memberEmail: "",
    memberPwd: null,
    memberName: "",
    memberNickname: "",
    memberGender: "",
    memberPhone: "",
    memberAddr: "",
    memberBirth: "",
    memberMbti: "",
    memberInterest: [],
    memberImg: "",
    memberSaveimg: "",
  });
  /////////////////////
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {

    if (location.state != null) {
      setIsValid(true);
      if (location.state.member === "newMember") {
      } else {
        setIsValid(true);

        setIsKakao(true);
        const joinFormObj = {
          ...joinForm,
          memberEmail: location.state.memberEmail,
          memberNickname: location.state.memberNickname,
          memberImg: location.state.memberImg,
          memberSaveimg: location.state.memberSaveimg,
        };
        setJoinForm(joinFormObj);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  //////////
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

  const sendJoin = (e) => {
    e.preventDefault();

    formData.append("data", new Blob([JSON.stringify(joinForm)], { type: "application/json" }));
    formData.append("uploadImage", fileForm);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("/joinmember", formData, config)
      .then((res) => {
        if (res.data === "ok") {
          swAlert("회원가입이 완료됐습니다.<br/> 로그인 페이지로 이동합니다.", "success", () => {
            nav("/login", { replace: true });
            setIsValid(false);
          });
        } else {
          swAlert("회원 가입 처리과정에 문제가 발생했습니다.", "warning");
        }
      })
      .catch((error) => console.log(error));
  };

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
        <Route
          path="/"
          element={
            <Nickname
              onChange={onChange}
              joinForm={joinForm}
              swAlert={swAlert}
              isValid={isValid}
              location={location}
            />
          }
        ></Route>

        <Route
          path="/userimg"
          element={
            <UserImg joinForm={joinForm} setFileForm={setFileForm} swAlert={swAlert} isValid={isValid} />
          }
        ></Route>
        <Route
          path="/name"
          element={
            <Name
              location={location}
              onChange={onChange}
              joinForm={joinForm}
              swAlert={swAlert}
              isKakao={isKakao}
              isValid={isValid}
            />
          }
        ></Route>
        <Route
          path="/gender"
          element={
            <Gender joinForm={joinForm} setJoinForm={setJoinForm} swAlert={swAlert} isValid={isValid} />
          }
        ></Route>
        <Route
          path="/birth"
          element={<Birth onChange={onChange} joinForm={joinForm} swAlert={swAlert} isValid={isValid} />}
        ></Route>
        <Route
          path="/interest"
          element={
            <Interest joinForm={joinForm} setJoinForm={setJoinForm} swAlert={swAlert} isValid={isValid} />
          }
        ></Route>
        <Route
          path="/mbti"
          element={<Mbti joinForm={joinForm} setJoinForm={setJoinForm} swAlert={swAlert} isValid={isValid} />}
        ></Route>
        <Route
          path="/userinfo"
          element={
            <UserInfo
              joinForm={joinForm}
              onChange={onChange}
              setJoinForm={setJoinForm}
              isKakao={isKakao}
              swAlert={swAlert}
              isValid={isValid}
            />
          }
        ></Route>
      </Routes>
    </Box>
  );
};

export default JoinIndex;
