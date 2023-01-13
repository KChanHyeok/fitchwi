import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { Alert, Button, FormControl, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";

export default function FeedTag({ tagForm, setTagForm, insertForm }) {
  const [tagList, setTagList] = React.useState([]);
  React.useEffect(() => {
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
  const [value, setValue] = React.useState([]);
  console.log(value);
  const [tag, setTag] = React.useState("");

  const onChange = (event) => {
    setTag(event.target.value);
  };

  const onClick = React.useCallback(() => {
    if (tag === "") {
      alert("내용을 입력하세요!");
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
          alert("이미 등록되어 있는 태그입니다!");
        }
        getTagList();
      });
    setTag("");
    setOpen(true);
  }, [tag]);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Autocomplete
        multiple
        id="fixed-tags-demo"
        value={value}
        onChange={(event, newValue) => {
          setValue([...newValue]);
        }}
        options={tagList}
        getOptionLabel={(option) => option.tagContent}
        renderTags={(value, getTagProps) => value.map((option, index) => <Chip label={option.tagContent} {...getTagProps({ index })} />)}
        style={{ width: 400 }}
        renderInput={(params) => <TextField {...params} label="태그" placeholder="태그 추가" />}
      />
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
    </>
  );
}
