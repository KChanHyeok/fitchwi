import {
    AppBar,
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    ImageList,
    ImageListItem,
    Input,
    Toolbar,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { People, LocationOn, SportsKabaddi, Groups, PermContactCalendar, AssignmentTurnedIn, DateRange, Search } from "@mui/icons-material";
import moment from "moment";

const TalkFeedList = () => {
    const nav = useNavigate();
    let { searchText } = useParams();
    const [newSearchText, setNewSearchText] = useState();

    const [togetherList, setTogetherList] = useState([]);
    const [talkList, setTalkList] = useState([]);
    const [type, setType] = useState(1);

    function getToday(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);

        return year + month + day;
    }

    let nowTime = (time) => moment(getToday(Number(time))).fromNow();

    const searchResult = useCallback(() => {
        axios
            .get("/getTogetherListBySearch", { params: { searchText: searchText } })
            .then((response) => {
                setTogetherList(response.data);
            })
            .catch((error) => console.log(error));

        axios
            .get("/getFeedListBySearch", { params: { searchText: searchText } })
            .then((response) => {
                setFeedList(response.data);
            })
            .catch((error) => console.log(error));

        axios
            .get("/getTalkListBySearch", { params: { searchText: searchText } })
            .then((response) => {
                setTalkList(response.data);
            })
            .catch((error) => console.log(error));
    }, [searchText]);

    useEffect(() => {
        searchResult();
    }, [searchResult]);

    const handleChange = (event) => {
        setNewSearchText(event.target.value);
    };

    const onSearch = useCallback(
        (e) => {
            if (!newSearchText || newSearchText.length < 2) {
                alert("두 글자 이상 입력해 주세요.");
                return;
            }
            e.preventDefault();
            nav(`/search/${newSearchText}`);
        },
        [newSearchText, nav]
    );

    //해당 얘기해요 피드 불러오기
    const [feedList, setFeedList] = useState([]);

    //talkInfo 값
    const { state } = useLocation();

    console.log(state);
    const getFeedListByTalk = useCallback(() => {
        if (state !== undefined) {
            if (state.talkCode !== undefined) {
                console.log(state.talkCode);
                axios
                    .get("/getFeedListByTalk", { params: { feedClassificationcode: state.talkCode } })
                    .then((res) => {
                        setFeedList(res.data);
                        console.log(res.data);
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
                                        style={{ textDecoration: "none", color: "black", float: "left" }}>
                                        <Box flexDirection="column" alignItems="center"
                                            boxShadow={2} mt={2} mb={4} ml={6} borderRadius={2} width={200}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        width: 200, height: 200,
                                                        borderTopLeftRadius: 8, borderBottomLeftRadius: 8,
                                                        borderTopRightRadius: 8, borderBottomRightRadius: 8
                                                    }}
                                                    image={`/images/${feed.ffList[0].feedFileSaveimg}`}
                                                />
                                                <CardContent>
                                                    {feed.feedContent.length > 8
                                                        ? <Typography variant="h6">{feed.feedContent.substr(0, 8)}...
                                                            <Chip
                                                                color="primary"
                                                                variant="outlined"
                                                                label={feed.feedCategory}
                                                                size="small"
                                                                sx={{ mt: 0.5, float: "right", fontSize: 7, fontWeight: "normal" }}
                                                            />
                                                        </Typography>
                                                        : <Typography variant="h6">{feed.feedContent}
                                                            <Chip
                                                                color="primary"
                                                                variant="outlined"
                                                                label={feed.feedCategory}
                                                                size="small"
                                                                sx={{ mt: 0.5, float: "right", fontSize: 7, fontWeight: "normal" }}
                                                            />
                                                        </Typography>
                                                    }
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
