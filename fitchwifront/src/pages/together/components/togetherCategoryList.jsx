import { Stack, Typography } from "@mui/material";
import Together from "./together";
import { useParams } from "react-router-dom";

const categorys = {
  culture: "문화·예술",
  exercise: "운동·액티비티",
  food: "요리·음식",
  travel: "여행",
  growth: "성장·자기계발",
  art: "공예·수공예",
  game: "게임·오락",
  other: "기타",
};

const TogetherCategoryList = ({ togetherList }) => {
  let { togetherCategoryText } = useParams();
  return (
    <Stack sx={{ width: 1000, height: 800, margin: "auto" }} flex={7} p={3}>
      <Typography variant="h4" mb={2} fontWeight="bold">{categorys[togetherCategoryText]}</Typography>
      {togetherList.filter(
        (data) =>
          data.togetherState !== "삭제신청중" &&
          data.togetherCategory === categorys[togetherCategoryText] &&
          data.togetherState !== "결제완료"
      ).length === 0 ? (
        <Typography textAlign="center" height={100} lineHeight={40}>
          😀 현재 진행중인 함께해요가 없습니다
        </Typography>
      ) : (
        togetherList
          .filter(
            (data) =>
              data.togetherState !== "삭제신청중" &&
              data.togetherCategory === categorys[togetherCategoryText] &&
              data.togetherState !== "결제완료"
          )
          .map((data) => <Together togetherList={data} key={data.togetherCode} />)
      )}
    </Stack>
  );
};
export default TogetherCategoryList;
