import MenuItem from "@mui/material/MenuItem";
import { Button, Menu } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const TogetherSettingMenu = ({togetherInfo}) => {

    const nav = useNavigate();

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
            <Button
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                variant="contained"
                sx={{ml:54}}
            >
                설정하기
            </Button>
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
                <MenuItem onClick={() => nav("/together/add",{state:{togetherInfo}})}>수정하기</MenuItem>
                <MenuItem onClick={() => alert("삭제하기")}>삭제하기</MenuItem>
                <MenuItem onClick={() => alert("신고하기")}>신고하기</MenuItem>
            </Menu>
        </div>
    )
}
export default TogetherSettingMenu;