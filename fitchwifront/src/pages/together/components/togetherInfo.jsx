import { Box, Stack } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TogetherJoin from "./togetherJoin";

const TogetherInfo = ({togetherJoinList}) => {
    useEffect(() => {
        getTogetherInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    let { togetherPageCode } = useParams()
    const [togetherInfo, setTogetherInfo] = useState({});
    const [togetherJoinMember, setTogetherJoinMember] = useState([])

    const getTogetherInfo = () => {
        axios.get("/getTogetherInfo", { params: { togetherPageCode: togetherPageCode } }).then((res) => setTogetherInfo(res.data))
    }


    return (
        <Stack
        flex={4} p={2}
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        spacing={2}
        >
            <h1>{togetherInfo.togetherTitle}</h1>
            <Box sx={{maxWidth:900}}>
                {
                    togetherInfo.togetherSaveimg&& (<Box 
                        component="img" 
                        sx={{ maxHeight:400 , textAlign:"center"}}
                        src={`/images/${togetherInfo.togetherSaveimg}`}
                        alt="green iguana"
                        ></Box>)
                }
            </Box>
            <h3>함께해요 소개</h3>
            <Box component="span">
                {togetherInfo.togetherContent}
            </Box>
            <h3>멤버 소개</h3>
            {togetherJoinList.length === 0 ? <Box component="span">현재 참여중인 멤버가 없습니다</Box> :
                togetherJoinList.map((data) =>  
                <Box key={data.togetherJoinCode}>
                    {data.memberEmail.memberName}
                </Box>
            )}
            <h3>안내사항</h3>
            <Box component="span">
            모집인원 : {togetherInfo.togetherMax}명 <br/>
            모집유형 : {togetherInfo.togetherType} <br/>
            1인당 부담금 : {togetherInfo.togetherPrice}원 <br/>
            모이는 일자 : {togetherInfo.togetherDate}<br/>
            모집일정 : {togetherInfo.togetherRecruitStartDate} 부터 {togetherInfo.togetherRecruitEndDate}까지<br/> 
            장소 : {togetherInfo.togetherPosition}
            </Box>
            <TogetherJoin togetherPageCode={togetherPageCode} togetherInfo= {togetherInfo}
         >
                참여하기
            </TogetherJoin>
        </Stack>    
    );
}

export default TogetherInfo;