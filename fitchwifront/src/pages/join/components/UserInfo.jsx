import React /*, { useRef , useState  }*/ from "react";

import { Button, Grid, TextField, Typography } from "@mui/material";

export default function UserInfo({ onChange }) {
  //const [msg, setMsg] = useState("");
  // const inputPwd = useRef();

  // const onCheckPwd = (e) => {
  //   let checkpwd = e.target.value;
  //   console.log(inputPwd.current.value);
  //   console.log(checkpwd);
  //   if (checkpwd === "") {
  //     setMsg("");
  //   } else if (checkpwd === inputPwd.current.value) {
  //     setMsg("비밀번호 확인이 완료됐습니다.");
  //   } else {
  //     setMsg("올바른 비밀번호를 입력해주세요");
  //   }
  // };

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h2" gutterBottom mb={10}>
        더 알려주세요
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            onChange={onChange}
            name="memberEmail"
            sx={{ mb: 5 }}
            label="Email"
            type="email"
            multiline
            variant="standard"
            InputProps={{ style: { fontSize: 30 } }}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={onChange}
            name="memberPwd"
            sx={{ mb: 5 }}
            type="password"
            label="비밀번호"
            variant="standard"
            InputProps={{ style: { fontSize: 30 } }}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <TextField
            // onChange={onCheckPwd}
            //name="memberPwd"
            sx={{ mb: 5 }}
            type="password"
            label="비밀번호 확인"
            variant="standard"
            InputProps={{ style: { fontSize: 30 } }}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Alert severity="info">위와 동일한 비밀번호를 입력해주세요.</Alert> */}
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={onChange}
            name="memberAddr"
            sx={{ mb: 5 }}
            label="주소"
            multiline
            variant="standard"
            InputProps={{ style: { fontSize: 30 } }}
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={onChange}
            name="memberPhone"
            label="연락처"
            multiline
            variant="standard"
            InputProps={{ style: { fontSize: 30 } }}
            inputProps={{ maxLength: 16 }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12}>
        <Button type="submit" sx={{ mt: 5, width: 100 }} variant="contained">
          회원가입
        </Button>
      </Grid>
    </div>
  );
}
