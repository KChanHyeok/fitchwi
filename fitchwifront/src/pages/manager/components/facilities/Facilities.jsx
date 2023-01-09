import {
  Button,
  ButtonGroup,
  CircularProgress,
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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FacilitiesSearch from "./FacilitiesSearch";
export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [facilitiesName, setFacilitiesName] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  let pageNumInSessionStg = sessionStorage.getItem("pageNum");
  const [load, setLoad] = useState(false);
  const loadFacilities = (pageNumInSessionStg, facilitiesName) => {
    setLoad(false);
    console.log("로드");
    axios
      .get("/getFacilitiesList", {
        params: { pageNum: pageNumInSessionStg, facilitiesName: facilitiesName },
      })
      .then((result) => {
        const { facilitiesList, totalPage, pageNum } = result.data;
        setTotalPage(totalPage);
        setPageNum(pageNum);
        setFacilities(facilitiesList);
        setLoad(true);
        sessionStorage.setItem("pageNum", pageNum);
      });
  };

  useEffect(() => {
    pageNumInSessionStg !== null
      ? loadFacilities(pageNumInSessionStg, facilitiesName)
      : loadFacilities(1, facilitiesName);
    console.log("axios");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlepageNum = (value) => {
    console.log("pagenum handle");
    console.log("value =  " + value);
    console.log("facilitiesname = " + facilitiesName);
    loadFacilities(value, facilitiesName);
  };

  const BasicTableRow = styled(TableRow)({
    maxHeight: 68,
    ":hover": { backgroundColor: `#ffd2e2`, transition: `0.3s` },
  });

  const deleteFacilities = (facilitiesCode) => {
    axios.delete(`/deleteFacilities/${facilitiesCode}`).then((result) => {
      alert(result.data);
      loadFacilities(pageNum);
    });
  };
  console.log("out");
  console.log(facilitiesName);
  return (
    <Container
      component="main"
      style={{ maxWidth: "1200px" }}
      align="center"
      sx={{ margin: "auto", ml: 40 }}
    >
      <FacilitiesSearch
        facilitiesName={facilitiesName}
        setFacilitiesName={setFacilitiesName}
        pageNum={pageNum}
        loadFacilities={loadFacilities}
      />
      <Box>
        <Typography variant="h4">시설 관리</Typography>

        <Link to="/manager/facilities/insertFacilities" style={{ textDecoration: "none" }}>
          <Button variant="contained" style={{ float: "right", marginTop: 10 }}>
            시설 등록
          </Button>
        </Link>
      </Box>
      <TableContainer component="main" sx={{ width: "100%", height: 570 }}>
        <Table sx={{ mt: 2 }} aria-label="simple table">
          <TableHead style={{ borderBottom: "2px solid black" }}>
            <TableRow>
              <TableCell align="center" width="20%">
                시설번호
              </TableCell>
              <TableCell align="center" width="20%">
                시설 명
              </TableCell>
              <TableCell align="center" width="20%">
                담당자명
              </TableCell>
              <TableCell align="center" width="20%">
                상태
              </TableCell>
              <TableCell align="center" width="20%">
                수정/삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} alignItems="center" mt={3}>
        <Pagination
          sx={{ mb: 10 }}
          count={totalPage}
          onChange={(e, value) => handlepageNum(value)}
          color="primary"
          page={pageNum}
        />
      </Stack>
    </Container>
  );
}
