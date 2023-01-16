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
import { Link, useNavigate, useParams } from "react-router-dom";
import { People, LocationOn, SportsKabaddi, Groups, PermContactCalendar, AssignmentTurnedIn, DateRange, Search } from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledAppbar = styled(AppBar)({
  backgroundColor: "white",
  borderBottom: 1,
  top: 65,
});

const SearchResult = () => {
  const nav = useNavigate();
  let { searchText } = useParams();
  const [newSearchText, setNewSearchText] = useState();

  const [togetherList, setTogetherList] = useState([]);
  const [feedList, setFeedList] = useState([]);
  const [talkList, setTalkList] = useState([]);
  const [type, setType] = useState(1);

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

  return (
    <>
      <StyledAppbar position="sticky">
        <Toolbar sx={{ ml: 17 }} component="form" onSubmit={onSearch}>
          <Search sx={{ color: "black", fontSize: 30 }} />
          <Input onChange={handleChange} disableUnderline={true} defaultValue={searchText} fullWidth sx={{ ml: 2 }} />
        </Toolbar>
      </StyledAppbar>
      <Container>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" mt={4}>
          <Typography variant="h2">{searchText} 검색결과</Typography>
          <Box width={1100} mt={4}>
            <ButtonGroup variant="outlined" aria-label="outlined button group" size="large" fullWidth sx={{ height: 70 }}>
              {type === 1 ? (
                <Button variant="contained">
                  <SportsKabaddi sx={{ mr: 1 }} />
                  함께해요
                </Button>
              ) : (
                <Button onClick={() => setType(1)}>
                  <SportsKabaddi sx={{ mr: 1 }} />
                  함께해요
                </Button>
              )}
              {type === 2 ? (
                <Button variant="contained">
                  <Groups sx={{ mr: 1 }} />
                  얘기해요
                </Button>
              ) : (
                <Button onClick={() => setType(2)}>
                  <Groups sx={{ mr: 1 }} />
                  얘기해요
                </Button>
              )}
              {type === 3 ? (
                <Button variant="contained">
                  <PermContactCalendar sx={{ mr: 1 }} />
                  공유해요
                </Button>
              ) : (
                <Button onClick={() => setType(3)}>
                  <PermContactCalendar sx={{ mr: 1 }} />
                  공유해요
                </Button>
              )}
            </ButtonGroup>

            <Box height={800} border={1} borderRadius={1} mt={2} sx={{ overflowY: "scroll" }}>
              {type === 1 &&
                (togetherList.length === 0 ? (
                  <div style={{ textAlign: "center" }}>
                    <Typography sx={{ mt: 3 }} variant="h6">
                      <b>{searchText}</b>에 대한 검색 결과를 찾을 수 없습니다.
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">검색어를 다시 확인해 주세요!</Typography>
                    <br />
                    <Link to="/together" style={{ color: "#ff0456", textDecoration: "none" }}>
                      '함께해요' 둘러보기
                    </Link>
                  </div>
                ) : (
                  togetherList.map((item, index) => (
                    <Link to={`/together/${item.togetherCode}`} style={{ textDecoration: "none" }} key={index}>
                      <Card sx={{ width: "100%", borderBottom: 1 }}>
                        <CardActionArea>
                          <CardMedia component="img" height="200" src={`/images/${item.togetherSaveimg}`} alt="green iguana" />
                          <CardContent>
                            <Chip
                              color="primary"
                              variant="outlined"
                              label={item.togetherCategory}
                              style={{
                                fontSize: 10,
                                marginBottom: 5,
                              }}
                            />
                            <Typography gutterBottom variant="h4" component="div" mt={1}>
                              {item.togetherTitle}
                            </Typography>
                            <Typography
                              sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 800, height: 30, mt: 1 }}
                            >
                              {item.togetherContent}
                            </Typography>
                            <Box display="flex" alignItems="center" mt={1}>
                              <LocationOn />
                              <Typography variant="subtitle1" ml={1} mr={2}>
                                {item.togetherPosition} · {item.togetherDate}
                              </Typography>
                              <People />
                              <Typography variant="subtitle1" ml={1}>
                                {item.togetherMemberCount + 1}/{item.togetherMax}명
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  ))
                ))}

              {type === 2 &&
                (talkList.length === 0 ? (
                  <div style={{ textAlign: "center" }}>
                    <Typography sx={{ mt: 3 }} variant="h6">
                      <b>{searchText}</b>에 대한 검색 결과를 찾을 수 없습니다.
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">검색어를 다시 확인해 주세요!</Typography>
                    <br />
                    <Link to="/talk" style={{ color: "#ff0456", textDecoration: "none" }}>
                      '얘기해요' 둘러보기
                    </Link>
                  </div>
                ) : (
                  talkList.map((item, index) => (
                    <Link to={`/talk/${item.talkCode}`} style={{ textDecoration: "none" }} key={index}>
                      <Card sx={{ borderBottom: 1 }}>
                        <CardContent>
                          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
                            <Grid item>
                              <Chip
                                color="primary"
                                variant="outlined"
                                label={item.talkCategory}
                                style={{
                                  fontSize: 10,
                                  marginBottom: 5,
                                }}
                              />
                              <Typography color="textPrimary" variant="h4" mt={2}>
                                {item.talkTitle}
                              </Typography>
                              <Typography
                                sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: 800, height: 30, mt: 1 }}
                              >
                                {item.talkContent}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Avatar
                                src={item.talkOpenCode.memberEmail.memberSaveimg}
                                sx={{
                                  height: 150,
                                  width: 150,
                                }}
                              />
                            </Grid>
                          </Grid>
                          <Box
                            sx={{
                              pt: 2,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <People />
                            <Typography
                              sx={{
                                ml: 1,
                                mr: 1,
                              }}
                              variant="body2"
                            >
                              {item.talkMemberCount + 1}/{item.talkMax}명
                            </Typography>
                            <AssignmentTurnedIn />
                            <Typography color="textSecondary" variant="caption" mr={1}>
                              {item.talkType}
                            </Typography>
                            <DateRange />
                            <Typography color="textSecondary" variant="body1" ml={1}>
                              {item.talkOpenCode.talkOpenDate}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                ))}

              {type === 3 &&
                (feedList.length === 0 ? (
                  <div style={{ textAlign: "center" }}>
                    <Typography sx={{ mt: 3 }} variant="h6">
                      <b>{searchText}</b>에 대한 검색 결과를 찾을 수 없습니다.
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">검색어를 다시 확인해 주세요!</Typography>
                    <br />
                    <Link to="/share" style={{ color: "#ff0456", textDecoration: "none" }}>
                      '공유해요' 둘러보기
                    </Link>
                  </div>
                ) : (
                  <ImageList sx={{ width: "100%", height: "800px", overflowY: "scroll" }} cols={3} rowHeight={164}>
                    {feedList.map((item, index) => (
                      <Link to={`/share/${item.feedCode}`} key={index}>
                        <ImageListItem style={{ height: "300px" }}>
                          <img
                            src={`/images/${item.ffList[0].feedFileSaveimg}`}
                            srcSet={`/images/${item.ffList[0].feedFileSaveimg}`}
                            alt={item.feedCode}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </ImageListItem>
                      </Link>
                    ))}
                  </ImageList>
                ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SearchResult;
