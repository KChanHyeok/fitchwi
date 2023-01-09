import { Box, Input } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import axios from "axios";
import SearchTap from "./SearchTap";

const SearchPage = () => {
  const [searchText, setSearchText] = useState();
  const nav = useNavigate();

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const onSearch = useCallback(
    (e) => {
      if (!searchText || searchText.length < 2) {
        alert("두 글자 이상 입력해 주세요.");
        return;
      }
      e.preventDefault();
      nav(`/search/${searchText}`);
    },
    [searchText, nav]
  );

  const [feedList, setFeedList] = useState([]);

  const getAllFeedList = async () => {
    await axios
      .get("/getAllFeedList")
      .then((response) => {
        if (response.data.length > 9) {
          response.data.length = 9;
        }
        setFeedList(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllFeedList();
  }, []);

  return (
    <Container fixed>
      <Box flex={4} ml={4} mr={4} mt={10}>
        <Box component="form" onSubmit={onSearch} display="flex" alignItems="center" mb={2}>
          <Input
            fullWidth
            sx={{
              fontSize: 40,
            }}
            placeholder="취향이나 제목을 입력해주세요"
            onChange={handleChange}
          ></Input>
        </Box>
        <SearchTap list={feedList} />
      </Box>
    </Container>
  );
};

export default SearchPage;
