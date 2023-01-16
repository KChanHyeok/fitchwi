import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
export default function AddFacilities({ swAlert }) {
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

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("/insertFacilities", facilities).then((res) => {
      if (res.data === "ok") {
        swAlert("입력하신 시설 정보가 <br/> 성공적으로 저장됐습니다.", "success", () => {
          nav("/manager/facilities/");
        });
      } else {
        swAlert("시설 등록에 실패했습니다.", "warning");
      }
    });
  };

  const handlePhoneNumber = (e) => {
    const regex = /^[0-9]{0,13}$/;
    if (regex.test(e.target.value)) {
      setFacilities({ ...facilities, facilitiesPhone: e.target.value });
    }
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
            type="number"
            value={facilitiesPrice}
            onChange={(e) => onInputChange(e)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">제휴상태</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="facilitiesGrade"
              value={facilitiesGrade}
              label="Age"
              onChange={(e) => onInputChange(e)}
            >
              <MenuItem value={"제휴"}>제휴</MenuItem>
              <MenuItem value={"비제휴"}>비제휴</MenuItem>
            </Select>
          </FormControl>

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
            onChange={(e) => handlePhoneNumber(e)}
          />

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                등록하기
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Link to="/manager/facilities" style={{ textDecoration: "none" }}>
                <Button
                  align="center"
                  color="info"
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
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
