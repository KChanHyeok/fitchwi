import { BottomNavigation, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <div>
      <BottomNavigation>
        <Box border={1} width="100%" textAlign="center" height={100}>
          <Typography variant="h6">Footer 영역입니다.</Typography>
        </Box>
      </BottomNavigation>
    </div>
  );
};

export default Footer;
