import React, { useCallback, useEffect, useState } from "react";
import "../styles/TalkOpenedModal.scss";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Stack, styled } from "@mui/system";
import "../styles/TalkInfo.scss";

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

const imgBoxStyle2 = {
    width: "300px",
    height: "200px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

function TalkUpdate({ memberEmail, talkList, refreshTalkList, refreshTalkTagList }) {
    let formData = new FormData();
    const nav = useNavigate();
    const imgEl = document.querySelector(".talk_img_box");

    const [updateTalk, setUpdateTalk] = useState({});
    const [updateTalkTag, setUpdateTalkTag] = useState({});

    const { state } = useLocation();

    useEffect(() => {
        preview();
        try {
            setUpdateTalk(state.talkInfo);
            setUpdateTalkTag(state.talkTagInfo);
        } catch (e) {

        }
        return () => preview();
    }, []);

    const onChange = useCallback(
        (e) => {
            setUpdateTalk({
                ...updateTalk,
                [e.target.name]: e.target.value,
            });
            setUpdateTalkTag({
                ...updateTalkTag,
                [e.target.name]: e.target.value,
            })
        }, [updateTalk, updateTalkTag]
    );
    console.log(updateTalk);
    console.log(updateTalkTag);

    //파일 업로드
    const [fileForm, setFileForm] = useState("");

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

    //talk 수정
    const onTalkUpdate = (e) => {
        e.preventDefault();

        formData.append("data", new Blob([JSON.stringify(updateTalk)],
            { type: "application/json" }));
        formData.append("uploadImage", fileForm[0]);
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        // console.log(updateTalk);
        // console.log(updateTalkTag);

        axios
            .post("/updateTalk", formData, config)
            .then((res) => {
                if (res.data === "ok") {
                    alert("수정 성공");
                    nav(`/talk/${updateTalk.talkCode}`);
                    refreshTalkList();
                    setUpdateTalk({});
                } else {
                    alert("수정 실패");
                }
            })
            .catch((error) => console.log(error));
    }

    //talk 태그 수정
    const onTalkTagUpdate = (e) => {
        e.preventDefault();
        formData.append("data", new Blob([JSON.stringify(updateTalkTag)],
            { type: "application/json" }));
        axios.post("/updateTalkTag", formData)
            .then((res) => {
                if (res.data === "ok") {
                    alert("태그 저장 성공");
                    refreshTalkTagList();
                } else {
                    alert("태그 저장 실패");
                }
            })
            .catch((error) => console.log(error));
    }

    const [showInquiry, setShowInquiry] = useState(false);

    const approveCheck = () => {
        setShowInquiry(true);
    }

    const otherCheck = () => {
        setShowInquiry(false);
    }

    console.log(updateTalk.talkType);

    return (
        <>
            <Stack sx={{ width: 800, height: 800, margin: "auto" }} flex={7} p={3}>
                <Box bgcolor="white" p={3} sx={{ mb: 5 }}>
                    <Typography variant="h6" textAlign="center">
                        얘기해요 수정
                    </Typography>
                    <UserBox>
                        <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant="span">
                            {sessionStorage.getItem("id")}
                        </Typography>
                    </UserBox>
                    <hr />
                    <form onSubmit={onTalkUpdate}>
                        <TextField fullWidth
                            label="얘기해요 모임명(30자 이내)"
                            name="talkTitle"
                            value={updateTalk.talkTitle || ""}
                            sx={{ mt: 3 }}
                            onChange={onChange}
                        />
                        <TextField fullWidth
                            label="최대 참여인원"
                            type="number"
                            name="talkMax"
                            value={updateTalk.talkMax || ""}
                            sx={{ mt: 3 }}
                            onChange={onChange}
                        />
                        <FormControl sx={{ mt: 2 }} fullWidth>
                            <InputLabel>모임 카테고리 선정</InputLabel>
                            <Select label="모임 카테고리 선정"
                                name="talkCategory"
                                value={updateTalk.talkCategory || ""}
                                onChange={onChange}
                            >
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
                        <div>
                            <FormControl sx={{ mt: 2, minWidth: 130, minHeight: 100 }}>
                                <InputLabel className="talkTypeSt">가입유형</InputLabel>
                                <Select label="가입유형" name="talkType"
                                    value={updateTalk.talkType || ""}
                                    onChange={onChange}
                                >
                                    <MenuItem value="승인제"
                                        onClick={approveCheck}>승인제</MenuItem>
                                    <MenuItem value="선착순"
                                        onClick={otherCheck}>선착순</MenuItem>
                                </Select>
                            </FormControl>
                            {updateTalk.talkType === "승인제" ?
                                <TextField
                                    label="가입질문"
                                    name="talkInquiry"
                                    value={updateTalk.talkInquiry || ""}
                                    sx={{ mt: 3, float: "right", marginTop: 2, minWidth: 600 }}
                                    onChange={onChange} />
                                : <div></div>}
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
                            <img style={imgBoxStyle2} src={"/images/" + updateTalk.talkSaveimg} alt={updateTalk.talkImg} />
                        </div>
                        <TextField fullWidth
                            label="모임을 소개해주세요"
                            name="talkContent"
                            value={updateTalk.talkContent || ""}
                            sx={{ mt: 3 }}
                            onChange={onChange}
                            multiline />
                        {!updateTalkTag ? <p>d</p>
                            : <TextField fullWidth
                                label="애기해요 태그"
                                name="talkTagContent"
                                value={updateTalkTag.talkTagContent || ""}
                                sx={{ mt: 3 }}
                                onChange={onChange}
                            />}

                        <Typography sx={{ float: "right" }}>
                            <Button onClick={onTalkTagUpdate} variant={"contained"} sx={{ mt: 2, mr: 4 }}>태그 저장</Button>
                            <Button type="submit" variant={"contained"} sx={{ mt: 2, mr: 4 }}>수정하기</Button>
                            <Link to={`/talk/${updateTalk.talkCode}`} style={{ textDecoration: 'none' }}>
                                <Button variant={"contained"} sx={{ mt: 2 }}>취소</Button>
                            </Link>
                        </Typography>
                    </form>
                </Box>
            </Stack >
        </>
    );
}

export default TalkUpdate;
