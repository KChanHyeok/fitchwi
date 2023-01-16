import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Chip, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Stack, styled } from "@mui/system";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Swal from "sweetalert2";

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

const imgBoxStyle = {
    marginTop: "20px",
    width: "700px",
    height: "300px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
};

function TalkOpened({ memberEmail, memberInfo, refreshTalkList, refreshTalkTagList }) {
    let formData = new FormData();
    const nav = useNavigate();
    const imgEl = document.querySelector(".img_box");
    const location = useLocation();
    const nowdate = new Date().getFullYear() + "-"
        + ((new Date().getMonth() + 1) < 9 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-"
        + (new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate());

    //버튼 여러번 클릭 막기
    const [load, setLoad] = useState(false);

    const [insertTalkOp, setInsertTalkOp] = useState({
        memberEmail: {
            memberEmail: sessionStorage.getItem("id"),
        },
        talkTitle: "",
        talkMax: 0,
        talkCategory: "",
        talkType: "",
        talkInquiry: "",
        talkContent: "",
        talkTagContent: "",
        talkOpenDate: nowdate,
    });

    const onChange = useCallback(
        (e) => {
            const inputTo = {
                ...insertTalkOp,
                [e.target.name]: e.target.value,
            };
            setInsertTalkOp(inputTo);
        }, [insertTalkOp]);

    //파일 업로드
    const [fileForm, setFileForm] = useState("");

    useEffect(() => {
        preview();
        try {
            if (location) {
                setInsertTalkOp(location.state.talkInfo);
            }
        } catch (e) {

        }

        return () => preview();
    });

    const preview = () => {
        if (fileForm.length === 0) {
            return false;
        }
        const render = new FileReader();
        render.readAsDataURL(fileForm[0]);
        render.onload = () => (imgEl.style.backgroundImage = `url(${render.result})`);
    }

    // const deleteFileImage = () => {
    //     setFileForm("");
    // }

    const onLoadFile = useCallback((event) => {
        const file = event.target.files;
        setFileForm(file);
    }, []);

    //작성 내용 전송 함수
    const onTalkOpened = (e) => {
        e.preventDefault();
        setLoad(true);
        if (fileForm.length === 0) {
            setLoad(false)
            return swAlert("모임 대표 사진을 넣어주세요", "warning", () => {
                setInsertTalkOp({
                    ...insertTalkOp,
                    talkTagContent: ""
                })
            })
        }
        if (insertTalkOp.talkMax < 2) {
            setLoad(false)
            return swAlert("최소 2명 이상이여야 합니다.", "warning")
        }
        formData.append(
            "data",
            new Blob([JSON.stringify(insertTalkOp)],
                { type: "application/json" })
        );
        formData.append("uploadImage", fileForm[0]);

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };

        axios.post("/addTalk", formData, config)
            .then((res) => {
                if (res.data === "ok") {
                    setLoad(false);
                    swAlert("얘기해요 개설이 완료되었습니다.", "success");
                    nav("/talk");
                    refreshTalkList();
                    refreshTalkTagList();
                } else {
                    swAlert("얘기해요 개설 실패", "error");
                }
            })
            .catch((error) => console.log(error));
    };

    //승인제일 때 가입질문 input 창 
    const [showInquiry, setShowInquiry] = useState(false);

    const approveCheck = () => {
        setShowInquiry(true);
    }

    const otherCheck = () => {
        setShowInquiry(false);
    }

    // 태그 추가

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));
    const [chipData, setChipData] = React.useState([]);
    const [count, setCount] = useState(0);
    const addTag = useCallback(
        (e) => {
            setCount(count + 1);
            const chipObj = {
                key: count,
                label: insertTalkOp.talkTagContent
            }
            setChipData(chipData.concat(chipObj))
            setInsertTalkOp({
                ...insertTalkOp,
                talkTagContent: ""
            });
        }, [chipData, count, insertTalkOp])

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const saveClick = () => {
        setInsertTalkOp({
            ...insertTalkOp,
            talkTagContent: chipData.map(data => data.label).join(" ")
        });
    }

    const swAlert = (contentText, icon, func) => {
        Swal.fire({
            title: "알림",
            text: contentText,
            icon: icon,
            confirmButtonText: "확인",
            confirmButtonColor: "#ff0456",
        }).then(func)
    };

    return (
        <>
            {sessionStorage.getItem("id") === null
                ? <Box style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                    <CircularProgress sx={{ margin: "auto" }} />
                </Box>
                :
                <Stack sx={{ width: 800, height: 800, margin: "auto" }} flex={7} p={3}>
                    {load ?
                        <Box style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}>
                            <CircularProgress sx={{ margin: "auto" }} />
                        </Box>
                        : <Box bgcolor="white" p={3} sx={{ mb: 5 }}>
                            <Typography variant="h6" textAlign="center">
                                얘기해요 개설
                            </Typography>
                            <UserBox>
                                <Avatar alt={"profil.memberImg"} src={memberInfo.memberSaveimg}
                                    sx={{ width: 30, height: 30 }} />
                                <Typography fontWeight={500} variant="span">
                                    {memberInfo.memberNickname}
                                </Typography>
                            </UserBox>
                            <hr />
                            <form onSubmit={onTalkOpened}>
                                <TextField fullWidth
                                    label="얘기해요 모임명"
                                    name="talkTitle"
                                    value={insertTalkOp.talkTitle}
                                    sx={{ mt: 3 }}
                                    onChange={onChange}
                                    placeholder="30자 이내로 작성"
                                    inputProps={{ maxLength: 30 }}
                                    required
                                    autoFocus />
                                <TextField fullWidth
                                    label="최대 참여인원"
                                    type="number"
                                    name="talkMax"
                                    sx={{ mt: 3 }}
                                    onChange={onChange}
                                    required
                                />
                                <FormControl sx={{ mt: 3 }} fullWidth>
                                    <InputLabel>모임 카테고리 선정</InputLabel>
                                    <Select label="모임 카테고리 선정"
                                        name="talkCategory"
                                        value={insertTalkOp.talkCategory}
                                        onChange={onChange}
                                        required>
                                        <MenuItem value="문화·예술">문화·예술</MenuItem>
                                        <MenuItem value="운동·액티비티">운동·액티비티</MenuItem>
                                        <MenuItem value="요리·음식">요리·음식</MenuItem>
                                        <MenuItem value="여행">여행</MenuItem>
                                        <MenuItem value="성장·자기계발">성장·자기계발</MenuItem>
                                        <MenuItem value="공예·수공예">공예·수공예</MenuItem>
                                        <MenuItem value="게임·오락">게임·오락</MenuItem>
                                        <MenuItem value="기타">기타</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className="talkJoinStyle">
                                    <FormControl sx={{ mt: 3, minWidth: 130 }}>
                                        <InputLabel className="talkTypeSt">가입유형</InputLabel>
                                        <Select label="가입유형" name="talkType"
                                            value={insertTalkOp.talkType}
                                            onChange={onChange}
                                            required>
                                            <MenuItem value="승인제"
                                                onClick={approveCheck}>승인제</MenuItem>
                                            <MenuItem value="선착순"
                                                onClick={otherCheck}>선착순</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {showInquiry && <TextField label="가입질문"
                                        name="talkInquiry"
                                        value={insertTalkOp.talkInquiry}
                                        sx={{ mt: 3, float: "right", minWidth: 600 }}
                                        onChange={onChange}
                                        placeholder="100자 이내로 작성"
                                        inputProps={{ maxLength: 100 }} />}
                                </div>
                                <Stack>
                                    <Typography variant="h7" sx={{ mt: 3 }}>대표사진을 넣어주세요
                                        <Button sx={{ ml: 4 }} variant="contained" component="label" size="large">
                                            Upload
                                            <input
                                                label="모임대표사진"
                                                type="file"
                                                accept="image/*"
                                                sx={{ mt: 3, display: "none" }}
                                                color="grey"
                                                onChange={onLoadFile}
                                                hidden
                                                readOnly
                                                required
                                            />
                                        </Button>
                                        {/* &nbsp;&nbsp;
                                        <Button variant="contained" component="label" size="large"
                                            style={{
                                                backgroundColor: "gray",
                                                color: "white",
                                            }}
                                            onClick={() => deleteFileImage()}
                                        >
                                            Delete
                                        </Button> */}
                                    </Typography>
                                    <Box style={imgBoxStyle} className="img_box">
                                    </Box>
                                </Stack>
                                <TextField fullWidth
                                    label="모임을 소개해주세요"
                                    name="talkContent"
                                    sx={{ mt: 3 }}
                                    onChange={onChange}
                                    placeholder="5000자 이내로 작성"
                                    inputProps={{ maxLength: 5000 }}
                                    rows={5}
                                    multiline
                                    required />
                                <Stack
                                    direction="row"
                                    sx={{ mt: 3, height: 55 }}
                                    spacing={3}
                                >
                                    <TextField
                                        fullWidth
                                        label="태그"
                                        name="talkTagContent"
                                        onChange={onChange}
                                        value={insertTalkOp.talkTagContent}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" >
                                                    {chipData.map((data) => {
                                                        let icon;
                                                        if (data.label === 'React') {
                                                            icon = <TagFacesIcon />;
                                                        }
                                                        return (
                                                            <ListItem key={data.key} style={{ listStyle: "none" }}>
                                                                <Chip
                                                                    icon={icon}
                                                                    label={data.label}
                                                                    onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                                                />
                                                            </ListItem>
                                                        );
                                                    })}
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button variant={"contained"} onClick={addTag}>추가</Button>
                                </Stack>
                                <Typography sx={{ mt: 3, float: "right" }}>
                                    <Button type="submit" variant={"contained"} sx={{ mt: 2, mr: 4 }} onClick={saveClick}>개설하기</Button>
                                    <Button href="/talk" variant={"contained"} sx={{ mt: 2 }}>취소</Button>
                                </Typography>
                            </form>
                        </Box>
                    }
                </Stack>

            }
        </>
    );
}

export default TalkOpened;
