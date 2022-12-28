import { Avatar, Button, Modal, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";

const TogetherJoin = ({children, togetherInfo, refreshTogetherJoinList, togetherJoinState, togetherPayState, togetherJoinMember}) => {
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [disabled,setdisabled] = useState(true)

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
          axios.post("/insertTogetherJoinInfo", insertForm)
              .then((res) => {
                  setOpen(false);
                  alert(res.data);
                  refreshTogetherJoinList();
              })
              .catch((Error) => console.log(Error))
      }
      const deleteTogetherJoinInfo = (e) => {
        e.preventDefault();
            axios.delete("/deleteTogetherJoin",{ params : { memberEmail: sessionStorage.getItem("id"), togetherCode: togetherInfo.togetherCode}})
            .then((res) => {
                setOpen(false);
                alert(res.data);
                refreshTogetherJoinList();
            })
      }
    return (
        <>
            { togetherJoinState==="대기" ? <Button onClick={handleOpen} variant={"contained"} sx={{maxWidth:900}}>신청취소</Button>:
            togetherJoinState==="거절" ? <Button variant={"contained"} disabled>신청이 거절되었습니다</Button>:
            togetherJoinState==="가입중" ? <Button onClick={handleOpen} variant={"contained"} sx={{maxWidth:900}}>참여취소하기</Button>:
            togetherPayState==="결제완료" ? <Button variant={"contained"} disabled>결제가 완료되었습니다</Button>:
            <Button onClick={handleOpen} variant={"contained"} sx={{maxWidth:900}} >{children}</Button>
            }
            <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            >
                {togetherJoinState==="대기" ? <Box sx={style} component="form">
                    <UserBox>
                        <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant="span">
                        {sessionStorage.getItem("id")}
                        </Typography>
                    </UserBox>
                    <hr/>
                    <Typography sx={{ mt: 2, mb:2 }} variant="h6" component="div"> {/*질문*/}
                        신청을 취소하시겠습니까?
                    </Typography>
                    <Button type="submit" variant="contained" onClick={deleteTogetherJoinInfo} sx={{mr:3}} >신청취소</Button>
                    <Button type="submit" variant="contained" onClick={handleClose}>나가기</Button>
                </Box>:
                togetherJoinState==="가입중" ? <Box sx={style} component="form">
                <UserBox>
                    <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                    <Typography fontWeight={500} variant="span">
                    {sessionStorage.getItem("id")}
                    </Typography>
                </UserBox>
                <hr/>
                <Typography sx={{ mt: 2, mb:2 }} variant="h6" component="div"> {/*질문*/}
                    환불하시겠습니까?
                </Typography>
                <Button type="submit" variant="contained" onClick={deleteTogetherJoinInfo} sx={{mr:3}} >환불하기</Button>
                <Button type="submit" variant="contained" onClick={handleClose}>나가기</Button>
                </Box>:
                togetherPayState==="결제대기" ? <Box sx={style} component="form">
                <UserBox>
                    <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                    <Typography fontWeight={500} variant="span">
                    {sessionStorage.getItem("id")}
                    </Typography>
                </UserBox>
                <hr/>
                <Typography sx={{ mt: 2, mb:2 }} variant="h6" component="div"> {/*결제전 진행 사항*/}
                    함께해요 이름 : {togetherInfo.togetherTitle}<br/>
                    참여중인 멤버수 : {togetherJoinMember.length}명 / {togetherInfo.togetherMax}명<br/>
                    장소 : {togetherInfo.togetherPosition}<br/>
                    총 결제금액 : {togetherInfo.togetherTotalPrice}원 <br/>
                </Typography>

                <Typography sx={{ mt: 2, mb:2 }} variant="h6" component="div"> {/*질문*/}
                    {togetherJoinMember.length===togetherInfo.togetherMax ? "최종결제 진행 하시겠습니까?":"인원이 부족합니다"}
                </Typography>
                <Button type="submit" variant="contained" onClick={deleteTogetherJoinInfo} sx={{mr:3}} disabled={!(togetherJoinMember.length===togetherInfo.togetherMax)} >결제하기</Button>
                <Button type="submit" variant="contained" onClick={handleClose}>나가기</Button>
                </Box>:
                <Box sx={style} component="form">
                    <UserBox>
                        <Avatar alt={"profil.memberImg"} sx={{ width: 30, height: 30 }} />
                        <Typography fontWeight={500} variant="span">
                        {sessionStorage.getItem("id")}
                        </Typography>
                    </UserBox>
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
                    <Button type="submit" variant="contained" onClick={togetherJoinSend} disabled={disabled}>참여하기</Button>
                </Box>
                }
            </Modal>
        </>
    )
}

export default TogetherJoin;