import {
    Avatar,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TalkFeedList = () => {

    //해당 얘기해요 피드 불러오기
    const [feedList, setFeedList] = useState([]);

    //talkInfo 값
    const { state } = useLocation();

    const getFeedListByTalk = useCallback(() => {
        if (state !== undefined) {
            if (state.talkCode !== undefined) {
                axios
                    .get("/getFeedListByTalk", { params: { feedClassificationcode: state.talkCode } })
                    .then((res) => {
                        setFeedList(res.data);
                    })
                    .catch((error) => console.log(error));
            }
        }
    }, [state])

    useEffect(() => {
        getFeedListByTalk();
    }, [getFeedListByTalk]);

    return (
        <>
            <Container>
                <Box sx={{ ml: 5 }} flex={4} p={2}>
                    <h2 style={{ marginTop: 5, color: "grey" }}> {state.talkTitle} 피드 모음</h2>

                    <Box>
                        {feedList.length === 0 ? <Typography>아직 작성된 피드가 없습니다.</Typography>
                            : feedList.sort((a, b) => b.feedCode - a.feedCode).map((feed, index) => (
                                <>
                                    <Link to={`/share/${feed.feedCode}`} key={index}
                                        style={{ textDecoration: "none", color: "black" }}>
                                        <Box flexDirection="column" alignItems="center"
                                            boxShadow={2} mt={2} mb={4} mr={6} borderRadius={2} width={300}
                                            style={{ float: "left" }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        width: 300, height: 200,
                                                        borderTopLeftRadius: 8, borderBottomLeftRadius: 8,
                                                        borderTopRightRadius: 8, borderBottomRightRadius: 8
                                                    }}
                                                    image={`/images/${feed.ffList[0].feedFileSaveimg}`}
                                                />
                                                <CardContent>
                                                    <Chip
                                                        color="primary"
                                                        variant="outlined"
                                                        label={feed.feedCategory}
                                                        size="small"
                                                        sx={{ mb: 1 }}
                                                    />
                                                    <Typography
                                                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "pre-wrap", height: 70 }}>
                                                        {feed.feedContent}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            mt: 1,
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Avatar
                                                            alt={feed.memberEmail.memberNickname}
                                                            src={feed.memberEmail.memberSaveimg}
                                                            sx={{ width: 30, height: 30, mr: 1 }}
                                                        />
                                                        <Typography mr={1} sx={{ fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                            {feed.memberEmail.memberNickname}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </CardActionArea>
                                        </Box>
                                    </Link>
                                </>
                            ))
                        }
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default TalkFeedList;
