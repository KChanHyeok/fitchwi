import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Box, Divider, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import TalkCategoryImage from "../../talk/components/TalkCategoryImage";
import TogetherCategoryImage from "./togetherCategoryImage";

const TogetherCategory = ({ open, setOpen, type, togetherTagList }) => {
  const StyleModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <StyleModal open={open} onClose={(e) => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box width={800} height={330} bgcolor="white" p={3} borderRadius={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h6">카테고리</Typography>
          <Typography onClick={() => setOpen(false)} sx={{ cursor: "pointer" }}>
            <Close />
          </Typography>
        </Stack>
        {type === "talk" ? <TalkCategoryImage /> : <TogetherCategoryImage />}
        <Divider sx={{ mt: 2 }} />
      </Box>
    </StyleModal>
  );
};

export default TogetherCategory;
