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

export default function Membertogether({ myMenu, togetherJoinList, togetherOpenedList }) {
  const [value, setValue] = useState(0);

  //  console.log(togetherOpenedList);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [joiningList, setJoiningList] = useState([]);
  const [myJoinList, setMyJoinList] = useState([]);
  const [waitingList, setWaitingList] = useState([]);

  useEffect(() => {
    setMyJoinList(togetherOpenedList);

    const newWatingList = togetherJoinList.filter(
      (together) => together.togetherJoinState === "대기"
    );
    setWaitingList(newWatingList);

    const newJoiningList = togetherJoinList.filter(
      (together) => together.togetherJoinState === "가입중"
    );
    setJoiningList(newJoiningList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [togetherJoinList]);

  const printJoin = (togetherList) => {
    //  console.log("가입");
    // console.log(togetherList);
    return togetherList.map((together) => {
      return (
        <Link
          to={`/together/${together.togetherCode.togetherCode}`}
          key={together.togetherCode}
          style={{ textDecoration: "none" }}
        >
          <Box
            component="div"
            style={{
              width: "95%",
              height: "100px",
              backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9) ),url("/images/${together.togetherCode.togetherSaveimg}")`,
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
                  {together.togetherCode.togetherTitle}
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign="right" sx={{ mr: 1 }}>
                <Chip
                  label={together.togetherJoinState}
                  size="small"
                  sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)", mt: 1 }}
                />
              </Grid>
              <Grid item xs={9}>
                <Chip
                  label={together.togetherCode.togetherCategory}
                  size="small"
                  sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Chip
                  label={`D- ${moment(together.togetherCode.togetherDate).diff(moment(), "days")}`}
                  size="large"
                  sx={{ color: "white", background: "rgba(255, 0, 0, 0.5)" }}
                />
              </Grid>
              <Grid item xs={6} textAlign="left" sx={{ mt: 1, ml: 1 }}>
                <Typography variant="caption">
                  모집일{" "}
                  <Chip
                    label={together.togetherCode.togetherRecruitStartDate}
                    size="small"
                    sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)" }}
                  />{" "}
                  ~
                  <Chip
                    label={together.togetherCode.togetherRecruitEndDate}
                    size="small"
                    sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)" }}
                  />
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={4} textAlign="right" sx={{ mr: 2 }}>
                <Typography variant="caption">
                  참가인원{parseInt(together.togetherCode.togetherMemberCount) + 1}/
                  {together.togetherCode.togetherMax}&#40;
                  {together.togetherCode.togetherType}&#41;
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Link>
      );
    });
  };

  const printOpen = (togetherList) => {
    //  console.log("운영");
    // console.log(togetherList);
    return togetherList.map((together) => {
      return (
        <Link
          to={together.togetherState === "삭제신청중" ? null : `/together/${together.togetherCode}`}
          key={together.togetherCode}
          style={{ textDecoration: "none" }}
          onClick={() => {
            if (together.togetherState === "삭제신청중") {
              alert("삭제신청 대기중인 함께해요입니다.");
            }
          }}
        >
          <Box
            component="div"
            style={{
              width: "95%",
              height: "100px",
              backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9) ),url("/images/${together.togetherSaveimg}")`,
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
                  {together.togetherTitle}
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign="right" sx={{ mr: 1 }}>
                <Chip
                  label={`${together.togetherState}`}
                  size="small"
                  sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)", mt: 1 }}
                />
              </Grid>
              <Grid item xs={9}>
                <Chip
                  label={together.togetherCategory}
                  size="small"
                  sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Chip
                  label={`D- ${moment(together.togetherDate).diff(moment(), "days")}`}
                  size="large"
                  sx={{ color: "white", background: "rgba(255, 0, 0, 0.5)" }}
                />
              </Grid>
              <Grid item xs={6} textAlign="left" sx={{ mt: 1, ml: 1 }}>
                <Typography variant="caption">
                  모집일{" "}
                  <Chip
                    label={together.togetherRecruitStartDate}
                    size="small"
                    sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)" }}
                  />{" "}
                  ~
                  <Chip
                    label={together.togetherRecruitEndDate}
                    size="small"
                    sx={{ color: "white", background: "rgba(255, 255, 255, 0.2)" }}
                  />
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={4} textAlign="right" sx={{ mr: 2 }}>
                <Typography variant="caption">
                  참가인원{parseInt(together.togetherMemberCount) + 1}/{together.togetherMax}&#40;
                  {together.togetherType}&#41;
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
    <Box sx={{ width: "90%" }}>
      {togetherJoinList.length || togetherOpenedList.lengh !== 0 ? (
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="가입중" {...a11yProps(0)} />
              <Tab label="운영중" {...a11yProps(1)} />
              <Tab label="승인 대기중" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            {/* 가입중 */}
            {printJoin(joiningList)}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* 운영중 */}
            {printOpen(myJoinList)}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* 승인대기중 */}
            {printJoin(waitingList)}
          </TabPanel>
        </div>
      ) : (
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="가입중" {...a11yProps(0)} />
              <Tab label="운영중" {...a11yProps(1)} />
              <Tab label="승인 대기중" {...a11yProps(2)} />
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
