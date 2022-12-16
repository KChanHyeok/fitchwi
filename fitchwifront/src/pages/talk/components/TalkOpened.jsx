import React, { useState } from "react";
import TalkOpenedModal from "./TalkOpenedModal";
import "../styles/TalkOpenedModal.scss";

function TalkOpened(props) {
    const [ talkOpened, setTalkOpened ] = useState(false);

    return (
        <div className="Main">
            <input type="button" value="애기해요 개설" className="talkOpenedBtn"
            onClick={() => setTalkOpened(!talkOpened)} />
            {talkOpened && (
                <TalkOpenedModal closeModal={() => setTalkOpened(!talkOpened)}>
                    <div>얘기해요 개설하기</div>
                    <hr />
                    <p className="talkInput">얘기해요 명</p>
                    <input type="text"
                    placeholder="모임 명을 입력하세요"
                    autoFocus required></input>
                    <p className="talkInput">최대 참여인원</p>
                    <input type="text"
                    placeholder="숫자만 입력하세요"
                    required></input>
                    <p className="talkInput">모임 카테고리 선정</p>
                    <select>
                        <option value="category">카테고리</option>
                        <option value="cultureArt">문화∙예술</option>
                        <option value="exercise">운동∙액티비티</option>
                        <option value="cookFood">요리∙음식</option>
                        <option value="travel">여행</option>
                        <option value="grow">성장∙자기계발</option>
                        <option value="crafts">공예∙수공예</option>
                        <option value="game">게임∙오락</option>
                        <option value="etc">기타</option>
                    </select>
                    <p className="talkInput">가입유형</p>
                        <select>
                            <option value="approve">승인제</option>
                            <option value="fcfs">선착순</option>
                        </select>
                    <p className="talkInput">애기해요 사진 첨부</p>
                    <input type="file" name="talkimg" multiple></input>
                    <p className="talkInput">얘기해요 소개 말</p>
                    <textarea placeholder="모임을 소개해주세요"></textarea>
                    <p className="talkInput">애기해요 태그</p>
                    <button>개설하기</button>
                </TalkOpenedModal>
            )}
        </div>
    );
}

export default TalkOpened;
