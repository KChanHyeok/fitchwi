import React, { useCallback, useEffect, useState } from "react";
import TalkOpenedModal from "./TalkOpenedModal";
import "../styles/TalkOpenedModal.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Fab, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

function TalkOpened({ memberEmail, refreshTalkList }) {
    let formData = new FormData();
    const nav = useNavigate();
    const imgEl = document.querySelector(".talk_img_box");

    const [inputTalkOp, setInputTalkOp] = useState({
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
        talkOpenDate: `${new Date().getTime()}`,
    });

    const onChange = useCallback(
        (e) => {
            const inputTo = {
                ...inputTalkOp,
                [e.target.name]: e.target.value,
            };
            setInputTalkOp(inputTo);
        }, [inputTalkOp]);

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

    //작성 내용 전송 함수
    const onTalkOpened = (e) => {
        console.log(inputTalkOp);
        e.preventDefault();
        formData.append(
            "data",
            new Blob([JSON.stringify(inputTalkOp)],
                { type: "application/json" })
        );
        formData.append("uploadImage", fileForm[0]);

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };

        axios.post("/addTalk", formData, config)
            .then((res) => {
                if (res.data === "ok") {
                    setTalkOpened(false);
                    alert("개설 성공");
                    refreshTalkList();
                } else {
                    alert("개설 실패");
                }
            })
            .catch((error) => console.log(error));
    };

    //로그인 했을 때만 개설 가능하게 처리
    const insertTalkOp = () => {
        if (memberEmail === null) {
            alert("로그인이 필요한 서비스입니다.");
            nav("/login");
        } else {
            setTalkOpened(!talkOpened);
        }
    }

    //승인제일 경우 가입질문 disabled false 처리
    const onDisabled = (e) => {
        if (e.target.value === "승인제") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        // console.log(e.target.value);
    }

    const [disabled, setDisabled] = useState(true);

    //모달창
    const [talkOpened, setTalkOpened] = useState(false);

    return (
        <div>
            <Tooltip
                onClick={insertTalkOp}
                title="Add"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: { xs: "calc(50% - 25px)", md: 30 },
                }}
            >
                <Fab color="secondary" aria-label="add">
                    <AddIcon className="talkOpenedBtn" />
                </Fab>
            </Tooltip>
            {talkOpened && (
                <TalkOpenedModal closeModal={() => setTalkOpened(!talkOpened)}>
                    <form onSubmit={onTalkOpened}>
                        <div>얘기해요 개설하기</div>
                        <hr />
                        <TextField fullWidth label="얘기해요 모임명"
                            name="talkTitle" sx={{ mt: 3 }}
                            onChange={onChange}
                            autoFocus required />
                        <TextField fullWidth label="최대 참여인원"
                            type="number" name="talkMax" sx={{ mt: 3 }}
                            onChange={onChange}
                            required />
                        <FormControl sx={{ mt: 2 }} fullWidth>
                            <InputLabel>모임 카테고리 선정</InputLabel>
                            <Select label="모임 카테고리 선정"
                                name="talkCategory" value={inputTalkOp.talkCategory}
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
                            <span className="talkInput talkTypeSt">가입유형</span>
                            <span className="talkInput talkInqSt">가입질문</span>
                            <div>
                                <select onChange={onChange} onClick={onDisabled} name="talkType" required>
                                    <option value="">선택</option>
                                    <option value="승인제">승인제</option>
                                    <option value="선착순">선착순</option>
                                </select>
                                <input onChange={onChange} type="text" name="talkInquiry" className="talkInqSt"
                                    placeholder="가입 시 받을 질문을 작성하세요" disabled={disabled}></input>
                            </div>
                            {/* <FormControl sx={{ mt: 2, minWidth: 130, minHeight: 100 }}>
                                <InputLabel className="talkTypeSt">가입유형</InputLabel>
                                <Select label="가입유형" name="talkType"
                                    value={inputTalkOp.talkType}
                                    onChange={onChange} onClick={onDisabled}
                                    required>
                                    <MenuItem value="승인제">승인제</MenuItem>
                                    <MenuItem value="선착순">선착순</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField label="가입질문"
                                name="talkInquiry" sx={{ mt: 3 }}
                                onChange={onChange} disabled={disabled} /> */}
                        </div>
                        <p className="talkInput">애기해요 사진 첨부</p>
                        <div className="talk_img_box">
                            <img src="" alt="" />
                        </div>
                        <input type="file" name="talkImg"
                            onChange={onLoadFile}
                            multiple required></input>
                        <p className="talkInput">얘기해요 소개 말</p>
                        <textarea name="talkContent"
                            onChange={onChange}
                            placeholder="모임을 소개해주세요" required></textarea>
                        <p className="talkInput">애기해요 태그</p>
                        <input type="text" name="talkTagContent"
                            onChange={onChange} required></input>
                        <button type="submit">개설하기</button>
                    </form>
                </TalkOpenedModal>
            )}
        </div>
    );
}

export default TalkOpened;
