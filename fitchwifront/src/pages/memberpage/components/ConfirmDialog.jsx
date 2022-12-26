import React from "react";

import { Dialog, DialogActions, Button, DialogContent, DialogTitle } from "@mui/material";

const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent style={{ whiteSpace: "pre-line" }}>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          취소
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          탈퇴
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
