import { Person } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarApp from "./CalendarApp";
export default function ViewFacilities({ swAlert }) {
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
    setLoad(false);
    axios.get(`/getFacilitiesInfo/${facilitiesCode}`).then((result) => {
      setFacilities(result.data);
      setLoad(true);
    });
  }, [facilitiesCode]);

  useEffect(() => {
    loadFacilities();
  }, [loadFacilities]);

  const [load, setLoad] = useState(false);
  return (
    <Container component="main" sx={{ display: "flex", alignItems: "center" }}>
      {load === false ? (
        <Box
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 10 }}>
            {facilitiesName}
          </Typography>
          <Grid container justifyContent="space-between">
            <Grid item xs={6}>
              {" "}
              <List>
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
                    <ListItemText secondary="제휴상태" primary={facilitiesGrade} />
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
            </Grid>

            <Grid item xs={6}>
              <CalendarApp facilitiesCode={facilitiesCode} swAlert={swAlert} />
            </Grid>
          </Grid>

          <Grid container spacing={1} justifyContent="space-around">
            <Grid item xs={4}>
              <Link to="/manager/facilities" style={{ textDecoration: "none" }}>
                <Button
                  align="center"
                  color="info"
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  뒤로가기
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Link
                to={`/manager/facilities/updateFacilities/${facilitiesCode}`}
                style={{ textDecoration: "none" }}
              >
                <Button align="center" type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  수정하기
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
