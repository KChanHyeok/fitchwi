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
        console.log(res.data[0]);
        console.log(res.data[1]);
        console.log(res.data[2]);
        console.log(res.data);

        switch (res.data[0]) {
          case "ok":
            sucLogin(res.data[1], res.data[2]);
            sessionStorage.setItem("id", res.data[1]);
            sessionStorage.setItem("nickName", res.data[2]);
            alert(res.data[2] + "님 환영합니다.");
            nav("/");
            break;

          case "wrong pwd":
            alert("비밀번호가 틀렸습니다.");
            break;
          case "no data":
            alert("아이디와 일치하는 회원정보가 없습니다.");
            break;
          case "reported":
            alert(res.data[1] + "부터 이용 가능");
            nav("/");
            break;
          case "released":
            alert(res.data[1] + "부로 이용 제한 해제");
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LoginOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          로.그.인.
        </Typography>
        <Box component="form" onSubmit={onLoginSend} sx={{ mt: 1 }}>
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

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            로그인
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => createMemeber()}
          >
            구글로그인
          </Button>

          <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
            카카오로그인
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
  );
}
