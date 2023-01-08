import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LoginOutlined } from "@mui/icons-material";
import KaKaoLogin from "./KakaoLogin";

export default function Login({ sucLogin }) {
  const nav = useNavigate();
  const [loginForm, setLoginForm] = React.useState({
    memberEmail: "",
    memberPwd: "",
  });
  const { memberEmail, memberPwd } = loginForm;

  const onLoginChange = React.useCallback(
    (e) => {
      const loginObj = {
        ...loginForm,
        [e.target.name]: e.target.value,
      };
      setLoginForm(loginObj);
    },
    [loginForm]
  );
  const onLoginSend = React.useCallback(
    (e) => {
      e.preventDefault();
      axios.post("/loginmember", loginForm).then((res) => {
        //0: result /1:id / 2:nickname

        switch (res.data.state) {
          case "ok":
            sucLogin(res.data.memberEmail, res.data.memberNickname);
            sessionStorage.setItem("id", res.data.memberEmail);
            sessionStorage.setItem("nickName", res.data.memberNickname);
            alert(res.data.memberNickname + "님 환영합니다.");
            nav("/");
            break;

          case "wrong pwd":
            alert("비밀번호가 틀렸습니다.");
            break;
          case "no data":
            alert("아이디와 일치하는 회원정보가 없습니다.");
            break;
          case "reported":
            alert("신고누적으로, " + res.data.memberRestriction + "부터 이용 가능합니다.");
            nav("/");
            break;
          case "released":
            alert(res.data.memberRestriction + "부로 이용 제한이 해제됐습니다.");
            sucLogin(res.data.memberEmail, res.data.memberNickname);
            sessionStorage.setItem("id", res.data.memberEmail);
            sessionStorage.setItem("nickName", res.data.memberNickname);
            alert(res.data.memberNickname + "님 환영합니다.");
            nav("/");
            break;
          default:
            break;
        }
      });
    },
    [loginForm, nav, sucLogin]
  );
  const createMemeber = () => {
    axios.get("/createMemeber").then((result) => {
      alert(result.data);
    });
  };
  return (
    <>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            p: 5,
            borderRadius: 10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LoginOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={onLoginSend} sx={{ mt: 1 }} style={{ width: "300px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="memberEmail"
              autoFocus
              onChange={onLoginChange}
              value={memberEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="memberPwd"
              label="Password"
              type="password"
              id="password"
              onChange={onLoginChange}
              value={memberPwd}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              로그인
            </Button>

            <Button fullWidth variant="outlined" sx={{ mt: 1 }} onClick={() => createMemeber()}>
              구글로그인
            </Button>

            <Button fullWidth variant="text" sx={{ mt: 1, mb: 2, height: "45px" }}>
              <KaKaoLogin />
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="" variant="body2">
                  아이디/비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link to="/join">회원 가입</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
