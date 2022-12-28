import { Box, Stack, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TogetherJoin from "./togetherJoin";

const TogetherInfo = ({togetherJoinList, togetherList, refreshTogetherJoinList}) => {
    
    let { togetherPageCode } = useParams()
    const [togetherInfo, setTogetherInfo] = useState(null);
    const [togetherJoinMember, setTogetherJoinMember] = useState(null);

    useEffect(()=> {
        setTogetherInfo(togetherList.filter(data => data.togetherCode === (togetherPageCode*1))[0])
        setTogetherJoinMember(togetherJoinList.filter(data=>(data.togetherCode.togetherCode===(togetherPageCode*1) && data.togetherJoinState==="가입중")))
    },[togetherJoinList, togetherList, togetherPageCode])
    
    return (
        <Stack
        flex={4} p={2}
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        spacing={2}
        >
            { !togetherInfo || !togetherJoinMember ? (<h1>로딩중</h1>) : 
            (
            <Box>
                <Stack flex={2} direction={"row"}>
                    <h1>{togetherInfo.togetherTitle}</h1>
                    {togetherInfo.togetherOpenedCode.memberEmail.memberEmail===sessionStorage.getItem("id") ? <Button sx={{fontSize:20,ml:60}}>설정</Button>:null}
                </Stack>
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
            <Box sx={{mt:2, mb:2}}>
                <h3>멤버 소개</h3><br/>
                <h4>방장</h4>
                {!togetherInfo.togetherOpenedCode.memberEmail.memberNickname ? togetherInfo.togetherOpenedCode.memberEmail.memberEmail : togetherInfo.togetherOpenedCode.memberEmail.memberNickname}님
            </Box>
            <Box sx={{mb:2}}>
                <h4>참여중인 회원</h4>
                {togetherJoinMember.length === 0 ? <Box component="span">현재 참여중인 멤버가 없습니다</Box> :
                togetherJoinMember.map((data) =>  
                <Box key={data.togetherJoinCode}>
                    {!data.memberEmail.memberNickname ? data.memberEmail.memberEmail:data.memberEmail.memberNickname}
                </Box>
                )}
            </Box>
            <h3>안내사항</h3>
            <Box component="span">
                모집인원 : {togetherInfo.togetherMax}명 <br/>
                모집유형 : {togetherInfo.togetherType} <br/>
                1인당 부담금 : {togetherInfo.togetherPrice + togetherInfo.togetherOpenedCode.facilitiesCode.facilitiesPrice }원 <br/>
                모이는 일자 : {togetherInfo.togetherDate}<br/>
                모집일정 : {togetherInfo.togetherRecruitStartDate} 부터 {togetherInfo.togetherRecruitEndDate}까지<br/> 
                장소 : {togetherInfo.togetherPosition}
            </Box>
                <Box sx={{mt:2}}>
                {
                togetherInfo.togetherOpenedCode.memberEmail.memberEmail===sessionStorage.getItem("id") ? <TogetherJoin togetherPayState={togetherInfo.togetherState} togetherPageCode={togetherPageCode} togetherInfo= {togetherInfo} togetherJoinMember={togetherJoinMember} >최종결제</TogetherJoin>
                : togetherJoinList.filter(data=>data.memberEmail.memberEmail===sessionStorage.getItem("id")).length===0 ? <TogetherJoin refreshTogetherJoinList={refreshTogetherJoinList} togetherPageCode={togetherPageCode} togetherInfo={togetherInfo}>참여신청하기</TogetherJoin> 
                : <TogetherJoin  togetherJoinState={togetherJoinList.filter(data=>data.memberEmail.memberEmail===sessionStorage.getItem("id"))[0].togetherJoinState} refreshTogetherJoinList={refreshTogetherJoinList} togetherPageCode={togetherPageCode} togetherInfo= {togetherInfo}/>
                }
                </Box>
            </Box>)}
        </Stack>    
    );
}

export default TogetherInfo;