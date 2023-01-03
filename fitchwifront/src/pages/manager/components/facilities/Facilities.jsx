import {
  Button,
  ButtonGroup,
  Container,
  Pagination,
  Stack,
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
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Facilities() {
  const [facilities, setFacilities] = useState([]);

  const [fPageNum, setFPageNum] = useState(1);

  const [totalFPage, setTotalFPage] = useState(0);
  let fPageNumInSessionStg = sessionStorage.getItem("fPageNum");

  const loadFacilities = (fPageNumInSessionStg) => {
    axios
      .get("/getAllFacilitiesList", { params: { pageNum: fPageNumInSessionStg } })
      .then((result) => {
        const { facilitiesList, totalPage, pageNum } = result.data;
        setTotalFPage(totalPage);
        setFPageNum(pageNum);
        setFacilities(facilitiesList);

        sessionStorage.setItem("fPageNum", pageNum);
      });
  };
  useEffect(() => {
    fPageNumInSessionStg !== null ? loadFacilities(fPageNumInSessionStg) : loadFacilities(1);
    console.log("axios");
  }, [fPageNumInSessionStg]);

  const handleFPageNum = useCallback((value) => {
    loadFacilities(value);
  }, []);

  const BasicTableRow = styled(TableRow)({
    ":hover": { backgroundColor: `#ffd2e2`, transition: `0.3s` },
  });

  const deleteFacilities = (facilitiesCode) => {
    axios.delete(`/deleteFacilities/${facilitiesCode}`).then((result) => {
      alert(result.data);
      loadFacilities();
    });
  };
  // console.log(totalFPage);
  // console.log(fPageNum);

  return (
    <Container
      component="main"
      style={{ maxWidth: "1200px" }}
      align="center"
      sx={{ margin: "auto", ml: 40 }}
    >
      <Box>
        <Typography variant="h4">시설 관리</Typography>

        <Link to="/manager/facilities/insertFacilities" style={{ textDecoration: "none" }}>
          <Button variant="contained" style={{ float: "right", marginTop: 10 }}>
            시설 등록
          </Button>
        </Link>
      </Box>
      <TableContainer component="main" sx={{ width: "100%" }}>
        <Table sx={{ width: "100%", mt: 2 }} aria-label="simple table">
          <TableHead style={{ borderBottom: "2px solid black" }}>
            <TableRow>
              <TableCell align="center">시설번호</TableCell>
              <TableCell align="center">시설 명</TableCell>
              <TableCell align="center">담당자명</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">수정/삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilities &&
              facilities.map((facilities, index) => (
                <BasicTableRow key={index}>
                  <TableCell align="center">{facilities.facilitiesCode}</TableCell>

                  <TableCell align="center">
                    <Link
                      to={`/manager/facilities/getFacilitiesInfo/${facilities.facilitiesCode}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {facilities.facilitiesName}{" "}
                    </Link>
                  </TableCell>

                  <TableCell align="center">{facilities.facilitiesManager}</TableCell>
                  <TableCell align="center">{facilities.facilitiesGrade}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Link
                        to={`/manager/facilities/updateFacilities/${facilities.facilitiesCode}`}
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
      <Stack spacing={2} alignItems="center" mt={3}>
        <Pagination
          sx={{ mb: 10 }}
          count={totalFPage}
          onChange={(e, value) => handleFPageNum(value)}
          color="primary"
          page={fPageNum}
        />
      </Stack>
    </Container>
  );
}
