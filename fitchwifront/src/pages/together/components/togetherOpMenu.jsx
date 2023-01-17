import MenuItem from "@mui/material/MenuItem";
import { Avatar, Button, Divider, Menu, Modal, styled, Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
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


const TogetherOpMenu = ({ togetherInfo, togetherJoinMember, togetherAppliedMember, refreshTogetherJoinList, refreshTogetherList }) => {
    
    const swAlert = (contentText, icon, func ) => {
        Swal.fire({
          title: "알림",
          text: contentText,
          icon: icon,
          confirmButtonText: "확인",
          confirmButtonColor: "#ff0456",
        }).then(func)
      };

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

      const UserBox = styled(Box)({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
      });

    const nav = useNavigate();

    const [opendelete, setOpendelete] = React.useState(false);
    const [openJoinMember, setOpenJoinMember] = React.useState(false);
    const [openAppliedMember, setOpenAppliedMember] = React.useState(false);

    const deleteOpen = () => 
    {
        setAnchorEl(null)
        setOpendelete(true)
    }

    const joinMemberOpen = () =>
    {
        setAnchorEl(null)
        setOpenJoinMember(true)
    }

    const appliedMemberOpen = () => 
    {
        setAnchorEl(null)
        setOpenAppliedMember(true)
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => 
    {
      setAnchorEl(null);
      setOpendelete(false)
      setOpenJoinMember(false)
      setOpenAppliedMember(false)
    };
    const deleteRequestTogether = (e) => {
        e.preventDefault();
        axios.put("/deleteTogetherState", togetherInfo).then((res)=> {
            swAlert("삭제신청이 완료 되엇습니다 함께해요 삭제는 3일안에 환불후 삭제 됩니다.","success")
            setOpendelete(false)
            refreshTogetherList();
            nav("/together");
        }).catch((error) => console.log(error))
    }

    const approval = (data) => {
        setOpenAppliedMember(false);
        axios.put("/approvalTogetherMemberState", data)
        .then((res)=> {
            swAlert(res.data,"success",()=> {
                window.location.reload();
            })
            
        }).catch((error) => console.log(error))
    }
    const refusal = (data) => {
        axios.put("/refusalTogetherMemberState", data)
        .then((res) => {
            swAlert(res.data,"success",()=> {
                window.location.reload();
            })

        }).catch((error) => console.log(error))
    }

    return (
        <>
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
                <MenuItem onClick={joinMemberOpen}>
                    <ManageAccountsIcon />
                    가입회원 관리
                </MenuItem>
                {togetherInfo.togetherType==="선착순" ? null:<MenuItem onClick={appliedMemberOpen}>
                    <FactCheckIcon />
                    신청회원 확인
                </MenuItem>}
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={deleteOpen}>
                    <DeleteIcon />
                    삭제신청하기
                </MenuItem>
            </StyledMenu>
            <Modal
            keepMounted
            open={opendelete}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style} component="form" onSubmit={deleteRequestTogether}>
                    <Typography variant="h4" component="div">
                        삭제하시겠습니까?
                    </Typography>
                    <Typography sx={{mt:2}} variant="h6" component="div"> {/*질문*/}
                        함께해요 명 : {togetherInfo.togetherTitle}<br/>
                        현재 참가중인 멤버인원수 : {togetherJoinMember.length+1} / {togetherInfo.togetherMax} <br/>
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
                        <Button type="submit" sx={{mr:3}}>삭제신청하기</Button>
                        <Button onClick={handleClose}>취소하기</Button>
                    </Typography>
                </Box>
            </Modal>

            <Modal
            open={openJoinMember}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" component="div">
                        함께해요 참여자 명단
                    </Typography>
                    <hr/>
                    <Box sx={{mt:5}}>
                        {togetherJoinMember.length===0 ? <Typography>현재 참여중인 인원이 없습니다</Typography> :
                        togetherJoinMember.map((data)=>(
                            <UserBox key={data.togetherJoinCode}>
                                <Avatar
                                    component={Link}
                                    to={"/memberpage"}
                                    state={{ memberId: data.memberEmail.memberEmail}}
                                    src={data.memberEmail.memberSaveimg}
                                    alt={"profil.memberImg"}
                                    sx={{ width: 30, height: 30 }}
                                />
                                <Typography fontWeight={500} variant="span">
                                    {!data.memberEmail.memberNickname
                                    ? data.memberEmail.memberEmail
                                    : data.memberEmail.memberNickname}
                                    님
                                </Typography>
                            </UserBox>
                        ))}
                    </Box>
                </Box>
            </Modal>
            
            <Modal
            open={openAppliedMember}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" component="div" mb={2}>
                        함께해요 신청자 명단
                    </Typography>
                    <hr/>
                    <Typography mb={1} mt={2} textAlign="center"><b>회원 / 답변</b></Typography>
                    <Box sx={{mt:3}}>
                        {togetherAppliedMember.length===0 || togetherAppliedMember.filter(data=>data.togetherJoinState==="대기").length===0 ? <Typography>현재 신청중인 인원이 없습니다</Typography> :
                        togetherAppliedMember.filter(data=>data.togetherJoinState!=="가입중").map((data)=>(
                        <Box>                            
                            <UserBox key={data.togetherJoinCode}>
                                <Avatar
                                    component={Link}
                                    to={"/memberpage"}
                                    state={{ memberId: data.memberEmail.memberEmail}}
                                    src={data.memberEmail.memberSaveimg}
                                    alt={"profil.memberImg"}
                                    sx={{ width: 30, height: 30 }}
                                />
                                <Typography fontWeight={500} width={200} variant="span">
                                    {!data.memberEmail.memberNickname
                                    ? data.memberEmail.memberEmail
                                    : data.memberEmail.memberNickname}
                                    님
                                </Typography>
                                    <Button onClick={()=> approval(data)} sx={{ml:2}}>승인</Button>
                                    <Button onClick={()=> refusal(data)}>거절</Button>
                                </UserBox>
                                <Typography mb={3}>
                                  <b>답변 : </b>{data.togetherJoinAnswer}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
export default TogetherOpMenu;