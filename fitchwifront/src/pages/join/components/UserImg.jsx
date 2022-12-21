import React, { useCallback, useEffect } from "react";

import { Button, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserImg({ fileForm, setFileForm }) {
  const style = {
    width: "300px",
    height: "300px",
    border: "1px solid black",
    borderRadius: "150px",
    margin: "auto",
    marginBottom: "20px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const imgEl = document.querySelector(".img_box");

  const onLoadFile = useCallback(
    (e) => {
      const file = e.target.files;
      setFileForm(file);
    },
    [setFileForm]
  );

  const preview = () => {
    if (!fileForm) return false;

    const reader = new FileReader();

    reader.onload = () => (imgEl.style.backgroundImage = `url(${reader.result})`);
    reader.readAsDataURL(fileForm[0]);
    console.log(reader);
  };

  useEffect(() => {
    preview();

    return () => preview();
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h2" gutterBottom>
        당신을 표현할 수 있는 이미지를 선택해주세요
      </Typography>
      <Typography variant="h4" gutterBottom mb={5}>
        *미등록시 기본 이미지로 등록됩니다.
      </Typography>
      <div style={style} className="img_box">
        <img src="" alt="" />
      </div>
      <Button variant="outlined" sx={{ pl: 5 }}>
        <FormControlLabel
          control={
            <TextField
              onChange={onLoadFile}
              type="file"
              label="사진"
              variant="standard"
              style={{ display: "none" }}
            />
          }
          label="등록하기"
        />
      </Button>
      <br />{" "}
      <Link to="/join/gender" style={{ textDecoration: "none" }}>
        <Button sx={{ mt: 5, width: 100 }} variant="contained" style={{ textDecoration: "none" }}>
          다음
        </Button>
      </Link>
    </div>
  );
}
