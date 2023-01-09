import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
export default function FacilitiesSearch({ facilitiesName, setFacilitiesName, loadFacilities }) {
  const onSearchFacilities = (e) => {
    e.preventDefault();

    loadFacilities(1, facilitiesName);

    // console.log("search" + facilitiesName);
  };
  const onChangeToSearch = (e) => {
    setFacilitiesName(e.target.value);
  };
  // console.log("insearchComp");
  // console.log(facilitiesName);
  return (
    <Box component="form" onSubmit={(e) => onSearchFacilities(e)}>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">시실 명 검색</InputLabel>
        <Input
          id="standard-adornment-password"
          type="text"
          value={facilitiesName}
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
