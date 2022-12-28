import React from "react";
import {
    Fab,
    Tooltip,
  } from "@mui/material";
  import { Add as AddIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";


const AddButton = () => {
    return (
        <Tooltip
        title="Add"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="secondary" aria-label="add" component={Link} to="/together/add">
          <AddIcon />
        </Fab>
      </Tooltip>
    )
} 

export default AddButton;