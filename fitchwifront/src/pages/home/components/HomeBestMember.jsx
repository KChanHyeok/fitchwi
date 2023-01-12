import { Box, Stack, Typography } from "@mui/material";
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
  console.log(member);

  return (
    <Box border={1} p={2} mt={2} mb={10}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        {!member ? (
          <></>
        ) : (
          <>
            {member.map((data, index) =>
              index === 0 ? (
                <Box display="flex" flexDirection="column" alignItems="center" key={data.memberEmail} sx={{ ml: { xs: 10, sm: 0 } }}>
                  <Link to="/memberpage" state={{ memberId: data.memberEmail }}>
                    <Box
                      component="img"
                      src={data.memberSaveimg}
                      sx={{ textAlign: "center" }}
                      width={200}
                      height={200}
                      borderRadius={50}
                      boxShadow={3}
                    />
                  </Link>
                  <Typography fontSize={20} fontWeight={100} mt={2}>
                    🥇 {data.memberNickname}님
                  </Typography>
                  <Typography fontSize={14} fontWeight={100}>
                    작성한 피드 : {data.memberFeedCount}개
                  </Typography>
                </Box>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  key={data.memberEmail}
                  sx={{ display: { xs: "flex", sm: "block" } }}
                >
                  <Link to="/memberpage" state={{ memberId: data.memberEmail }}>
                    <Box
                      component="img"
                      src={data.memberSaveimg}
                      sx={{ textAlign: "center" }}
                      width={200}
                      height={200}
                      borderRadius={50}
                      boxShadow={3}
                    />
                  </Link>

                  <Typography fontSize={20} fontWeight={100} mt={2}>
                    🏅 {data.memberNickname}님
                  </Typography>
                  <Typography fontSize={14} fontWeight={100}>
                    작성한 피드 : {data.memberFeedCount}개
                  </Typography>
                </Box>
              )
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default HomeBestMember;
