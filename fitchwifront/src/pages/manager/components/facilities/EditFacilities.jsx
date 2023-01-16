import {
  Box,
  Button,
  CircularProgress,
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
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CalendarApp from "./CalendarApp";
export default function EditFacilities({ swAlert }) {
  const { facilitiesCode } = useParams();
  const loadFacilities = useCallback(() => {
    setLoad(false);
    axios.get(`/getFacilitiesInfo/${facilitiesCode}`).then((result) => {
      setNewFacilities(result.data);
      setLoad(true);
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

  const onSubmit = (e) => {
    e.preventDefault();

    axios.put(`/updateFacilities/${facilitiesCode}`, newFacilities).then((res) => {
      if (res.data === "ok") {
        swAlert("해당 시설의 수정된 정보가 <br/> 성공적으로 저장됐습니다.");
      } else {
        swAlert("수정된 정보를 저장하는데 실패했습니다.");
      }
    });
  };
  const [load, setLoad] = useState(false);
  return (
    <Container component="main" sx={{ display: "flex", alignItems: "center" }}>
      {load === false ? (
        <Box
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={(e) => onSubmit(e)}
          sx={{
            mt: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // pl: ,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
            시설 정보 수정
          </Typography>
          <Grid container maxWidth="xs" justifyContent="space-between" spacing={3}>
            <Grid item xs={6}>
              <Box noValidate sx={{ mt: 1 }}>
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
                  onChange={(e) => onInputChange(e)}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="p">*이용 불가능 일 설정</Typography>

              {/* 캘린더 */}
              <CalendarApp facilitiesCode={facilitiesCode} swAlert={swAlert} />
            </Grid>
          </Grid>
          <Grid container spacing={1} justifyContent="space-around">
            <Grid item xs={4}>
              <Link to="/manager/facilities" style={{ textDecoration: "none" }}>
                <Button
                  align="center"
                  color="info"
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  뒤로가기
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                수정 내용 저장하기
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
