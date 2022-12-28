import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu } from "@mui/material";
import React, { useState } from "react";

const ITEM_HEIGHT = 48;
const TogetherSettingMenu = () => {


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "10ch",
                },
                }}
            >
                <MenuItem onClick={() => alert("수정하기")}>수정하기</MenuItem>
                <MenuItem onClick={() => alert("삭제하기")}>삭제하기</MenuItem>
                <MenuItem onClick={() => alert("신고하기")}>신고하기</MenuItem>
            </Menu>
        </div>
    )
}
export default TogetherSettingMenu;