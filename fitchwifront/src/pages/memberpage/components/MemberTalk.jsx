import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Chip, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment/moment";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ overflowY: "scroll", width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2, height: "300px" }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MemberTalk({ myMenu, talkJoinList, talkOpenedList, logid, memberEmail }) {
  const [value, setValue] = useState(0);
  const [isMine, setIsMine] = useState(false);
  useEffect(() => {
    if (logid === memberEmail) {
      setIsMine(true);
    }
  }, [logid, memberEmail]);
  //console.log(talkOpenedList);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [joiningList, setJoiningList] = useState([]);
  const [myJoinList, setMyJoinList] = useState([]);
  const [waitingList, setWaitingList] = useState([]);

  useEffect(() => {
    setMyJoinList(talkOpenedList);

    const newWatingList = talkJoinList.filter((talk) => talk.talkJoinState === "대기");
    setWaitingList(newWatingList);

    const newJoiningList = talkJoinList.filter((talk) => talk.talkJoinState === "가입중");
    setJoiningList(newJoiningList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [talkJoinList]);

  const printJoin = (talkList, isWait) => {
    // console.log("가입");
    // console.log(talkList);

    if (talkList.length === 0) {
      return (
        <div style={{ textAlign: "center" }}>
          <Typography sx={{ mt: 3 }}>
            {isWait === true ? "승인 대기 중인" : "가입한"} '얘기해요'가 없습니다.
          </Typography>
          <br />
          {isMine && (
            <Typography>
              같은 취미를 가진 사람들과 얘기를 나누고 싶다면? <br />
              '얘기해요'에 가입해보세요!
            </Typography>
          )}
          <br />
          <Link to="/talk" style={{ color: "#ff0456" }}>
            '얘기해요' 둘러보기
          </Link>
        </div>
      );
    }

    return talkList.map((talk) => {
      return (
        <Link to={`/talk/${talk.talkCode.talkCode}`} key={talk.talkCode} style={{ textDecoration: "none" }}>
          <Box
            component="div"
            style={{
              width: "95%",
              height: "100px",
              backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9) ),url("/images/${talk.talkCode.talkSaveimg}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundColor: "#0000050",
              backgroundPosition: "center",
              color: "white",
              textShadow: "-0.5px 0 #000, 0 0.5px #000, 0.5px 0 #000, 0 -0.5px #000",
              borderRadius: "10px",
              boxShadow: "1px 1px 1px 1px #000",
              margin: "auto",
              marginBottom: "5px",
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid item xs={7}>
                <Typography variant="h6" sx={{ pl: 3, pt: 1 }}>
                  {talk.talkCode.talkTitle}
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign="right" sx={{ mr: 1 }}>
                <Chip
                  label={talk.talkJoinState}
                  size="small"
                  sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)", mt: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Chip
                  label={talk.talkCode.talkCategory}
                  size="small"
                  sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)", ml: 2 }}
                />
              </Grid>
              <Grid item xs={4} textAlign="left" sx={{ mt: 1, ml: 1 }}>
                <Typography variant="caption">
                  가입일 {moment(talk.talkOpenCode).format("YYYY-MM-DD")}
                </Typography>
              </Grid>
              <Grid item xs={3}></Grid>

              <Grid item xs={4} textAlign="right" sx={{ mr: 2 }}>
                <Typography variant="caption">
                  참가인원{parseInt(talk.talkCode.talkMemberCount) + 1}/{talk.talkCode.talkMax}&#40;
                  {talk.talkCode.talkType}&#41;
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Link>
      );
    });
  };

  const printOpen = (talkList) => {
    // console.log("운영");
    //  console.log(talkList);
    if (talkList.length === 0) {
      return (
        <div style={{ textAlign: "center" }}>
          <Typography sx={{ mt: 3 }}>운영 중인 '얘기해요'가 없습니다.</Typography>
          <br />
          {isMine && (
            <div>
              <Typography>원하는 주제로 '얘기해요'를 개설해보세요!</Typography>
              <br />
              <br />
              <Link to="/talk/opened" style={{ color: "#ff0456" }}>
                '얘기해요' 개설하러 가기
              </Link>{" "}
            </div>
          )}
        </div>
      );
    }
    return talkList.map((talk) => {
      return (
        <Link to={`/talk/${talk.talkCode}`} key={talk.talkCode} style={{ textDecoration: "none" }}>
          <Box
            component="div"
            style={{
              width: "95%",
              height: "100px",
              backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9) ),url("/images/${talk.talkSaveimg}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundColor: "#0000050",
              backgroundPosition: "center",
              color: "white",
              textShadow: "-0.5px 0 #000, 0 0.5px #000, 0.5px 0 #000, 0 -0.5px #000",

              borderRadius: "10px",
              boxShadow: "1px 1px 1px 1px #000",
              margin: "auto",
              marginBottom: "5px",
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid item xs={7}>
                <Typography variant="h6" sx={{ pl: 3, pt: 1 }}>
                  {talk.talkTitle}
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign="right" sx={{ mr: 1 }}>
                <Chip
                  label="운영중"
                  size="small"
                  sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)", mt: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Chip
                  label={talk.talkCategory}
                  size="small"
                  sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)", ml: 2 }}
                />
              </Grid>
              <Grid item xs={4} textAlign="left" sx={{ mt: 1, ml: 1 }}>
                <Typography variant="caption">
                  개설일 {moment(parseInt(talk.talkOpenCode.talkOpenCode)).format("YYYY-MM-DD")}
                </Typography>
              </Grid>
              <Grid item xs={3}></Grid>

              <Grid item xs={4} textAlign="right" sx={{ mr: 2 }}>
                <Typography variant="caption">
                  참가인원{parseInt(talk.talkMemberCount) + 1}/{talk.talkMax}&#40;
                  {talk.talkType}&#41;
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Link>
      );
    });
  };

  // useMemo(() => printCardList, []);
  return (
    <Box sx={{ width: "100%" }}>
      {talkJoinList !== undefined || talkOpenedList.length !== 0 ? (
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="운영중" {...a11yProps(0)} />
              {isMine && <Tab label="가입중" {...a11yProps(1)} />}
              {isMine && <Tab label="승인 대기중" {...a11yProps(2)} />}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {/* 운영중 */}
            {printOpen(myJoinList)}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* 가입중 */}
            {printJoin(joiningList, false)}
          </TabPanel>

          <TabPanel value={value} index={2}>
            {/* 승인대기중 */}
            {printJoin(waitingList, true)}
          </TabPanel>
        </div>
      ) : (
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="운영중" {...a11yProps(0)} />
              {isMine && <Tab label="가입중" {...a11yProps(1)} />}
              {isMine && <Tab label="승인 대기중" {...a11yProps(2)} />}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}></TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </div>
      )}
    </Box>
  );
}
