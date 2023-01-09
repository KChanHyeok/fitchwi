import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

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

export default function SearchTap({ list }) {
  const [value, setValue] = React.useState(0);
  const [bestFeed, setBestFeed] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setBestFeed([...list]);
  }, [list]);

  if (bestFeed !== undefined) {
    bestFeed.sort(function (a, b) {
      if (a.flList.length < b.flList.length) {
        return 1;
      }
      if (a.flList.length > b.flList.length) {
        return -1;
      }
      return 0;
    });
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="최근 공유해요" {...a11yProps(0)} />
          <Tab label="인기 공유해요" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ImageList sx={{ width: "100%", overflowY: "scroll", height: "800px", mb: 6, mt: 0.5 }} cols={3}>
          {list !== undefined ? (
            list.map((feed, index) => (
              <Link to={`/share/${feed.feedCode}`} key={index}>
                <ImageListItem style={{ height: "400px" }}>
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
          ) : (
            <></>
          )}
        </ImageList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImageList sx={{ width: "100%", overflowY: "scroll", height: "800px", mb: 6, mt: 0.5 }} cols={3} rowHeight={164}>
          {bestFeed !== undefined ? (
            bestFeed.map((feed, index) => (
              <Link to={`/share/${feed.feedCode}`} key={index}>
                <ImageListItem style={{ height: "400px" }}>
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
          ) : (
            <></>
          )}
        </ImageList>
      </TabPanel>
    </Box>
  );
}
