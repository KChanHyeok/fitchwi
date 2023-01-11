import { Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material";
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
                        <Typography gutterBottom variant="h5" component="div" fontWeight="bold"
                            sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}>
                            {talkTitle}
                        </Typography>
                        <Chip
                            color="primary"
                            variant="outlined"
                            label={talkCategory}
                            size="small"
                            sx={{ mt: 1, fontSize: 10 }}
                        />
                        <Typography
                            sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 165, height: 30 }}
                        >
                            {talkContent}
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