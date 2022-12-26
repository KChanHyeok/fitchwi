import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

const Together = ({togetherList}) => {
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
        <Link to={`/together/${togetherCode}`} >
            <Card sx={{ mb:3, maxWidth:1000}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        src={`images/${togetherSaveimg}`}   
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {togetherTitle}
                        </Typography>
                        <Typography variant="body" color="text.secondary">
                            {togetherContent}<br/>
                            {togetherPrice}원
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

export default Together