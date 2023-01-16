import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { Alert, Button, FormControl, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";
import Swal from "sweetalert2";

export default function FeedTag({ tagForm, setTagForm, insertForm }) {
  const swAlert = (html, icon = "success", func) => {
    Swal.fire({
      title: "알림",
      html: html,
      icon: icon,
      confirmButtonText: "확인",
      confirmButtonColor: "#ff0456",
    }).then(func);
  };

  const [tagList, setTagList] = React.useState([]);
  React.useEffect(() => {
    getTagList();
  }, []);

  const getTagList = async () => {
    await axios
      .get("/getTagList")
      .then((response) => {
        setTagList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [tag, setTag] = React.useState("");

  const onChange = (event) => {
    setTag(event.target.value);
  };

  const onClick = React.useCallback(() => {
    if (tag === "") {
      swAlert("내용을 입력하세요!", "warning");
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
          swAlert("등록되어 있는 태그입니다!", "warning");
        } else {
          setTag("");
          setOpen(true);
          getTagList();
          setTagForm([]);
        }
      });
  }, [tag, setTagForm]);
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
        value={tagForm}
        onChange={(event, newValue) => {
          console.log(...newValue);
          setTagForm([...newValue]);
        }}
        options={tagList}
        getOptionLabel={(option) => option.tagContent}
        renderTags={(tagForm, getTagProps) =>
          tagForm.map((option, index) => <Chip label={option.tagContent} {...getTagProps({ index })} />)
        }
        style={{ width: 400 }}
        renderInput={(params) => <TextField {...params} label="태그" placeholder="태그를 검색해보세요." />}
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
