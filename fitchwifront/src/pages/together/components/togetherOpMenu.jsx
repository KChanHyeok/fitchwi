import MenuItem from "@mui/material/MenuItem";
import { Button, Divider, Menu, Modal, styled, Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


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
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                함께해요 관리
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem disableRipple>
                    <ManageAccountsIcon />
                    가입회원 관리
                </MenuItem>
                <MenuItem disableRipple>
                        <FactCheckIcon />
                        신청회원 확인
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleOpen}>
                    <DeleteIcon />
                    삭제신청하기
                </MenuItem>
                <MenuItem onClick={() => alert("신고하기")}>신고하기</MenuItem>
            </StyledMenu>
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