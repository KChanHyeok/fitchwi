import React from "react";

const KaKaoLogin = () => {
  const REST_API_KEY = "bad1b060092a0ed86a3dfe34c2fb99f9";
  const REDIRECT_URI = "http://localhost:3000/login/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <React.Fragment>
      <img src="images/kakao_login_medium_wide.png" alt="카카오 로그인" onClick={kakaoLogin}></img>
    </React.Fragment>
  );
};

export default KaKaoLogin;
