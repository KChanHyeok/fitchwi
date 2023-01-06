import React, { useCallback, useEffect, useState } from "react";
import "../styles/TalkOpenedModal.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Stack, styled } from "@mui/system";

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

const imgBoxStyle = {
    marginTop: "20px",
    width: "300px",
    height: "200px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

function TalkOpened({ memberEmail, refreshTalkList }) {
    let formData = new FormData();
    const nav = useNavigate();
    const imgEl = document.querySelector(".talk_img_box");
    const location = useLocation();
    const nowdate = new Date().getFullYear() + "-"
        + ((new Date().getMonth() + 1) < 9 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-"
        + (new Date().getDate() < 9 ? "0" + new Date().getDate() : new Date().getDate());

    const [insertTalkOp, setInsertTalkOp] = useState({
        memberEmail: {
            memberEmail: memberEmail,
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
                setInsertTalkOp(location.state.talkInfo)
            }
        } catch (e) {

        }

        return () => preview();
    }, [location]);

    const preview = () => {
        if (!fileForm) return false;
        const render = new FileReader();
        render.readAsDataURL(fileForm[0])
        render.onload = () =>
            (imgEl.style.backgroundImage = `url(${render.result})`);
        ;
        console.log(render);
    };

    const onLoadFile = useCallback(
        (e) => {
            const file = e.target.files;
            setFileForm(file);
            console.log(e.target.file);
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

            <Stack height={800} flex={7} p={3}>
                <Box bgcolor="white" p={3} sx={{ mb: 5 }}>
                    <Typography variant="h6" textAlign="center">
                        얘기해요 개설
                    </Typography>
                    <UserBox>
                        <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant="span">
                            {sessionStorage.getItem("id")}
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
                            required
                            autoFocus />
                        <TextField fullWidth
                            label="최대 참여인원"
                            type="number"
                            name="talkMax"
                            value={insertTalkOp.talkMax}
                            sx={{ mt: 3 }}
                            onChange={onChange}
                        />
                        <FormControl sx={{ mt: 2 }} fullWidth>
                            <InputLabel>모임 카테고리 선정</InputLabel>
                            <Select label="모임 카테고리 선정"
                                name="talkCategory"
                                value={insertTalkOp.talkCategory}
                                onChange={onChange}
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
                        <div className="talkJoinStyle">
                            <FormControl sx={{ mt: 2, minWidth: 130, minHeight: 100 }}>
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
                                sx={{ mt: 3 }}
                                onChange={onChange} />}
                        </div>
                        <TextField fullWidth
                            label="얘기해요 대표 사진"
                            type="file"
                            name="talkImg"
                            sx={{ mt: 3 }}
                            onChange={onLoadFile}
                            color="grey"
                            focused
                        />
                        <div style={imgBoxStyle} className="talk_img_box">
                            <img src="" alt="" />
                        </div>
                        <TextField fullWidth
                            label="모임을 소개해주세요"
                            name="talkContent"
                            sx={{ mt: 3 }}
                            onChange={onChange}
                            multiline
                            required />
                        <TextField fullWidth
                            label="애기해요 태그"
                            name="talkTagContent"
                            sx={{ mt: 3 }}
                            onChange={onChange}
                            required />
                        <Button type="submit" variant={"contained"} sx={{ mt: 2, mr: 4 }}>개설하기</Button>
                        <Button href="/talk" variant={"contained"} sx={{ mt: 2 }}>취소</Button>
                    </form>
                </Box>
            </Stack>
        </>
    );
}

export default TalkOpened;
