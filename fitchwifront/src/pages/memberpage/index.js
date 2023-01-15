import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MemberPage from "./components/MemberPage";
import UpdateMember from "./components/UpdateMember";
export default function MemberPageIndex({ onLogout, lstate, sucLogin }) {
  const location = useLocation();
  const nav = useNavigate();
  const [member, setMember] = useState({});

  const { logid } = lstate;
  let pageOwner = "";

  if (location.state != null) {
    pageOwner = location.state.memberId;
  } else {
    pageOwner = logid;
  }

  const getMemberInfo = useCallback(() => {
    if (pageOwner !== "") {
      axios.get("/getMemberInfo", { params: { userId: pageOwner } }).then((res) => {
        setMember(() => res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageOwner, nav]);

  useEffect(() => {
    getMemberInfo();
  }, [getMemberInfo]);

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
    <div>
      <Routes>
        <Route
          path="/"
          element={<MemberPage member={member} onLogout={onLogout} lstate={lstate} swAlert={swAlert} />}
        ></Route>

        <Route
          path="/updateMember"
          element={<UpdateMember member={member} lstate={lstate} sucLogin={sucLogin} swAlert={swAlert} />}
        ></Route>
      </Routes>
    </div>
  );
}
