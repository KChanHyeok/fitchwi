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
  Select,
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
  console.log("상세");
  useEffect(() => {
    getReports();
    console.log("axios");
  }, []);

  const getReports = () => {
    axios.get("/getReports").then((result) => {
      console.log(result.data);
      setReportList(result.data);
    });
  };

  const onRistrict = (period, memberEmail) => {
    let today = moment().format("YYYY-MM-DD");
    let restrictDate = moment().add(period, "days").format("YYYY-MM-DD ");
    // restrictDate.format("YYYY-MM-DD");
    console.log(today);
    console.log(restrictDate);
    // console.log(restrictDate.format("YYYY-MM-DD"));
    axios
      .get("/restrictMember", {
        params: { restrictDate: restrictDate, targetMemberEmail: memberEmail },
      })
      .then((result) => console.log(result));
  };
  const [restrictDate, setRestrictDate] = useState("2");
  useEffect(() => {});

  const onSelectDate = useCallback((e) => {
    console.log(e);
    setRestrictDate(e.target.value);
  }, []);
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
                <Typography align="center" sx={{ width: "100%" }}>
                  {report.reportCode}
                </Typography>

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

                <Typography align="center" sx={{ width: "100%" }}>
                  {report.memberEmail.memberEmail}
                </Typography>

                <Typography align="center" sx={{ width: "100%" }}>
                  {report.reportDetailList.length}
                </Typography>
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
                        value={restrictDate}
                        label="restrictDate"
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
                        onClick={() => onRistrict(restrictDate, report.memberEmail.memberEmail)}
                      >
                        제한하기
                      </Button>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <ButtonGroup>
                      <Button>신고내역 삭제</Button>
                      <Button>신고 대상 삭제</Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Divider variant="middle" component={"li"} style={{ listStyle: "none" }} />
          </div>
        ))}
    </Container>
  );
}
