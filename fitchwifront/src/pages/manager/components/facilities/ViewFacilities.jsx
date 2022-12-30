import { Person } from "@mui/icons-material";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PlaceIcon from "@mui/icons-material/Place";
import HouseIcon from "@mui/icons-material/House";
import CalendarApp from "./CalendarApp";
export default function ViewFacilities() {
  const { facilitiesCode } = useParams();

  const [facilities, setFacilities] = useState({
    facilitiesName: "",
    facilitiesManager: "",
    facilitiesPhone: "",
    facilitiesPosition: "",
    facilitiesPrice: "",
    facilitiesGrade: "",
  });

  const {
    facilitiesName,
    facilitiesManager,
    facilitiesPhone,
    facilitiesPosition,
    facilitiesPrice,
    facilitiesGrade,
  } = facilities;
  const loadFacilities = useCallback(() => {
    axios.get(`/getFacilitiesInfo/${facilitiesCode}`).then((result) => {
      console.log(result.data);
      setFacilities(result.data);
    });
  }, [facilitiesCode]);

  useEffect(() => {
    loadFacilities();
  }, [loadFacilities]);
  return (
    <Box
      style={{ margin: "auto" }}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HouseIcon />
            </ListItemIcon>
            <ListItemText secondary="시설 명" primary={facilitiesName} />
          </ListItemButton>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText secondary="시설 위치" primary={facilitiesPosition} />
          </ListItemButton>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText secondary="1인당 이용료" primary={facilitiesPrice} />
          </ListItemButton>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HandshakeIcon />
            </ListItemIcon>
            <ListItemText secondary="등급" primary={facilitiesGrade} />
          </ListItemButton>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText secondary="담당자" primary={facilitiesManager} />
          </ListItemButton>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PhoneAndroidIcon />
            </ListItemIcon>
            <ListItemText secondary="담당자 연락처" primary={facilitiesPhone} />
          </ListItemButton>
        </ListItem>
        <Divider variant="middle" component="li" />
      </List>

      <List>
        <ListItem disablePadding sx={{ mb: 3 }}>
          <ListItemText primary="이용 불가능 날짜 수정" />
        </ListItem>
        <Divider variant="middle" component="li" sx={{ mb: 3 }} />
        <ListItem disablePadding>
          <CalendarApp facilitiesCode={facilitiesCode} />
        </ListItem>
      </List>
      <Link to="/manager/facilities" style={{ textDecoration: "none" }}>
        <Button
          align="center"
          color="info"
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          취소하기
        </Button>
      </Link>
    </Box>
  );
}
