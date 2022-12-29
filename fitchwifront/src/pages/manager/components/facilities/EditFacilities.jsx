import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CalendarApp from "./CalendarApp";
export default function EditFacilities() {
  const nav = useNavigate();
  const { facilitiesCode } = useParams();
  const loadFacilities = useCallback(() => {
    axios.get(`/getFacilitiesInfo/${facilitiesCode}`).then((result) => {
      console.log(result.data);
      setNewFacilities(result.data);
    });
  }, [facilitiesCode]);
  useEffect(() => {
    loadFacilities();
  }, [loadFacilities]);

  const [newFacilities, setNewFacilities] = useState({
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
  } = newFacilities;

  const onInputChange = (e) => {
    setNewFacilities({ ...newFacilities, [e.target.name]: e.target.value });
  };
  console.log(newFacilities);

  const onSubmit = (e) => {
    e.preventDefault();
    axios.put(`/updateFacilities/${facilitiesCode}`, newFacilities).then((res) => {
      if (res === "ok") {
        alert(res.data);
        nav("/manager/facilities");
      } else {
        alert(res.data);
      }
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
          <Grid item xs={12} sx={{ mb: 2, mt: 5 }}>
            <Typography variant="p">*이용 불가능 일 설정</Typography>
          </Grid>

          <Grid item xs={12}>
            {/* 캘린더 */}
            <CalendarApp facilitiesCode={facilitiesCode} />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                수정하기
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                color="error"
                type="reset"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                초기화
              </Button>
            </Grid>
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
