import React, { useCallback, useEffect, useState } from "react";
import TalkOpenedModal from "./TalkOpenedModal";
import "../styles/TalkOpenedModal.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TalkOpened(props) {
    let formData = new FormData();
    const nav = useNavigate();
    const id = sessionStorage.getItem("memberEmail");

    const [inputTalkOp, setInputTalkOp] = useState({
        memberEmail: id,
        talkTitle: "",
        talkMax: 0,
        talkCategory: "",
        talkType: "",
        talkContent: "",
        talkTagContent: "",
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
        const imgEl = document.querySelector(".talk_img_box");
        const render = new FileReader();

        render.onload = () =>
            (imgEl.style.backgroundImage = `url(${render.result})`);
        render.readAsDataURL(fileForm[0]);
        //console.log(render);
    };

    const onLoadFile = useCallback(
        (e) => {
            const files = e.target.files;
            setFileForm(files);
            console.log(e.target.files);
        }, []);

    //작성 내용 전송 함수
    const onTalkOpened = (e) => {
        e.preventDefault();
        formData.append(
            "data",
            new Blob([JSON.stringify(inputTalkOp)], { type: "application/json" })
        );
        formData.append("uploadImage", fileForm[0]);

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };

        axios.post("/addTalk", formData, config).then((res) => {
            if (res.data === "ok") {
                alert("개설 성공");
                nav("/talk");
            } else {
                alert("개설 실패");
            }
        })
            .catch((error) => console.log(error));
    };

    //모달창
    const [talkOpened, setTalkOpened] = useState(false);

    return (
        <div className="Main">
            <input type="button" value="애기해요 개설" className="talkOpenedBtn"
                onClick={() => setTalkOpened(!talkOpened)} />
            {talkOpened && (
                <TalkOpenedModal closeModal={() => setTalkOpened(!talkOpened)}>
                    <div>얘기해요 개설하기</div>
                    <hr />
                    <p className="talkInput">얘기해요 명</p>
                    <input type="text" name="talkTitle"
                        onChange={onChange}
                        placeholder="모임 명을 입력하세요"
                        autoFocus required></input>
                    <p className="talkInput">최대 참여인원</p>
                    <input type="number" name="talkMax"
                        onChange={onChange}
                        placeholder="숫자만 입력하세요"
                        required></input>
                    <p className="talkInput">모임 카테고리 선정</p>
                    <select onChange={onChange} name="talkCategory" required>
                        <option value="">카테고리</option>
                        <option value="문화∙예술">문화∙예술</option>
                        <option value="운동∙액티비티">운동∙액티비티</option>
                        <option value="요리∙음식">요리∙음식</option>
                        <option value="여행">여행</option>
                        <option value="성장∙자기계발">성장∙자기계발</option>
                        <option value="공예∙수공예">공예∙수공예</option>
                        <option value="게임∙오락">게임∙오락</option>
                        <option value="기타">기타</option>
                    </select>
                    <p className="talkInput">가입유형</p>
                    <select onChange={onChange} name="talkType" required>
                        <option value="">선택</option>
                        <option value="승인제">승인제</option>
                        <option value="선착순">선착순</option>
                    </select>
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
                    <button onClick={onTalkOpened}>개설하기</button>
                </TalkOpenedModal>
            )}
        </div>
    );
}

export default TalkOpened;
