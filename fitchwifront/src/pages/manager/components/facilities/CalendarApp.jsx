// import { Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./CalendarApp.scss";
export default function CalendarApp({ facilitiesCode }) {
  // const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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
  }, [noDayToSend]);

  const addNoday = () => {
    console.log(noDayToSend);
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
    console.log(noDayToSend);
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

    console.log(moment(startDate).format("YYYY-MM-DD"));
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
  console.log("noDayList");
  console.log(noDayList);
  console.log("noDayToSend");
  console.log(noDayToSend);

  return (
    <div>
      <Calendar
        onChange={onChangeDate}
        selectRange={true}
        className=" CalendrApp"
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={({ date, view }) => {
          if (noDayList.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return <Close />;
          }
        }}
      />
      <TextField value={startDate || ""} />
      <Button onClick={addNoday}>등록</Button> <Button onClick={deleteNoday}>삭제</Button>
      <TextField value={endDate || ""} />
    </div>
  );
}
