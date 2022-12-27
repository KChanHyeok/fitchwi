import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FollowMemberListModal({ children, followList }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    setOpen(() => false);
  }, [followList]);

  let interestArr = [];

  followList.map((member) => (interestArr = member.memberInterest.split(" ")));

  return (
    <div>
      <Button onClick={handleOpen} style={{ color: "black" }}>
        {children}
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} style={{ height: 400, borderRadius: "10px" }}>
          <Typography sx={{ mb: 3 }} variant="h6" component="div">
            {children} 명
          </Typography>
          <Box
            style={{
              height: 360,
              overflowY: "scroll",
              overflowX: "hidden",
              borderRadius: "10px",
            }}
          >
            {followList.map((member, index) => (
              <List key={index} sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                {member.memberSaveimg && (
                  <Link
                    to="/memberpage"
                    state={{ memberId: member.memberEmail }}
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          sx={{ bgcolor: "orange" }}
                          aria-label="recipe"
                          src={"images/" + member.memberSaveimg}
                          onClick={handleClose}
                        ></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography>
                            {member.memberNickname == null
                              ? `${member.memberName}`
                              : `${member.memberNickname}(${member.memberName})`}
                          </Typography>
                        }
                        secondary={interestArr.map((interest, index) => (
                          <span key={index}> #{interest}</span>
                        ))}
                      />
                    </ListItem>
                  </Link>
                )}
                <Divider variant="inset" component="li" />
              </List>
            ))}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
