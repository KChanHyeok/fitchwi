import React, { useCallback, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Divider from '@mui/material/Divider';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/TalkOpMenu.scss";
import Swal from 'sweetalert2';

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

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

function TalkOpMenu({ talkPageCode, talkInfo, talkTagInfo, talkJoinList, talkJoinMember,
    refreshTalkTagList, refreshTalkList, refreshTalkJoinList }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const nav = useNavigate();

    //버튼 여러번 클릭 막기
    const [load, setLoad] = useState(false);

    //가입회원 관리 모달창
    const [openJoinMemberList, setOpenJoinMemberList] = useState(false);

    const joinMemberManagement = () => {
        refreshTalkJoinList();
        setOpenJoinMemberList(true);
        setAnchorEl(false);
    }

    //개설자가 가입한 회원 탈퇴 처리
    const deleteJoinMember = (data) => {
        setLoad(true);
        axios.put("/deleteJoinMember", data)
            .then((res) => {
                setLoad(false);
                swAlert(res.data, "success");
                refreshTalkJoinList();
                setOpenJoinMemberList(false);
            })
            .catch((error) => console.log(error));
    }

    //승인 대기 -> 수락 / 거절
    const [openApplyMember, setOpenApplyMember] = useState(false);

    const applyMemberCheck = () => {
        refreshTalkJoinList();
        setOpenApplyMember(true);
        setAnchorEl(false);
    }

    const [waitingMemberList, setWaitingMemberList] = useState(null);

    useEffect(() => {
        setWaitingMemberList(talkJoinList.filter
            (data => (data.talkCode.talkCode === (talkPageCode * 1)
                && data.talkJoinState === "대기")));
    }, [talkJoinList, talkPageCode]);

    //수락(승인)
    const approval = (data) => {
        setLoad(true);
        axios.put("/approvalTalkMember", data)
            .then((res) => {
                setLoad(false);
                swAlert(res.data, "success");
                refreshTalkList();
                refreshTalkJoinList();
                setOpenApplyMember(false);
            })
            .catch((error) => console.log(error));
    }

    //거절
    const refusal = (data) => {
        setLoad(true);
        axios.put("/refusalTalkMember", data)
            .then((res) => {
                setLoad(false);
                swAlert(res.data, "success");
                refreshTalkList();
                refreshTalkJoinList();
                setOpenApplyMember(false);
            })
            .catch((error) => console.log(error));
    }

    //삭제하기
    const deleteTalk = useCallback(
        () => {
            setLoad(true);
            axios.delete("/deleteTalk", { data: talkInfo })
                .then((res) => {
                    if (res.data === "ok") {
                        setLoad(false);
                        swAlert("얘기해요가 삭제되었습니다.", "success");
                        nav("/talk");
                        refreshTalkList();
                    } else {
                        swAlert("얘기해요 삭제가 불가능합니다.", "warning");
                    }
                });
        }, [talkInfo, nav, refreshTalkList]
    );

    const swAlert = (contentText, icon) => {
        Swal.fire({
            title: "알림",
            text: contentText,
            icon: icon,
            confirmButtonText: "확인",
            confirmButtonColor: "#ff0456",
        });
    };

    //삭제 모달 창
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const isDelete = () => {
        setOpenDeleteModal(true);
        setAnchorEl(false);
    };

    const modalClose = () => {
        setOpenDeleteModal(false);
        setOpenApplyMember(false);
        setOpenJoinMemberList(false);
    };

    return (
        <div>
            {load ?
                <Box style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                    <CircularProgress sx={{ margin: "auto" }} />
                </Box>
                :
                <div>
                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        얘기해요 관리
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={joinMemberManagement} disableRipple>
                            <ManageAccountsIcon />
                            가입회원 관리
                        </MenuItem>
                        {talkInfo.talkType === "승인제" &&
                            <MenuItem onClick={applyMemberCheck} disableRipple>
                                <FactCheckIcon />
                                신청회원 확인
                            </MenuItem>}
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem
                            onClick={() => nav("/talk/update", { state: { talkInfo, talkTagInfo } })}
                            disableRipple>
                            <BuildIcon />
                            얘기해요 수정
                        </MenuItem>
                        <MenuItem onClick={isDelete} disableRipple>
                            <DeleteIcon />
                            얘기해요 삭제
                        </MenuItem>
                    </StyledMenu>
                    <div>
                        <Dialog
                            open={openJoinMemberList}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title" className="memberListBox">
                                {"얘기해요 참여자 관리"}
                                <button className="modalCloseBtn" onClick={modalClose}>
                                    ✖
                                </button>
                            </DialogTitle>
                            <hr />
                            <DialogContent
                                style={{
                                    height: 200,
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                }}
                            >
                                {!talkJoinMember
                                    ? <Box style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        transform: "translate(-50%, -50%)",
                                    }}>
                                        <CircularProgress sx={{ margin: "auto" }} />
                                    </Box>
                                    : talkJoinMember.length === 0
                                        ? <Typography>현재 참여 중인 회원이 없습니다.</Typography>
                                        : talkJoinMember.map((data) =>
                                            <UserBox key={data.talkJoinCode}>
                                                <Link to="/memberpage" state={{ memberId: data.memberEmail.memberEmail }}>
                                                    <Avatar src={data.memberEmail.memberSaveimg} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                                                </Link>
                                                <Typography fontWeight={500} width={200} variant="span">
                                                    <b>{data.memberEmail.memberNickname}님</b>
                                                </Typography>
                                                <Button className="applyBtn" onClick={() => deleteJoinMember(data)}>탈퇴</Button>
                                            </UserBox>)}
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div>
                        <Dialog
                            open={openApplyMember}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title" className="memberListBox">
                                {"승인 대기 중인 회원"}
                                <button className="modalCloseBtn" onClick={modalClose}>
                                    ✖
                                </button>
                            </DialogTitle>
                            <hr />
                            <DialogContent
                                style={{
                                    height: 300,
                                    width: 400,
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                }}>
                                <Typography mb={1} textAlign="center"><b>회원 / 답변</b></Typography>
                                {!waitingMemberList
                                    ? <Box style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        transform: "translate(-50%, -50%)",
                                    }}>
                                        <CircularProgress sx={{ margin: "auto" }} />
                                    </Box>
                                    : waitingMemberList.length === 0
                                        ? <Typography>현재 승인 대기 중인 인원이 없습니다.</Typography>
                                        : waitingMemberList.map((data) =>
                                            <Box>
                                                <UserBox key={data.talkJoinCode}>
                                                    <Link to="/memberpage" state={{ memberId: data.memberEmail.memberEmail }}>
                                                        <Avatar src={data.memberEmail.memberSaveimg} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                                                    </Link>
                                                    <Typography fontWeight={500} width={200} variant="p">
                                                        <b>{data.memberEmail.memberNickname} 님</b>
                                                    </Typography>
                                                    <Button className="applyBtn" onClick={() => approval(data)}>승인</Button>
                                                    <Button className="applyBtn" onClick={() => refusal(data)}>거절</Button>

                                                </UserBox>
                                                <Typography mb={3}>
                                                    <b>답변 :</b> {data.talkJoinAnswer}
                                                </Typography>
                                            </Box>)}

                            </DialogContent>
                        </Dialog>
                    </div>
                    <div>
                        <Dialog
                            open={openDeleteModal}
                            onClose={modalClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"얘기해요 삭제하기"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {talkJoinMember.length >= 1
                                        && "현재 가입 중인 회원이 있습니다."}<br />
                                    정말로 삭제하시겠습니까?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={deleteTalk}>삭제</Button>
                                <Button onClick={modalClose}>취소</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            }
        </div >

    );
}

export default TalkOpMenu;
