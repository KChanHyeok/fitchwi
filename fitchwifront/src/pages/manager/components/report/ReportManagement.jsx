import { ExpandMore, Remove } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
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
import moment from "moment/moment";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ReportManagement() {
  const [reportList, setReportList] = useState([]);

  const [rPageNum, setRPageNum] = useState(1);

  const [totalRPage, setTotalRPage] = useState(0);

  let rPageNumInSessionStg = sessionStorage.getItem("rPageNum");

  useEffect(() => {
    rPageNumInSessionStg !== null ? getReports(rPageNumInSessionStg) : getReports(1);
    console.log("axios");
  }, [rPageNumInSessionStg]);

  const getReports = (rPageNumInSessionStg) => {
    axios.get("/getReports", { params: { pageNum: rPageNumInSessionStg } }).then((result) => {
      const { reportList, totalPage, pageNum } = result.data;
      console.log(result.data);
      setReportList(reportList);
      setRPageNum(pageNum);
      setTotalRPage(totalPage);
      sessionStorage.setItem("rPageNum", pageNum);
    });
  };
  const handleRPageNum = useCallback((value) => {
    getReports(value);
  }, []);
  const onRistrict = (period, memberEmail) => {
    console.log(period);
    let restrictDate = moment().add(period, "days").format("YYYY-MM-DD ");

    axios
      .get("/restrictMember", {
        params: { restrictDate: restrictDate, targetMemberEmail: memberEmail },
      })
      .then((result) => console.log(result));
  };

  const [restrictDateMap, setRestrictDateMap] = useState(new Map());

  const onSelectDate = useCallback((e) => {
    console.log(e.target.value);
    setRestrictDateMap((prev) => new Map(prev).set(e.target.name, e.target.value));
  }, []);

  const deleteReport = (reportCode) => {
    console.log(reportCode);
    axios.delete("/deleteReport", { params: { reportCode: reportCode } }).then((result) => {
      alert(result.data);
      getReports();
    });
  };
  return (
    <Container component="main" style={{ maxWidth: "1200px" }} align="center" sx={{ ml: 40 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4">신고 관리</Typography>
      </Box>

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
            신고 코드
          </Typography>

          <Typography align="center" sx={{ width: "100%" }}>
            신고 대상
          </Typography>

          <Typography align="center" sx={{ width: "100%" }}>
            피신고 회원
          </Typography>

          <Typography align="center" sx={{ width: "100%" }}>
            신고 건수
          </Typography>
        </AccordionSummary>
      </Accordion>

      {reportList &&
        reportList.map((report, index) => (
          <div key={report.reportCode}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container>
                  <Grid item xs={3}>
                    {" "}
                    {report.reportCode}
                  </Grid>
                  <Grid item xs={3}>
                    {" "}
                    {report.reportTarget === 0 ? (
                      <Link
                        to={`/${report.reportCategory}`}
                        state={{ memberId: report.memberEmail.memberEmail }}
                      >
                        <Typography align="center" sx={{ width: "100%" }}>
                          {report.reportCategory}
                        </Typography>
                      </Link>
                    ) : (
                      <Link to={`/${report.reportCategory}/${report.reportTarget}`}>
                        <Typography align="center" sx={{ width: "100%" }}>
                          {report.reportCategory}
                        </Typography>
                      </Link>
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    {" "}
                    <Link
                      to={`/${report.reportCategory}`}
                      state={{ memberId: report.memberEmail.memberEmail }}
                    >
                      <Typography align="center" sx={{ width: "100%" }}>
                        {report.memberEmail.memberEmail}
                      </Typography>
                    </Link>{" "}
                  </Grid>
                  <Grid item xs={3}>
                    {" "}
                    {report.reportDetailList.length}
                  </Grid>
                </Grid>
              </AccordionSummary>

              <AccordionDetails>
                <TableContainer component="main">
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead style={{ borderBottom: "2px solid black", backgroundColor: "#ddd" }}>
                      <TableRow>
                        <TableCell align="center">신고일시</TableCell>
                        <TableCell align="center">신고자</TableCell>
                        <TableCell align="center">신고 내용</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {report.reportDetailList.map((reportDetail) => (
                        <TableRow
                          key={reportDetail.reportDetailCode}
                          sx={{ backgroundColor: "#eee" }}
                        >
                          <TableCell align="center">{reportDetail.reportDetailDate}</TableCell>
                          <TableCell align="center">
                            {reportDetail.memberEmail.memberEmail}
                          </TableCell>
                          <TableCell align="center">{reportDetail.reportDetailContent}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small">이용 제한 일</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name={report.reportCode + ""}
                        // value={restrictDateMap ? restrictDateMap.get(report.reportCode) : 2}
                        label="restrictDate"
                        defaultValue={2}
                        onChange={(e) => onSelectDate(e)}
                      >
                        <MenuItem value={2}>1일</MenuItem>
                        <MenuItem value={8}>7일</MenuItem>
                        <MenuItem value={31}>30일</MenuItem>
                        <MenuItem value={91}>90일</MenuItem>
                        <MenuItem value={181}>180일</MenuItem>
                        <MenuItem value={361}>360일</MenuItem>
                      </Select>
                      <Button
                        onClick={() =>
                          onRistrict(
                            restrictDateMap.get(report.reportCode + ""),
                            report.memberEmail.memberEmail
                          )
                        }
                      >
                        제한하기
                      </Button>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <ButtonGroup>
                      <Button onClick={() => deleteReport(report.reportCode)}>신고내역 삭제</Button>
                      <Button>신고 대상 삭제</Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Divider variant="middle" component={"li"} style={{ listStyle: "none" }} />
          </div>
        ))}
      <Stack spacing={2} alignItems="center" mt={3}>
        <Pagination
          sx={{ mb: 10 }}
          count={totalRPage}
          onChange={(e, value) => handleRPageNum(value)}
          color="primary"
          page={rPageNum}
        />
      </Stack>
    </Container>
  );
}
