import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgress, Grid, ImageListItem, ImageListItemBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function TabPanel(props) {
  const { children, value, index, kor, source, ...other } = props;
  const nav = useNavigate();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ display: "flex" }}
    >
      {value === index && (
        <Grid
          container
          spacing={2}
          display="flex"
          p={3}
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={100} sx={{ fontSize: { xs: 13, sm: 15, md: 18, lg: 20 } }} textAlign="center">
              {children} 취미
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <ImageListItem style={{ height: "150px" }}>
              <img
                src={`/images/hobby/${source[0]}.jpeg`}
                alt={"index"}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
                onClick={() => nav(`/search/${kor[0]}`)}
              />
              <ImageListItemBar title={kor[0]} sx={{ textAlign: "center", borderRadius: 2 }} />
            </ImageListItem>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <ImageListItem style={{ height: "150px" }}>
              <img
                src={`/images/hobby/${source[1]}.jpeg`}
                alt={"index"}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
                onClick={() => nav(`/search/${kor[1]}`)}
              />
              <ImageListItemBar title={kor[1]} sx={{ textAlign: "center", borderRadius: 2 }} />
            </ImageListItem>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <ImageListItem style={{ height: "150px" }}>
              <img
                src={`/images/hobby/${source[2]}.jpeg`}
                alt={"index"}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
                onClick={() => nav(`/search/${kor[2]}`)}
              />
              <ImageListItemBar title={kor[2]} sx={{ textAlign: "center", borderRadius: 2 }} />
            </ImageListItem>
          </Grid>
        </Grid>
      )}
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

export default function HomeTapPanel({ mbti }) {
  const [value, setValue] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const mbtiArr = [
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
    if (mbti === "") {
      var even = Math.floor(Math.random() * 15);
    } else {
      even = mbtiArr.findIndex((item, index) => item === mbti);
    }
    setValue(even);
  }, [mbti]);

  console.log(value);
  return (
    <>
      {value === undefined ? (
        <Box textAlign="center" height={300} lineHeight={20}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 300, border: 1 }} mb={4}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", minWidth: 100 }}
          >
            <Tab label="#INFP" {...a11yProps(0)} />
            <Tab label="#INFJ" {...a11yProps(1)} />
            <Tab label="#INTP" {...a11yProps(2)} />
            <Tab label="#INTJ" {...a11yProps(3)} />
            <Tab label="#ISFP" {...a11yProps(4)} />
            <Tab label="#ISFJ" {...a11yProps(5)} />
            <Tab label="#ISTP" {...a11yProps(6)} />
            <Tab label="#ISTJ" {...a11yProps(7)} />
            <Tab label="#ENFP" {...a11yProps(8)} />
            <Tab label="#ENFJ" {...a11yProps(9)} />
            <Tab label="#ENTP" {...a11yProps(10)} />
            <Tab label="#ENTJ" {...a11yProps(11)} />
            <Tab label="#ESFP" {...a11yProps(12)} />
            <Tab label="#ESFJ" {...a11yProps(13)} />
            <Tab label="#ESTP" {...a11yProps(14)} />
            <Tab label="#ESTJ" {...a11yProps(15)} />
          </Tabs>
          <TabPanel value={value} index={0} source={["Readbook", "Music", "MusiumP"]} kor={["독서", "음악 감상", "전시회 관람"]}>
            🐶 INFP : 열정적인 중재자형
          </TabPanel>
          <TabPanel value={value} index={1} source={["DrawingP", "PictureP", "Readbook"]} kor={["그림", "사진", "독서"]}>
            🐱 INFJ : 선의의 옹호자
          </TabPanel>
          <TabPanel value={value} index={2} source={["BoardgameP", "SkydivingP", "Readbook"]} kor={["보드게임", "스카이다이빙", "독서"]}>
            🐭 INTP : 논리적인 사색가형
          </TabPanel>
          <TabPanel value={value} index={3} source={["Movie", "Game", "Readbook"]} kor={["영화", "게임", "독서"]}>
            🐹 INTJ : 용의주도한 전략가형
          </TabPanel>
          <TabPanel value={value} index={4} source={["DrawingP", "Movie", "NewsP"]} kor={["그림", "영화", "뉴스"]}>
            🐰 ISFP : 호기심 많은 예술가형
          </TabPanel>
          <TabPanel value={value} index={5} source={["ShoppingP", "CookingP", "AlbumP"]} kor={["쇼핑", "요리", "앨범 정리"]}>
            🦊 ISFJ : 용감한 수호자형
          </TabPanel>
          <TabPanel value={value} index={6} source={["Exercise", "PictureP", "Readbook"]} kor={["운동", "사진", "독서"]}>
            🐻 ISTP : 만능 재주꾼형
          </TabPanel>
          <TabPanel value={value} index={7} source={["Planning", "Pet", "NewsP"]} kor={["계획 세우기", "동물농장 보기", "뉴스 보기"]}>
            🐼 ISTJ : 청렴결백한 논리주의자형
          </TabPanel>
          <TabPanel value={value} index={8} source={["SingP", "AlbumP", "Travel"]} kor={["노래방", "모임", "여행"]}>
            🐻‍❄️ ENFP : 재기발랄한 활동가형
          </TabPanel>
          <TabPanel value={value} index={9} source={["Walk", "Bike", "Group"]} kor={["산책", "자전거", "모임"]}>
            🐨 ENFJ : 정의로운 사회운동가형
          </TabPanel>
          <TabPanel value={value} index={10} source={["SingP", "Game", "Debate"]} kor={["노래방", "게임", "토론"]}>
            🐯 ENTP : 논쟁을 즐기는 변론가형
          </TabPanel>
          <TabPanel value={value} index={11} source={["Exercise", "Meeting", "Travel"]} kor={["운동", "토론", "여행"]}>
            🦁 ENTJ : 대담한 통솔자형
          </TabPanel>
          <TabPanel value={value} index={12} source={["Exercise", "ShoppingP", "Debate"]} kor={["운동", "쇼핑", "모임"]}>
            🐮 ESFP : 자유로운 영혼의 연예인형
          </TabPanel>
          <TabPanel value={value} index={13} source={["NewsP", "Meeting", "Readbook"]} kor={["뉴스", "모임", "독서"]}>
            🐷 ESFJ : 사교적인 외교관형
          </TabPanel>
          <TabPanel value={value} index={14} source={["Composition", "Exercise", "SingP"]} kor={["작곡", "운동", "노래방"]}>
            🐵 ESTP : 모험을 즐기는 사험가형
          </TabPanel>
          <TabPanel value={value} index={15} source={["NewsP", "Clean", "Readbook"]} kor={["뉴스", "청소", "독서"]}>
            🐸 ESTJ : 엄격한 관리자형
          </TabPanel>
        </Box>
      )}
    </>
  );
}
