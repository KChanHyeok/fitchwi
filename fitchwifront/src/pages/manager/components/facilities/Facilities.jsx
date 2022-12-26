import {
  Button,
  ButtonGroup,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  console.log("상세");
  useEffect(() => {
    loadFacilities();
    console.log("axios");
  }, []);

  const loadFacilities = () => {
    axios.get("/getAllFacilitiesList").then((result) => {
      console.log(result.data);
      setFacilities(result.data);
    });
  };

  const BasicTableRow = styled(TableRow)({
    ":hover": { backgroundColor: `#e9e9e9`, transition: `0.3s` },
  });

  const deleteFacilities = (facilitiesCode) => {
    axios.delete(`/deleteFacilities/${facilitiesCode}`).then((result) => {
      alert(result.data);
      loadFacilities();
    });
  };

  return (
    <Box align="center" maxWidth={800} sx={{ pl: 30 }}>
      <Typography variant="h5">시설 관리</Typography>
      <Link to="/manager/facilities/insertFacilities">시설 등록</Link>
      <TableContainer component={Paper} sx={{ boxShadow: "5px 5px 10px #d9d9d9", maxWidth: 1440 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ borderBottom: "2px solid black" }}>
            <BasicTableRow>
              <TableCell align="right">시설번호</TableCell>
              <TableCell align="right">시설 명</TableCell>
              <TableCell align="right">담당자명</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">Action</TableCell>
            </BasicTableRow>
          </TableHead>
          <TableBody>
            {facilities &&
              facilities.map((facilities, index) => (
                <BasicTableRow key={index}>
                  <TableCell align="right">{index + 1}</TableCell>

                  <TableCell align="right">
                    <Link
                      to={`/manager/facilities/getFacilitiesInfo/${facilities.facilitiesCode}`}
                      style={{ textDecoration: "none" }}
                    >
                      {facilities.facilitiesName}{" "}
                    </Link>
                  </TableCell>

                  <TableCell align="right">{facilities.facilitiesManager}</TableCell>
                  <TableCell align="center">{facilities.facilitiesGrade}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Link
                        to={`/facilities/edit${facilities.facilitiesCode}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button>수정하기</Button>
                      </Link>
                      <Button onClick={() => deleteFacilities(facilities.facilitiesCode)}>
                        삭제하기
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </BasicTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
