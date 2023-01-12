import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, ImageList, ImageListItem, ImageListItemBar, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AssignmentTurnedIn } from "@mui/icons-material";
import styled from "@emotion/styled";

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

function TabPanel(props) {
    const { children, value, index, kor, source, ...other } = props;

    const nav = useNavigate();

    return (
        <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
            {/* {value === index && (
                <Box sx={{ p: 3 }} display="flex" flexDirection="column" alignItems="center" width="100%">
                    <Box mb={3}>
                        <Typography variant="h6" fontWeight={100}>
                            {children} 취미
                        </Typography>
                    </Box>
                    <ImageList sx={{ width: "100%", height: 200 }} cols={3} gap={10}>
                        <ImageListItem style={{ height: "170px", width: "300px" }}>
                            <img
                                src={`https://source.unsplash.com/featured/?${source[0]}`}
                                alt={"index"}
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 10,
                                }}
                                onClick={() => nav(`/search/${kor[0]}`)}
                            />
                            <ImageListItemBar title={kor[0]} sx={{ textAlign: "center", borderRadius: 2 }} />
                        </ImageListItem>
                        <ImageListItem style={{ height: "170px", width: "300px" }}>
                            <img
                                src={`https://source.unsplash.com/featured/?${source[1]}`}
                                alt={"index"}
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 10,
                                }}
                                onClick={() => nav(`/search/${kor[1]}`)}
                            />
                            <ImageListItemBar title={kor[1]} sx={{ textAlign: "center", borderRadius: 2 }} />
                        </ImageListItem>
                        <ImageListItem style={{ height: "170px", width: "300px" }}>
                            <img
                                src={`https://source.unsplash.com/featured/?${source[2]}`}
                                alt={"index"}
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 10,
                                }}
                                onClick={() => nav(`/search/${kor[2]}`)}
                            />
                            <ImageListItemBar title={kor[2]} sx={{ textAlign: "center", borderRadius: 2 }} />
                        </ImageListItem>
                    </ImageList>
                </Box>
            )} */}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const mbti = [
    "INFP",
    "INFJ",
    "INTP",
    "INTJ",
    "ISFP",
    "ISFJ",
    "ISTP",
    "ISTJ",
    "ENFP",
    "ENFJ",
    "ENTP",
    "ENTJ",
    "ESFP",
    "ESFJ",
    "ESTP",
    "ESTJ",
];

if (sessionStorage.getItem("mbti") !== null) {
    const MyMbti = sessionStorage.getItem("mbti");
    var even = mbti.findIndex((item, index) => item === MyMbti);
} else {
    even = Math.floor(Math.random() * 15);
}

export default function TalkMbti({ talkList }) {
    const [value, setValue] = useState(even);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(talkList);

    console.log(sessionStorage.getItem("mbti"))
    return (
        // <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 300 }} mb={4}>
        <Box ml={5} mr={5} height={300}>
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
                {talkList.length === 0 && <Box style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                    <CircularProgress sx={{ margin: "auto" }} />
                </Box>}
                {talkList.filter((data, index) => index < 3).map(data => (
                    <Card sx={{ mb: 3, width: 300, maxHeight: 300, textDecorationLine: "none" }}
                        key={data.talkCode}
                    >
                        <CardActionArea>
                            <Link to={`/talk/${data.talkCode}`} style={{ textDecoration: "none", color: "black" }}>
                                <CardMedia src={`/images/${data.talkSaveimg}`} component="img" width="200" height="200" alt="talkimg" />
                            </Link>
                            <CardContent>
                                <Link to={`/talk/${data.talkCode}`} style={{ textDecoration: "none", color: "black" }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
                                    >
                                        {data.talkTitle}
                                    </Typography>
                                    <Box>
                                        <Chip
                                            color="primary"
                                            variant="outlined"
                                            label={data.talkCategory}
                                            size="small"
                                            sx={{ mt: 1, fontSize: 12, cursor: "pointer" }}
                                        />
                                    </Box>
                                    <Typography
                                        sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30 }}
                                    >
                                        {data.talkContent}
                                    </Typography>
                                </Link>
                                <hr />
                                <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between" alignItems="center">
                                    <UserBox>
                                        <Link to="/memberpage"
                                            state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}>
                                            <Avatar
                                                src={data.talkOpenCode.memberEmail.memberSaveimg}
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        </Link>
                                        <Typography style={{ fontSize: 13 }}>
                                            <Link to="/memberpage" style={{ textDecoration: "none", color: "black" }}
                                                state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}>
                                                {data.talkOpenCode.memberEmail.memberNickname}</Link></Typography>
                                        <Box display="flex" alignItems="center" style={{ marginLeft: 20 }}>
                                        </Box>
                                    </UserBox>
                                </Stack>
                                <Typography
                                    color="textSecondary" variant="caption" sx={{ mt: 0.3, mb: 1, mr: 1 }} style={{ float: "right" }}>
                                    {data.talkType}
                                </Typography>
                                <Box style={{ float: "right" }}>
                                    <AssignmentTurnedIn />
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Stack>
        </Box>
        // </Box>
    );
}
