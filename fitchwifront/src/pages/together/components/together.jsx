import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

const Together = ({togetherList}) => {

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
    } = togetherList
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <CardMedia
                        component="img"
                        height="140"
                        src={"images/"+ togetherSaveimg}
                        alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {togetherTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {togetherContent}<br/>
                        {togetherPrice} 원
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Together