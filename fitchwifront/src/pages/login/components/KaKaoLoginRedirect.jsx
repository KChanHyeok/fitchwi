import axios from "axios";
import { useEffect } from "react";

//import {KAKAO_ADD_PROPERTIES} from "../share/kakaoAuth"

const KaKaoLoginRedirect = (props) => {
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");

    const kakaoLogin = async () => {
      await axios.get("/login/kakao/callback?", { params: { code: code } }).then((res) => {
        const { isPresent, member } = res.data;
        switch (isPresent) {
          case "ok":
            sessionStorage.setItem("id", member.memberEmail);
            sessionStorage.setItem("nickName", member.memberNickname);
            alert(member.memberNickname + "님 환영합니다.");
            window.location.href = "/";
            break;
          case "no":
            alert("추가 정보 입력 페이지로 이동합니다.");
            break;
          case "fail":
            alert("인증에 문제가 발생했습니다.");
            break;
          default:
            break;
        }

        //   localStorage.setItem("token", res.headers.authorization);
        //  window.location.href = "/";
      });
    };
    kakaoLogin();
  }, [props.history]);

  return (
    <>
      <div></div>
    </>
  );
};

export default KaKaoLoginRedirect;
