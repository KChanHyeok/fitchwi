import axios from "axios";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const JoinMember = () => {
  let formdata = new FormData();
  const nav = useNavigate();
  const [fileForm, setFileForm] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [msg, setMsg] = useState("");
  const inputPwd = useRef();

  const [joinForm, setJoinForm] = useState({
    memberEmail: "",
    memberPwd: "",
    memberName: "",
    memberNickname: "",
    memberGender: "",
    memberPhone: "",
    memberAddr: "",
    memberBirth: "",
    memberMbti: "",
    memberInterest: [],
  });

  useEffect(() => {
    preview();

    return () => preview();
  });

  const preview = () => {
    if (!fileForm) return false;

    const imgEl = document.querySelector(".img_box");

    const reader = new FileReader();

    reader.onload = () => (imgEl.style.backgroundImage = `url(${reader.result})`);
    reader.readAsDataURL(fileForm[0]);
    console.log(reader);
  };

  const onChange = useCallback(
    (e) => {
      const joinObj = {
        ...joinForm,
        [e.target.name]: e.target.value,
      };
      setJoinForm(joinObj);
    },
    [joinForm]
  );

  const onCheck = useCallback(
    (e) => {
      const joinObj = {
        ...joinForm,
        memberInterest: joinForm.memberInterest,
      };
      if (e.target.checked === true) {
        joinForm.memberInterest.push(e.target.value);
      } else {
        joinForm.memberInterest.splice(joinForm.memberInterest.indexOf(e.target.value), 1);
      }
      console.log(joinObj.memberInterest);
      setJoinForm(joinObj);
    },
    [joinForm]
  );

  const onLoadFile = useCallback((e) => {
    const file = e.target.files;
    setFileForm(file);
  }, []);

  const sendJoin = (e) => {
    e.preventDefault();
    console.log(joinForm.memberInterest);
    formdata.append("data", new Blob([JSON.stringify(joinForm)], { type: "application/json" }));
    formdata.append("uploadImage", fileForm[0]);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("/joinmember", formdata, config)
      .then((res) => {
        if (res.data === "ok") {
          alert("성공");
          nav("/");
        } else {
          alert("실패");
        }
      })
      .catch((error) => console.log(error));
  };

  const onCheckPwd = (e) => {
    let checkpwd = e.target.value;
    console.log(inputPwd.current.value);
    console.log(checkpwd);
    if (checkpwd === "") {
      setMsg("");
    } else if (checkpwd === inputPwd.current.value) {
      setMsg("비밀번호 확인이 완료됐습니다.");
    } else {
      setMsg("올바른 비밀번호를 입력해주세요");
    }
  };

  const onCheckId = (e) => {
    e.preventDefault();
    if (joinForm.memberEmail === "") {
      alert("사용하실 Email을 입력해주세요.");
      return;
    }
    axios
      .get("/checkduplicatesmemberId", { params: { userId: joinForm.memberEmail } })
      .then((res) => {
        if (res.data === "ok") {
          setDisabled(!disabled);
          alert("사용 가능한 Email 입니다.");
        } else {
          alert("사용할 수 없는 Email 입니다.");
        }
      });
    //console.log(typeof joinForm.memberEmail);
  };

  const onCheckComple = () => {
    const joinObj = {
      ...joinForm,
      memberInterest: joinForm.memberInterest.join(" "),
    };
    setJoinForm(joinObj);
  };

  console.log(formdata);

  return (
    <div>
      <h1>여기는 회원가입 페이지</h1>
      <form className="joinContainer" onSubmit={sendJoin}>
        <div>
          이메일 : <input type="email" name="memberEmail" onChange={onChange} required />
          <button onClick={onCheckId}>중복확인</button>
        </div>
        <div>
          비밀번호 :{" "}
          <input type="password" name="memberPwd" onChange={onChange} ref={inputPwd} required />
        </div>
        <div>
          비밀번호확인 : <input type="password" onChange={onCheckPwd} required />
          <span>{msg}</span>
        </div>
        <div>
          이름 : <input type="text" name="memberName" onChange={onChange} required />
        </div>
        <div>
          닉네임 : <input type="text" name="memberNickname" onChange={onChange} />
        </div>
        <div>
          성별 : 남{" "}
          <input type="radio" name="memberGender" value="남" onChange={onChange} required /> 여
          <input type="radio" name="memberGender" value="여" onChange={onChange} required />
        </div>
        <div>
          핸드폰번호 : <input type="text" name="memberPhone" onChange={onChange} required />
        </div>
        <div>
          주소 : <input type="text" name="memberAddr" onChange={onChange} required />
        </div>
        <div>
          생일 : <input type="date" name="memberBirth" onChange={onChange} required />
        </div>
        <div>
          프로필 이미지 : <input type="file" name="memberImg" onChange={onLoadFile} />
          <div className="img_box">
            <img src="" alt="" />
          </div>
        </div>
        <div>
          MBTI : <input type="text" name="memberMbti" onChange={onChange} />
        </div>
        <div>
          관심 주제 :
          <span>
            <input type="checkbox" name="memberInterest" value="문화∙예술" onChange={onCheck} />
            문화∙예술
            <input type="checkbox" name="memberInterest" value="운동∙액티비티" onChange={onCheck} />
            운동∙액티비티
            <input type="checkbox" name="memberInterest" value="요리∙음식" onChange={onCheck} />
            요리∙음식
            <input type="checkbox" name="memberInterest" value="여행" onChange={onCheck} />
            여행
            <input type="checkbox" name="memberInterest" value="성장∙자기계발" onChange={onCheck} />
            성장∙자기계발
            <input type="checkbox" name="memberInterest" value="공예∙수공예" onChange={onCheck} />
            공예∙수공예
            <input type="checkbox" name="memberInterest" value="게임∙오락" onChange={onCheck} />
            게임∙오락
            <input type="checkbox" name="memberInterest" value="기타" onChange={onCheck} />
            기타
          </span>
        </div>
        <button type="submit" onClick={onCheckComple} disabled={disabled}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default JoinMember;
