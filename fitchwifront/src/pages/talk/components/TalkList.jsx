import { AssignmentTurnedIn } from "@mui/icons-material";
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/TalkList.scss";
import PeopleIcon from '@mui/icons-material/People';

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
        talkMemberCount,
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
                            style={{ cursor: "pointer" }}
                        />
                        <Typography
                            sx={{ mt: 7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "pre-wrap", width: 180, height: 25 }}
                        >
                            {talkContent}
                        </Typography>

                        <Typography variant="body" color="text.secondary">
                            <Box style={{ float: "left" }}>
                                <AssignmentTurnedIn sx={{ color: "grey" }} fontSize="small" />
                            </Box>
                            <Typography color="textSecondary" variant="caption" style={{ float: "left" }}>
                                <b>{talkType}</b>&nbsp;&nbsp;
                            </Typography>
                            <Box style={{ float: "left" }}>
                                <PeopleIcon sx={{ color: "grey" }} fontSize="small" />
                            </Box>
                            <Typography color="textSecondary" variant="caption" style={{ float: "left" }}>
                                <b>{talkMemberCount + 1}/{talkMax}명</b>
                            </Typography>
                            <Typography variant="span" className="talkOpDate">
                                {talkOpenCode.talkOpenDate}
                            </Typography>
                        </Typography>
                        <br />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

export default TalkList;