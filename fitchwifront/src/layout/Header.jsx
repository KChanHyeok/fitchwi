import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Button, Container, InputBase, styled, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";

const StyledToolbar = styled(Toolbar)({
  backgroundColor: "white",
});

const SearchBar = styled("div")(({ theme }) => ({
  backgroundColor: "pink",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "100%",
}));

const Header = ({ lstate, onLogout }) => {
  const nav = useNavigate();
  const { logid, nickName, profileImg, flink } = lstate;
  //로고 클릭(로그인 후 main, 로그인 전 home)
  const homeLink = logid === "" ? "/" : "/";
  console.log(lstate);

  console.log(logid);
  return (
    <AppBar position="sticky" style={{ boxShadow: "0 1px 1px  lightgray" }}>
      <StyledToolbar>
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box p={2} ml={2} display="flex" alignItems="center">
            <Link to={homeLink} style={{ textDecoration: "none", marginRight: 20 }}>
              {/*Monday Feelings by Essentials Studio*/}
              <img src="/images/logo.png" alt="logo" width="100" />
              {/* <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }} color="primary">
              FITCHWI
            </Typography> */}
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to={"/about"}>
              <Typography sx={{ display: { xs: "none", sm: "block" }, mr: { xs: 0, sm: 10 }, ml: 5 }}>소개페이지</Typography>
            </Link>

            <Link style={{ textDecoration: "none", color: "black" }} to={"/together"}>
              <Typography sx={{ display: { xs: "none", sm: "block" }, mr: { xs: 0, sm: 10 } }}>함께해요</Typography>

            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to={"/talk"}>
              <Typography sx={{ display: { xs: "none", sm: "block" }, mr: { xs: 0, sm: 10 } }}>얘기해요</Typography>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to={"/share"}>
              <Typography sx={{ display: { xs: "none", sm: "block" } }}>공유해요</Typography>
            </Link>
          </Box>

          <Box>
            <SearchBar>
              <InputBase placeholder="검색" sx={{ color: "white", display: { xs: "block", sm: "none" } }} />
            </SearchBar>
          </Box>
          <Box display="flex" alignItems="center">
            <Box mr={4}>
              <Link to={"/search"} style={{ textDecoration: "none" }}>
                <Search color="error" sx={{ display: { xs: "none", sm: "block" } }} />
              </Link>
            </Box>
            <Box display="flex" alignItems="center">
              {logid === "" ? null : <Avatar src={profileImg} onClick={() => nav(flink)} sx={{ cursor: "pointer" }} />}
              <Button color="primary" variant="text" size="small" onClick={() => nav(flink)} sx={{ display: { xs: "none", sm: "block" } }}>
                {logid !== "" ? `${nickName} 님` : "로그인 / 회원가입"}
              </Button>
            </Box>

          </Box>
        </Container>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
