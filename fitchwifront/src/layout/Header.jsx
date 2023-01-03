import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Button, InputBase, Stack, styled, Toolbar } from "@mui/material";
import { alpha, Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  backgroundColor: "white",
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.75),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "18ch",
      },
    },
  },
}));

const Header = ({ lstate, onLogout }) => {
  const { logid, nickName, flink } = lstate;
  //로고 클릭(로그인 후 main, 로그인 전 home)
  const homeLink = logid === "" ? "/" : "/";

  const [searchText, setSearchText] = useState();
  const nav = useNavigate();

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const onSearch = useCallback(
    (e) => {
      e.preventDefault();
      nav(`/search/${searchText}`);
    },
    [searchText, nav]
  );
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Stack direction="row" spacing={7} justifyContent="space-between"></Stack>
        <Box flex={1} p={2}>
          <Link to={homeLink} style={{ textDecoration: "none" }}>
            {/*Monday Feelings by Essentials Studio*/}
            <img src="/images/logo.png" alt="logo" width="100"></img>

            {/* <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }} color="primary">
              FITCHWI
            </Typography> */}
          </Link>
        </Box>
        <Box flex={4} p={2}>
          <Link style={{ textDecoration: "none", marginRight: 100 }} to={"/together"}>
            함께해요
          </Link>
          <Link style={{ textDecoration: "none", marginRight: 100 }} to={"/talk"}>
            얘기해요
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/share"}>
            공유해요
          </Link>
        </Box>
        <Search sx={{ height: 36.5 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Box component="form" onSubmit={onSearch}>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} onChange={handleChange} />
            <Button variant="error" onClick={onSearch}>
              검색
            </Button>
          </Box>
        </Search>
        <Box flex={2} p={2}>
          <Link to={flink} style={{ textDecoration: "none" }}>
            <Button color="primary" variant="contained">
              {logid !== "" ? `${nickName} 님` : "로그인"}
            </Button>
          </Link>
          {logid !== "" ? (
            <Button color="primary" variant="outlined" onClick={onLogout}>
              로그아웃
            </Button>
          ) : (
            <Link to="/join" style={{ textDecoration: "none" }}>
              <Button color="primary" variant="outlined">
                회원가입
              </Button>
            </Link>
          )}
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
