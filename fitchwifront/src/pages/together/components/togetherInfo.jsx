import { Box, Stack, styled, Avatar, Typography, Button, TextField, CircularProgress, Grid, Chip } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TogetherJoin from "./togetherJoin";
import TogetherOpMenu from "./togetherOpMenu";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Container } from "@mui/system";
import { AssignmentTurnedIn } from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";


const TogetherInfo = ({ togetherJoinList, togetherList, refreshTogetherJoinList, refreshTogetherList, refreshTogetherTagList, togetherTagList }) => {
  let { togetherPageCode } = useParams();
  const [togetherInfo, setTogetherInfo] = useState(null);
  const [togetherJoinMember, setTogetherJoinMember] = useState(null);
  const [togetherAppliedMember, setTogetherAppliedMember] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    try {
    //   if (!togetherList || !togetherJoinList) {
        setTogetherInfo(togetherList.filter((data) => data.togetherCode === togetherPageCode * 1)[0]);
        setTogetherJoinMember(
          togetherJoinList.filter((data) => data.togetherCode.togetherCode === togetherPageCode * 1 && data.togetherJoinState === "가입중")
          );
          setTogetherAppliedMember(togetherJoinList.filter((data)=> data.togetherCode.togetherCode === togetherPageCode * 1));

    //   }
    } catch (e) {}
  }, [togetherList, togetherJoinList, togetherPageCode]);

  const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  });

  const onChange = () => {

  }
  
  return (
    <Stack sx={{width: 1000, height: 800, margin: "auto" }} flex={7} p={3}>
      {!togetherInfo || !togetherJoinMember || togetherTagList.length===0 ? (
        <Box
        textAlign="center" lineHeight={40}
        >
          <CircularProgress/>
        </Box>
      ) : (
        <Container>
            <Grid container direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography></Typography>
            {togetherInfo.togetherOpenedCode.memberEmail.memberEmail === sessionStorage.getItem("id") ? (
              <TogetherOpMenu
              togetherAppliedMember={togetherAppliedMember}
              togetherJoinMember={togetherJoinMember}
              refreshTogetherJoinList={refreshTogetherJoinList}
              refreshTogetherList={refreshTogetherList}
              togetherInfo={togetherInfo}
              sx={{ fontSize: 20}}
              />
              ) : null
            }
            </Grid>
            <Grid container alignItems="flex-end" >
              <Grid>
                <Chip
                  color="primary"
                  variant="outlined"
                  label={togetherInfo.togetherCategory}
                  size="small"
                  sx={{mb:1, fontSize:15, mr:2}}
                />
              </Grid>
              <Grid>
                <Box sx={{mb:0.2}}>
                  <PeopleIcon sx={{ color: "grey", fontSize:25}} />
                </Box>
              </Grid>
              <Grid>
                <Typography color="textSecondary" variant="caption" sx={{ fontSize:20, mr:1}}>
                  <b>{togetherInfo.togetherMemberCount + 1}/{togetherInfo.togetherMax}</b>
                </Typography >
              </Grid>
              <Grid>
                <Box sx={{mb:0.4}}>
                  <AssignmentTurnedIn sx={{ color: "grey", fontSize:22}} />
                </Box>
              </Grid>
              <Typography color="textSecondary" variant="caption" sx={{mb:0.6, fontSize: 15 }}>
                <b>
                  {togetherInfo.togetherType}
                </b>
              </Typography>
            </Grid>
            <Grid container>
              <Typography variant="h4" fontWeight="bold" sx={{mb:2}}>{togetherInfo.togetherTitle}</Typography>
            </Grid>
          <Box sx={{maxWidth:1000, mb:3, textAlign:"center"}}>
            {togetherInfo.togetherSaveimg && (
              <Box
                component="img"
                sx={{width:"70%", height:"50%", textAlign: "center" }}
                src={`/images/${togetherInfo.togetherSaveimg}`}
                alt="green iguana"
              ></Box>
            )}
          </Box>
          <Typography variant="h6" fontWeight="bold" pl={1} mb={1} sx={{borderLeft: "4px solid rgb(240, 59, 59)"}}>함께해요 소개</Typography>
          <Box component="span">{togetherInfo.togetherContent}</Box>
          <Box sx={{ mt: 5, mb: 1 }}>
            <Typography variant="h6" fontWeight="bold" pl={1}  sx={{borderLeft: "4px solid rgb(240, 59, 59)"}}>방장</Typography>
            <br />
            <UserBox p={2}>
              <Avatar
                component={Link}
                to={"/memberpage"}
                state={{ memberId: togetherInfo.togetherOpenedCode.memberEmail.memberEmail }}
                src={`${togetherInfo.togetherOpenedCode.memberEmail.memberSaveimg}`}
                alt={"profil.memberImg"}
                sx={{ width: 30, height: 30 }}
              />
              <Typography fontWeight={500} variant="span">
                {!togetherInfo.togetherOpenedCode.memberEmail.memberNickname
                  ? togetherInfo.togetherOpenedCode.memberEmail.memberEmail
                  : togetherInfo.togetherOpenedCode.memberEmail.memberNickname}
                님
              </Typography>
            </UserBox>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" pl={1} mb={1}  sx={{borderLeft: "4px solid rgb(240, 59, 59)"}}>참여중인 회원</Typography>
            {togetherJoinMember.length === 0 ? (
              <Box component="span">현재 참여중인 멤버가 없습니다</Box>
            ) : (
              togetherJoinMember.map((data) => (
                <UserBox key={data.togetherJoinCode} p={2}>
                  <Avatar
                    component={Link}
                    to={"/memberpage"}
                    state={{ memberId: data.memberEmail.memberEmail}}
                    src={data.memberEmail.memberSaveimg}
                    alt={"profil.memberImg"}
                    sx={{ width: 30, height: 30 }} />
                  <Typography fontWeight={500} variant="span">
                    {!data.memberEmail.memberNickname ? data.memberEmail.memberEmail : data.memberEmail.memberNickname}님
                  </Typography>
                </UserBox>
              ))
            )}
          </Box>
          <Box sx={{mb:2}}>
            <Typography variant="h6" fontWeight="bold" pl={1} mb={1} sx={{ borderLeft: "4px solid rgb(240, 59, 59)" }}>태그</Typography>
            <Typography variant="span" p={2}>
                {togetherTagList.length===0 ? "입력된 태그정보가 없습니다" : togetherTagList.filter(data => data.togetherCode.togetherCode === togetherInfo.togetherCode)[0].togetherTagContent.split(" ").map(data =>
                  <Chip
                    key={data}
                    onClick={() => nav(`/search/${data}`)}  
                    color="primary"
                    variant="outlined"
                    label={data}
                    size="small"
                    sx={{mb:1, fontSize:15, mr:2}}
                />)}
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight="bold" pl={1} mb={1}  sx={{borderLeft: "4px solid rgb(240, 59, 59)"}}>1인당 부담금</Typography>
            {togetherInfo.togetherPrice + togetherInfo.togetherOpenedCode.facilitiesCode.facilitiesPrice<=0 ? <Typography variant="span" p={2} mb={1}>무료</Typography> : <Typography variant="span" p={2}>{(togetherInfo.togetherPrice + togetherInfo.togetherOpenedCode.facilitiesCode.facilitiesPrice).toLocaleString()+" 원 (시설1인비용 포함)"}</Typography>} <br />
              
            {!togetherJoinList.filter(
                  (data) =>
                    data.togetherCode.togetherCode === togetherPageCode * 1 &&
                    data.memberEmail.memberEmail === sessionStorage.getItem("id")
          )[0] ? "" :
            <Box mt={2}>
              <Typography variant="h6" fontWeight="bold" pl={1} mb={1} sx={{ borderLeft: "4px solid rgb(240, 59, 59)" }}>방장연락처</Typography>  
              <Typography variant="span" p={2}>
                {togetherInfo.togetherOpenedCode.memberEmail.memberPhone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
              </Typography>
            </Box>  
            }  
            <Box mt={2}>
              <Typography variant="h6" fontWeight="bold" pl={1} mb={1} sx={{ borderLeft: "4px solid rgb(240, 59, 59)" }}>장소</Typography>  
              <Typography variant="span" p={2}>
                {togetherInfo.togetherPosition}
              </Typography>
            </Box>
            <Stack 
              sx={{mt:3}}
              direction="row"
              justifyContent="space-between"  
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box>
                <Typography variant="h6" fontWeight="bold" pl={1}  sx={{borderLeft: "4px solid rgb(240, 59, 59)"}}>
                모집일정
                </Typography> 
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  label="모집"
                  disablePast    
                  value={togetherInfo.togetherDate || '2022-01-10'}
                  renderInput={(params) => <TextField {...params} />}    
                  onChange={onChange}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" pl={1}  sx={{borderLeft: "4px solid rgb(240, 59, 59)"}}>
                  모집시작기간
                  </Typography>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    label="시작"
                    disablePast
                    value={togetherInfo.togetherRecruitStartDate || '2022-01-10'}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={onChange}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" pl={1}  sx={{borderLeft: "4px solid rgb(240, 59, 59)"}}>
                  모집마감기간
                  </Typography>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    label="종료"
                    disablePast  
                    value={togetherInfo.togetherRecruitEndDate || '2022-01-10'}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={onChange}
                    />
                </Box>
              </LocalizationProvider>
            </Stack>
            <Box sx={{ mt: 2 }}>
            {togetherInfo.togetherOpenedCode.memberEmail.memberEmail === sessionStorage.getItem("id") ? (
              <TogetherJoin
                togetherPayState={togetherInfo.togetherState}
                togetherPageCode={togetherPageCode}
                togetherInfo={togetherInfo}
                togetherJoinMember={togetherJoinMember}
                refreshTogetherList={refreshTogetherList}
              >
                최종결제 
              </TogetherJoin>
            ) : togetherJoinList.filter(
                (data) =>
                data.togetherCode.togetherCode === togetherPageCode * 1 &&
                data.memberEmail.memberEmail === sessionStorage.getItem("id")
              ).length === 0 && togetherInfo.togetherState==="결제대기중" ? (
              <TogetherJoin
                refreshTogetherJoinList={refreshTogetherJoinList}
                togetherPageCode={togetherPageCode}
                togetherInfo={togetherInfo}
              >
                참여신청하기
              </TogetherJoin>
            ) : togetherInfo.togetherState==="결제완료" ? <Button disabled variant="contained" sx={{width:"100%", mb:3}}>마감</Button>: (
              <TogetherJoin
                togetherJoinState={
                  togetherJoinList.filter(
                    (data) =>
                      data.togetherCode.togetherCode === togetherPageCode * 1 &&
                      data.memberEmail.memberEmail === sessionStorage.getItem("id")
                  )[0].togetherJoinState
                }
                refreshTogetherJoinList={refreshTogetherJoinList}
                togetherPageCode={togetherPageCode}
                togetherInfo={togetherInfo}
              />
            )}
          </Box>
        </Container>
      )}
    </Stack>
  );
};

export default TogetherInfo;
