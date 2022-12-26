import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Link, Typography } from "@mui/material";

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
        <Link href={`/together/${togetherCode}`} underline="none">
            <Card sx={{ mb:3}}>
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