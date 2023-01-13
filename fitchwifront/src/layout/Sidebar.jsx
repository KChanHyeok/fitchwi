import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Home, Palette, RunCircle, Fastfood, Flight, LocalLibrary, AutoAwesome, Extension, MoreHoriz } from "@mui/icons-material";

const Sidebar = ({ pageurl }) => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block", md: "block", lg: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}`}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="HOME" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/culture`}>
              <ListItemIcon>
                <Palette />
              </ListItemIcon>
              <ListItemText primary="문화·예술" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/exercise`}>
              <ListItemIcon>
                <RunCircle />
              </ListItemIcon>
              <ListItemText primary="운동·액티비티" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/food`}>
              <ListItemIcon>
                <Fastfood />
              </ListItemIcon>
              <ListItemText primary="요리·음식" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/travel`}>
              <ListItemIcon>
                <Flight />
              </ListItemIcon>
              <ListItemText primary="여행" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/growth`}>
              <ListItemIcon>
                <LocalLibrary />
              </ListItemIcon>
              <ListItemText primary="성장·자기계발" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/art`}>
              <ListItemIcon>
                <AutoAwesome />
              </ListItemIcon>
              <ListItemText primary="공예·수공예" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/game`}>
              <ListItemIcon>
                <Extension />
              </ListItemIcon>
              <ListItemText primary="게임·오락" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/other`}>
              <ListItemIcon>
                <MoreHoriz />
              </ListItemIcon>
              <ListItemText primary="기타" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
