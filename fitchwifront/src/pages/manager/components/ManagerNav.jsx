import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const drawerWidth = 240;

function ManagerNav(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const removeSessionItem = () => {
    sessionStorage.removeItem("pageNum");
    sessionStorage.removeItem("keyword");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6">
        FITCHWI&nbsp;<sub style={{ fontSize: "14px" }}>Manager</sub>
      </Typography>
      <Divider />
      <List style={{ textDecoration: "none", textAlign: "center" }}>
        <ListItem sx={{ justifyContent: "space-around" }}>
          <Link to="/manager/facilities" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton onClick={() => removeSessionItem()}>
              <ListItemText primary="시설관리" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem sx={{ justifyContent: "space-around" }}>
          <Link to="/manager/report" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton sx={{ textAlign: "center" }} onClick={() => removeSessionItem()}>
              <ListItemText primary="신고관리" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem sx={{ justifyContent: "space-around" }}>
          <Link to="/manager/togetherManagement" style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton sx={{ textAlign: "center" }} onClick={() => removeSessionItem()}>
              <ListItemText primary="  함께해요 취소 관리" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", mb: 10 }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
          >
            FITCHWI&nbsp;<sub style={{ fontSize: "14px" }}>Manager</sub>
          </Typography>
          <Box
            sx={{
              flexGrow: 0.95,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Link to="/manager/facilities" style={{ textDecoration: "none", color: "white" }}>
                <Typography onClick={() => removeSessionItem()}>시설관리</Typography>
              </Link>
              <Link to="/manager/report" style={{ textDecoration: "none", color: "white" }}>
                <Typography onClick={() => removeSessionItem()}> 신고관리 </Typography>
              </Link>
              <Link to="/manager/togetherManagement" style={{ textDecoration: "none", color: "white" }}>
                <Typography onClick={() => removeSessionItem()}> 함께해요 취소 관리 </Typography>
              </Link>
            </Box>
          </Box>
        </Toolbar>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde fugit veniam eius,
        </Typography>
      </Box> */}
    </Box>
  );
}

ManagerNav.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ManagerNav;
