import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mypage from "./components/Mypage";
export default function MypageIndex() {
  const nav = useNavigate();
  const [member, setMember] = useState({});
  const memberEmail = sessionStorage.getItem("id");
  const getMemberInfo = useCallback(
    (e) => {
      if (memberEmail != null) {
        axios.get("/getMemberInfo", { params: { userId: memberEmail } }).then((res) => {
          setMember(() => res.data);
        });
      } else {
        alert("로그인 후 이용 가능합니다.");
        nav("/");
      }
    },
    [memberEmail, nav]
  );
  console.log(member);
  useEffect(() => {
    getMemberInfo();
  }, [getMemberInfo]);
  return <Mypage member={member} />;
}
