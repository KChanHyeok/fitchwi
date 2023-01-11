import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./CalendarApp.scss";
export default function CalendarApp({ facilitiesCode }) {
  // const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noDayList, setNodayList] = useState([]);
  const onChangeDate = (e) => {
    const startDateFormat = moment(e[0]).format("YYYY-MM-DD");
    const endDateFormat = moment(e[1]).format("YYYY-MM-DD");
    setStartDate(startDateFormat);
    setEndDate(endDateFormat);
  };

  const [noDayToSend, setNoDayToSend] = useState([]);
  useEffect(() => {
    axios.get("/getNodayList", { params: { facilitiesCode: facilitiesCode } }).then((result) => {
      // console.log(result.data);
      setNodayList(result.data);
    });
    //변경필요.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noDayToSend]);

  const addNoday = () => {
    if (startDate === "" || endDate === "") {
      alert("시작일과 종료일을 모두 선택해주세요.");
      return;
    }

    // console.log(noDayToSend);
    let checkArray = noDayList.filter((n) => noDayToSend.indexOf(n) > 0);
    if (checkArray.length !== 0) {
      alert("이미 등록된 날짜를 포함하고 있습니다.");
      setStartDate("");
      setEndDate("");
      setNoDayToSend([]);
      return;
    }
    axios
      .get("/addNodayList", {
        params: { noDayToSend: encodeURI(noDayToSend), facilitiesCode: facilitiesCode },
      })
      .then((res) => {
        if (res.data === "ok") {
          setNodayList([]);
          alert("등록 완료.");
          setStartDate("");
          setEndDate("");
          setNoDayToSend([]);
        }
      });

    // alert("addnoday");
  };

  const deleteNoday = () => {
    if (startDate === "" || endDate === "") {
      alert("시작일과 종료일을 모두 선택해주세요.");
      return;
    }
    // console.log(noDayToSend);
    // noDayList.filter((n) => noDayToSend.indexOf(n) < 0);
    let checkArray = noDayToSend.filter((n) => noDayList.indexOf(n) < 0);
    if (checkArray.length !== 0) {
      alert("이용 가능한 날짜를 포함하고 있습니다.");
      setStartDate("");
      setEndDate("");
      setNoDayToSend([]);
      return;
    }
    axios
      .delete("/deleteNodayList", {
        params: { noDayToSend: encodeURI(noDayToSend), facilitiesCode: facilitiesCode },
      })
      .then((res) => {
        if (res.data === "ok") {
          setNodayList([]);
          alert("삭제 완료.");
          setStartDate("");
          setEndDate("");
          setNoDayToSend([]);
        } else if (res.data === "togetherExist") {
          setNodayList([]);
          alert("해당 날짜에 진행 예정인 '함께해요'가 존재합니다. ");
          setStartDate("");
          setEndDate("");
          setNoDayToSend([]);
        } else {
          alert(res.data);
        }
      });

    // alert("addnoday");
  };

  const getGapOfDates = (a, b) => {
    let startDate = new Date(a);
    let endDate = new Date(b);
    let aDay = 1000 * 60 * 60 * 24;
    let range = (endDate.getTime() - startDate.getTime() + 1) / aDay;
    let daysArray = [];

    let nextDay = startDate.getTime();
    for (let i = 0; i < range; i++) {
      daysArray.push(moment(nextDay).format("YYYY-MM-DD"));
      nextDay += aDay;
    }
    return daysArray;
  };

  useEffect(() => {
    const dates = getGapOfDates(startDate, endDate);

    setNoDayToSend(() => dates);
  }, [startDate, endDate]);
  // console.log("noDayList");
  // console.log(noDayList);
  // console.log("noDayToSend");
  // console.log(noDayToSend);
  // console.log("startDate");
  // console.log(startDate);
  // console.log("endDate");
  // console.log(endDate);
  const onClickDay = (v) => {
    if (startDate !== "" && endDate !== "") {
      setStartDate(v);
      setEndDate("");
    }
    if (startDate === "") {
      //   console.log(v);
      setStartDate(v);
    }
  };
  return (
    <div>
      <Calendar
        onChange={onChangeDate}
        selectRange={true}
        // /  allowPartialRange={true}
        className=" CalendrApp"
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={({ date, view }) => {
          if (noDayList.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "❌";
          }
        }}
        onClickDay={(v) => onClickDay(moment(v).format("YYYY-MM-DD"))}
      />
      <Grid container justifyContent="space-evenly">
        <Grid item xs={4}>
          <TextField margin="normal" label="시작일" value={startDate || ""} />
        </Grid>
        <Grid item xs={4}>
          <TextField margin="normal" label="종료일" value={endDate || ""} />
        </Grid>

        <Grid item xs={4}>
          <Box sx={{ mt: 3 }}>
            <Button onClick={addNoday} variant="outlined" size="small" color="info">
              등록
            </Button>
            <Button onClick={deleteNoday} variant="outlined" size="small">
              삭제
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
