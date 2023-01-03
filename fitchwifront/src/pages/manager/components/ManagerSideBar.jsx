import {
  AutoAwesome,
  Extension,
  Fastfood,
  Flight,
  LocalLibrary,
  MoreHoriz,
  Palette,
  RunCircle,
} from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";

export default function ManagerSideBar({ pageurl }) {
  const resetPageNum = useCallback(() => {
    sessionStorage.removeItem("pageNum");
  }, []);

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List onClick={() => resetPageNum()}>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/`}>
              <ListItemIcon>
                <Palette />
              </ListItemIcon>
              <ListItemText primary="메인 페이지" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/facilities`}>
              <ListItemIcon>
                <Palette />
              </ListItemIcon>
              <ListItemText primary="시설 관리" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/report`}>
              <ListItemIcon>
                <RunCircle />
              </ListItemIcon>
              <ListItemText primary="신고 내역 관리" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/food`}>
              <ListItemIcon>
                <Fastfood />
              </ListItemIcon>
              <ListItemText primary="요리∙음식" />
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
              <ListItemText primary="성장∙자기계발" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/art`}>
              <ListItemIcon>
                <AutoAwesome />
              </ListItemIcon>
              <ListItemText primary="공예∙수공예" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton component={Link} to={`/${pageurl}/game`}>
              <ListItemIcon>
                <Extension />
              </ListItemIcon>
              <ListItemText primary="게임∙오락" />
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
}
