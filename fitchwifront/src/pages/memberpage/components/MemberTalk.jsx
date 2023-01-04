import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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

export default function MemberTalk({ myMenu, talkJoinList }) {
  const [value, setValue] = useState(0);

  console.log(talkJoinList);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="가입중" {...a11yProps(0)} />
          <Tab label="참여중" {...a11yProps(1)} />
          <Tab label="승인 대기중" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {/* {talkJoinList[0].talkCode.talkCode !== undefined && (
        <div>
          <TabPanel value={value} index={0}>
            {talkJoinList[0].talkJoinState}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {talkJoinList.talkCode.talkOpendCode}
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </div>
      )} */}
    </Box>
  );
}
