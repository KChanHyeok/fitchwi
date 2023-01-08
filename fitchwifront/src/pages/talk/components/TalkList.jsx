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
        talkOpenCode,
    } = talkList;

    return (
        <Link to={`/talk/${talkCode}`} underline="none">
            <Card sx={{ mb: 3, maxWidth: 300 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        width="300"
                        height="300"
                        src={`/images/${talkSaveimg}`}
                        alt="talkimg" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {talkTitle.length > 10
                                ? <Typography gutterBottom variant="h5" component="div"> {talkTitle.substr(0, 10)}... </Typography>
                                :
                                <Typography gutterBottom variant="h5" component="div">{talkTitle}</Typography>}

                        </Typography>
                        <Typography variant="body" color="text.secondary">
                            {talkCategory}<br />
                            {talkType}
                            <Typography variant="span" className="talkOpDate">
                                {talkOpenCode.talkOpenDate}
                            </Typography>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

export default TalkList;