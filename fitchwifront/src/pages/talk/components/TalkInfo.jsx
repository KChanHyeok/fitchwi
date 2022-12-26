import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/TalkInfo.scss";

const TalkInfo = () => {
    let { talkCode } = useParams();
    console.log(talkCode);

    axios.get("/getTalk", { params: { talkCode: talkCode } })
        .then((res) => console.log(res.data));


    return (
        <div className="talkDetail">
            <p>{ }</p>
            {/* <div>
                <div className="header">
                    <span>mbti 취미</span>
                    <span>카테고리</span>
                    <span>남은 자리 0/9</span>
                    <div className="talkOpMenu">
                        <TalkOpMenu />
                    </div>
                </div>
                <div className="section">
                    <div>
                        <span className="talkTitle"><b>얘기해요 모임명</b></span>
                        <span className="reportBtn">신고하기</span>
                        <p>이미지</p>
                    </div>
                    <p>멤버소개</p>
                    <p>방장</p>
                    <div>얘기해요 피드</div>
                </div>
            </div> */}
        </div>

    )

}

export default TalkInfo;
