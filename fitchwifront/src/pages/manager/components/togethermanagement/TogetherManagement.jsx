import { ExpandMore, Remove } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
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
import TogetherSearch from "./TogetherSearch";

export default function TogeterManagement({swAlert}) {
  const [togetherCancelRequestList, setTogetherCancelRequestList] = useState([]);
  const [togetherTitleToSearch, setTogetherTitleToSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const [totalPage, setTotalPage] = useState(0);
  const [load, setLoad] = useState(false);
  let pageNumInSessionStg = sessionStorage.getItem("pageNum");

  useEffect(() => {
    pageNumInSessionStg !== null
      ? getTogetherCancelRequestList(pageNumInSessionStg, togetherTitleToSearch)
      : getTogetherCancelRequestList(1, togetherTitleToSearch);
    // console.log("axios");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTogetherCancelRequestList = (pageNumInSessionStg, togetherTitle) => {
    // console.log("report");
    setLoad(false);
    axios
      .get("/getTogetherCancelRequestList", {
        params: { pageNum: pageNumInSessionStg, togetherTitle: togetherTitle },
      })
      .then((result) => {
        //  console.log(result.data);
        const { togetherList, totalPage, pageNum } = result.data;

        //  console.log(result.data);
        setTogetherCancelRequestList(togetherList);
        setPageNum(pageNum);
        setTotalPage(totalPage);
        sessionStorage.setItem("pageNum", pageNum);
        setLoad(true);
      });
    };
  const deleteTogether = (together) => {
    console.log(together)
    axios.delete("/deleteTogether", {params: {togetherCode: together.togetherCode}})
    .then((res) => {
      swAlert(res.data);
      getTogetherCancelRequestList(pageNum, togetherTitleToSearch);
    }).catch((error)=> console.log(error))
  } 

  const handlepageNum = useCallback((value) => {
    getTogetherCancelRequestList(value, togetherTitleToSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CenterTableCell = styled(TableCell)({
    textAlign: "center",
    width: "20%",
  });


  return (
    <Container component="main" align="center" sx={{ mt: 13 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">함께해요 취소 관리</Typography>
      </Box>
      <TogetherSearch
        togetherTitleToSearch={togetherTitleToSearch}
        getTogetherCancelRequestList={getTogetherCancelRequestList}
        setTogetherTitleToSearch={setTogetherTitleToSearch}
      />

      <Accordion>
        <AccordionSummary
          expandIcon={<Remove />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          // backgroundColor="white"
          disabled
          style={{ opacity: "1" }}
        >
          <Typography align="center" sx={{ width: "100%" }}>
            함께해요 코드
          </Typography>

          <Typography align="center" sx={{ width: "100%" }}>
            함께해요 이름
          </Typography>

          <Typography align="center" sx={{ width: "100%" }}>
            개설자
          </Typography>

          <Typography align="center" sx={{ width: "100%" }}>
            모임예정일
          </Typography>
          <Typography align="center" sx={{ width: "100%" }}>
            상태
          </Typography>
        </AccordionSummary>
      </Accordion>
      <Box>
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
          togetherCancelRequestList.map((together, index) => (
            <div key={together.togetherCode}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container justifyContent="space-evenly">
                    <Grid item xs={2}>
                      {together.togetherCode}
                    </Grid>
                    <Grid item xs={2}>
                      <Link to={`/together/${together.togetherCode}`}>
                        <Typography>{together.togetherTitle}</Typography>
                      </Link>
                    </Grid>
                    <Grid item xs={2}>
                      <Link
                        to="/memberpage"
                        state={{ memberId: together.togetherOpenedCode.memberEmail.memberEmail }}
                      >
                        <Typography>{together.togetherOpenedCode.memberEmail.memberEmail}</Typography>
                      </Link>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{together.togetherDate}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{together.togetherState}</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>

                <AccordionDetails>
                  <TableContainer component="main">
                    <Table aria-label="simple table">
                      <TableHead style={{ borderBottom: "1.5px solid gray", backgroundColor: "#fcefef" }}>
                        <TableRow>
                          <CenterTableCell>개설일</CenterTableCell>
                          <CenterTableCell>모집시작일</CenterTableCell>
                          <CenterTableCell>모집 마감일</CenterTableCell>
                          <CenterTableCell>1인당 비용</CenterTableCell>
                          <CenterTableCell>총 회비</CenterTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={together.reportDetailCode} sx={{ backgroundColor: "#f2f2f2" }}>
                          <CenterTableCell>{together.togetherOpenedCode.togetherOpenedDate}</CenterTableCell>
                          <CenterTableCell>{together.togetherRecruitStartDate}</CenterTableCell>
                          <CenterTableCell>{together.togetherRecruitEndDate}</CenterTableCell>
                          <CenterTableCell>{together.togetherPrice}</CenterTableCell>
                          <CenterTableCell>{together.togetherTotalPrice}</CenterTableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button sx={{mt:3}} variant="contained" onClick={()=> deleteTogether(together)}>삭제 및 환불하기</Button>
                </AccordionDetails>
              </Accordion>
              <Divider variant="middle" component={"li"} style={{ listStyle: "none" }} />
            </div>
          ))
        )}
      </Box>
      <Stack spacing={2} alignItems="center" mt={3}>
        <Pagination
          count={totalPage}
          onChange={(e, value) => handlepageNum(value)}
          color="primary"
          page={pageNum}
        />
      </Stack>
    </Container>
  );
}
