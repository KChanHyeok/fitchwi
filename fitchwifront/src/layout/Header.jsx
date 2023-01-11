import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Avatar, Button, Container, styled, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";

const StyledToolbar = styled(Toolbar)({
  backgroundColor: "white",
});

const Header = ({ lstate, onLogout }) => {
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
            <Link to={homeLink} style={{ textDecoration: "none", marginRight: 50 }}>
              {/*Monday Feelings by Essentials Studio*/}
              <img src="/images/logo.png" alt="logo" width="100" />

              {/* <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }} color="primary">
              FITCHWI
            </Typography> */}
            </Link>
            <Link style={{ textDecoration: "none", marginRight: 50, color: "black" }} to={"/about"}>
              소개페이지
            </Link>
            <Link style={{ textDecoration: "none", marginRight: 50, color: "black" }} to={"/together"}>
              함께해요
            </Link>
            <Link style={{ textDecoration: "none", marginRight: 50, color: "black" }} to={"/talk"}>
              얘기해요
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to={"/share"}>
              공유해요
            </Link>
          </Box>
          <Box mr={4} display="flex" alignItems="center">
            <Link to={"/search"} style={{ textDecoration: "none" }}>
              <Search color="error" />
            </Link>

            <Link to={flink} style={{ textDecoration: "none" }}>
              {logid !== "" ? (
                <Button color="primary" variant="text" size="small" sx={{ ml: 3 }}>
                  <Avatar src={profileImg} sx={{ mr: 1 }} /> {nickName} 님
                </Button>
              ) : (
                <Button color="primary" variant="text" sx={{ ml: 3 }} size="small">
                  로그인 / 회원가입
                </Button>
              )}
            </Link>
          </Box>
        </Container>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
