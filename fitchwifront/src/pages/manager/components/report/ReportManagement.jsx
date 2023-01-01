import { ExpandMore, Remove } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Container,
  Grid,
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

  return (
    <Container component="main" style={{ maxWidth: "1200px" }} align="center" sx={{ ml: 40 }}>
      <Box>
        <Typography variant="h4">신고 관리</Typography>
      </Box>

      <Accordion>
        <AccordionSummary
          expandIcon={<Remove />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          backgroundColor="white"
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
          <div key={index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography align="center" sx={{ width: "100%" }}>
                  {report.reportCode}
                </Typography>

                <Typography align="center" sx={{ width: "100%" }}>
                  {report.reportCategory}
                </Typography>

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
                        <TableRow key={index} sx={{ backgroundColor: "#eee" }}>
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
                    <ButtonGroup>
                      <Button>1일 정지</Button>
                      <Button>7일 정지</Button>
                      <Button>3개월 정지</Button>
                      <Button>6개월 정지</Button>
                    </ButtonGroup>
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
          </div>
        ))}
    </Container>
  );
}
