import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
export default function AddFacilities() {
  const nav = useNavigate();

  const [facilities, setFacilities] = useState({
    facilitiesName: "",
    facilitiesManager: "",
    facilitiesPhone: "",
    facilitiesPosition: "",
    facilitiesPrice: "",
    facilitiesGrade: "",
  });

  const {
    facilitiesName,
    facilitiesManager,
    facilitiesPhone,
    facilitiesPosition,
    facilitiesPrice,
    facilitiesGrade,
  } = facilities;

  const onInputChange = (e) => {
    setFacilities({ ...facilities, [e.target.name]: e.target.value });
  };
  console.log(facilities);

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("/insertFacilities", facilities).then((res) => {
      if (res.data === "ok") {
        alert("시설 등록에 성공했습니다.");
        nav("/manager/facilities/");
      } else {
        alert("시설 등록에 실패했습니다.");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs" alignItems="center">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddBusinessIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          시설 등록
        </Typography>
        <Box component="form" onSubmit={(e) => onSubmit(e)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="시설 명"
            name="facilitiesName"
            autoFocus
            value={facilitiesName}
            onChange={(e) => onInputChange(e)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="facilitiesPosition"
            label="시설 위치"
            type="text"
            value={facilitiesPosition}
            onChange={(e) => onInputChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="facilitiesPrice"
            label="시설 1인 이용료"
            type="text"
            value={facilitiesPrice}
            onChange={(e) => onInputChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="facilitiesGrade"
            label="등급"
            type="text"
            value={facilitiesGrade}
            onChange={(e) => onInputChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="facilitiesManager"
            label="담당자 명"
            type="text"
            value={facilitiesManager}
            onChange={(e) => onInputChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="facilitiesPhone"
            label="담당자 연락처"
            type="text"
            value={facilitiesPhone}
            onChange={(e) => onInputChange(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                등록하기
              </Button>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Link to="/manager/facilities" style={{ textDecoration: "none" }}>
                <Button
                  align="center"
                  color="info"
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  취소하기
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
