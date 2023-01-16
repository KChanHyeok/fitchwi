import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//import {KAKAO_ADD_PROPERTIES} from "../share/kakaoAuth"

const KaKaoLoginRedirect = ({ sucLogin, ...props }) => {
  const nav = useNavigate();
  const swAlert = (html, icon = "success", func) => {
    Swal.fire({
      title: "알림",
      html: html,
      icon: icon,
      confirmButtonText: "확인",
      confirmButtonColor: "#ff0456",
    }).then(func);
  };

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");

    const kakaoLogin = async () => {
      await axios.get("/login/kakao/callback?", { params: { code: code } }).then((res) => {
        // eslint-disable-next-line no-unused-vars
        const { isPresent, member } = res.data;

        switch (isPresent) {
          case "ok":
            switch (res.data.state) {
              case "ok":
                sucLogin(res.data.memberEmail, res.data.memberNickname, res.data.profileImg, res.data.mbti);
                sessionStorage.setItem("id", res.data.memberEmail);
                sessionStorage.setItem("nickName", res.data.memberNickname);
                sessionStorage.setItem("classification", "k");
                sessionStorage.setItem("mbti", res.data.mbti);
                sessionStorage.setItem("profileImg", res.data.profileImg);
                swAlert(res.data.memberNickname + "님 환영합니다.", "success", () =>
                  nav("/", { replace: true })
                );

                break;
              case "reported":
                swAlert(
                  "누적된 신고에 의해, <br/> FITCHWI 이용이 불가합니다.<br/> 제한 해지일 :" +
                    res.data.memberRestriction,
                  "warning",
                  () => nav("/", { replace: true })
                );

                break;
              case "released":
                sucLogin(res.data.memberEmail, res.data.memberNickname, res.data.profileImg, res.data.mbti);
                sessionStorage.setItem("id", res.data.memberEmail);
                sessionStorage.setItem("nickName", res.data.memberNickname);
                sessionStorage.setItem("classification", "k");
                sessionStorage.setItem("mbti", res.data.mbti);
                sessionStorage.setItem("profileImg", res.data.profileImg);
                swAlert(res.data.memberRestriction + "부로 이용 제한이 해제됐습니다.", "info", () => {
                  nav("/", { replace: true });
                });

                break;

              default:
                break;
            }
            break;
          case "no":
            swAlert("가입 된 회원 정보가 없습니다.<br/>  추가 정보 입력 페이지로 이동합니다.", "info", () => {
              nav("/join/name", { replace: true, state: member });
            });

            break;
          case "fail":
            swAlert("인증에 문제가 발생했습니다.", "warning");
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
