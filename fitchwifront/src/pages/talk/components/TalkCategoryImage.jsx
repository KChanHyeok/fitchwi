import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";

export default function TalkCategoryImage() {
  return (
    <ImageList sx={{ width: "100%", height: 250 }} cols={4}>
      {itemData.map((item) => (
        <Link to={`/talk/category/${item.category}`} key={item.title}>
          <ImageListItem style={{ height: "120px" }}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              //   srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 5,
              }}
            />
            <ImageListItemBar title={item.title} />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "/images/category/Culture.jpg",
    title: "문화·예술",
    category: "culture",
    rows: 1,
    cols: 2,
  },
  {
    img: "/images/category/Exercise.jpg",
    title: "운동·액티비티",
    category: "exercise",
  },
  {
    img: "/images/category/Food.jpg",
    title: "요리·음식",
    category: "food",
  },
  {
    img: "/images/category/Travel.jpg",
    title: "여행",
    category: "travel",
    cols: 2,
  },
  {
    img: "/images/category/Growth.webp",
    title: "성장·자기계발",
    category: "growth",
    cols: 2,
  },
  {
    img: "/images/category/Art.webp",
    title: "공예·수공예",
    category: "art",
    rows: 2,
    cols: 2,
  },
  {
    img: "/images/category/Game.jpg",
    title: "게임·오락",
    category: "game",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "기타",
    category: "other",
  },
];
