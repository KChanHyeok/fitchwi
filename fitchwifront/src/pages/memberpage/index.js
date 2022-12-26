import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MemberPage from "./components/MemberPage";
import UpdateMember from "./components/UpdateMember";
export default function MemberPageIndex({ onLogout }) {
  const location = useLocation();
  console.log(location);
  const nav = useNavigate();
  const [member, setMember] = useState({});
  const [feedList, setFeedList] = useState([]);
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

  const getAllFeedList = useCallback(() => {
    axios.post("/getMemberFeed", member).then((res) => setFeedList(res.data));
  }, [member]);
  console.log(member);

  useEffect(() => {
    getAllFeedList();
  }, [getAllFeedList]);

  useEffect(() => {
    console.log(feedList);
  }, [feedList]);

  useEffect(() => {
    getMemberInfo();
  }, [getMemberInfo]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MemberPage
              member={member}
              onLogout={onLogout}
              pageOwner={pageOwner}
              feedList={feedList}
            />
          }
        ></Route>

        <Route path="/updateMember" element={<UpdateMember />}></Route>
      </Routes>
    </div>
  );
}
