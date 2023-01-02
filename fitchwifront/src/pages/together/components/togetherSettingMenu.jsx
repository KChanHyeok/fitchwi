import MenuItem from "@mui/material/MenuItem";
import { Button, Menu, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ITEM_HEIGHT = 48;
const TogetherSettingMenu = ({togetherInfo, togetherJoinMember, refreshTogetherJoinList}) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "white",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };

    const nav = useNavigate();

    const [opendelete, setOpendelete] = React.useState(false);
    const handleOpen = () => 
    {
        setOpendelete(true)
        setAnchorEl(null)
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => 
    {
      setAnchorEl(null);
      setOpendelete(false)
    };
    const deleteRequestTogether = () => {
        axios.put("/deleteTogetherState", togetherInfo).then((res)=> console.log(res.data)).catch((error) => console.log(error))

        alert("삭제신청이 완료 되엇습니다 함께해요 삭제는 3일안에 환불후 삭제 됩니다.")
        setOpendelete(false)
        nav("/together");
        refreshTogetherJoinList();
    }

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
                <MenuItem onClick={handleOpen}>삭제하기</MenuItem>
                <MenuItem onClick={() => alert("신고하기")}>신고하기</MenuItem>
            </Menu>
            <Modal
            keepMounted
            open={opendelete}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h4" component="div">
                        삭제하시겠습니까?
                    </Typography>
                    <Typography sx={{mt:2}} variant="h6" component="div"> {/*질문*/}
                        함께해요 명 : {togetherInfo.togetherTitle}<br/>
                        현재 참가중인 멤버인원수 : {togetherJoinMember.length} / {togetherInfo.togetherMax} <br/>
                        모집일자 : {togetherInfo.togetherDate} <br/>
                    </Typography>
                    <hr/>
                    <Typography sx={{mt:3}} variant="h6" component="div">
                        삭제 하시면 이러이러한 약관에 <br/>
                        삭제 하시면 이러이러한 약관에 <br/>
                        삭제 하시면 이러이러한 약관에 <br/>
                        삭제 하시면 이러이러한 약관에 <br/>
                    </Typography>
                    <Typography component="div" sx={{mt:2}}>
                        <Button sx={{mr:3}} onClick={deleteRequestTogether}>삭제신청하기</Button>
                        <Button onClick={handleClose}>취소하기</Button>
                    </Typography>
                </Box>

            </Modal>
        </div>
    )
}
export default TogetherSettingMenu;