import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import {
  Home,
  Palette,
  RunCircle,
  Fastfood,
  Flight,
  LocalLibrary,
  AutoAwesome,
  Extension,
  MoreHoriz,
} from "@mui/icons-material";

const Sidebar = () => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="메인페이지" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Palette />
              </ListItemIcon>
              <ListItemText primary="문화∙예술" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <RunCircle />
              </ListItemIcon>
              <ListItemText primary="운동∙액티비티" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Fastfood />
              </ListItemIcon>
              <ListItemText primary="요리∙음식" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Flight />
              </ListItemIcon>
              <ListItemText primary="여행" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <LocalLibrary />
              </ListItemIcon>
              <ListItemText primary="성장∙자기계발" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <AutoAwesome />
              </ListItemIcon>
              <ListItemText primary="공예∙수공예" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Extension />
              </ListItemIcon>
              <ListItemText primary="게임∙오락" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component="a" href="#home">
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
