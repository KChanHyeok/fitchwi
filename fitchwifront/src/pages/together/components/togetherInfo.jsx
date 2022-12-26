// import axios from "axios";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const TogetherInfo = () => {

    let { togetherPageCode } = useParams()

    axios.get("/getTogetherInfo", { params: { togetherPageCode: togetherPageCode } }).then((res) => console.log(res.data))


    return (
        <div>
            
        </div>
    );
}

export default TogetherInfo;