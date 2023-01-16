import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useParams } from "react-router-dom";
import TalkList from "./TalkList";


const categorys = {
    culture: "문화·예술",
    exercise: "운동·액티비티",
    food: "요리·음식",
    travel: "여행",
    growth: "성장·자기계발",
    art: "공예·수공예",
    game: "게임·오락",
    other: "기타"
}

const TalkCategoryList = ({ talkList }) => {

    let { talkCategoryText } = useParams();

    return (
        <Container fixed>
            <Box sx={{ ml: 5 }} flex={4} p={2}>
                <h2 style={{ marginTop: 5, color: "grey" }}>카테고리 {">"} {categorys[talkCategoryText]}</h2>
                <br />
                {talkList.filter((data) => (data.talkCategory === categorys[talkCategoryText])).length === 0 ? (
                    <Typography textAlign="center" height={100} lineHeight={35}>
                        😀 현재 진행중인 얘기해요가 없습니다
                    </Typography>
                ) : (
                    talkList
                        .filter((data) => data.talkCategory === categorys[talkCategoryText])
                        .map((data) => <TalkList talkList={data} key={data.talkCode} />)
                )}
            </Box>
        </Container>
    );
};
export default TalkCategoryList;