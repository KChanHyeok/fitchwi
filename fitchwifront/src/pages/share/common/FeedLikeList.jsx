import styled from "@emotion/styled";
import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const StyleModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FeedLikeList = ({ children, flList }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen} style={{ color: "black" }} sx={{ padding: 0 }}>
        {children}
      </Button>
      <StyleModal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box width={400} height={400} bgcolor="white" p={3} borderRadius={5}>
          <Typography variant="h6" textAlign="center">
            좋아요
          </Typography>
          <Divider sx={{ mt: 1 }} />
          <Box height={300} sx={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
            {flList.map((like, index) => (
              <List key={index} sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Link to="/memberpage" state={{ memberId: like.memberEmail.memberEmail }} style={{ textDecoration: "none" }}>
                      <Avatar
                        alt={like.memberEmail.memberName}
                        src={like.memberEmail.memberSaveimg}
                        sx={{ width: 40, height: 40, mr: 2 }}
                      />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText
                    primary={like.memberEmail.memberNickname}
                    secondary={
                      <Typography variant="span" color="text.secondary">
                        {like.memberEmail.memberName}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            ))}
          </Box>
        </Box>
      </StyleModal>
    </>
  );
};

export default FeedLikeList;
