import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/TalkList.scss";

const TalkList = () => {
    const [talkList, setTalkList] = useState({});

    useEffect(() => {
        getTalkList();
    }, []);

    const getTalkList = () => {
        axios
            .get("/getAllTalkList")
            .then((res) => {
                setTalkList(res.data);
            })
            .catch((error) => console.log(error));
    };

    console.log(talkList);

    // let list = null;
    // if (talkList.length === 0) {
    //     list = (
    //         <div className="talkListShow">
    //             개설된 얘기해요가 없습니다.
    //         </div>
    //     );
    // }

    return (
        <>
            <div>
                전체출력
            </div>
            <div className="talkListShow">
                {/* {talkList[0].talkCode}
                {talkList[0].talkTitle}
                {talkList[0].talkContent} */}
            </div>
            <div className="talkListShow">
                dd
            </div>
            <div className="talkListShow">
                dd
            </div>
        </>
    )
}

export default TalkList;