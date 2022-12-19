import axios from "axios";
import React, { useState, useCallback } from "react";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    memberEmail: "",
    memberPwd: "",
  });

  const { memberEmail, memberPwd } = loginForm;

  const onLoginChange = useCallback(
    (e) => {
      const loginObj = {
        ...loginForm,
        [e.target.name]: e.target.value,
      };
      setLoginForm(loginObj);
    },
    [loginForm]
  );

  const onLoginSend = useCallback(
    (e) => {
      e.preventDefault();
      axios.post("/loginmember", loginForm).then((res) => {
        console.log(res.data);
        if (res.data !== null) {
          sessionStorage.setItem("id", res.data);
          alert("로그인됨");
        } else {
          alert("로그인 실패");
        }
      });
    },
    [loginForm]
  );

  return (
    <form onSubmit={onLoginSend}>
      여기는 로그인 페이지
      <div>
        {" "}
        아이디 :{" "}
        <input type="text" name="memberEmail" onChange={onLoginChange} value={memberEmail} />
      </div>
      <div>
        {" "}
        비밀번호 :{" "}
        <input type="password" name="memberPwd" onChange={onLoginChange} value={memberPwd} />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
