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
import FindMemberInfoModal from "./FindMemberInfoModal";

export default function Login({ sucLogin, swAlert }) {
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
        switch (res.data.state) {
          case "ok":
            sucLogin(res.data.memberEmail, res.data.memberNickname, res.data.profileImg, res.data.mbti);
            sessionStorage.setItem("id", res.data.memberEmail);
            sessionStorage.setItem("nickName", res.data.memberNickname);
            sessionStorage.setItem("mbti", res.data.mbti);
            sessionStorage.setItem("profileImg", res.data.profileImg);

            swAlert(res.data.memberNickname + "님 환영합니다.", "success", () => {
              nav("/", { replace: true });
            });

            break;

          case "wrong pwd":
            swAlert("비밀번호가 틀렸습니다.", "warning");
            break;
          case "no data":
            swAlert("아이디와 일치하는 회원정보가 없습니다.", "warning");
            break;
          case "reported":
            swAlert(
              "누적된 신고에 의해, <br/> FITCHWI 이용이 불가합니다.<br/> 제한 해지일 : " +
                res.data.memberRestriction,
              "warning",
              () => {
                nav("/", { replace: true });
              }
            );

            break;
          case "released":
            swAlert(res.data.memberRestriction + "부로 이용 제한이 해제됐습니다.", "info", () => {
              sucLogin(res.data.memberEmail, res.data.memberNickname, res.data.profileImg, res.data.mbti);
              sessionStorage.setItem("id", res.data.memberEmail);
              sessionStorage.setItem("nickName", res.data.memberNickname);
              sessionStorage.setItem("mbti", res.data.mbti);
              sessionStorage.setItem("profileImg", res.data.profileImg);
              swAlert(res.data.memberNickname + "님 환영합니다.", "success", () => {
                nav("/", { replace: true });
              });
            });

            break;
          default:
            break;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            marginTop: 5,
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
              inputProps={{ maxLength: 20 }}
              onChange={onLoginChange}
              value={memberPwd}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, height: 45 }}>
              로그인
            </Button>

            <Button fullWidth variant="text" sx={{ mt: 2, mb: 2, height: "45px" }}>
              <KaKaoLogin swAlert={swAlert} />
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <FindMemberInfoModal swAlert={swAlert} />
            </Grid>

            <Grid item>
              <Link to="/join" state={{ member: "newMember" }} style={{ textDecoration: "none" }}>
                <Button style={{ color: "black" }}>회원 가입</Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/* <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }} onClick={() => createMemeber()}>
          테스트계정생성
        </Button> */}
      </Container>
    </>
  );
}
