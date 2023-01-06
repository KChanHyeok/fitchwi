import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Box, Divider, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import TogetherTap from "./common/togetherTap";
import TogetherCategoryImage from "./togetherCategoryImage";

const TogetherCategory = ({ open, setOpen }) => {
  const StyleModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <StyleModal open={open} onClose={(e) => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box width={800} height={550} bgcolor="white" p={3} borderRadius={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography></Typography>
          <Typography variant="h6">카테고리</Typography>
          <Typography onClick={() => setOpen(false)} sx={{ cursor: "pointer" }}>
            <Close />
          </Typography>
        </Stack>
        <TogetherCategoryImage />
        <Divider sx={{ mt: 2 }} />
        <Box height={200} mt={1}>
          <TogetherTap />
        </Box>
      </Box>
    </StyleModal>
  );
};

export default TogetherCategory;