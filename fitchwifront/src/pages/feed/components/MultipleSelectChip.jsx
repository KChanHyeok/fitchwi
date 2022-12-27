import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import React, { useCallback, useState } from "react";
import { Alert, Button, InputAdornment, Snackbar } from "@mui/material";

function getStyles(name, tagForm, theme) {
  return {
    fontWeight: tagForm.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ tagForm, setTagForm }) {
  const [tagList, setTagList] = useState(["25", "셀피", "맛집투어", "연말모임", "전시", "인생네컷"]);

  const theme = useTheme();

  const handleChange = useCallback(
    (event) => {
      console.log(event.target.value);
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
      alert("내용을 입력하세요!");
      return;
    }
    setTagList(tagList.concat(tag));
    setTag("");
    setOpen(true);
  }, [tag, tagList]);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
            <MenuItem key={name} value={name} style={getStyles(name, tagForm, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
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
      </FormControl>
    </div>
  );
}
