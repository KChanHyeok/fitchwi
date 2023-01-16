import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, ImageList, ImageListItem, ImageListItemBar, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useEffect } from "react";

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

export default function TalkMbti({ talkList }) {

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

    const [randomValue, setRandomValue] = React.useState();

    useEffect(() => {
        setRandomValue(mbti[Math.floor(Math.random() * mbti.length)]);
    }, []);



    return (
        <Box mt={2} ml={5} mr={5} height={300}>
            <br />
            {sessionStorage.getItem("id") === null
                ? <Typography variant="h6" textAlign="center" color="#ff0456">
                    <b>{randomValue} 취향 저격 얘기해요</b>
                </Typography>
                : <Typography variant="h6" textAlign="center" color="#ff0456">
                    <b>{sessionStorage.getItem("mbti")} 취향 저격 얘기해요</b></Typography>
            }
            <br />
            <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" mt={1}>
                {talkList.length === 0 && <Box
                    sx={{ width: "100%" }}
                    textAlign="center"
                    lineHeight="20"
                >
                    <CircularProgress sx={{ margin: "auto" }} />
                </Box>}

                {sessionStorage.getItem("id") === null && talkList.filter((data) => data.talkMemberCount + 1 < data.talkMax)
                    .filter(data => data.talkOpenCode.memberEmail.memberMbti === randomValue)
                    .sort(() => 0.5 - Math.random())
                    .filter((data, index) => index < 3)
                    .map(data => (
                        <Card sx={{ mb: 3, width: 300, maxHeight: 300, textDecorationLine: "none", boxShadow: "none" }}
                            key={data.talkCode}
                        >
                            <CardActionArea>
                                <Link to={`/talk/${data.talkCode}`} style={{ textDecoration: "none", color: "black" }}>
                                    <CardMedia src={`/images/${data.talkSaveimg}`} component="img" width="200" height="200" alt="talkimg" />
                                </Link>
                                <CardContent sx={{ backgroundColor: "#ff427e", borderEndStartRadius: 5, borderEndEndRadius: 5 }}>
                                    <UserBox sx={{ float: "right", marginTop: 2 }}>
                                        <Link to="/memberpage"
                                            state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}>
                                            <Avatar
                                                src={data.talkOpenCode.memberEmail.memberSaveimg}
                                                sx={{ width: 50, height: 50 }}
                                            />
                                        </Link>
                                    </UserBox>
                                    <Link to={`/talk/${data.talkCode}`} style={{ textDecoration: "none", color: "black" }}>
                                        <Typography
                                            variant="h6"
                                            sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30, color: "white" }}
                                        >
                                            {data.talkTitle}
                                        </Typography>
                                        <Box>
                                            <Chip
                                                variant="outlined"
                                                label={data.talkCategory}
                                                size="small"
                                                sx={{ mt: 1, fontSize: 12, cursor: "pointer", color: "white", borderColor: "white" }}
                                            />
                                        </Box>
                                    </Link>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                {talkList.filter((data) => data.talkMemberCount + 1 < data.talkMax)
                    .filter(data => data.talkOpenCode.memberEmail.memberMbti === sessionStorage.getItem("mbti"))
                    .filter(data => data.talkOpenCode.memberEmail.memberEmail !== sessionStorage.getItem("id"))
                    .sort(() => 0.5 - Math.random())
                    .filter((data, index) => index < 3).map(data => (
                        <Card sx={{ mb: 3, width: 300, maxHeight: 300, textDecorationLine: "none", boxShadow: "none" }}
                            key={data.talkCode}
                        >
                            <CardActionArea>
                                <Link to={`/talk/${data.talkCode}`} style={{ textDecoration: "none", color: "black" }}>
                                    <CardMedia src={`/images/${data.talkSaveimg}`} component="img" width="200" height="200" alt="talkimg" />
                                </Link>
                                <CardContent sx={{ backgroundColor: "#ff427e", borderEndStartRadius: 5, borderEndEndRadius: 5 }}>
                                    <UserBox sx={{ float: "right", marginTop: 2 }}>
                                        <Link to="/memberpage"
                                            state={{ memberId: data.talkOpenCode.memberEmail.memberEmail }}>
                                            <Avatar
                                                src={data.talkOpenCode.memberEmail.memberSaveimg}
                                                sx={{ width: 50, height: 50 }}
                                            />
                                        </Link>
                                    </UserBox>
                                    <Link to={`/talk/${data.talkCode}`} style={{ textDecoration: "none", color: "black" }}>
                                        <Typography
                                            variant="h6"
                                            sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: 30, color: "white" }}
                                        >
                                            {data.talkTitle}
                                        </Typography>
                                        <Box>
                                            <Chip
                                                variant="outlined"
                                                label={data.talkCategory}
                                                size="small"
                                                sx={{ mt: 1, fontSize: 12, cursor: "pointer", color: "white", borderColor: "white" }}
                                            />
                                        </Box>
                                    </Link>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
            </Stack>
        </Box >
    );
}
