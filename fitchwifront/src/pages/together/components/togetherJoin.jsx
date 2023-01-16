import { Avatar, Button, Modal, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const TogetherJoin = ({children, togetherInfo, refreshTogetherJoinList, togetherJoinState, togetherPayState, togetherJoinMember, refreshTogetherList}) => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp54355175");

    useEffect(()=> {
        if(sessionStorage.getItem("id")) {
          getMemberInfo(sessionStorage.getItem("id"))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const getMemberInfo = (id) => {
        axios.get("/getMemberInfo", { params: { userId: id } }).then((res) =>setInsertFrom({...insertForm,memberEmail: res.data}))
        .catch((error)=> console.log(error))
    }

    const nav = useNavigate();
    const nowdate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    const [insertForm,setInsertFrom] = useState({
        togetherJoinDate: nowdate,
        togetherJoinAnswer: "",
        togetherCode: togetherInfo,
        memberEmail: {
            memberEmail: sessionStorage.getItem("id")
        }
    })
    const [open, setOpen] = React.useState(false);
    const [disabled,setdisabled] = useState(true);
    const handleOpen = () => {
        if(!sessionStorage.getItem("id")) {
            swAlert("로그인이 필요한 서비스입니다.", "warning")
            nav("/login");
            return
        }
        if (togetherInfo.togetherRecruitStartDate > moment().format("YYYY-MM-DD")) {
            setOpen(false)
            swAlert("아직 모집 기간이 아닙니다","warning");
            return 
            
        }
        if(togetherInfo.togetherRecruitEndDate<moment().format("YYYY-MM-DD")){
            setOpen(false)
            swAlert("이미 지난 기간입니다.", "warning")
            return 
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "white",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };
      const UserBox = styled(Box)({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
      });

      const handleChange = (e) => {
        const insertObj = {
            ...insertForm,
            togetherCode: togetherInfo,
            [e.target.name] : e.target.value,
        }
        if(insertObj.togetherJoinAnswer.length!==0) 
        {
            setdisabled(false)
        }else {
            setdisabled(true)
        }
        setInsertFrom(insertObj);
      }
      const togetherJoinSend = (e) => {
        e.preventDefault();        

        if (togetherInfo.togetherRecruitStartDate > moment().format("YYYY-MM-DD")) {
            setOpen(false)
            swAlert("아직 모집 기간이 아닙니다","warning");
            return 
            
        }
        if(togetherInfo.togetherRecruitEndDate<moment().format("YYYY-MM-DD")){
            setOpen(false)
            swAlert("이미 지난 기간입니다.", "warning")
            return 
        }

        if(togetherInfo.togetherPrice===0 && togetherInfo.togetherOpenedCode.facilitiesCode.facilitiesPrice===0) {
            setOpen(false);
            insertTogetherFreeJoinInfo();
        }else {
            requestJoinPay()
        }
        }

      const requestJoinPay = () => {
        IMP.request_pay({ // param
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: 'merchant_' + new Date().getTime(),
          name: togetherInfo.togetherTitle,
          amount: 100,
          buyer_email: sessionStorage.getItem("id"),
          buyer_name: (insertForm.memberEmail.memberName),
          buyer_tel: (insertForm.memberEmail.memberPhone),
          buyer_addr: (insertForm.memberEmail.memberAddr),
          buyer_postcode: "01181"
        }, rsp => { // callback
          if (rsp.success) {
            const insertPayForm = {
                togetherJoinPayCode: rsp.merchant_uid,
                togetherJoinCode: insertForm,
                togetherJoinImp: rsp.imp_uid,
                togetherJoinPayPrice: rsp.paid_amount,
                togetherJoinPayMethod: rsp.pay_method,
                togetherJoinPayStatus: "",
            }
            
            axios.post("/insertTogetherPayJoinInfo", insertPayForm)
              .then((res) => {
                if(res.data==="가입 성공" || res.data==="가입신청 성공"){
                    setOpen(false);
                    swAlert(res.data,"success",()=> {
                        window.location.reload();
                    });
                }else {
                    swAlert(res.data, "warning",()=>{
                        window.location.reload();
                    });
                }
              })
              .catch((Error) => console.log(Error))
          } else {
            swAlert("결제실패","warning")
          }
        });
    }

    const finalPayment = () => {
        if (togetherInfo.togetherPrice === 0 && togetherInfo.togetherOpenedCode.facilitiesCode.facilitiesPrice === 0) {
            setOpen(false);
            insertTogetherFreeInfo();
        } else {
            requestLastPay()
        }
    }

     const requestLastPay = () => {
        IMP.request_pay({ // param
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: 'merchant_' + new Date().getTime(),
          name: togetherInfo.togetherTitle,
          amount: 100,
          buyer_email: sessionStorage.getItem("id"),
          buyer_name: (insertForm.memberEmail.memberName),
          buyer_tel: (insertForm.memberEmail.memberPhone),
          buyer_addr: (insertForm.memberEmail.memberAddr),
          buyer_postcode: "01181"
        }, rsp => { // callback
          if (rsp.success) {
            const insertPayForm = {
                togetherPayCode: rsp.merchant_uid,
                togetherImp: rsp.imp_uid,
                togetherCode: insertForm.togetherCode,
                togetherPayPrice: rsp.paid_amount,
                togetherPayMethod: rsp.pay_method,
                togetherPayStatus: "",
            }
            
            axios.post("/insertTogetherPay", insertPayForm)
              .then((res) => {
                  setOpen(false);
                  swAlert(res.data,"success",()=> {
                    window.location.reload();
                  });
              })
              .catch((Error) => console.log(Error))
          } else {
            swAlert("결제실패","warning");
          }
        });
    }
    const insertTogetherFreeInfo = () => {
        axios.post("/insertTogetherFreeInfo", insertForm.togetherCode)
            .then((res) => {
                setOpen(false);
                swAlert(res.data,"success",()=> {
                    window.location.reload();
                });
        })
    }

    const insertTogetherFreeJoinInfo = () => {
        if(!sessionStorage.getItem("id")) {
            swAlert("로그인이 필요한 서비스입니다.","warning")
            nav("/login");
        }
        axios.post("/insertTogetherFreeJoinInfo", insertForm)
              .then((res) => {
                  setOpen(false);
                  swAlert(res.data,"success",()=>{
                      window.location.reload();
                  });
              })
              .catch((Error) => console.log(Error))
    }

    
      const deleteTogetherPayJoinInfo = (e) => {
        // e.preventDefault();
            setOpen(false);
            axios.delete("/deleteTogetherPayJoinInfo", { params : { memberEmail: sessionStorage.getItem("id"), togetherCode: togetherInfo.togetherCode}})
            .then((res) => {
                swAlert(res.data,"success");
                window.location.reload();
            }).catch((error)=> console.log(error))
      }

      const deleteTogetherFreeJoinInfo = (e) => {
        // e.preventDefault();
            setOpen(false);
            axios.delete("/deleteTogetherFreeJoinInfo", { params : { memberEmail: sessionStorage.getItem("id"), togetherCode: togetherInfo.togetherCode}})
            .then((res) => {
                swAlert(res.data,"success",()=>{
                    window.location.reload();
                });
            }).catch((error)=> console.log(error))
      }

      const swAlert = (contentText, icon, func ) => {
        Swal.fire({
          title: "알림",
          text: contentText,
          icon: icon,
          confirmButtonText: "확인",
          confirmButtonColor: "#ff0456",
        }).then(func);
      };

    return (
        <>
            { togetherJoinState==="대기" ? <Button onClick={handleOpen} sx={{width:"100%", mb:3}} variant={"contained"} >신청취소</Button>:
            togetherJoinState==="거절" ? <Button variant={"contained"} sx={{width:"100%", mb:3}} disabled>신청이 거절되었습니다.</Button>:
            togetherJoinState==="가입중" ? <Button onClick={handleOpen} sx={{width:"100%", mb:3}} variant={"contained"} >참여취소하기</Button>:
            togetherPayState === "결제완료" ? <Button variant={"contained"} sx={{ width: "100%", mb: 3 }} disabled>결제가 완료되었습니다.</Button> :
            togetherPayState ==="삭제신청중" ? <Button variant={"contained"} sx={{ width: "100%", mb: 3 }} disabled>삭제 대기중입니다.</Button> :
            <Button onClick={handleOpen} variant={"contained"} sx={{width:"100%", mb:3}} >{children}</Button>
            }
            <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            >
                {togetherJoinState==="대기" ? 
                <Box sx={style} component="form">
                    <UserBox>
                        <Avatar src={insertForm.memberEmail.memberSaveimg} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant="span">
                        {sessionStorage.getItem("nickName")}
                        </Typography>
                    </UserBox>
                    <hr/>
                    <Typography sx={{ mt: 2, mb:2 }} variant="h6" component="div"> {/*질문*/}
                        환불 및 신청을 취소하시겠습니까?
                    </Typography>
                    {togetherInfo.togetherPrice === 0 && togetherInfo.togetherOpenedCode.facilitiesCode.facilitiesPrice===0? <Button variant="contained" onClick={deleteTogetherFreeJoinInfo} sx={{mr:3}} >신청취소</Button>:
                    <Button variant="contained" onClick={deleteTogetherPayJoinInfo} sx={{mr:3}} >신청취소(환불)</Button>}
                    <Button variant="contained" onClick={handleClose}>나가기</Button>
                </Box>:
                togetherJoinState==="가입중" ? <Box sx={style}>
                <UserBox>
                    <Avatar src={insertForm.memberEmail.memberSaveimg} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                    <Typography fontWeight={500} variant="span">
                    {sessionStorage.getItem("nickName")}
                    </Typography>
                </UserBox>
                <hr/>
                <Typography sx={{ mt: 2, mb:2 }} variant="h6" component="div"> {/*질문*/}
                    환불 및 취소 하시겠습니까?
                </Typography>
                {togetherInfo.togetherPrice === 0 && togetherInfo.togetherOpenedCode.facilitiesCode.facilitiesPrice===0 ? <Button variant="contained" type="submit" onClick={deleteTogetherFreeJoinInfo} sx={{mr:3}} >취소하기</Button>:
                <Button variant="contained" type="submit" onClick={deleteTogetherPayJoinInfo} sx={{mr:3}} >환불하기</Button>}
                <Button variant="contained" onClick={handleClose}>나가기</Button>
                </Box>:
                togetherPayState==="결제대기중" ? 
                <Box sx={style}>
                    <UserBox>
                        <Avatar src={insertForm.memberEmail.memberSaveimg} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant="span">
                        {sessionStorage.getItem("nickName")}
                        </Typography>
                    </UserBox>
                <hr/>
                <Typography sx={{ mt: 2, mb:2 }} variant="h6" component="div"> {/*결제전 진행 사항*/}
                    함께해요 이름 : {togetherInfo.togetherTitle}<br/>
                    참여중인 멤버수 : {togetherJoinMember.length+1}명 / {togetherInfo.togetherMax}명<br/>
                    장소 : {togetherInfo.togetherPosition}<br/>
                    총 결제금액 : {togetherInfo.togetherTotalPrice}원(본인 부담금 포함) <br/>
                </Typography>

                <Typography sx={{ mt: 2, mb:2 }} variant="h6"> {/*질문*/}
                    {togetherJoinMember.length+1===togetherInfo.togetherMax ? "최종결제 진행 하시겠습니까?":"인원이 부족합니다"}
                </Typography>
                <Button variant="contained" onClick={finalPayment} sx={{mr:3}} disabled={!(togetherJoinMember.length+1===togetherInfo.togetherMax)} >결제하기</Button>
                <Button variant="contained" onClick={handleClose}>나가기</Button>
                </Box>:
                <Box sx={style} component="form">
                    <UserBox>
                        <Avatar src={insertForm.memberEmail.memberSaveimg} alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant="span">
                        {sessionStorage.getItem("nickName")}
                        </Typography>
                    </UserBox>
                    
                    {!togetherInfo.togetherInquiry ? null : 
                        <Box>
                            <hr/>
                            <Typography sx={{ mt: 2 }} variant="h6" component="div"> {/*질문*/}
                                {togetherInfo.togetherInquiry}
                            </Typography>
                            <TextField
                            value={insertForm.togetherJoinAnswer}
                            onChange={handleChange}
                            autoFocus
                            margin="dense"
                            name="togetherJoinAnswer"
                            label="질문의 응답해주세요"
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            />
                        </Box>}
                    <Typography>
                        1인당 부담금 : {togetherInfo.togetherPrice + togetherInfo.togetherOpenedCode.facilitiesCode.facilitiesPrice===0 ? "무료": togetherInfo.togetherPrice + togetherInfo.togetherOpenedCode.facilitiesCode.facilitiesPrice}
                    </Typography>
                    {!togetherInfo.togetherInquiry ? <Button type="submit" variant="contained" onClick={togetherJoinSend} sx={{mt:2}}>참여하기</Button>:                 
                    <Button type="submit" variant="contained" onClick={togetherJoinSend} disabled={disabled} sx={{mt:2}}>참여하기</Button>
                    }
                </Box>
                }
            </Modal>
        </>
    )
}

export default TogetherJoin;