import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ /*overflowY: "scroll",*/ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2, height: "300px", textAlign: "center" }}>
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

export default function MemberFeed({ myMenu, feedList }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [memberFeedList, setMemberFeedList] = useState([]);

  useEffect(() => {
    setMemberFeedList(feedList);
  }, [feedList]);

  const printFeed = (feedList) => {
    return (
      <ImageList
        sx={{ width: "100%", overflowY: "scroll", height: "350px", mb: 6, mt: 0.5 }}
        cols={3}
        rowHeight={164}
      >
        {feedList !== undefined
          ? feedList.map((feed, index) => (
              <Link to={`/share/${feed.feedCode}`} key={index}>
                <ImageListItem style={{ height: "250px" }}>
                  <img
                    src={`/images/${feed.ffList[0].feedFileSaveimg}`}
                    srcSet={`/images/${feed.ffList[0].feedFileSaveimg}`}
                    alt={feed.feedCode}
                    loading="lazy"
                    style={{
                      width: "100%",

                      height: "100%",
                    }}
                  />
                </ImageListItem>
              </Link>
            ))
          : null}
      </ImageList>
    );
  };

  return (
    <Box sx={{ width: "90 %" }}>
      {memberFeedList.length !== 0 ? (
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={`피드(${memberFeedList.length})`} {...a11yProps(0)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            {/* 가입중 */}
            {printFeed(feedList)}
          </TabPanel>
        </div>
      ) : (
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="피드" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Typography sx={{ mt: 3 }}>작성한 피드가 없습니다.</Typography>
            <br />
            <Typography>
              <Link to="/share" style={{ color: "#ff0456" }}>
                '공유해요'
              </Link>
              에서 당신의 취미를 공유해보세요!
            </Typography>
          </TabPanel>
        </div>
      )}
    </Box>
  );
}
