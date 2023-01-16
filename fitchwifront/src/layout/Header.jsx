import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const StyledToolbar = styled(Toolbar)({
  backgroundColor: "white",
});

const Header = (props) => {
  const { lstate } = props;
  const nav = useNavigate();
  const { logid, nickName, profileImg, flink } = lstate;
  //로고 클릭(로그인 후 main, 로그인 전 home)
  const homeLink = logid === "" ? "/" : "/";

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h4" fontWeight={100} mb={2} mt={2}>
        🐶 FITCHWI
      </Typography>
      <Divider />
      <List
        style={{ textDecoration: "none", textAlign: "center" }}
        onClick={() => {
          sessionStorage.removeItem("pageNum");
        }}
      >
        <ListItem sx={{ justifyContent: "space-around" }}>
          <Link to="/about" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton>
              <ListItemText primary="소개페이지" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem sx={{ justifyContent: "space-around" }}>
          <Link to="/together" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton>
              <ListItemText primary="함께해요" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem sx={{ justifyContent: "space-around" }}>
          <Link to="/talk" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="얘기해요" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem sx={{ justifyContent: "space-around" }}>
          <Link to="/share" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="공유해요" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <AppBar position="sticky" style={{ boxShadow: "0 1px 1px  lightgray" }}>
        <StyledToolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box p={2} ml={2} display="flex" alignItems="center">
              <Link to={homeLink} style={{ textDecoration: "none", marginRight: 20 }}>
                {/*Monday Feelings by Essentials Studio*/}
                <img src="/images/fitchwilogo.png" alt="logo" width="100" />
                {/* <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }} color="primary">
              FITCHWI
            </Typography> */}
              </Link>
              <Link style={{ textDecoration: "none", color: "black" }} to={"/about"}>
                <Typography
                  sx={{ display: { xs: "none", sm: "none", md: "block" }, mr: { xs: 0, sm: 10 }, ml: 5 }}
                >
                  소개페이지
                </Typography>
              </Link>

              <Link style={{ textDecoration: "none", color: "black" }} to={"/together"}>
                <Typography sx={{ display: { xs: "none", sm: "none", md: "block" }, mr: { xs: 0, sm: 10 } }}>
                  함께해요
                </Typography>
              </Link>
              <Link style={{ textDecoration: "none", color: "black" }} to={"/talk"}>
                <Typography sx={{ display: { xs: "none", sm: "none", md: "block" }, mr: { xs: 0, sm: 10 } }}>
                  얘기해요
                </Typography>
              </Link>
              <Link style={{ textDecoration: "none", color: "black" }} to={"/share"}>
                <Typography sx={{ display: { xs: "none", sm: "none", md: "block" } }}>공유해요</Typography>
              </Link>
            </Box>

            <Box display="flex" alignItems="center">
              <Box mr={4}>
                <Link to={"/search"} style={{ textDecoration: "none" }}>
                  <Search color="error" sx={{ display: { xs: "none", sm: "block" } }} />
                </Link>
              </Box>
              <Box display="flex" alignItems="center">
                {logid === "" ? null : (
                  <Avatar src={profileImg} onClick={() => nav(flink)} sx={{ cursor: "pointer" }} />
                )}
                <Button color="primary" variant="text" size="small" onClick={() => nav(flink)}>
                  {logid !== "" ? `${nickName} 님` : "로그인 / 회원가입"}
                </Button>
              </Box>
            </Box>
          </Container>
        </StyledToolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
