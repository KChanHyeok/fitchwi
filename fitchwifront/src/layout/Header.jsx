import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, styled, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  backgroundColor: "white",
  justifyContent: "space-between",
});

const Header = ({ lstate, onLogout }) => {
  const { logid, flink } = lstate;
  //로고 클릭(로그인 후 main, 로그인 전 home)
  const homeLink = logid === "" ? "/" : "/feed";

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Box>
          <Link to={homeLink} style={{ textDecoration: "none" }}>
            <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
              FITCHWI
            </Typography>
          </Link>
        </Box>
        <Box>
          <Link style={{ textDecoration: "none", marginRight: 100 }} to={"/feed"}>
            피드
          </Link>
          <Link style={{ textDecoration: "none", marginRight: 100 }} to={"/together"}>
            함께해요
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/talk"}>
            얘기해요
          </Link>
        </Box>
        <Box>
          <Link to={flink} style={{ textDecoration: "none" }}>
            <Button color="primary" variant="contained">
              {logid !== "" ? `${logid}님` : "로그인"}
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
