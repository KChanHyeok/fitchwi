import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
export default function TogetherSearch({
  togetherTitleToSearch,
  setTogetherTitleToSearch,
  getTogetherCancelRequestList,
}) {
  const onSearchFacilities = (e) => {
    e.preventDefault();

    getTogetherCancelRequestList(1, togetherTitleToSearch);

    // console.log("search" + facilitiesName);
  };
  const onChangeToSearch = (e) => {
    setTogetherTitleToSearch(e.target.value);
  };
  // console.log("insearchComp");
  // console.log(facilitiesName);
  return (
    <Box component="form" onSubmit={(e) => onSearchFacilities(e)}>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">함께해요 명 검색</InputLabel>
        <Input
          id="standard-adornment-password"
          type="text"
          value={togetherTitleToSearch}
          onChange={(e) => onChangeToSearch(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                type="submit"
                aria-label="toggle password visibility"
                onClick={(e) => onSearchFacilities(e)}
                // onMouseDown={handleMouseDownPassword}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
