import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Stack } from "@mui/material";

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
        // togetherCategory,
        togetherContent,
        // togetherDate,
        // togetherInquiry,
        // togetherMax,
        // togetherposition,
        togetherPrice,
        // togetherRecruitEndDate,
        // togetherRecruitStartDate,
        togetherSaveimg,
        // togetherState,
        togetherTitle,
        // togetherType,
    } = togetherList;

    return (
    <Stack>
        <Card sx={{ mb: 3, textDecoration:"none" }}  component={Link} to={`/together/${togetherCode}`}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    src={`/images/${togetherSaveimg}`}
                    alt="green iguana"
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {togetherTitle}
                    </Typography>
                    <Typography variant="body" color="text.secondary">
                        {togetherContent}<br/>
                        {facilities&& togetherPrice+facilities.facilitiesPrice }원
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </Stack>
    )
}

export default Together