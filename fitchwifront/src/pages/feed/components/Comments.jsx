import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Comments = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      mt={2}
    >
      <Link to="/memberpage" state={{ memberId: data.memberEmail.memberEmail }}>
        <Avatar
          alt={data.memberEmail.memberName}
          src={"images/" + data.memberEmail.memberSaveimg}
          sx={{ width: 30, height: 30, mr: 1 }}
        />
      </Link>
      <Typography variant="span" color="text.secondary">
        <b>{data.memberEmail.memberNickname}</b> {data.feedCommentContent}
      </Typography>
    </Box>
  );
};

export default Comments;
