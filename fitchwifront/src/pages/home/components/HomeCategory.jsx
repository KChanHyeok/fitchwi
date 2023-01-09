import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageListItemBar } from "@mui/material";

export default function HomeCategory({ setCategory }) {
  return (
    <ImageList sx={{ width: "100%", height: 150 }} cols={7}>
      {itemData.map((item, index) => (
        <ImageListItem style={{ height: "150px" }} onClick={() => setCategory(item.title)} key={index}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
          />
          <ImageListItemBar title={item.title} sx={{ textAlign: "center", borderRadius: 2 }} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://source.unsplash.com/featured/?culture",
    title: "문화∙예술",
    category: "culture",
    rows: 1,
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/featured/?exercise",
    title: "운동∙액티비티",
    category: "exercise",
  },
  {
    img: "https://source.unsplash.com/featured/?food,cook",
    title: "요리∙음식",
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
    title: "성장∙자기계발",
    category: "growth",
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/featured/?crafts",
    title: "공예∙수공예",
    category: "art",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/featured/?game",
    title: "게임∙오락",
    category: "game",
  },
];
