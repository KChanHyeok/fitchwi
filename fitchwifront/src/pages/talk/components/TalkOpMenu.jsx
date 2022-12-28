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
import { Avatar, FormControl, InputLabel, Modal, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

function TalkOpMenu({ talkList, refreshTalkList }) {
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

    //수정 모달창
    const [talkUpModal, setTalkUpModal] = useState(false);

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

    //삭제하기
    const deleteTalk = useCallback(
        () => {
            axios.delete("/deleteTalk")
                .then((res) => {
                    if (res.data === "ok") {
                        alert("얘기해요 삭제 완료");
                        nav("/");
                    } else {
                        alert("삭제 불가");
                    }
                });
        }, [nav]
    );

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
                <MenuItem onClick={handleClose} disableRipple>
                    <ManageAccountsIcon />
                    가입멤버 관리
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <FactCheckIcon />
                    문의사항 확인
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={(e) => setTalkUpModal(true)} disableRipple>
                    <BuildIcon />
                    얘기해요 수정
                </MenuItem>
                <MenuItem onClick={() => deleteTalk()} disableRipple>
                    <DeleteIcon />
                    얘기해요 삭제
                </MenuItem>
            </StyledMenu>
            <StyleModal open={talkUpModal}
                onClose={(e) => setTalkUpModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ mt: 5 }}>
                <Box component="form"
                    width={400} height={600} bgcolor="white" p={3} borderRadius={5} sx={{ mt: 5, mb: 10, overflowY: "auto" }}>
                    <Typography variant="h6" color="gray" textAlign="center">
                        얘기해요 수정하기
                    </Typography>
                    <UserBox>
                        <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant="span">
                            {sessionStorage.getItem("id")}
                        </Typography>
                    </UserBox>
                    <hr />
                    <TextField fullWidth
                        label="얘기해요 모임명"
                        name="talkTitle"
                        sx={{ mt: 3 }}
                        onChange={onChange}

                    />
                    <TextField fullWidth
                        label="최대 참여인원"
                        type="number"
                        name="talkMax"
                        sx={{ mt: 3 }}
                        onChange={onChange}
                    />
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <InputLabel>모임 카테고리 선정</InputLabel>
                        <Select label="모임 카테고리 선정"
                            name="talkCategory"
                            // onChange={onChange}
                            required>
                            <MenuItem value="문화∙예술">문화∙예술</MenuItem>
                            <MenuItem value="운동∙액티비티">운동∙액티비티</MenuItem>
                            <MenuItem value="요리∙음식">요리∙음식</MenuItem>
                            <MenuItem value="여행">여행</MenuItem>
                            <MenuItem value="성장∙자기계발">성장∙자기계발</MenuItem>
                            <MenuItem value="공예∙수공예">공예∙수공예</MenuItem>
                            <MenuItem value="게임∙오락">게임∙오락</MenuItem>
                            <MenuItem value="기타">기타</MenuItem>
                        </Select>
                    </FormControl>
                    <p className="talkInput">애기해요 사진 첨부</p>
                    <div className="talk_img_box">
                        <img src="" alt="" />
                    </div>
                    <input type="file" name="talkImg"
                        onChange={onLoadFile}
                        multiple required></input>
                    <TextField fullWidth
                        label="얘기해요 소개 말"
                        name="talkContent"
                        sx={{ mt: 3 }}
                        multiline
                        rows={3} />
                    <p className="talkInput">애기해요 태그</p>
                    <input type="text" name="talkTagContent"
                        // onChange={onChange}
                        required></input>
                    <Button type="submit">수정하기</Button>
                </Box>
            </StyleModal>
        </div>
    );
}

export default TalkOpMenu;
