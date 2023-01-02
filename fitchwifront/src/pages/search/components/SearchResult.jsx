import { Button, ButtonGroup, Divider, IconButton, InputBase, Paper } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

const SearchResult = () => {
  let { searchText } = useParams();
  console.log(searchText);
  //   const [joinList, setJoinList] = useState();
  const [togetherList, setTogetherList] = useState([]);
  const [feedList, setFeedList] = useState([]);

  const searchResult = useCallback(() => {
    axios
      .get("/getTogetherListBySearch", { params: { searchText: searchText } })
      .then((response) => {
        setTogetherList(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("/getFeedListBySearch", { params: { searchText: searchText } })
      .then((response) => {
        setFeedList(response.data);
      })
      .catch((error) => console.log(error));
  }, [searchText]);

  useEffect(() => {
    searchResult();
  }, [searchResult]);

  console.log(togetherList);
  console.log(feedList);
  return (
    <>
      <Box>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          {/* <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 600, marginTop: 5, marginBottom: 10 }}>
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Google Maps" inputProps={{ "aria-label": "search google maps" }} />
            <IconButton type="button" sx={{ p: "10px" }}>
              <CancelIcon />
            </IconButton>
          </Paper> */}
          <Box width={1000} mt={4}>
            <ButtonGroup variant="outlined" aria-label="outlined button group" size="large" fullWidth sx={{ height: 70 }}>
              <Button>함께해요</Button>
              <Button>얘기해요</Button>
              <Button>공유해요</Button>
            </ButtonGroup>
            <Box height={400} border={1} borderRadius={1}>
              {togetherList.length === 0 ? (
                <div>함께해요 검색결과가 없습니다</div>
              ) : (
                togetherList.map((item, index) => <li key={index}>{item.TogetherTitle}</li>)
              )}
              <Divider />
              {feedList.length === 0 ? (
                <div>공유해요 검색결과가 없습니다</div>
              ) : (
                feedList.map((item, index) => <li key={index}>{item.feedContent}</li>)
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SearchResult;
