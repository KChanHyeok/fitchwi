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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/TalkOpMenu.scss";

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

const StyleModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

function TalkOpMenu({ talkInfo, talkList, refreshTalkList, talkJoinMember }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const imgEl = document.querySelector(".talk_img_box");
    const nav = useNavigate();

    //회원관리 모달창
    const [openList, setOpenList] = useState(false);

    const [updateTalk, setUpdateTalk] = useState({});

    // useEffect(() => {
    //     setUpdateTalk();
    // }, []);
    // const {
    //     talkTitle,
    //     talkMax,
    //     talkCategory,
    //     talkContent,
    //     talkTagContent,
    // } = updateTalk;

    const onTalkUpdate = () => { };

    const onChange = useCallback(
        (e) => {
            setUpdateTalk({
                ...updateTalk,
                [e.target.name]: e.target.value
            });
        }, [updateTalk]);

    //파일 업로드
    const [fileForm, setFileForm] = useState("");

    useEffect(() => {
        preview();

        return () => preview();
    });

    const preview = () => {
        if (!fileForm) return false;
        const render = new FileReader();

        render.onload = () =>
            (imgEl.style.backgroundImage = `url(${render.result})`);
        render.readAsDataURL(fileForm[0]);
        //console.log(render);
    };

    const onLoadFile = useCallback(
        (e) => {
            const file = e.target.files;
            setFileForm(file);
            console.log(e.target.file);
        }, []);

    console.log(talkJoinMember);
    //수정하기
    // const onTalkUpdate = (e) => {
    //     console.log(updateTalk);
    //     e.preventDefault();
    //     formData.append(
    //         "data",
    //         new Blob([JSON.stringify(updateTalk)],
    //             { type: "application/json" })
    //     );
    //     formData.append("uploadImage", fileForm[0]);

    //     const config = {
    //         headers: { "Content-Type": "multipart/form-data" },
    //     };

    //     axios.get("/updateTalk", formData, config)
    //         .then((res) => {
    //             if (res.data === "ok") {
    //                 setUpdateTalk(false);
    //                 alert("개설 성공");
    //                 refreshTalkList();
    //             } else {
    //                 alert("개설 실패");
    //             }
    //         })
    //         .catch((error) => console.log(error));
    // };

    console.log(talkInfo);

    //삭제하기
    const deleteTalk = useCallback(
        () => {
            axios.delete("/deleteTalk", { data: talkInfo })
                .then((res) => {
                    if (res.data === "ok") {
                        alert("얘기해요 삭제 완료");
                        nav("/talk");
                    } else {
                        alert("삭제 불가");
                    }
                });
        }, [nav]
    );

    //삭제 모달 창
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const isDelete = () => {
        setOpenDeleteModal(true);
        setAnchorEl(false);
    };

    const modalClose = () => {
        setOpenDeleteModal(false);
        setOpenApplyMember(false);
    };

    const [openApplyMember, setOpenApplyMember] = useState(false);

    const applyMemberCheck = () => {
        setOpenApplyMember(true);
        setAnchorEl(false);
    }

    return (
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
                <MenuItem onClick={() => setOpenList(true)} disableRipple>
                    <ManageAccountsIcon />
                    가입회원 관리
                </MenuItem>
                {talkInfo.talkType === "승인제" &&
                    <MenuItem onClick={applyMemberCheck} disableRipple>
                        <FactCheckIcon />
                        신청회원 확인
                    </MenuItem>}
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => nav("/talk/opened", { state: { talkInfo } })} disableRipple>
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
                    open={openApplyMember}
                    onClose={modalClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" className="applyBox">
                        {"얘기해요 회원 관리"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            대기중인 멤버
                            <Button onClick={modalClose}>취소</Button>
                            <Button onClick={deleteTalk} autoFocus>
                                삭제
                            </Button>
                        </DialogContentText>
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
                                && "현재 가입된 회원이 있습니다."}<br />
                            정말로 삭제하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={modalClose}>취소</Button>
                        <Button onClick={deleteTalk} autoFocus>
                            삭제
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            {/* <StyleModal open={openList}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ mt: 5 }}>
                <Typography variant="h6" color="gray" textAlign="center">
                    얘기해요 회원 관리
                    <button className="modalCloseBtn" onClick={() => setOpenList(false)}>
                        ✖
                    </button>
                </Typography>
                <UserBox>
                    <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                    <Typography fontWeight={500} variant="span">
                        {sessionStorage.getItem("id")}
                    </Typography>
                </UserBox>
                <hr />
                {talkJoinMember.map((data) =>
                    <UserBox key={data.talkJoinCode}>
                        <Avatar src={`/images/${data.memberEmail.memberSaveimg}`} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant="span">
                            {!data.memberEmail.memberNickname ? data.memberEmail.memberName : data.memberEmail.memberNickname}님
                        </Typography>
                    </UserBox>)}
            </StyleModal> */}
        </div >
    );
}

export default TalkOpMenu;
