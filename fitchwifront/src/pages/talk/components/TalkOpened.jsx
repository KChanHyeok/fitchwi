import React, { useCallback, useEffect, useState } from "react";
// import "../styles/TalkOpenedModal.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Stack, styled } from "@mui/system";

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

const imgBoxStyle = {
    marginTop: "20px",
    width: "700px",
    height: "300px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
};

function TalkOpened({ memberEmail, memberInfo, refreshTalkList, refreshTalkTagList }) {
    let formData = new FormData();
    const nav = useNavigate();
    const imgEl = document.querySelector(".img_box");
    const location = useLocation();
    const nowdate = new Date().getFullYear() + "-"
        + ((new Date().getMonth() + 1) < 9 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-"
        + (new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate());

    const [insertTalkOp, setInsertTalkOp] = useState({
        memberEmail: {
            memberEmail: sessionStorage.getItem("id"),
        },
        talkTitle: "",
        talkMax: 0,
        talkCategory: "",
        talkType: "",
        talkInquiry: "",
        talkContent: "",
        talkTagContent: "",
        talkOpenDate: nowdate,
    });

    console.log(memberInfo);
    const onChange = useCallback(
        (e) => {
            const inputTo = {
                ...insertTalkOp,
                [e.target.name]: e.target.value,
            };
            setInsertTalkOp(inputTo);
        }, [insertTalkOp]);

    //파일 업로드
    const [fileForm, setFileForm] = useState("");

    useEffect(() => {
        preview();
        try {
            if (location) {
                setInsertTalkOp(location.state.talkInfo);
            }
        } catch (e) {

        }

        return () => preview();
    });

    const preview = () => {
        if (fileForm.length === 0) {
            return false;
        }
        const render = new FileReader();
        render.readAsDataURL(fileForm[0]);
        render.onload = () => (imgEl.style.backgroundImage = `url(${render.result})`);
    }

    const onLoadFile = useCallback((event) => {
        const file = event.target.files;
        setFileForm(file);
    }, []);

    //작성 내용 전송 함수
    const onTalkOpened = (e) => {
        console.log(insertTalkOp);
        e.preventDefault();
        formData.append(
            "data",
            new Blob([JSON.stringify(insertTalkOp)],
                { type: "application/json" })
        );
        formData.append("uploadImage", fileForm[0]);

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };

        axios.post("/addTalk", formData, config)
            .then((res) => {
                if (res.data === "ok") {
                    alert("개설 성공");
                    nav("/talk");
                    refreshTalkList();
                    refreshTalkTagList();
                } else {
                    alert("개설 실패");
                }
            })
            .catch((error) => console.log(error));


    };

    const [showInquiry, setShowInquiry] = useState(false);

    const approveCheck = () => {
        setShowInquiry(true);
    }

    const otherCheck = () => {
        setShowInquiry(false);
    }

    return (
        <>
            {sessionStorage.getItem("id") === null
                ? <Box sx={{ display: "flex" }}>
                    <CircularProgress sx={{ margin: "auto" }} />
                </Box>
                :
                <Stack sx={{ width: 800, height: 800, margin: "auto" }} flex={7} p={3}>
                    <Box bgcolor="white" p={3} sx={{ mb: 5 }}>
                        <Typography variant="h6" textAlign="center">
                            얘기해요 개설
                        </Typography>
                        <UserBox>
                            <Avatar alt={"profil.memberImg"} src={`/images/${memberInfo.memberSaveimg}`}
                                sx={{ width: 30, height: 30 }} />
                            <Typography fontWeight={500} variant="span">
                                {memberInfo.memberNickname}
                            </Typography>
                        </UserBox>
                        <hr />
                        <form onSubmit={onTalkOpened}>
                            <TextField fullWidth
                                label="얘기해요 모임명"
                                name="talkTitle"
                                value={insertTalkOp.talkTitle}
                                sx={{ mt: 3 }}
                                onChange={onChange}
                                placeholder="30자 이내로 작성"
                                required
                                autoFocus />
                            <TextField fullWidth
                                label="최대 참여인원"
                                type="number"
                                name="talkMax"
                                sx={{ mt: 3 }}
                                onChange={onChange}
                                required
                            />
                            <FormControl sx={{ mt: 2 }} fullWidth>
                                <InputLabel>모임 카테고리 선정</InputLabel>
                                <Select label="모임 카테고리 선정"
                                    name="talkCategory"
                                    value={insertTalkOp.talkCategory}
                                    onChange={onChange}
                                    required>
                                    <MenuItem value="문화·예술">문화·예술</MenuItem>
                                    <MenuItem value="운동·액티비티">운동·액티비티</MenuItem>
                                    <MenuItem value="요리·음식">요리·음식</MenuItem>
                                    <MenuItem value="여행">여행</MenuItem>
                                    <MenuItem value="성장·자기계발">성장·자기계발</MenuItem>
                                    <MenuItem value="공예·수공예">공예·수공예</MenuItem>
                                    <MenuItem value="게임·오락">게임·오락</MenuItem>
                                    <MenuItem value="기타">기타</MenuItem>
                                </Select>
                            </FormControl>
                            <div className="talkJoinStyle">
                                <FormControl sx={{ mt: 2, minWidth: 130 }}>
                                    <InputLabel className="talkTypeSt">가입유형</InputLabel>
                                    <Select label="가입유형" name="talkType"
                                        value={insertTalkOp.talkType}
                                        onChange={onChange}
                                        required>
                                        <MenuItem value="승인제"
                                            onClick={approveCheck}>승인제</MenuItem>
                                        <MenuItem value="선착순"
                                            onClick={otherCheck}>선착순</MenuItem>
                                    </Select>
                                </FormControl>
                                {showInquiry && <TextField label="가입질문"
                                    name="talkInquiry"
                                    value={insertTalkOp.talkInquiry}
                                    sx={{ mt: 3, float: "right", marginTop: 2, minWidth: 600 }}
                                    onChange={onChange} />}
                            </div>
                            <Stack>
                                <Typography variant="h7" sx={{ mt: 3 }}>대표사진을 넣어주세요
                                    <Button sx={{ ml: 4 }} variant="contained" component="label" size="large">
                                        Upload
                                        <TextField
                                            label="모임대표사진"
                                            type="file"
                                            accept="image/*"
                                            focused
                                            sx={{ mt: 3, display: "none" }}
                                            color="grey"
                                            onChange={onLoadFile}
                                            required
                                        />
                                    </Button>
                                    {/* &nbsp;&nbsp;
                                    <Button variant="contained" component="label" size="large"
                                        style={{
                                            backgroundColor: "gray",
                                            color: "white",
                                        }}
                                        onClick={() => deleteFileImage()}>
                                        Delete
                                    </Button> */}
                                </Typography>
                                <Box style={imgBoxStyle} className="img_box">
                                </Box>
                            </Stack>
                            <TextField fullWidth
                                label="모임을 소개해주세요"
                                name="talkContent"
                                sx={{ mt: 3 }}
                                onChange={onChange}
                                placeholder="5000자 이내로 작성"
                                multiline
                                required />
                            <TextField fullWidth
                                label="애기해요 태그"
                                name="talkTagContent"
                                sx={{ mt: 3 }}
                                onChange={onChange}
                                required />
                            <Typography sx={{ float: "right" }}>
                                <Button type="submit" variant={"contained"} sx={{ mt: 2, mr: 4 }}>개설하기</Button>
                                <Button href="/talk" variant={"contained"} sx={{ mt: 2 }}>취소</Button>
                            </Typography>
                        </form>
                    </Box>
                </Stack>
            }
        </>
    );
}

export default TalkOpened;
