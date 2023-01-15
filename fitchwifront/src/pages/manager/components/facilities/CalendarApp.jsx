import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./CalendarApp.scss";
export default function CalendarApp({ facilitiesCode, swAlert }) {
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
      setNodayList(result.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noDayToSend]);

  const addNoday = () => {
    if (startDate === "" || endDate === "") {
      swAlert("시작일과 종료일을 모두 선택해주세요.", "warning");
      return;
    }

    let checkArray = noDayList.filter((n) => noDayToSend.indexOf(n) > 0);
    if (checkArray.length !== 0) {
      swAlert("이미 등록된 날짜를 포함하고 있습니다.", "warning");
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
          swAlert("이용 불가능일 성공적으로 저장됐습니다.");
          setStartDate("");
          setEndDate("");
          setNoDayToSend([]);
        }
      });

    // alert("addnoday");
  };

  const deleteNoday = () => {
    if (startDate === "" || endDate === "") {
      swAlert("시작일과 종료일을 모두 선택해주세요.", "warning");
      return;
    }

    let checkArray = noDayToSend.filter((n) => noDayList.indexOf(n) < 0);
    if (checkArray.length !== 0) {
      swAlert("이용 가능한 날짜를 포함하고 있습니다.", "warning");
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
          swAlert("해당 이용 불가 일정이<br/>성공적으로 삭제됐습니다.");
          setStartDate("");
          setEndDate("");
          setNoDayToSend([]);
        } else if (res.data === "togetherExist") {
          setNodayList([]);
          swAlert("해당 날짜에 진행 예정인 '함께해요'가 존재하여<br/> 삭제가 불가합니다.", "warning");
          setStartDate("");
          setEndDate("");
          setNoDayToSend([]);
        } else {
          swAlert("해당 이용 불가 일정을 삭제하는 데 실패했습니다.");
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

  const onClickDay = (v) => {
    if (startDate !== "" && endDate !== "") {
      setStartDate(v);
      setEndDate("");
    }
    if (startDate === "") {
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
