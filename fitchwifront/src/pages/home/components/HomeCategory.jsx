import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { Grid, ImageListItemBar } from "@mui/material";

export default function HomeCategory({ setCategory, setKorCategory }) {
  return (
    <Grid container spacing={2} display="flex" p={3} alignItems="center">
      {itemData.map((item, index) =>
        index !== 6 ? (
          <Grid item xs={4} sm={3} md={2} lg={1.7} key={index}>
            <ImageListItem
              style={{ height: "150px" }}
              onClick={() => {
                setKorCategory(item.title);
                setCategory(item.category);
              }}
            >
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              />
              <ImageListItemBar subtitle={item.title} sx={{ textAlign: "center", borderRadius: 2, cursor: "pointer" }} />
            </ImageListItem>
          </Grid>
        ) : (
          <Grid item xs={12} sm={3} md={2} lg={1.7} key={index}>
            <ImageListItem
              style={{ height: "150px" }}
              onClick={() => {
                setKorCategory(item.title);
                setCategory(item.category);
              }}
            >
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              />
              <ImageListItemBar subtitle={item.title} sx={{ textAlign: "center", borderRadius: 2, cursor: "pointer" }} />
            </ImageListItem>
          </Grid>
        )
      )}
    </Grid>
  );
}

const itemData = [
  {
    img: "https://source.unsplash.com/featured/?culture",
    title: "문화·예술",
    category: "culture",
    rows: 1,
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/featured/?exercise",
    title: "운동·액티비티",
    category: "exercise",
  },
  {
    img: "https://source.unsplash.com/featured/?food,cook",
    title: "요리·음식",
    category: "food",
  },
  {
    img: "https://source.unsplash.com/featured/?travel,trip",
    title: "여행",
    category: "travel",
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/featured/?growth",
    title: "성장·자기계발",
    category: "growth",
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/featured/?crafts",
    title: "공예·수공예",
    category: "art",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/featured/?game",
    title: "게임·오락",
    category: "game",
  },
];
