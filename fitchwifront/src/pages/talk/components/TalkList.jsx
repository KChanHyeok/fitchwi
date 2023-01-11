import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material";
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
                        <Box
                            sx={{
                                mt: 1,
                                display: "flex",
                                alignItems: "center",
                                float: "left"
                            }}
                        >
                            <Avatar
                                alt={talkOpenCode.memberEmail.memberNickname}
                                src={talkOpenCode.memberEmail.memberSaveimg}
                                sx={{ width: 30, height: 30, mr: 1 }}
                            />
                            <Typography mr={1} sx={{ fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 120 }}>
                                {talkOpenCode.memberEmail.memberNickname}
                            </Typography>
                        </Box>
                        <Chip
                            color="primary"
                            variant="outlined"
                            label={talkCategory}
                            size="small"
                            sx={{ mt: 1.5, fontSize: 12, float: "right" }}
                        />
                        <Typography
                            sx={{ mt: 7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 180, height: 30 }}
                        >
                            {talkContent}
                        </Typography>
                        <Typography variant="body" color="text.secondary">
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