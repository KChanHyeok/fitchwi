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
  const [nodays, setNodays] = useState([]);
  const onChangeDate = (e) => {
    const startDateFormat = moment(e[0]).format("YYYY-MM-DD");
    const endDateFormat = moment(e[1]).format("YYYY-MM-DD");
    setStartDate(startDateFormat);
    setEndDate(endDateFormat);
  };
  //console.log(startDate);
  //console.log(endDate);

  useEffect(() => {
    axios.get("/getNodayList", { params: { facilitiesCode: facilitiesCode } }).then((result) => {
      // console.log(result.data);
      setNodays(result.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(()=>{

  // }[nodays])

  //const getGapOfDates = (a, b) => {};

  //console.log(nodays);

  const addNoday = () => {
    axios.get("/add");
    alert("addnoday");
  };

  // let a = "2022-11-10";
  // let b = "2022-12-13";
  // const dd = (a, b) => {
  //   let 시작일 = new Date(a);
  //   let 종료일 = new Date(b);
  //   let 나눌거 = 1000 * 60 * 60 * 24;
  //   let 일수 = (종료일.getTime() - 시작일.getTime()) / 나눌거;
  //   let 날짜배열 = [];

  //   console.log(moment(시작일).format("YYYY-MM-DD"));
  //   for (let i = 0; i < 일수; i++) {
  //     // 날짜배열.push( );

  //     moment(시작일).format("YYYY-MM-DD");
  //   }
  //   console.log(날짜배열.length);
  //   return 날짜배열;
  // };
  // let result = dd(a, b);
  // console.log(result);
  return (
    <div>
      <Calendar
        onChange={onChangeDate}
        selectRange={true}
        className=" CalendrApp"
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={({ date, view }) => {
          if (nodays.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return <Close />;
          }
        }}
      />
      {/* <Typography variant="h4">{moment(value).format("YYYY년 MM월 DD일")}</Typography> */}
      <TextField value={startDate || ""} />
      <Button onClick={() => addNoday()}>등록</Button>
      <TextField value={endDate || ""} />
    </div>
  );
}
