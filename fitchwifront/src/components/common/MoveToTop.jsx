import { Navigation } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import React from "react";

const MoveToTop = () => {
  const moveTop = () => {
    // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Tooltip
      onClick={moveTop}
      sx={{
        position: "fixed",
        bottom: 100,
        right: 25,
      }}
    >
      <Fab color="error" aria-label="move">
        <Navigation />
      </Fab>
    </Tooltip>
  );
};

export default MoveToTop;
