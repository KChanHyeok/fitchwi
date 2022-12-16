import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./scss/JoinMember.scss";

const JoinMember = () => {
    const nav = useNavigate();

    useEffect(() => {
        preview();

        return () => preview();
    })

    const preview = () => {
        if(!fileForm) return false;

        const imgEl = document.querySelector('.img_box');

        const reader = new FileReader();

        reader.onload = () => (imgEl.style.backgroundImage = `url(${reader.result})`);
        reader.readAsDataURL(fileForm[0]);
        console.log(reader)
    }

    const [joinForm, setJoinForm] = useState({
        memberEmail: "",
        memberName: "",
        memberPwd: "",
        memberNickname: "",
        memberGender: "",
        memberPhone: "",
        memberAddr: "",
        memberBirth: "",
        memberMbti: "",
        memberInterest: []
    })
    const [fileForm, setFileForm] = useState("");

    const onChange = useCallback(
        (e) => {
            const joinObj = {
                ...joinForm,
                [e.target.name]: e.target.value,
            };
            setJoinForm(joinObj);
        }, [joinForm])
    
    const onCheck = useCallback(
        (e) => {
            const joinObj = {
                ...joinForm,
            };
            if (e.target.checked === true) {
                joinForm.memberInterest.push(e.target.value);
            } else {
                joinForm.memberInterest.splice(joinForm.memberInterest.indexOf(e.target.value),1);
            }
            setJoinForm(joinObj);
        }, [joinForm])

    const onLoadFile = useCallback(
        (e) => {
            const file = e.target.files;
            setFileForm(file)
        },[])
        
 
    const sendJoin = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('uploadImage', fileForm[0]);
        
        const config = {
            Headers: {
                'content-type': 'multipart/form-data',
            },
        };
        setJoinForm({ ...joinForm, memberInterest: joinForm.memberInterest.join(" ") })
        console.log(config, formdata)
        console.log(joinForm)
        nav("/")
    }
    return (
        <div>
            <h1>여기는 회원가입 페이지</h1>
            <form className="joinContainer" onSubmit={sendJoin}>
                <div> 이메일 : <input type="email" name="memberEmail" onChange={onChange}/></div>
                <div> 비밀번호 : <input type="password" name="memberPwd" onChange={onChange}/></div>
                <div> 이름 : <input type="text" name="memberName" onChange={onChange}/></div>
                <div> 닉네임 : <input type="text" name="memberNickname" onChange={onChange}/></div>
                <div> 성별 : 남 <input type="radio" name="memberGender" value="남" onChange={onChange}/> 여<input type="radio" name="mgender" value="여" onChange={onChange}/></div>
                <div> 핸드폰번호 : <input type="text" name="memberPhone" onChange={onChange}/></div>
                <div> 주소 : <input type="text" name="memberAddr" onChange={onChange}/></div>
                <div> 생일 : <input type="date" name="memberBirth" onChange={onChange}/></div>
                <div> 
                    프로필 이미지 : <input type="file" name="memberImg" onChange={onLoadFile} />
                    <div className="img_box">
                        <img src="" alt=""/>
                    </div>
                </div> 
                <div> MBTI : <input type="text" name="memberMbti" onChange={onChange}/></div>
                <div>
                    관심 주제 :
                    <span>
                        <input type="checkbox" name="memberInterest" value="문화∙예술" onChange={onCheck} />문화∙예술
                        <input type="checkbox" name="memberInterest" value="운동∙액티비티" onChange={onCheck} />운동∙액티비티
                        <input type="checkbox" name="memberInterest" value="요리∙음식" onChange={onCheck} />요리∙음식
                        <input type="checkbox" name="memberInterest" value="여행" onChange={onCheck} />여행
                        <input type="checkbox" name="memberInterest" value="성장∙자기계발" onChange={onCheck} />성장∙자기계발
                        <input type="checkbox" name="memberInterest" value="공예∙수공예" onChange={onCheck} />공예∙수공예
                        <input type="checkbox" name="memberInterest" value="게임∙오락" onChange={onCheck} />게임∙오락
                        <input type="checkbox" name="memberInterest" value="기타" onChange={onCheck} />기타
                    </span>
                </div> 
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default JoinMember;