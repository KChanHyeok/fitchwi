import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, InputAdornment, Snackbar } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function getStyles(name, tagForm, theme) {
  return {
    fontWeight: tagForm.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ tagForm, setTagForm, insertForm }) {
  useEffect(() => {
    getTagList();
  }, []);

  const getTagList = async () => {
    await axios
      .get("/getTagList")
      .then((response) => {
        console.log(response.data);
        setTagList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [tagList, setTagList] = useState([]);
  const theme = useTheme();

  const handleChange = useCallback(
    (event) => {
      setTagForm(event.target.value);
    },
    [setTagForm]
  );

  const [tag, setTag] = useState("");

  const onChange = (event) => {
    setTag(event.target.value);
  };

  const onClick = useCallback(() => {
    if (tag === "") {
      swAlert("내용을 입력하세요!", "info");
      return;
    }
    axios
      .get("/insertTag", {
        params: {
          tag: tag,
        },
      })
      .then((response) => {
        if (response.data === "fail") {
          swAlert("이미 등록되어 있는 태그입니다!", "info");
        } else {
          setTag("");
          setOpen(true);
        }
        getTagList();
      });
  }, [tag]);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const swAlert = (html, icon = "success", func) => {
    Swal.fire({
      title: "알림",
      html: html,
      icon: icon,
      confirmButtonText: "확인",
      confirmButtonColor: "#ff0456",
    }).then(func);
  };

  return (
    <div>
      <FormControl sx={{ mt: 2 }} fullWidth>
        <InputLabel id="demo-multiple-chip-label">태그</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tagForm}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="태그" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {tagList.map((name) => (
            <MenuItem key={name.tagCode} value={name.tagContent} style={getStyles(name.tagContent, tagForm, theme)}>
              {name.tagContent}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <OutlinedInput
          sx={{ mt: 1 }}
          value={tag}
          id="outlined-adornment-weight"
          endAdornment={
            <InputAdornment position="end">
              <Button variant="outlined" onClick={onClick}>
                추가
              </Button>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                  태그 추가 완료!
                </Alert>
              </Snackbar>
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          onChange={onChange}
          placeholder="태그를 추가해보세요!"
          inputProps={{
            "aria-label": "weight",
          }}
        />
      </FormControl>
    </div>
  );
}
