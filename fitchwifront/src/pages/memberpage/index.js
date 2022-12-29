import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MemberPage from "./components/MemberPage";
import UpdateMember from "./components/UpdateMember";
export default function MemberPageIndex({ onLogout }) {
  const location = useLocation();
  const nav = useNavigate();
  const [member, setMember] = useState({});

  let pageOwner = "";

  if (location.state != null) {
    pageOwner = location.state.memberId;
  } else {
    pageOwner = sessionStorage.getItem("id");
  }

  const getMemberInfo = useCallback(() => {
    if (pageOwner != null) {
      axios.get("/getMemberInfo", { params: { userId: pageOwner } }).then((res) => {
        setMember(() => res.data);
      });
    } else {
      alert("로그인 후 이용 가능합니다.");
      nav("/");
    }
  }, [pageOwner, nav]);

  useEffect(() => {
    getMemberInfo();
  }, [getMemberInfo]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<MemberPage member={member} onLogout={onLogout} pageOwner={pageOwner} />}
        ></Route>

        <Route path="/updateMember" element={<UpdateMember member={member} />}></Route>
      </Routes>
    </div>
  );
}
