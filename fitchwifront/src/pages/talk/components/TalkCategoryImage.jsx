import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";

export default function TalkCategoryImage() {
  return (
    <ImageList sx={{ width: "100%", height: 250 }} cols={4}>
      {itemData.map((item) => (
        <Link to={`/talk/${item.category}`} key={item.title}>
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
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "문화∙예술",
    category: "culture",
    rows: 1,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "운동∙액티비티",
    category: "exercise",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "요리∙음식",
    category: "food",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "여행",
    category: "travel",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "성장∙자기계발",
    category: "growth",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "공예∙수공예",
    category: "art",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "게임∙오락",
    category: "game",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "기타",
    category: "other",
  },
];