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

  useEffect(() => {
    if (location.state != null) {
      // console.log(location.state);
      // console.log(location.state.memberEmail);
      // console.log(location.state.memberNickname);
      // console.log(location.state.memberImg);
      // console.log(location.state.memberSaveimg);
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

  //console.log(joinForm);

  const sendJoin = (e) => {
    //   if (!success) {
    //    return alert("본인인증이 필요합니다.");
    //   }
    e.preventDefault();
    //  console.log(joinForm.memberInterest);
    formData.append("data", new Blob([JSON.stringify(joinForm)], { type: "application/json" }));
    formData.append("uploadImage", fileForm);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("/joinmember", formData, config)
      .then((res) => {
        if (res.data === "ok") {
          alert("성공");
          nav("/", { replace: true });
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
        <Route path="/" element={<Nickname onChange={onChange} joinForm={joinForm} />}></Route>

        <Route path="/userimg" element={<UserImg setFileForm={setFileForm} />}></Route>
        <Route path="/name" element={<Name onChange={onChange} joinForm={joinForm} />}></Route>
        <Route
          path="/gender"
          element={<Gender joinForm={joinForm} setJoinForm={setJoinForm} />}
        ></Route>
        <Route path="/birth" element={<Birth onChange={onChange} joinForm={joinForm} />}></Route>
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
          element={
            <UserInfo
              joinForm={joinForm}
              onChange={onChange}
              setJoinForm={setJoinForm}
              isKakao={isKakao}
            />
          }
        ></Route>
      </Routes>
    </Box>
  );
};

export default JoinIndex;
