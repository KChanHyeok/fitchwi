import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box>
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

export default function TogetherTap({ list }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} mb={2}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="추천 태그" {...a11yProps(0)} />
          <Tab label="최근 추가된 태그" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Chip
          color="primary"
          variant="outlined"
          label="운동"
          style={{
            fontSize: 10,
            marginRight: 10,
          }}
        />
        <Chip
          color="primary"
          variant="outlined"
          label="오운완"
          style={{
            fontSize: 10,
            marginRight: 10,
          }}
        />
        <Chip
          color="primary"
          variant="outlined"
          label="OOTD"
          style={{
            fontSize: 10,
            marginRight: 10,
          }}
        />
        <Chip
          color="primary"
          variant="outlined"
          label="..."
          style={{
            fontSize: 10,
            marginRight: 10,
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Chip
          color="primary"
          variant="outlined"
          label="운동"
          style={{
            fontSize: 10,
            marginRight: 10,
          }}
        />
        <Chip
          color="primary"
          variant="outlined"
          label="오운완"
          style={{
            fontSize: 10,
            marginRight: 10,
          }}
        />
        <Chip
          color="primary"
          variant="outlined"
          label="OOTD"
          style={{
            fontSize: 10,
            marginRight: 10,
          }}
        />
        <Chip
          color="primary"
          variant="outlined"
          label="..."
          style={{
            fontSize: 10,
            marginRight: 10,
          }}
        />
      </TabPanel>
    </Box>
  );
}
