import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Stack, Box, Chip } from "@mui/material";
import { AssignmentTurnedIn } from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People';

const Together = ({togetherList}) => {

    const [facilities, setFacilities] = useState()

    useEffect(()=> {
        try{
            setFacilities(togetherList.togetherOpenedCode.facilitiesCode);
        }catch(e) {

        }
    },[togetherList.togetherOpenedCode.facilitiesCode])

        const {
        togetherCode,
        togetherCategory,
        togetherContent,
        togetherDate,
        togetherInquiry,
        togetherMax,
        togetherposition,
        togetherPrice,
        togetherRecruitEndDate,
        togetherRecruitStartDate,
        togetherSaveimg,
        togetherState,
        togetherTitle,
        togetherType,
        togetherMemberCount,
        togetherOpenedCode,
    } = togetherList;

    return (
    <Stack>
        <Card sx={{ mb: 3, maxHeight: 500, textDecoration:"none" }}  component={Link} to={`/together/${togetherCode}`}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    src={`/images/${togetherSaveimg}`}
                    alt="green iguana"
                    />
                <CardContent>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", width:165, height:30}}
                      >{togetherTitle}</Typography>
                   <Box>
                        <Chip
                          color="primary"
                          variant="outlined"
                          label={ togetherCategory}
                          size="small"
                          sx={{fontSize:10, mt:1}}
                        />
                        <Typography color="textSecondary" variant="caption" sx={{mt: 1.8 }} style={{ float: "right" }}>
                          <b>{togetherType}</b>
                        </Typography>
                        <Box style={{ float: "right" }} ml={1}>
                          <AssignmentTurnedIn sx={{ color: "grey", mt: 1.5}} fontSize="small" />
                        </Box>
                        <Typography color="textSecondary" variant="caption" sx={{ mt: 1.8 }} style={{ float: "right" }}>
                          <b>{togetherMemberCount + 1}/{togetherMax}</b>
                        </Typography >
                        <Box style={{ float: "right" }}>
                          <PeopleIcon sx={{ color: "grey", mt: 1.2}} />
                        </Box>
                      </Box>
                    <Box sx={{mt:1}}>
                        <Typography variant="caption" color="textSecondary">
                        <b>1인당 부담금 </b>{(togetherPrice + togetherOpenedCode.facilitiesCode.facilitiesPrice) === 0 ? "무료" : (togetherPrice + togetherOpenedCode.facilitiesCode.facilitiesPrice) +" 원"}<br />
                        <b>모이는 일자 </b>{togetherDate}<br/>
                        <b>모집 기간 </b>{togetherRecruitStartDate} ~ {togetherRecruitEndDate}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    </Stack>
    )
}

export default Together