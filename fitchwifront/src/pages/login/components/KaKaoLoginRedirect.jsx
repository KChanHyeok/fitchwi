import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//import {KAKAO_ADD_PROPERTIES} from "../share/kakaoAuth"

const KaKaoLoginRedirect = ({ sucLogin, ...props }) => {
  const nav = useNavigate();
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");

    const kakaoLogin = async () => {
      await axios.get("/login/kakao/callback?", { params: { code: code } }).then((res) => {
        console.log(res.data);
        const { isPresent, member } = res.data;

        switch (isPresent) {
          case "ok":


            switch (res.data.state) {
              case "ok":
                console.log(res.data);
                sessionStorage.setItem("id", res.data.memberEmail);
                sessionStorage.setItem("nickName", res.data.memberNickname);
                alert(res.data.memberNickname + "님 환영합니다.");
                window.location.href = "/";
                break;
              case "reported":
                alert("신고누적으로, " + res.data.memberRestriction + "까지 이용이 불가능합니다.");
                nav("/");

                break;
              case "released":
                alert(res.data.memberRestriction + "부로 이용 제한이 해제됐습니다.");
                sucLogin(res.data.memberEmail, res.data.memberNickname);
                sessionStorage.setItem("id", res.data.memberEmail);
                sessionStorage.setItem("nickName", res.data.memberNickname);

                nav("/");
                break;

              default:
                break;
            }


            break;
          case "no":
            console.log(member);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history]);

  return (
    <>
      <div></div>
    </>
  );
};

export default KaKaoLoginRedirect;
