import { ExpandMore, Remove } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
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
import moment from "moment/moment";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ReportManagement({ swAlert }) {
  const [reportList, setReportList] = useState([]);

  const [pageNum, setPageNum] = useState(1);

  const [totalPage, setTotalPage] = useState(0);

  let pageNumInSessionStg = sessionStorage.getItem("pageNum");

  useEffect(() => {
    pageNumInSessionStg !== null ? getReports(pageNumInSessionStg) : getReports(1);

    // console.log("axios");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReports = (pageNumInSessionStg) => {
    console.log("report");
    setLoad(false);
    axios.get("/getReports", { params: { pageNum: pageNumInSessionStg } }).then((result) => {
      const { reportList, totalPage, pageNum } = result.data;

      //  console.log(result.data);
      setReportList(reportList);
      setPageNum(pageNum);
      setTotalPage(totalPage);
      sessionStorage.setItem("pageNum", pageNum);
      setLoad(true);
    });
  };
  const handlepageNum = useCallback((value) => {
    getReports(value);
  }, []);

  const onRistrict = (period, memberEmail, reportCode) => {
    if (period === undefined) {
      swAlert("이용 제한일을 먼저 선택해주세요.", "warning");
      return;
    }
    let restrictDate = moment().add(period, "days").format("YYYY-MM-DD ");

    axios.put(`/restrictMember/${restrictDate}/${memberEmail}`).then((result) => {
      console.log(result);
      updateReportState(reportCode, restrictDate);
    });
  };

  const [restrictDateMap, setRestrictDateMap] = useState(new Map());

  const onSelectDate = useCallback((e) => {
    console.log(e.target.value);
    setRestrictDateMap((prev) => new Map(prev).set(e.target.name, e.target.value));
  }, []);

  const deleteReport = useCallback((reportCode) => {
    // console.log(reportCode);
    axios.delete("/deleteReport", { params: { reportCode: reportCode } }).then((result) => {
      if (result.data === "ok") {
        swAlert("신고 내역을 성공적으로 삭제했습니다.");
      } else {
        swAlert("신고 내역을 삭제하는 데 실패했습니다.", "info");
      }

      getReports(pageNum);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteReportTarget = useCallback(
    (reportTarget, reportCategory, memberEmail, reportCode) => {
      //  console.log("delete");
      switch (reportCategory) {
        case "share":
          //    console.log("feed");
          axios
            .get("/getFeedInfo", { params: { feedCode: reportTarget } })
            .then((feed) => {
              //     console.log(feed.data);
              axios
                .delete("/deleteFeed", { data: feed.data })
                .then((result) => updateReportState(reportCode, "신고대상삭제"))
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));

          break;
        case "talk":
          //   console.log("talk");
          axios
            .get("/getTalk", { params: { talkCode: reportTarget } })
            .then((talk) => {
              //   console.log(talk.data);
              //   console.log(talk.data.talkOpenCode.memberEmail.memberEmail);

              //  console.log("개설자");
              axios
                .delete("/deleteTalk", { data: talk.data })
                .then((result) => {
                  updateReportState(reportCode, "신고 대상 삭제");
                  swAlert("해당 '얘기해요'를 성공적으로 삭제했습니다.");
                })
                .catch((error) => {
                  // console.log(error);
                  swAlert("해당 얘기해요를 삭제하는 데 실패했습니다.", "warning");
                });
            })
            .catch((error) => console.log(error));

          break;
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const updateReportState = (reportCode, reportTreatment) => {
    // console.log(reportCode);
    axios.put(`/updateReportState/${reportCode}/${reportTreatment}`).then((result) => {
      if (result.data === "fail") {
        swAlert("신고 내역 상태변경에 실패했습니다.", "info");
      }

      getReports(pageNum);
    });
  };

  const CenterTableCell = styled(TableCell)({
    textAlign: "center",
    width: "33%",
  });
  const [load, setLoad] = useState(false);
  return (
    <Container component="main" align="center" sx={{ mt: 13 }}>
      <Box sx={{ mb: 12 }}>
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
          <Typography align="center" sx={{ width: "15%" }}>
            신고 코드
          </Typography>

          <Typography align="center" sx={{ width: "20%" }}>
            신고 대상
          </Typography>

          <Typography align="center" sx={{ width: "20%" }}>
            피신고 회원
          </Typography>

          <Typography align="center" sx={{ width: "15%" }}>
            신고 건수
          </Typography>
          <Typography align="center" sx={{ width: "25%" }}>
            처리 상태
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
          reportList.map((report, index) => (
            <div key={report.reportCode}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container justifyContent="space-evenly">
                    <Grid item xs={2}>
                      {report.reportCode}
                    </Grid>
                    <Grid item xs={2}>
                      {report.reportTarget === 0 ? (
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`/${report.reportCategory}`}
                          state={{ memberId: report.memberEmail.memberEmail }}
                        >
                          <Typography>{report.reportCategory}</Typography>
                        </Link>
                      ) : report.reportState === "대기" ? (
                        <Link
                          to={`/${report.reportCategory}/${report.reportTarget}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <Typography>{report.reportCategory}</Typography>
                        </Link>
                      ) : (
                        <Typography onClick={() => swAlert("삭제된 게시글입니다.", "info")}>
                          {report.reportCategory}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={3}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/memberpage`}
                        state={{ memberId: report.memberEmail.memberEmail }}
                      >
                        <Typography>{report.memberEmail.memberEmail}</Typography>
                      </Link>
                    </Grid>

                    <Grid item xs={1}>
                      <Typography>{report.reportDetailList.length}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                      {report.reportState === "대기" ? (
                        <Typography>{report.reportState}</Typography>
                      ) : (
                        <Typography>{report.reportState}</Typography>
                      )}
                    </Grid>
                  </Grid>
                </AccordionSummary>

                <AccordionDetails>
                  <TableContainer component="main">
                    <Table aria-label="simple table">
                      <TableHead style={{ borderBottom: "1.5px solid gray", backgroundColor: "#fcefef" }}>
                        <TableRow>
                          <CenterTableCell>신고일시</CenterTableCell>
                          <CenterTableCell>신고한 유저</CenterTableCell>
                          <CenterTableCell>신고 내용</CenterTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {report.reportDetailList.map((reportDetail) => (
                          <TableRow key={reportDetail.reportDetailCode} sx={{ backgroundColor: "#f2f2f2" }}>
                            <CenterTableCell>{reportDetail.reportDetailDate}</CenterTableCell>
                            <CenterTableCell>{reportDetail.memberEmail.memberEmail}</CenterTableCell>
                            <CenterTableCell>{reportDetail.reportDetailContent}</CenterTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Grid container sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        sx={{ mt: 1, height: 40 }}
                        onClick={() => deleteReport(report.reportCode)}
                      >
                        신고내역 삭제
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      {report.reportState === "대기" ? (
                        report.reportCategory === "share" || report.reportCategory === "talk" ? (
                          <Button
                            variant="contained"
                            sx={{ mt: 1, height: 40 }}
                            onClick={() =>
                              deleteReportTarget(
                                report.reportTarget,
                                report.reportCategory,
                                report.memberEmail.memberEmail,
                                report.reportCode
                              )
                            }
                          >
                            신고 대상 삭제
                          </Button>
                        ) : (
                          <div>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                              <InputLabel id="demo-select-small">이용 제한 일</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name={report.reportCode + ""}
                                // value={
                                //   !restrictDateMap.has(report.reportCode + "")
                                //     ? restrictDateMap.get(report.reportCode + "", 2)
                                //     : 2
                                // }
                                defaultValue={0}
                                label="restrictDate"
                                onChange={(e) => onSelectDate(e)}
                                size="small"
                              >
                                <MenuItem value={0}> 선택</MenuItem>
                                <MenuItem value={2}>1일</MenuItem>
                                <MenuItem value={8}>7일</MenuItem>
                                <MenuItem value={31}>30일</MenuItem>
                                <MenuItem value={91}>90일</MenuItem>
                                <MenuItem value={181}>180일</MenuItem>
                                <MenuItem value={361}>360일</MenuItem>
                              </Select>
                            </FormControl>
                            <Button
                              variant="contained"
                              sx={{ mt: 1, height: 40 }}
                              onClick={() =>
                                onRistrict(
                                  restrictDateMap.get(report.reportCode + ""),
                                  report.memberEmail.memberEmail,
                                  report.reportCode
                                )
                              }
                            >
                              제한하기
                            </Button>
                          </div>
                        )
                      ) : (
                        <Typography>이미 처리된 신고 내역입니다.</Typography>
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Divider variant="middle" component={"li"} style={{ listStyle: "none" }} />
            </div>
          ))
        )}
      </Box>
      <Stack spacing={2} alignItems="center" mt={3}>
        <Pagination
          sx={{ mb: 5 }}
          count={totalPage}
          onChange={(e, value) => handlepageNum(value)}
          color="primary"
          page={pageNum}
        />
      </Stack>
    </Container>
  );
}
