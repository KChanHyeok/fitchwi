import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MemberPage from "./components/MemberPage";
export default function MemberPageIndex({ onLogout }) {
  const location = useLocation();
  console.log(location);
  const nav = useNavigate();
  const [member, setMember] = useState({});

  let pageOwner = "";

  if (location.state != null) {
    pageOwner = location.state.memberId;
  } else {
    pageOwner = sessionStorage.getItem("id");
  }

  const getMemberInfo = useCallback(
    (e) => {
      if (pageOwner != null) {
        axios.get("/getMemberInfo", { params: { userId: pageOwner } }).then((res) => {
          setMember(() => res.data);
        });
      } else {
        alert("로그인 후 이용 가능합니다.");
        nav("/");
      }
    },
    [pageOwner, nav]
  );
  console.log(member);
  useEffect(() => {
    getMemberInfo();
  }, [getMemberInfo]);
  return <MemberPage member={member} onLogout={onLogout} pageOwner={pageOwner} />;
}
