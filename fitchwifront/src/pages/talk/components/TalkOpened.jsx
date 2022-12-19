import React, { useCallback, useState } from "react";
import TalkOpenedModal from "./TalkOpenedModal";
import "../styles/TalkOpenedModal.scss";
import axios from "axios";

function TalkOpened(props) {
    const [inputTalkOp, setInputTalkOp] = useState({
        talkTitle: "",
        talkmax: 0,
        talkcategory: "",
        talkType: "",
        talkcontent: "",
        talkTagContent: ""
    });


    const onChange = useCallback(
        (e) => {
            const inputTo = {
                ...inputTalkOp,
                [e.target.name]: e.target.value,
            };
            setInputTalkOp(inputTo);
            console.log(e.target.value);
        }, [inputTalkOp])

    //작성 내용 전송 함수
    // const onTalkOpened = useCallback(
    //     (e) => {
    //         axios
    //             .post("addTalk",)
    //     }
    // )

    // const [File, setFile] = useState("");

    // const uploadFile = useCallback(
    //     (e) => {
    //         const files = e.target.files;
    //         setFile(files);
    //     }
    // )

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
                    <select onChange={onChange} required>
                        <option value="category" name="talkCategory">카테고리</option>
                        <option value="cultureArt" name="talkCategory">문화∙예술</option>
                        <option value="exercise" name="talkCategory">운동∙액티비티</option>
                        <option value="cookFood" name="talkCategory">요리∙음식</option>
                        <option value="travel" name="talkCategory">여행</option>
                        <option value="grow" name="talkCategory">성장∙자기계발</option>
                        <option value="crafts" name="talkCategory">공예∙수공예</option>
                        <option value="game" name="talkCategory">게임∙오락</option>
                        <option value="etc" name="talkCategory">기타</option>
                    </select>
                    <p className="talkInput">가입유형</p>
                    <select onChange={onChange} required>
                        <option value="approve" name="talkType">승인제</option>
                        <option value="fcfs" name="talkType">선착순</option>
                    </select>
                    <p className="talkInput">애기해요 사진 첨부</p>
                    <input type="file" name="talkImg"
                        // onChange={uploadFile}
                        multiple required></input>
                    <p className="talkInput">얘기해요 소개 말</p>
                    <textarea name="talkContent"
                        onChange={onChange}
                        placeholder="모임을 소개해주세요" required></textarea>
                    <p className="talkInput">애기해요 태그</p>
                    <input type="text" name="talkTagContent"
                        onChange={onChange} required></input>
                    <button>개설하기</button> {/*onSubmit={onTalkOpened}*/}
                </TalkOpenedModal>
            )}
        </div>
    );
}

export default TalkOpened;
