import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/TalkList.scss";

const TalkList = ({ talkList }) => {
    const {
        talkCode,
        talkTitle,
        talkCategory,
        talkContent,
        talkImg,
        talkSaveimg,
        talkType,
        talkInquiry,
        talkMax,
    } = talkList;


    return (
        <Link to={`/talk/${talkCode}`} underline="none">
            <div className="talkListShow">
                <p>{talkTitle}</p>
                <p>{talkCategory}</p>
                <p>{talkContent}</p>
            </div>
            {/* <Card sx={{ mb: 3 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        src={`images/${talkSaveimg}`}
                        alt="green iguana" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {talkTitle}
                        </Typography>
                        <Typography variant="body" color="text.secondary">
                            {talkCategory}<br />
                            {talkContent}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card> */}
        </Link>
    )
}

export default TalkList;