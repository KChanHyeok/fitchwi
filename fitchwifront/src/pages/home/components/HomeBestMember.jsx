import { Avatar, Badge, Box, Grid, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HomeBestMember = () => {
  const [member, setMember] = useState();

  const getMemberList = useCallback(() => {
    axios.get("/getFeedListOrderByMember").then((response) => {
      response.data.reduce(function (acc, current) {
        if (acc.findIndex(({ memberEmail }) => memberEmail === current.memberEmail) === -1) {
          acc.push(current);
        }
        acc.sort((a, b) => b.memberFeedCount - a.memberFeedCount);
        setMember(acc);
        return acc;
      }, []);
    });
  }, []);

  useEffect(() => {
    getMemberList();
  }, [getMemberList]);

  if (member !== undefined) {
    member.length = 4;
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#ff597b",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  const StyledBadge2 = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  return (
    <Box p={2} mt={2} mb={10}>
      <Grid container spacing={2}>
        {!member ? (
          <></>
        ) : (
          <>
            {member.map((data, index) =>
              index === 0 ? (
                <Grid item xs={3} sm={6} md={6} lg={3} key={data.memberEmail} display="flex" flexDirection="column" alignItems="center">
                  <Link to="/memberpage" state={{ memberId: data.memberEmail }}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      badgeContent="🥇"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    >
                      <Avatar src={data.memberSaveimg} sx={{ width: { xs: 50, sm: 200 }, height: { xs: 50, sm: 200 }, boxShadow: 3 }} />
                    </StyledBadge>
                    <Avatar
                      src={data.memberSaveimg}
                      sx={{ width: { xs: 50, sm: 200 }, height: { xs: 50, sm: 200 }, boxShadow: 3, display: { xs: "none", sm: "block" } }}
                    />
                  </Link>
                  <Typography fontSize={20} fontWeight={100} mt={2} sx={{ display: { xs: "none", sm: "block" } }}>
                    🥇 {data.memberNickname}님
                  </Typography>
                  <Typography fontSize={14} fontWeight={100} sx={{ display: { xs: "none", sm: "block" } }}>
                    작성한 피드 : {data.memberFeedCount}개
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={3} sm={6} md={6} lg={3} key={data.memberEmail} display="flex" flexDirection="column" alignItems="center">
                  <Link to="/memberpage" state={{ memberId: data.memberEmail }}>
                    <StyledBadge2
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      badgeContent="🏅"
                      sx={{ display: { xs: "block", sm: "none" } }}
                    >
                      <Avatar src={data.memberSaveimg} sx={{ width: { xs: 50, sm: 200 }, height: { xs: 50, sm: 200 }, boxShadow: 3 }} />
                    </StyledBadge2>
                    <Avatar
                      src={data.memberSaveimg}
                      sx={{ width: { xs: 50, sm: 200 }, height: { xs: 50, sm: 200 }, boxShadow: 3, display: { xs: "none", sm: "block" } }}
                    />
                  </Link>
                  <Typography fontSize={20} fontWeight={100} mt={2} sx={{ display: { xs: "none", sm: "block" } }}>
                    🏅 {data.memberNickname}님
                  </Typography>
                  <Typography fontSize={14} fontWeight={100} sx={{ display: { xs: "none", sm: "block" } }}>
                    작성한 피드 : {data.memberFeedCount}개
                  </Typography>
                </Grid>
              )
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default HomeBestMember;
