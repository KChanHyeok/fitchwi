import React from "react";

export default function Mypage({ member }) {
  const {
    memberEmail,
    memberName,
    memberBirth,
    memberAddr,
    memberGender,
    memberImg,
    memberInterest,
    memberMbti,
    memberNickname,
    memberPhone,
    memberSaveimg,
  } = member;
  return (
    <div>
      <p>
        {memberEmail}, {memberName}, {memberBirth},{memberAddr},{memberGender},{memberImg},
        {memberInterest},{memberMbti},{memberNickname},{memberPhone},{memberSaveimg}
      </p>
    </div>
  );
}
